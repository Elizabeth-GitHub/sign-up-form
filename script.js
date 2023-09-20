const form = document.getElementById('form-subscription');
const firstName = document.getElementById('first-name');
const errorFirstName = document.getElementById('firstname-error');
const lastName = document.getElementById('last-name');
const errorLastName = document.getElementById('lastname-error');
const nameFields = [
    {inputName: firstName, errorName: errorFirstName},
    {inputName: lastName, errorName: errorLastName}
];
const email = document.getElementById('email');
const errorEmail =  document.getElementById('email-error')

nameFields.forEach(({inputName, errorName}) => {
    inputName.addEventListener('input', () => {
        const isValidName = validateName(inputName.value);

        if (isValidName) {
            clearErrorName(errorName);
            toggleValidity(inputName);
            toggleCompletion(inputName);
        } else {
            toggleValidity(inputName, false);
            showErrorName(errorName);
        }
    });
});

email.addEventListener('input', () => {
    const isValidEmail = validateEmail(email.value);

    if(isValidEmail) {
        clearErrorEmail();
        toggleCompletion(email);
    } else {
        showErrorEmail();
    }
}
)

function checkIfEmpty(inputToCheckEmptiness) {
    return inputToCheckEmptiness.length === 0;
}
 
function toggleValidity(inputToToggleValidity, toValid = true) {
    const [classToAdd, classesToRemove] = toValid ? ['valid', ['invalid']] : ['invalid', ['valid', 'completed']];

    inputToToggleValidity.classList.add(classToAdd);
    classesToRemove.forEach(classToRemove => {
        inputToToggleValidity.classList.remove(classToRemove);
    });
}

function toggleCompletion(inputToToggleCompletion) {
    inputToToggleCompletion.classList.toggle('completed', !checkIfEmpty(inputToToggleCompletion.value));
}

function validateName(nameToValidate) {
    const regexNames = /^(\p{L}+)?$/u; /* The regex allows an empty entry as it will be checked before the sumbission.*/
    
    return regexNames.test(nameToValidate);  
}

function validateEmail(emailToValidate) {
    const regexEmails =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return regexEmails.test(emailToValidate);
}

function showErrorName(errorNameToShow) {
    console.log(errorNameToShow);
    errorNameToShow.textContent = `Your ${getIncorrectName(errorNameToShow.id)} should consist of letters only.`;
    console.log(errorNameToShow.textContent);
    errorNameToShow.classList.add('active');
}

function clearErrorName(errorNameElementToClear) {
    errorNameElementToClear.textContent = '';
    errorNameElementToClear.classList.remove('active');
}

function getIncorrectName(nameToTransform) {
    const removeError = nameToTransform.replace('-error', ''); /*nameToTranform can be either firstName-error or lastName-error*/
    console.log(`getIncorrectName: ${removeError[0].toLowerCase() + removeError.slice(1).replace('name', ' name')}`);
    return removeError[0].toLowerCase() + removeError.slice(1).replace('name', ' name');
}

function showErrorEmail() {
    errorEmail.textContent = 'Incorrect email address';
    errorEmail.classList.add('active');
    errorEmail.classList.remove('complete');
}

function clearErrorEmail() {
    errorEmail.textContent = '';
    errorEmail.classList.remove('active');
}

function getErrorName(nameId) {
    return 'error' + nameId[0].toUpperCase() + nameId.slice(1).replace('-n', 'N'); /*For example, nameId = 'first-name', the function will output 'errorFirstName'*/
}
