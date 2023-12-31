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
const buttonChangeVisibilityPassword = document.getElementById('changevisibility-password');
const buttonChangeVisibilityConfirmPassword = document.getElementById('changevisibility-confirmpassword');
const buttonsChangeVisibility = document.querySelectorAll('.changevisibility-button');
const buttonCreateAccount = document.getElementById('createaccount-button');
const allInputs = Array.from(document.querySelectorAll('input'));
const allRequiredInputs = Array.from(document.querySelectorAll('[required]'));
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
    handleButtonChangeVisibilityPlace(password, buttonChangeVisibilityPassword)
})

confirmPassword.addEventListener('input', () => {
    const isValidConfirmPassword = validateConfirmPassword(confirmPassword.value) 

    handleValidityStatus(confirmPassword, errorConfirmPassword, isValidConfirmPassword);
    handleButtonChangeVisibilityPlace(confirmPassword, buttonChangeVisibilityConfirmPassword)
})

buttonsChangeVisibility.forEach((buttonChangeVisibility) => {
    buttonChangeVisibility.addEventListener('click', (event) => {
        const elementToChangeVisibility = document.getElementById(event.target.getAttribute('data-target'));

        toggleVisibility(elementToChangeVisibility);
        buttonChangeVisibility.classList.toggle('visible');
    });
})

buttonCreateAccount.addEventListener('click', (event) => {
    let isInvalidInput = checkInvalidInputs();
    let isEmptyRequiredInput = checkEmptyRequiredInputs();

    if(isInvalidInput) {
        alert('There are invalid inputs on the page.');
    } else if (isEmptyRequiredInput) {
        alert('All required fields should be filled in');
        makeEmptyFieldInvalid();
    } else {
        alert('Congratulations! Your account has been created.');
        clearForm();
    }

    event.preventDefault(); // As well, this is not a real form. In other cases, preventDefault() should be used only if the conditions were met.
})
/////
function validateName(nameToValidate) {
    const regexName = /^(\p{L}+)?$/u; /* The regex allows an empty entry as it will be checked before the sumbission.*/
    
    return regexName.test(nameToValidate);  
}

function clearError(errorToClear) {
    errorToClear.textContent = '';
    errorToClear.classList.remove('active');
}

function toggleValidity(fieldToToggleValidity, toValid = true) {
    const [classToAdd, classesToRemove] = toValid ? ['valid', ['invalid']] : ['invalid', ['valid', 'completed']];

    fieldToToggleValidity.classList.add(classToAdd);
    classesToRemove.forEach(classToRemove => {
        fieldToToggleValidity.classList.remove(classToRemove);
    });
}

function checkIfEmpty(inputToCheckEmptiness) {
    return inputToCheckEmptiness.length === 0;
}

function toggleCompletion(fieldToToggleCompletion) {
    fieldToToggleCompletion.classList.toggle('completed', !checkIfEmpty(fieldToToggleCompletion.value));
}

function getInvalidName(nameToTransform) {
    const removeError = nameToTransform.replace('-error', ''); /*nameToTranform can be either firstName-error or lastName-error*/
    return removeError[0].toLowerCase() + removeError.slice(1).replace('name', ' name');
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

function handleValidityStatus(fieldInput, fieldError, isValidInput) {
    if (isValidInput) {
        clearError(fieldError);
        toggleValidity(fieldInput);
        toggleCompletion(fieldInput); 
    } else {
        showError(fieldError);
        toggleValidity(fieldInput, false); //We don't need `toggleCompletion` here bacause 'completed' class is removed in the `toggleValidity` function
    }
}

function validateEmail(emailToValidate) {
    const regexEmail =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^$/;

    return regexEmail.test(emailToValidate);
}

function validatePhone(phoneToValidate) {
    const regexPhone = /^\(\+\d+\)\d{10}$|^$/;//(+886)1234567890 or empty

    return regexPhone.test(phoneToValidate);
}

function validatePassword(passwordToValidate) {
    const regexPassword = /^.{6,}$|^$/;//at least six symbols
    
    return regexPassword.test(passwordToValidate);
}

function moveVIsibilityButton(buttonVisibilityToMove, isCompleted = true) {
    buttonVisibilityToMove.style.marginLeft = isCompleted ? '0' : '-5%';
}

function handleButtonChangeVisibilityPlace(field, buttonToReplace) {
    const isShouldMove = field.classList.contains('completed');

    moveVIsibilityButton(buttonToReplace, isShouldMove);
}

function toggleVisibility(inputToChangeVisibility) {
    inputToChangeVisibility.type = (inputToChangeVisibility.type === 'password') ? 'text' : 'password';
}

function validateConfirmPassword(confirmPasswordToValidate) {
    return confirmPasswordToValidate === password.value;
}

function checkInvalidInputs() {
    return allInputs.some(input => input.classList.contains('invalid'));
}

function checkEmptyRequiredInputs() {
    return allRequiredInputs.some(requiredInput => checkIfEmpty(requiredInput.value));
}

function makeEmptyFieldInvalid() {
    allRequiredInputs.forEach((inputRequired) => {
        if (!inputRequired.classList.contains('completed')) {
            toggleValidity(inputRequired, false);
        }
    })
}

function clearForm() {
    form.reset();
    allInputs.forEach((inputToClear) => inputToClear.classList.remove('valid', 'completed'));
}
