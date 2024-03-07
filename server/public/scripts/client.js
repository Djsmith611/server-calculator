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

/**
 * Sends information to the calculations array. 
 * Sends array to the server for calculation 
 * when two numbers and an operator have been input.
 * @param {string} operatorSymbol 
 */
function operate(operatorSymbol) {
    let currentInput = parseFloat(inputField.value);
    if (isFirstNumber) {
        calculations.numOne = currentInput;
        isFirstNumber = false;
    } else {
        calculations.numTwo = currentInput;
        performCalculation();
    }
    calculations.operator = operatorSymbol;
    inputField.value = '';
}

/**
 * Sends equation information to server
 * as an object to be parsed through.
 * Object will contain 'numOne:',
 * 'numTwo:', 'result:', and 'operator:'.
 * Calls POST function.
 */
function performCalculation () {
    if (calculations.numOne !== 0 && 
        calculations.numTwo !== 0 && 
        calculations.operator !== '') {
        sendToServer('/calculations', calculations)
        .then( result => {
            inputField.value = result.data.result;
            calculations.numOne = result.data.result;
            calculations.numTwo = 0;
            calculations.operator ='';
        }).catch ((error => {
            console.error(`Calculation error, ${error}`);
            alert(error);
        }))
    } else {
        alert('Error: Invalid calculation');
    }
}


/**
 * Recieves Result from server as an object.
 * Object will contain 'firstNumber:', 
 * 'secondNumber:', 'operator:',
 * and 'answer:'.
 * Calls GET function.
 */


/**
 * GET equation history.
 * Calls get function.
 */
function getHistory() {
    getFromServer('/history')
    .then( response => {
        console.log(response.data);
    }).catch( error => {
        console.error('Failed to fetch history:', error);
    });
}

/**
 * POST information to server.
 * @param {string} url to send to
 * @param {object} object to be sent
 */
function sendToServer(url, object) {
    axios.post(url, object)
    .then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    });
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
additionButton.addEventListener('click', (event) => {
    event.preventDefault();
    operate('+');
})
// Subtraction
subtractButton.addEventListener('click', (event) => {
    event.preventDefault();
    operate('-');
})
// Division
divideButton.addEventListener('click', (event) => {
    event.preventDefault();
    operate('/');
})
// Multiplication
multiplyButton.addEventListener('click', (event) => {
    event.preventDefault();
    operate('x');
})
// Submit
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    calculate();
})