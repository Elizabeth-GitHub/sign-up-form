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
const password = document.getElementById('password');
const errorPassword = document.getElementById('password-error');
const confirmPassword = document.getElementById('confirm-password');
const errorConfirmPassword = document.getElementById('confirmpassword-error');
const buttonsChangeVisibility = document.querySelectorAll('.changevisibility-button');
/////
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

password.addEventListener('input', () => {
    const isValidPassword = validatePassword(password.value);

    handleValidityStatus(password, errorPassword, isValidPassword);
})

confirmPassword.addEventListener('input', () => {
    const isValidConfirmPassword = validateConfirmPassword(confirmPassword.value) 

    handleValidityStatus(confirmPassword, errorConfirmPassword, isValidConfirmPassword);
})

buttonsChangeVisibility.forEach((buttonChangeVisibility) => {
    buttonChangeVisibility.addEventListener('click', (event) => {
        const elementToChangeVisibility = document.getElementById(event.target.getAttribute('data-target'));

        toggleVisibility(elementToChangeVisibility);
        buttonChangeVisibility.classList.toggle('visible');
});


    })
/////
function handleValidityStatus(fieldInput, fieldError, isValidInput) {
    if (isValidInput) {
        clearError(fieldError);
        toggleCompletion(fieldInput);
        toggleValidity(fieldInput);
    } else {
        showError(fieldError);
        toggleCompletion(fieldInput);
        toggleValidity(fieldInput, false);
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

function toggleVisibility(inputToChangeVisibility) {
    inputToChangeVisibility.type = (inputToChangeVisibility.type === 'password') ? 'text' : 'password';
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

function validatePassword(passwordToValidate) {
    const regexPassword = /^.{6,}$|^$/;/*at least six symbols*/
    
    return regexPassword.test(passwordToValidate);
}

function validateConfirmPassword(confirmPasswordToValidate) {
    return confirmPasswordToValidate === password.value;
}

function showError(errorToShow) {
    let errorMessage = '';
    console.log(errorToShow.id.slice(0, -6));

    switch (errorToShow.id.slice(0, -6)) { /*error id is always in the format '-error', for example, 'email-error'*/
        case 'email':
            errorMessage = 'Invalid email address.';
            break;
        case 'phone':
            errorMessage = 'Required format: (+dial code)##########.';
            break;
        case 'password':
            errorMessage = 'Password must be at least six characters.'
            break;
        case 'confirmpassword':
            errorMessage = 'Passwords do not match. Please try again.'
            break;
        default:
            errorMessage = `Your ${getInvalidName(errorToShow.id)} should consist of letters only.`
    }
    errorToShow.textContent = errorMessage;
}

function getInvalidName(nameToTransform) {
    const removeError = nameToTransform.replace('-error', ''); /*nameToTranform can be either firstName-error or lastName-error*/
    return removeError[0].toLowerCase() + removeError.slice(1).replace('name', ' name');
}

function clearError(errorToClear) {
    errorToClear.textContent = '';
    errorToClear.classList.remove('active');
}