const userInput = document.querySelector(".userinput");
const formula = document.querySelector(".formula");
const numButtons = document.querySelectorAll("button[data-number]");
const operatorButtons = document.querySelectorAll("button[data-operator]");
const clearButton = document.querySelector("#clear");
const equalsButton = document.querySelector("#equals");


document.addEventListener("keydown", handleKeydown);
clearButton.addEventListener("click", handleClearButton);
equalsButton.addEventListener("click", handleEqualsButton);
document.addEventListener("DOMContentLoaded", handleLoad);


let firstOperand;
let secondOperand;
let currentOperator;
let enteredSecondValue;
let clearNext = false;
let formulaValue;
let operatorWasPressed = false;
let validKeys = [];

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
    if (!validKeys.includes(e.key)){
        return;
    } 
    if (!operatorWasPressed) {
        firstOperand += e.key;
    } else {

        secondOperand += e.key;
    }
    userInput.textContent += e.key;

}


function handleOperatorClick(e) {
    if (enteredSecondValue !== "") {
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

function handleClearButton(e) {
    firstOperand = "";
    secondOperand = "";
    userInput.textContent = "";
    formula.textContent = "";
}

function handleEqualsButton(e) {
    if (!enteredSecondValue || firstOperand === "") return;
    secondOperand = Number(userInput.textContent);
    userInput.textContent = operate(currentOperator, firstOperand, secondOperand);
    // formula.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
    formula.textContent = firstOperand + " " + currentOperator + " " + secondOperand + " =";
    if (userInput.textContent === "Infinity"){
        userInput.textContent = "";
        firstOperand = "";
        secondOperand = "";
        formula.textContent = "";
    } 
    operatorWasPressed = false;
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
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2)
        case "+":
            return add(num1, num2)
        case "-":
            return subtract(num1, num2)
        default:
            return 0;
    }
}



