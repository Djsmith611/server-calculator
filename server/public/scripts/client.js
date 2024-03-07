// Global Variables
// Calculator Variables
// Row one
const clearButton = 
document.getElementById('clear-button');

const positiveNegativeButton = 
document.getElementById('positive-negative-button');

const percentageButton = 
document.getElementById('percentage-button');

const divideButton = 
document.getElementById('divide-button');

// Row two
const sevenButton = 
document.getElementById('seven-button');

const eightButton = 
document.getElementById('eight-button');

const nineButton =
document.getElementById('nine-button');

const multiplyButton = 
document.getElementById('multiply-button');

// Row three
const fourButton = 
document.getElementById('four-button');

const fiveButton = 
document.getElementById('five-button');

const sixButton = 
document.getElementById('six-button');

const subtractButton = 
document.getElementById('subtract-button');

// Row four
const oneButton = 
document.getElementById('one-button');

const twoButton = 
document.getElementById('two-button');

const threeButton = 
document.getElementById('three-button');

const additionButton = 
document.getElementById('addition-button');

// Row five
const zeroButton = 
document.getElementById('zero-button');

const decimalButton = 
document.getElementById('decimal-button');

const submitButton = 
document.getElementById('submit-button');

// Display Fields
const inputField = 
document.getElementById('input-field');

const resultDisplay = 
document.getElementById('result-display');

const resultHistory = 
document.getElementById('result-history');

// Calculations object as specified by the 
// instructions (for testing)
let calculations = {
    numOne:0,
    operator:'',
    numTwo:0,
    result:0
}

let isFirstNumber = true;

/**
 * Appends a selected number to the input field
 * @param {number/string} input
 * @param {boolean} isNumber = false
 * need to prevent form submission for buttons
 * that are not the submit button.
 */
function updateInput (input, isNumber = false) {
    let existingInput = inputField.value;

    if(!isNumber) { // For +/-
        if (existingInput.startsWith('-')) {
            inputField.value = existingInput.slice(1);
        }else { // Else add -
            inputField.value = parseFloat(`-${existingInput}`);
        }
        if (isFirstNumber) {
            calculations.numOne = parseFloat(inputField.value);
            console.log(calculations);
        } else {
            calculations.numTwo = parseFloat(inputField.value);
            console.log(calculations);
        }
    } else { // For appending numbers
        inputField.value = parseFloat(`${existingInput}${input}`);
        if (isFirstNumber) {
            calculations.numOne = parseFloat(inputField.value);
            console.log(calculations);
        } else {
            calculations.numTwo = parseFloat(inputField.value);
            console.log(calculations);
        }
    }

}

/**
 * Sends information to the calculations array. 
 * Sends array to the server for calculation 
 * when two numbers and an operator have been input.
 * @param {string} operatorSymbol 
 */
function operate(operatorSymbol) {
    if (calculations.operator === '') {
        calculations.operator = operatorSymbol;
        if(calculations.result === 0) {
          inputField.placeholder = parseFloat(inputField.value);  
        }
        inputField.value = null;
        console.log(calculations);
        isFirstNumber = false;  
    } else {
        calculations.operator = operatorSymbol;
        inputField.value = null;
        console.log(calculations);  
        performCalculation();
        console.log(calculations);
    }
}

/**
 * Sends equation information to server
 * as an object to be parsed through.
 * Object will contain 'numOne:',
 * 'numTwo:', 'result:', and 'operator:'.
 * Calls POST function.
 */
function performCalculation() {
    if ((calculations.numOne !== undefined && 
        calculations.numTwo !== undefined) && 
        calculations.operator !== '') {
        sendToServer('/calculations', calculations)
            .then(result => {
                let calculationResult = parseFloat(result.data.result);
                inputField.placeholder = calculationResult;
                calculations.result = calculationResult;
                console.log(calculations);
                calculations.numOne = calculationResult;
                calculations.numTwo = 0;
                calculations.operator = '';
                isFirstNumber = false;
                inputField.value = null;
            })
            .catch((error => {
                console.error(`Calculation error, ${error}`);
                alert(error);
            }));
    } else {
        return;
    }
}


/**
 * POST information to server.
 * @param {string} url to send to
 * @param {object} object to be sent
 */
function sendToServer(url, object) {
   return axios.post(url, object);
}

/**
 * GET information from server.
 * @param {string} url to recieve from
 */
function getFromServer(url) {
    axios.get(url)
    .then((res) => {
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
});
// Operators
clearButton.addEventListener('click', (event) => {
    event.preventDefault();
    inputField.value = '';
    isFirstNumber = true;
});
positiveNegativeButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateInput(null, false);
});
// Addition
additionButton.addEventListener('click', (event) => {
    event.preventDefault();
    operate('+');
});
// Subtraction
subtractButton.addEventListener('click', (event) => {
    event.preventDefault();
    operate('-');
});
// Division
divideButton.addEventListener('click', (event) => {
    event.preventDefault();
    operate('/');
});
// Multiplication
multiplyButton.addEventListener('click', (event) => {
    event.preventDefault();
    operate('*');
});
// Submit
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    if(!isFirstNumber) {
      performCalculation();  
    }
});