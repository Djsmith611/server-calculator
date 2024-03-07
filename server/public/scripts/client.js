// Global Variables
// Calculator Variables
// Row one
const clearButton = document.getElementById('clear-button');
const positiveNegativeButton = document.getElementById('positive-negative-button');
const percentageButton = document.getElementById('percentage-button');
const divideButton = document.getElementById('divide-button');
// Row two
const sevenButton = document.getElementById('seven-button');
const eightButton = document.getElementById('eight-button');
const nineButton = document.getElementById('nine-button');
const multiplyButton = document.getElementById('multiply-button');
// Row three
const fourButton = document.getElementById('four-button');
const fiveButton = document.getElementById('five-button');
const sixButton = document.getElementById('six-button');
const subtractButton = document.getElementById('subtract-button');
// Row four
const oneButton = document.getElementById('one-button');
const twoButton = document.getElementById('two-button');
const threeButton = document.getElementById('three-button');
const additionButton = document.getElementById('addition-button');
// Row five
const zeroButton = document.getElementById('zero-button');
const decimalButton = document.getElementById('decimal-button');
const submitButton = document.getElementById('submit-button');
// Display Fields
const inputField = document.getElementById('input-field'); // Input type number
const resultDisplay = document.getElementById('result-display');
const resultHistory = document.getElementById('result-history');
/**
 * Appends a selected number to the input field
 * @param{any} input
 * @param{boolean} isNumber = false
 * need to prevent form submission for buttons
 * that are not the submit button.
 */
function updateInput (input, isNumber = false) {
    let existingInput = inputField.value;
    console.log(`Before:${existingInput}`);
    //if(isNumber === false) { // For +/-
        //if (existingInput.includes('-')){
            // Remove -
        //}else { // Else add -
            //inputField.value = `${input}${existingInput}`;
        //}
    //} else {
        inputField.value = `${existingInput}${input}`;
    //}
    console.log(`After:${inputField.value}`);
}

//updateInput('-', false);
//updateInput(1, true);
//updateInput(0, true);
//updateInput(0, true);

/**
 * Sends equation information to server
 * as an object to be parsed through.
 * Object will contain 'firstNumber:',
 * 'secondNumber:', and 'operator:'.
 * Calls POST function.
 */

/**
 * Recieves Result from server as an object.
 * Object will contain 'firstNumber:', 'secondNumber:', 'operator:',
 * and 'answer:'.
 * Calls GET function.
 */

/**
 * Submits form calling the send and recieve functions
 * for equations.
 */

/**
 * GET equation history.
 * Calls get function.
 */

/**
 * POST information to server.
 * @param{url} Address to send to
 * @param{object} Data to be sent
 */

/**
 * GET information from server.
 * @param{url} Address to recieve from
 */

// Event listeners
// Numbers
oneButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(1);
});
twoButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(2);
});
threeButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(3);
});
fourButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(4);
});
fiveButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(5);
});
sixButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(6);
});
sevenButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(7);
});
eightButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(8);
});
nineButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(9);
});
zeroButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(0);
});
decimalButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput('.');
})
// Operators
clearButton.addEventListener('click', (event) => {
    event.preventDefault();
    inputField.value = '';
})
// Addition
// Subtraction
// Division
// Multiplication
// Submit