const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = [];


// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {
  res.json(calculations);
});

/**
 * POST '/calculations'
 * recieves an object containing numOne, numTwo, and operator
 * Pushes data for calculation, then returns the result.
 */
app.post('/calculations', (req, res) => {
  let {numOne, numTwo, operator} = req.body;

  let result = calculate(numOne, numTwo, operator);

  if (typeof result === 'string' && result.startsWith('Error')) {
    res.status(400).json({error: result});
  } else {
    calculations.push({numOne, numTwo, operator, result});
    res.status(201).json({result});
  }
});


/**
 * Calculates the provided equation
 * @param {Number} numOne 
 * @param {Number} numTwo 
 * @param {String} operator 
 * @returns the result of the equation
 */
function calculate (numOne, numTwo, operator) {
 let result;
 let numOneNum = parseFloat(numOne);
 let numTwoNum = parseFloat(numTwo);
  switch(operator) {
    case '+':
      result = numOneNum + numTwoNum;
      break;
    case '-':
      result = numOneNum - numTwoNum;
      break;
    case '*':
      result = numOneNum * numTwoNum;
      break;
    case '/':
      result = numTwoNum !== 0 ? numOneNum / numTwoNum :"Error: Division by zero";
      break;
    default:
      return 'Error: Invalid operator';
  }
  return result;
}


// Moved bears out of harm's way.
// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;