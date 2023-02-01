let num1 = "";
let num2 = "";
let operator = "";
let ans = "";

const screenEquation = document.querySelector("#screen-equation");
const screenNumber = document.querySelector("#screen-number");

document.querySelectorAll(".number").forEach(button => button.addEventListener('click', () => {
    if (button.id === "decimal" && screenNumber.textContent.includes(".")) return;
    // if (screenNumber.textContent == "0") screenNumber.textContent = "";
    screenNumber.textContent += button.textContent;
}))

document.querySelectorAll(".operator").forEach(button => button.addEventListener("click", () => {
    operator = button.textContent;
    screenEquation.textContent = `${num1} ${operator}`;

    if (!num1 && !num2) {
        num1 = parseFloat(screenNumber.textContent);

        screenEquation.textContent = `${num1} ${operator}`;
        screenNumber.textContent = "";
    } else if (!num2) {
        num2 = parseFloat(screenNumber.textContent);
        if (!num2) return;
        result = calculate(num1, num2, operator);

        screenEquation.textContent = `${result} ${operator}`;
        screenNumber.textContent = "";
        num1 = result;
        num2 = "";
    } else {
        result = calculate(num1, num2, operator);
        screenEquation.textContent = calculate(num1, num2, operator);
        screenNumber.textContent = "";

        num1 = result;
        num2 = "";
    }
}))

document.querySelector("#equal-operator").addEventListener('click', () => {
    if (operator) num2 = parseFloat(screenNumber.textContent)
    else return;

    result = calculate(num1, num2, operator);
    screenEquation.textContent = `${num1} ${operator} ${num2} =`
    screenNumber.textContent = result;

    num1 = result;
})

document.querySelector("#ac").addEventListener('click', () => {
    clear();
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
            result = a / b;
            break
    }

    return result;
}

function clear() {
    num1 = "";
    num2 = "";
    operator = "";
    screenEquation.textContent = "";
    screenNumber.textContent = "";
}