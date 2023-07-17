// // Get the elements
// const resultElement = document.querySelector(".result");
// const buttons = document.querySelectorAll(".control__btn");

// let currentNumber = "";
// let previousNumber = "";
// let operator = null;

// // Add event listeners to the buttons
// buttons.forEach(button => {
//     button.addEventListener("click", handleClick);
// });

// // Handle button clicks
// function handleClick(event) {
//     const clickedButton = event.target;
//     const buttonValue = clickedButton.textContent;

//     if (isNumber(buttonValue)) {
//         handleNumber(buttonValue);
//     } else if (isOperator(buttonValue)) {
//         handleOperator(buttonValue);
//     } else if (buttonValue === "=") {
//         handleEquals();
//     } else if (buttonValue === "AC") {
//         clearCalculator();
//     }
// }

// // Handle number button clicks
// // function handleNumber(number) {
// //     if (currentNumber === "0") {
// //         currentNumber = number;
// //     } else {
// //         currentNumber += number;
// //     }
// //     updateDisplay();
// // }

// function handleNumber(number) {
//     if (currentNumber === "0") {
//         currentNumber = number;
//     } else if (currentNumber.length < 9) { // Limit to 9 digits
//         currentNumber += number;
//     }
//     updateDisplay();
// }

// // Handle operator button clicks
// function handleOperator(operatorValue) {
//     if (operator !== null) {
//         calculate();
//     }
//     previousNumber = currentNumber;
//     currentNumber = "";
//     operator = operatorValue;
// }

// // Handle equals button click
// function handleEquals() {
//     calculate();
//     operator = null;
// }

// // Perform the calculation
// function calculate() {
//     let result;
//     const previous = parseFloat(previousNumber);
//     const current = parseFloat(currentNumber);
//     if (isNaN(previous) || isNaN(current)) return;

//     switch (operator) {
//         case "+":
//             result = previous + current;
//             break;
//         case "-":
//             result = previous - current;
//             break;
//         case "×":
//             result = previous * current;
//             break;
//         case "÷":
//             result = previous / current;
//             break;
//         default:
//             return;
//     }

//     currentNumber = result.toString();
//     previousNumber = "";
//     updateDisplay();
// }

// // Clear the calculator
// // function clearCalculator() {
// //     currentNumber = "";
// //     previousNumber = "";
// //     operator = null;
// //     updateDisplay();
// // }
// function clearCalculator() {
//     currentNumber = "0";
//     previousNumber = "";
//     operator = null;
//     updateDisplay();
// }

// // Update the display with the current number
// function updateDisplay() {
//     resultElement.textContent = currentNumber;
// }

// // Check if the value is a number
// function isNumber(value) {
//     return !isNaN(value);
// }

// // Check if the value is an operator
// function isOperator(value) {
//     return value === "+" || value === "-" || value === "×" || value === "÷";
// }

// function updateDisplay() {
//     const formattedNumber = formatNumber(currentNumber);
//     resultElement.textContent = formattedNumber;
// }

// // Format the number with space separators
// function formatNumber(number) {
//     const parts = number.split(".");
//     let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
//     let formattedNumber = integerPart;

//     if (parts.length === 2) {
//         formattedNumber += "." + parts[1];
//     }

//     return formattedNumber;
// }

// Get the elements
const resultElement = document.querySelector(".result");
const buttons = document.querySelectorAll(".control__btn");

let currentNumber = "";
let previousNumber = "";
let operator = null;
let decimalPressed = false; // Tracks if the decimal point is already pressed

// Add event listeners to the buttons
buttons.forEach(button => {
    button.addEventListener("click", handleClick);
});

// Handle button clicks


function handleClick(event) {
    const clickedButton = event.target;
    const buttonValue = clickedButton.textContent;

    if (isNumber(buttonValue)) {
        handleNumber(buttonValue);
    } else if (isOperator(buttonValue)) {
        handleOperator(buttonValue);
    } else if (buttonValue === "=") {
        handleEquals();
    } else if (buttonValue === "AC") {
        clearCalculator();
    } else if (buttonValue === ",") {
        handleDecimal();
    } else if (buttonValue === "+/-") {
        changeSign();
    } else if (buttonValue === "%") {
        calculatePercent();
    }
}

// Calculate the percentage of the current number
function calculatePercent() {
    const current = parseFloat(currentNumber);
    if (isNaN(current)) return;

    currentNumber = (current / 100).toString();
    updateDisplay();
}


// Handle number button clicks
// function handleNumber(number) {
//     if (currentNumber === "0" || operator !== null) {
//         currentNumber = number;
//     } else {
//         currentNumber += number;
//     }
//     updateDisplay();
// }

function handleNumber(number) {
    if (currentNumber === "0") {
        currentNumber = number;
    } else if (currentNumber.length < 9) { // Limit to 9 digits
        currentNumber += number;
    }
    updateDisplay();
}

// Handle operator button clicks
function handleOperator(operatorValue) {
    if (operator !== null) {
        calculate();
    }
    previousNumber = currentNumber;
    currentNumber = "";
    operator = operatorValue;
    decimalPressed = false; // Reset decimalPressed when operator is pressed
}

// Handle equals button click
function handleEquals() {
    calculate();
    operator = null;
}

// Handle decimal button click
function handleDecimal() {
    if (!decimalPressed) {
        if (currentNumber === "" || operator !== null) {
            currentNumber = "0.";
        } else {
            currentNumber += ".";
        }
        decimalPressed = true;
        updateDisplay();
    }
}


// Change the sign of the current number
function changeSign() {
    currentNumber = (parseFloat(currentNumber) * -1).toString();
    updateDisplay();
}

// Perform the calculation
function calculate() {
    let result;
    const previous = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    if (isNaN(previous) || isNaN(current)) return;

    switch (operator) {
        case "+":
            result = previous + current;
            break;
        case "-":
            result = previous - current;
            break;
        case "×":
            result = previous * current;
            break;
        case "÷":
            result = previous / current;
            break;
        default:
            return;
    }

    currentNumber = result.toString();
    previousNumber = "";
    decimalPressed = false; // Reset decimalPressed after calculation
    updateDisplay();
}

// Clear the calculator
function clearCalculator() {
    currentNumber = "0";
    previousNumber = "";
    operator = null;
    decimalPressed = false; // Reset decimalPressed when clearing calculator
    updateDisplay();
}

// Update the display with the current number
function updateDisplay() {
    // resultElement.textContent = currentNumber;
    const formattedNumber = formatNumber(currentNumber);
    resultElement.textContent = formattedNumber;
    resultElement.style.fontSize = getFontSize(currentNumber);
}

// Check if the value is a number
function isNumber(value) {
    return !isNaN(value);
}

// Check if the value is an operator
function isOperator(value) {
    return value === "+" || value === "-" || value === "×" || value === "÷";
}

function formatNumber(number) {
    const parts = number.split(".");
    let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    let formattedNumber = integerPart;

    if (parts.length === 2) {
        formattedNumber += "." + parts[1];
    }

    if (number.length > 9) {
        formattedNumber = parseFloat(number).toExponential(2);
        if (formattedNumber.length > 10) {
            formattedNumber = formattedNumber.slice(0, 10);
        }
    }

    return formattedNumber;
}

// function getFontSize(number) {
//     const numDigits = number.replace(".", "").length;

//     if (numDigits === 6) {
//         return "64px";
//     } else if (numDigits === 7) {
//         return "56px";
//     } else if (numDigits === 8) {
//         return "49px";
//     } else if (numDigits === 9) {
//         return "40px";
//     } else {
//         return "72px"; // Default font size
//     }
// }

function getFontSize(number) {
    const numCharacters = number.length;

    if (numCharacters === 6) {
        return "64px";
    } else if (numCharacters === 7) {
        return "56px";
    } else if (numCharacters === 8) {
        return "49px";
    } else if (numCharacters >= 9) {
        return "44px";
    } else {
        return "72px"; // Default font size
    }
}