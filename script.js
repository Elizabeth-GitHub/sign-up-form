const form = document.querySelector('form');
const inputs = [
    { input: document.getElementById('first-name'), error: document.querySelector('#first-name + span.error') },
    { input: document.getElementById('last-name'), error: document.querySelector('#last-name + span.error') }
];

inputs.forEach(({ input, error }) => {
    input.addEventListener('input', () => {
        const isValid = validateFirstLastName(input.value);

        if (isValid) {
            clearError(error);
        } else {
            console.log('Invalid name');
            showError(error);
        }
    });
});

function validateFirstLastName(nameToValidate) {
    const regexNames = /^\p{L}+$/u;
    
    return regexNames.test(nameToValidate);  
}

function showError(errorElement) {
    console.log(errorElement.id);
    errorElement.textContent = `Your ${getNameToCorrect(errorElement.id)} should consist of letters only.`;
    errorElement.className = 'error active';
}

function clearError(errorElement) {
    errorElement.textContent = '';
    errorElement.className = 'error';
}

function getNameToCorrect(nameToTransform) {
    return nameToTransform.split('-')[0].replace('name', ' name');
}
