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

// POST /calculations
app.post('/calculations', (req, res) => {
  const {numOne, numTwo, operator} = req.body;
  const result = calculate(numOne, numTwo, operator);

  if (typeof result === 'string' && result.startsWith('Error')) {
    res.status(400).send({error: result});
  } else {
    calculations.push({numOne, numTwo, operator, result});
    res.json({result});
  }
});



function calculate (numOne, numTwo, operator) {
 let result;
  switch(operator) {
    case '+':
      result = numOne + numTwo;
      break;
    case '-':
      result = numOne - numTwo;
      break;
    case '*':
      result = numOne * numTwo;
      break;
    case '/':
      result = numTwo !== 0 ? numOne / numTwo :"Error: Division by zero";
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