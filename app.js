const userInput = document.querySelector(".userinput");
const formula = document.querySelector(".formula");
const numButtons = document.querySelectorAll("button[data-number]");
const operatorButtons = document.querySelectorAll("button[data-operator]");
const clearButton = document.querySelector("#clear");
const equalsButton = document.querySelector("#equals");
const dotButton = document.querySelector("#dot");
const deleteButton = document.querySelector("#delete");

document.addEventListener("DOMContentLoaded", handleLoad);
document.addEventListener("keydown", handleKeydown);
clearButton.addEventListener("click", handleClearButton);
equalsButton.addEventListener("click", handleEqualsButton);
dotButton.addEventListener("click", handleDotButton);
deleteButton.addEventListener("click", handleDeleteButton);



let firstOperand;
let secondOperand;
let currentOperator;
let enteredSecondValue = false;
let clearNext = false;
let formulaValue;
let operatorWasPressed = false;
let validKeys = [];
let nonNumberKeys = ["*", "-", "+", "/"];

function handleLoad(e) {
    // userInput.textContent = "0"; //this is a nice to have
    buildValidKeyArray();
}

function handleButtonClick(e) {
    if (clearNext) {
        userInput.textContent = "";
    }
    if (!operatorWasPressed) {
        firstOperand += e.target.innerText;
        clearNext = false;
    } else {
        enteredSecondValue = true;
        if (secondOperand == undefined) {
            userInput.textContent = "";
        }
        secondOperand += e.target.innerText;
        clearNext = false;
    }
    userInput.textContent += e.target.innerText;

}


function handleKeydown(e) {
    let currentButton;
    if (nonNumberKeys.includes(e.key)) {
        currentButton = document.querySelector(`button[data-operator="${e.key}"]`);
    } else if (e.key === "Enter" || e.key === "=") {
        currentButton = document.querySelector("#equals");
    } else if (e.key === "."){
        currentButton = document.querySelector("#dot");
    } else {
        currentButton = document.querySelector(`button[data-number="${e.key}"]`);
    }
    currentButton.click();
    currentButton.classList.toggle("keyclick");
    window.setTimeout(() => {
        currentButton.classList.toggle("keyclick");
    }, 100);


    // if (e.key === "Enter") {
    //     handleEqualsButton(e);
    // }

    // if (!validKeys.includes(e.key)) {
    //     return;
    // } 
    // if (e.key === "*" || e.key === "-" || e.key === "/" || e.key === "+") {
    //     handleOperatorKeyDown(e);
    //     clearNext = true;
    //     return;
    // } else if (e.key === ".") {
    //     handleDotButton(e);
    //     return;
    // } else if (e.key === "Enter") {
    //     handleEqualsButton(e);
    // } else {
    // if (!operatorWasPressed) {
    //     firstOperand += e.key;
    //     clearNext = false;
    // } else {
    //     enteredSecondValue = true;
    //     if (secondOperand == undefined) {
    //         userInput.textContent = "";
    //     }
    //     secondOperand += e.key;
    //     clearNext = false;
    // }
    // userInput.textContent += e.key;
    // }
}


function handleOperatorClick(e) {
    if (enteredSecondValue) {
        formula.textContent = operate(currentOperator, firstOperand, secondOperand) + " " + e.target.innerText;
        handleEqualsButton(e);
    }
    operatorWasPressed = true;
    currentOperator = e.target.innerText;
    firstOperand = Number(userInput.textContent);
    // formula.textContent = `${firstOperand} ${e.key}`;
    formula.textContent = firstOperand + " " + e.target.innerText;
    userInput.textContent = firstOperand;
    clearNext = true;
}

function handleOperatorKeyDown(e) {
    if (enteredSecondValue) {
        formula.textContent = operate(currentOperator, firstOperand, secondOperand) + " " + e.key;
        handleEqualsButton(e);
    }
    operatorWasPressed = true;
    currentOperator = e.key;
    firstOperand = Number(userInput.textContent);
    // formula.textContent = `${firstOperand} ${e.key}`;
    formula.textContent = firstOperand + " " + e.key;
    formula.textContent = formula.textContent.replace("*", "x");
    userInput.textContent = firstOperand;
    clearNext = true;
}

function handleClearButton(e) {
    firstOperand = "";
    secondOperand = "";
    userInput.textContent = "";
    formula.textContent = "";
    clearNext = false;
}

function handleDotButton(e) {
    if (userInput.textContent.includes(".") || userInput.textContent === "") { return };

    userInput.textContent += ".";
}

function handleDeleteButton(e) {
    userInput.textContent = userInput.textContent.substring(0, userInput.textContent.length - 1);
}

function handleEqualsButton(e) {
    if (!enteredSecondValue || firstOperand === "") return; //handle if equals is pushed too early or if nothing there
    secondOperand = Number(userInput.textContent);
    userInput.textContent = operate(currentOperator, firstOperand, secondOperand);
    formula.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
    // formula.textContent = firstOperand + " " + currentOperator + " " + secondOperand + " =";
    if (userInput.textContent === "Infinity") {
        userInput.textContent = "";
        firstOperand = "";
        secondOperand = "";
        formula.textContent = "";
    }
    operatorWasPressed = false;
    enteredSecondValue = false;
}

numButtons.forEach((btn) => {
    btn.addEventListener("click", handleButtonClick);
});

operatorButtons.forEach((btn) => {
    btn.addEventListener("click", handleOperatorClick);
});

function isValidKey(key) {
    return validKeys.includes(key);
}

function buildValidKeyArray() {
    for (let i = 0; i < numButtons.length; i++) {
        validKeys.push(numButtons[i].innerText);
    }

    for (let i = 0; i < operatorButtons.length; i++) {
        validKeys.push(operatorButtons[i].innerText);
    }
    validKeys[validKeys.indexOf("x")] = "*";
    validKeys.push(".");
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "x":
            return +multiply(num1, num2).toFixed(3);
        case "*":
            return +multiply(num1, num2).toFixed(3);
        case "/":
            return +divide(num1, num2).toFixed(3);
        case "+":
            return +add(num1, num2).toFixed(3);
        case "-":
            return +subtract(num1, num2).toFixed(3);
        default:
            return 0;
    }
}



