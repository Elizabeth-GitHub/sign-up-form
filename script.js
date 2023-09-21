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
const phone = document.getElementById('phone');
const errorPhone = document.getElementById('phone-error');

nameFields.forEach(({inputName, errorName}) => {
    inputName.addEventListener('input', () => {
        const isValidName = validateName(inputName.value);

        handleValidityStatus(inputName, errorName, isValidName);
    });
});

email.addEventListener('input', () => {
    const isValidEmail = validateEmail(email.value);

    handleValidityStatus(email, errorEmail, isValidEmail);
})

phone.addEventListener('input', () => {
    const isValidPhone = validatePhone(phone.value);

    handleValidityStatus(phone, errorPhone, isValidPhone);
})

function handleValidityStatus(fieldInput, fieldError, isValidInput) {
    if (isValidInput) {
        clearError(fieldError);
        toggleCompletion(fieldInput);
        toggleValidity(fieldInput);
    } else {
        showError(fieldError);
    }
}

function checkIfEmpty(inputToCheckEmptiness) {
    return inputToCheckEmptiness.length === 0;
}
 
function toggleValidity(fieldToToggleValidity, toValid = true) {
    const [classToAdd, classesToRemove] = toValid ? ['valid', ['invalid']] : ['invalid', ['valid', 'completed']];

    fieldToToggleValidity.classList.add(classToAdd);
    classesToRemove.forEach(classToRemove => {
        fieldToToggleValidity.classList.remove(classToRemove);
    });
}

function toggleCompletion(fieldToToggleCompletion) {
    fieldToToggleCompletion.classList.toggle('completed', !checkIfEmpty(fieldToToggleCompletion.value));
}

function validateName(nameToValidate) {
    const regexName = /^(\p{L}+)?$/u; /* The regex allows an empty entry as it will be checked before the sumbission.*/
    
    return regexName.test(nameToValidate);  
}

function validateEmail(emailToValidate) {
    const regexEmail =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^$/;

    return regexEmail.test(emailToValidate);
}

function validatePhone(phoneToValidate) {
    const regexPhone = /^\(\+\d+\)\d{10}$|^$//*(+886)1234567890 or empty*/

    return regexPhone.test(phoneToValidate);
}

function showError(errorToShow) {
    let errorMessage = '';

    switch (errorToShow.id.slice(0, -6)) { /*error id is always in the format '-error', for example, 'email-error'*/
        case 'email':
        errorMessage = 'Invalid email address.';
        break;
        case 'phone':
        errorMessage = 'Required format: (+dial code)##########.';
        break;
        default:
        errorMessage = `Your ${getInvalidName(errorToShow.id)} should consist of letters only.`
    }

    errorToShow.textContent = errorMessage;
}

function showErrorName(errorNameToShow) {
    errorNameToShow.textContent = `Your ${getInvalidName(errorNameToShow.id)} should consist of letters only.`;
}

function getInvalidName(nameToTransform) {
    const removeError = nameToTransform.replace('-error', ''); /*nameToTranform can be either firstName-error or lastName-error*/
    return removeError[0].toLowerCase() + removeError.slice(1).replace('name', ' name');
}

function clearError(errorToClear) {
    errorToClear.textContent = '';
    errorToClear.classList.remove('active');
}

function showErrorEmail() {
    errorEmail.textContent = 'Invalid email address.';
}

function showErrorPhone() {
    errorPhone.textContent = 'Required format: (+dial code)##########.'
}
