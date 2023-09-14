const form = document.getElementById('form-subscription');
const inputNames = [
    { inputName: document.getElementById('first-name'), errorName: document.getElementById('firstname-error') },
    { inputName: document.getElementById('last-name'), errorName: document.getElementById('lastname-error') }
];

inputNames.forEach(({ inputName, errorName }) => {
    inputName.addEventListener('input', () => {
        const isValid = validateFirstLastName(inputName.value);

        if (isValid) {
            clearErrorName(errorName);
            toggleValidity(inputName);
            toggleCompletion(inputName);
        } else { /* We don't need `toggleCompletion` here, as the 'completed' class is removed for invalid input in the `toggleValidity` function */
            toggleValidity(inputName, false);
            showErrorName(errorName); 
        }
    });
});

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
