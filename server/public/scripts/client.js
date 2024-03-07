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
// Calculations object as specified by the instructions (for testing)
let calculations = {
    numOne:0,
    operator:'',
    numTwo:0,
    result:0
}

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

    if(!isNumber) { // For +/-
        if (existingInput.startsWith('-')) {
            inputField.value = existingInput.slice(1);
        }else { // Else add -
            inputField.value = `-${existingInput}`;
        }
    } else { // For appending numbers
        inputField.value = `${existingInput}${input}`;
    }
    console.log(`After:${inputField.value}`);
}

function operate(operatorSymbol) {
    if (submitButton.classList.contains('num-one')) {
        submitButton.classList.remove('num-one');
        submitButton.classList.add('num-two');
        calculations.numOne = inputField.value;
        inputField.value = '';
    } else if (submitButton.classList.contains('num-two')) {
        submitButton.classList.remove('num-two');
        submitButton.classList.add('num-one');
        calculations.numTwo = inputField.value;
        inputField.value = '';
    }
    if (operatorSymbol !== '=') {
        calculations.operator=operatorSymbol;
    } else {
        sendToServer('/calculations', calculations);
    }
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
function sendToServer(url, object) {
    axios.post(url, object).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    });
}

/**
 * GET information from server.
 * @param{url} Address to recieve from
 */
function getFromServer(url) {
    axios.get(url).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    });
}

// Event listeners
// Numbers
oneButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(1, true);
});
twoButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(2, true);
});
threeButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(3, true);
});
fourButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(4, true);
});
fiveButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(5, true);
});
sixButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(6, true);
});
sevenButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(7, true);
});
eightButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(8, true);
});
nineButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(9, true);
});
zeroButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(0, true);
});
decimalButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput('.', true);
})
// Operators
clearButton.addEventListener('click', (event) => {
    event.preventDefault();
    inputField.value = '';
})
positiveNegativeButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(null, false);
})
// Addition
// Subtraction
// Division
// Multiplication
// Submit