// Global Variables

// Calculator Variables

// Row one
const clearButton = document.getElementById("clear-button");
const positiveNegativeButton = document.getElementById(
  "positive-negative-button"
);

const percentageButton = document.getElementById("percentage-button");
const divideButton = document.getElementById("divide-button");

// Row two
const sevenButton = document.getElementById("seven-button");
const eightButton = document.getElementById("eight-button");
const nineButton = document.getElementById("nine-button");
const multiplyButton = document.getElementById("multiply-button");

// Row three
const fourButton = document.getElementById("four-button");
const fiveButton = document.getElementById("five-button");
const sixButton = document.getElementById("six-button");
const subtractButton = document.getElementById("subtract-button");

// Row four
const oneButton = document.getElementById("one-button");
const twoButton = document.getElementById("two-button");
const threeButton = document.getElementById("three-button");
const additionButton = document.getElementById("addition-button");

// Row five
const zeroButton = document.getElementById("zero-button");
const decimalButton = document.getElementById("decimal-button");
const submitButton = document.getElementById("submit-button");

// Display Fields
const inputField = document.getElementById("input-field");
const numOneDisplay = document.getElementById("num-one");
const numTwoDisplay = document.getElementById("num-two");
const operatorDisplay = document.getElementById("operator");
const resultDisplay = document.getElementById("result");
const resultHistory = document.getElementById("result-history");

// Calculations object as specified by the
// instructions (for testing)
let calculations = {
  numOne: 0,
  operator: "",
  numTwo: 0,
  result: 0,
};

let isFirstNumber = true;

function calculatePercentage(value) {
  if (value === undefined) {
    console.error("Invalid operation.");
    alert("Invalid operation.");
    return undefined;
  }
  return value / 100;
}

function getPercentage() {
  let result;
  if (isFirstNumber) {
    result = calculatePercentage(calculations.numOne);
    if (result !== undefined) {
      calculations.numOne = result;
      inputField.value = result;
      numOneDisplay.innerHTML = `${result}`;
    }
  } else {
    result = calculatePercentage(calculations.numTwo);
    if (result !== undefined) {
      calculations.numTwo = result;
      inputField.value = result;
      numTwoDisplay.innerHTML = `${result}`;
    }
  }
  console.log(calculations);
}

/**
 * Appends a selected number to the input field
 * @param {number/string} input
 * @param {boolean} isNumber = false
 * need to prevent form submission for buttons
 * that are not the submit button.
 */
function updateInput(input, isNumber = false) {
  let existingInput = inputField.value; // Stores the existing input that needs to be updated
  if (clearButton.innerHTML === "C") { // Updates the clear button to display that an All clear is next
    isClear = false;
    clearButton.innerHTML = "AC";
  }
  if (!isNumber) { // Determines if a negative symbol is being removed or added
    if (existingInput.startsWith("-")) {
      inputField.value = existingInput.slice(1);
    } else {
      inputField.value = `-${existingInput}`;
    }
    if (isFirstNumber) { // Updates the necessary number
      calculations.numOne = parseFloat(inputField.value);
      numOneDisplay.innerHTML = `${inputField.value}`;
      console.log(calculations);
    } else {
      calculations.numTwo = parseFloat(inputField.value);
      numTwoDisplay.innerHTML = `${inputField.value}`;
      console.log(calculations);
    }
  } else { // If just a number is being updated
    if (!justCalculated) { // Determines wether the first number will be overriden or not
      // For appending numbers
      inputField.value = parseFloat(`${existingInput}${input}`);
      if (isFirstNumber) {
        calculations.numOne = parseFloat(inputField.value);
        numOneDisplay.innerHTML = `${inputField.value}`;
        console.log(calculations);
      } else {
        calculations.numTwo = parseFloat(inputField.value);
        numTwoDisplay.innerHTML = `${inputField.value}`;
        console.log(calculations);
      }
    } else {
      // For replacing the first number in an equation(ending a chain calculation)
      inputField.value = parseFloat(`${input}`);
      if (isFirstNumber) {
        calculations.numOne = parseFloat(inputField.value);
        numOneDisplay.innerHTML = `${inputField.value}`;
        console.log(calculations);
        justCalculated = false;
      } else {
        calculations.numTwo = parseFloat(inputField.value);
        numTwoDisplay.innerHTML = `${inputField.value}`;
        console.log(calculations);
        justCalculated = false;
      }
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
  calculations.operator = operatorSymbol;
  operatorDisplay.innerHTML = `${operatorSymbol}`;
  numOneDisplay.innerHTML = `${calculations.numOne}`;
  inputField.placeholder = `${calculations.numOne}`;
  inputField.value = "";
  console.log(calculations);
  isFirstNumber = false;
}

let justCalculated = false; // Initialize calculated state

/**
 * Sends equation information to server
 * as an object to be parsed through.
 * Object will contain 'numOne:',
 * 'numTwo:', 'result:', and 'operator:'.
 * Calls POST function.
 */
async function performCalculation() {
  if (
    calculations.numOne !== undefined &&
    calculations.numTwo !== undefined &&
    calculations.operator !== ""
  ) {
    await sendToServer("/calculations", calculations) // Ensures the information is sent and retrieved from the server prior to continuing
      .then((result) => {
        let calculationResult = parseFloat(result.data.result);
        resultDisplay.innerHTML = `=${calculationResult}`;
        inputField.placeholder = calculationResult;
        calculations.result = calculationResult;
        console.log(calculations);
        calculations.numOne = calculationResult;
        calculations.numTwo = 0;
        calculations.operator = "";
        isFirstNumber = true;
        setTimeout(1000);
        inputField.value = "";
        displayHistory();
        numOneDisplay.innerHTML = calculationResult;
        numTwoDisplay.innerHTML = "";
        operatorDisplay.innerHTML = "";
        resultDisplay.innerHTML = "";
        justCalculated = true;
      })
      .catch((error) => {
        console.error(`Calculation error, ${error}`);
        alert(error);
      });
  } else {
    return;
  }
}

/**
 * GET history from server and append it to the DOM
 */
function displayHistory() {
  getFromServer("/calculations")
    .then((response) => {
      let history = response.data;
      resultHistory.innerHTML = "";
      history.forEach(calculation => {
        let item = document.createElement("li");
        item.innerHTML = `
        ${calculation.numOne} 
        ${calculation.operator} 
        ${calculation.numTwo} = 
        ${calculation.result}`;
        resultHistory.appendChild(item);
    });
    })
    .catch((error) => {
      console.error("Failed to fetch history:", error);
    });
}

displayHistory(); // Display History on load

let isClear = false; // Initialize cleared state

function clear() {
  if (isClear) {
    clearHistory();
  } else {
    inputField.value = "";
    inputField.placeholder = 0;
    calculations.numOne = 0;
    calculations.numTwo = 0;
    calculations.operator = "";
    calculations.result = 0;
    resultDisplay.innerHTML = "";
    numOneDisplay.innerHTML = "";
    numTwoDisplay.innerHTML = "";
    operatorDisplay.innerHTML = "";
    isFirstNumber = true;
    isClear = true;
    clearButton.innerHTML = "C";
  }
}

/**
 * DELETE '/calculation' data
 * from server.
 * Displays a message in the history field.
 */
function clearHistory() {
  axios
    .delete("/calculations")
    .then((response) => {
      console.log("History cleared successfuly:", response);
    })
    .catch((error) => {
      console.error("Failed to delete history:", error);
    });
  resultHistory.innerHTML = "<p>History Cleared.</p>";
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
  return axios.get(url);
}

// Event listeners
// Numbers
oneButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateInput(1, true);
});
twoButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateInput(2, true);
});
threeButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateInput(3, true);
});
fourButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateInput(4, true);
});
fiveButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateInput(5, true);
});
sixButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateInput(6, true);
});
sevenButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateInput(7, true);
});
eightButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateInput(8, true);
});
nineButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateInput(9, true);
});
zeroButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateInput(0, true);
});
decimalButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateInput(".", true);
});
// Operators
clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  clear();
});
positiveNegativeButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateInput(null, false);
});
// Addition
additionButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (!isFirstNumber) {
    performCalculation().then(() => {
      operate("+");
    });
  } else {
    operate("+");
  }
});
// Subtraction
subtractButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (!isFirstNumber) {
    performCalculation().then(() => {
      operate("-");
    });
  } else {
    operate("-");
  }
});
// Division
divideButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (!isFirstNumber) {
    performCalculation().then(() => {
      operate("/");
    });
  } else {
    operate("/");
  }
});
// Multiplication
multiplyButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (!isFirstNumber) {
    performCalculation().then(() => {
      operate("*");
    });
  } else {
    operate("*");
  }
});
// Submit
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (!isFirstNumber) {
    performCalculation();
  }
});
// Percent
percentageButton.addEventListener("click", (event) => {
  event.preventDefault();
  getPercentage();
});