const form = document.getElementById('form-subscription');
const inputsName = [
    { inputName: document.getElementById('first-name'), errorName: document.getElementById('firstname-error') },
    { inputName: document.getElementById('last-name'), errorName: document.getElementById('lastname-error') }
];

inputsName.forEach(({ inputName, errorName }) => {
    inputName.addEventListener('input', () => {
        const isValid = validateFirstLastName(inputName.value);

        if (isValid) {
            toggleValidity(inputName);
            clearErrorName(errorName);
            if (!checkIfEmpty(inputName.value)) {
                inputName.classList.add('completed');
            }
        } else {
            toggleValidity(inputName, false);
            showErrorName(errorName);
        }
    });
});

function toggleValidity(variableToToggle, toValid = true) {
    const [classToAdd, classesToRemove] = toValid ? ['valid', ['invalid']] : ['invalid', ['valid', 'completed']];

    variableToToggle.classList.add(classToAdd);
    classesToRemove.forEach(classToRemove => {
        variableToToggle.classList.remove(classToRemove);
    });
}

function checkIfEmpty(fieldToCheck) {
    return fieldToCheck.length === 0;
}

function validateFirstLastName(nameToValidate) {
    const regexNames = /^(\p{L}+)?$/u; /* The regex allows an empty entry as it will be checked before the sumbission.*/
    
    return regexNames.test(nameToValidate);  
}

function showErrorName(errorNameElementToShow) {
    errorNameElementToShow.textContent = `Your ${getNameToCorrect(errorNameElementToShow.id)} should consist of letters only.`;
    errorNameElementToShow.className = 'error active';
}

function clearErrorName(errorNameElementToClear) {
    errorNameElementToClear.textContent = '';
    errorNameElementToClear.className = 'error';
}

function getNameToCorrect(nameToTransform) {
    return nameToTransform.split('-')[0].replace('name', ' name');
}
