let num1 = "";
let num2 = "";
let currentOperator = "";
let chainedOperator = "";

const displayedEquation = document.querySelector("#screen-equation");
const displayedNumber = document.querySelector("#screen-number");

document.querySelectorAll(".number").forEach(button => button.addEventListener('click', () => {
    if (button.id === "decimal" && displayedNumber.textContent.includes(".")) return;
    // This happens after a calculation is made
    if (num1 != "" && currentOperator === "") clear();
    if (displayedNumber.textContent === "0" && button.textContent != ".") displayedNumber.textContent = "";

    displayedNumber.textContent = removeCommasFromNumber(displayedNumber.textContent);
    displayedNumber.textContent += button.textContent;
    displayedNumber.textContent = addCommasToNumber(displayedNumber.textContent);
}))

document.querySelectorAll(".operator").forEach(button => button.addEventListener("click", () => {
    // This case only happens at the beginning or after pressing AC
    if (num1 === "" && num2 === "") {
        num1 = parseFloat(removeCommasFromNumber(displayedNumber.textContent));

        currentOperator = button.textContent;
        displayedEquation.textContent = `${addCommasToNumber(num1)} ${currentOperator}`;
        displayedNumber.textContent = "";
    } else {
        // In this case, num1 is already in memory
        // if there's nothing in the screenNumber, that means user wants to change operator
        if (displayedNumber.textContent === "") {
            currentOperator = button.textContent; 
            displayedEquation.textContent = `${addCommasToNumber(num1)} ${currentOperator}`;
        }
        // otherwise, user is done inputting num2 and wants to chain calculation
        chainedOperator = button.textContent;
        num2 = parseFloat(removeCommasFromNumber(displayedNumber.textContent));
        if (isNaN(num2)) {
            return;
        };

        let result = calculate(num1, num2, currentOperator);
        if (result === "ERROR") {
            showError();
            return;
        }
        displayedEquation.textContent = `${addCommasToNumber(result)} ${chainedOperator}`;
        displayedNumber.textContent = "";
        num1 = result;
        num2 = "";
        currentOperator = chainedOperator;
        chainedOperator = "";
    }
}))

document.querySelector("#equal-operator").addEventListener('click', () => {
    if (currentOperator) num2 = parseFloat(removeCommasFromNumber(displayedNumber.textContent));
    else return;
    if (isNaN(num2)) {
        return;
    };

    let result = calculate(num1, num2, currentOperator);
    if (result === "ERROR") {
        showError();
        return;
    }
    displayedEquation.textContent = `${addCommasToNumber(num1)} ${currentOperator} ${addCommasToNumber(num2)} =`
    displayedNumber.textContent = addCommasToNumber(result);
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
    if (displayedNumber.textContent === "") return;

    displayedNumber.textContent = displayedNumber.textContent.split('').slice(0, -1).join('');
    if (displayedNumber.textContent === "") displayedNumber.textContent = "0";
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
    displayedEquation.textContent = "";
    displayedNumber.textContent = "0";

    document.querySelectorAll("button").forEach(button => {
        button.removeAttribute("disabled");
    })
}

function showError() {
    num1 = "";
    num2 = "";
    currentOperator = "";
    chainedOperator = "";
    displayedEquation.textContent = "";
    displayedNumber.textContent = "ERROR";

    document.querySelectorAll("button").forEach(button => {
        if (button.id === "ac") return
        else button.setAttribute("disabled", "true");
    })
}

function removeCommasFromNumber(number) {
    if (typeof(number) != "string") number = number.toString();
    return number.replace(/\,/g,'');
}

function addCommasToNumber(number) {
    if (typeof(number) != "string") number = number.toString();
    const regexPattern = /(\d)(?=(\d{3})+$)/g;

    if (number.includes(".")) {
        splitNumber = number.split(".");
        wholeNumber = splitNumber[0].replace(regexPattern, "$1,");
        fractionNumber = splitNumber[1];
        return number = `${wholeNumber}.${fractionNumber}`;
    } else {
        return number.replace(regexPattern, "$1,");
    }
}