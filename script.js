let num1 = "";
let num2 = "";
let currentOperator = "";
let chainedOperator = "";

const screenEquation = document.querySelector("#screen-equation");
const screenNumber = document.querySelector("#screen-number");

document.querySelectorAll(".number").forEach(button => button.addEventListener('click', () => {
    if (button.id === "decimal" && screenNumber.textContent.includes(".")) return;
    if (num1 != "" && currentOperator === "") clear();
    if (screenNumber.textContent === "0" && button.textContent != ".") screenNumber.textContent = "";
    screenNumber.textContent += button.textContent;
}))

document.querySelectorAll(".operator").forEach(button => button.addEventListener("click", () => {
    screenEquation.textContent = `${num1} ${currentOperator}`;

    if (num1 === "" && num2 === "") {
        num1 = parseFloat(screenNumber.textContent);

        currentOperator = button.textContent;
        screenEquation.textContent = `${num1} ${currentOperator}`;
        screenNumber.textContent = "";
    } else {
        // In this case, num1 is already in memory
        // if there's nothing in the screenNumber, that means user wants to change operator
        if (screenNumber.textContent === "") {
            currentOperator = button.textContent; 
            screenEquation.textContent = `${num1} ${currentOperator}`;
        }

        // otherwise, parse num2, calculate based on currentOperator and save chainedOperator in memory
        chainedOperator = button.textContent;
        num2 = parseFloat(screenNumber.textContent);
        if (isNaN(num2)) {
            return;
        };

        result = calculate(num1, num2, currentOperator);
        if (result === "ERROR") {
            showError();
            return;
        }
        screenEquation.textContent = `${result} ${chainedOperator}`;
        screenNumber.textContent = "";
        num1 = result;
        num2 = "";
        currentOperator = chainedOperator;
        chainedOperator = "";
    }
}))

document.querySelector("#equal-operator").addEventListener('click', () => {
    if (currentOperator) num2 = parseFloat(screenNumber.textContent);
    else return;
    if (isNaN(num2)) {
        return;
    };

    result = calculate(num1, num2, currentOperator);
    if (result === "ERROR") {
        showError();
        return;
    }
    screenEquation.textContent = `${num1} ${currentOperator} ${num2} =`
    screenNumber.textContent = result;
    num1 = result;
    num2 = "";
    currentOperator = "";
})

document.querySelector("#ac").addEventListener('click', () => {
    clear();
})

document.querySelector("#del").addEventListener('click', () => {
    // In this case, this is showing a result, not in the process of inputting a number
    if (num1 && !currentOperator) return;
    if (screenNumber.textContent === "") return;

    screenNumber.textContent = screenNumber.textContent.split('').slice(0, -1).join('');
    if (screenNumber.textContent === "") screenNumber.textContent = "0";
})

function calculate(a, b, operator) {
    if (a === "" && b === "" && !operator) return 0
    else if (b === "" || !operator) return a;

    let result;
    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "x":
            result = a * b;
            break;
        case "/":
            if (b === 0) {
                return "ERROR";
            }
            result = a / b;
            break
    }

    let numDecimal = 10000000;
    result = Math.round(result * numDecimal) / numDecimal;
    return result;
}

function clear() {
    num1 = "";
    num2 = "";
    currentOperator = "";
    chainedOperator = "";
    screenEquation.textContent = "";
    screenNumber.textContent = "0";

    document.querySelectorAll("button").forEach(button => {
        button.removeAttribute("disabled");
    })
}

function showError() {
    num1 = "";
    num2 = "";
    currentOperator = "";
    chainedOperator = "";
    screenEquation.textContent = "";
    screenNumber.textContent = "ERROR";

    document.querySelectorAll("button").forEach(button => {
        if (button.id === "ac") return
        else button.setAttribute("disabled", "true");
    })
}