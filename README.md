# Server-Side Calculator <a name="top"></a>

This project is a web-based calculator application that performs basic mathematic operations and stores the history of calculations on the server. The supported operations include addition, subtraction, multiplication, division, percentage calculation, and chain calculations. The user interface is designed to resemble a classic calculator and notebook on a wooden desktop. The familiarity of the calculator provides an easy to use experience.

## Navigation
- [Features](#features)
- [Technologies used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features 

- Operations: Addition, Subtraction, Multiplication, Division
- Percentage calculation
- Chain calculations: Continue calculations using the result of the previous calculation.
- Two step clear functionality: Clear the current input or the entire server calculation history

[Back to Top](#top)
## Technologies Used

- `HTML`: Structure of the Calculator interface
- `CSS`: Styling of the HTML page
- `JavaScript`: Calculator functionality and asynchronous communication with the server
- `Express.js`: Server-side logic to store, modify, and retrieve calculations history
- `Axios`: Promise-based HTTP client for making requests to the server

[Back to Top](#top)
## Getting Started

### Prerequisites

- `Node.js` installed on your machine
- A modern web browser

### Installation

1. Clone this repository to your local machine using powershell(Windows) or Terminal(Mac):

    - CLick the green code button on this repository to get the SSH address and paste it into your terminal after typing:
        ```shell
        git clone
        ```
    - Make sure to set up your SSH key prior.
2. Navigate to the project directory:

    ```shell
    cd server-side-calculator
    ```

3. Install the required dependencies:

    ```shell
    npm install
    ```
4. Start the server:

    ```shell
    npm start
    ```
5. Open your web browser and navigate to [localhost:5000](http://localhost:5000 "Server-Side Calculator") to access the calculator.

### Usage

- Use the numeric and operation buttons on the calculator to perform basic operations.
- Click the `%` button to calculate the percentage of the current number.
- Click the `AC` button to clear the input or `C` to clear the entire server history.
- As you are forming a calculation, it will be displayed in the top-right of the screen.
- The calculation history will be displayed on the "notebook" beside the calculator.

[Back to Top](#top)

### License

Distributed under the MIT License. See `LICENSE` for more Information.
