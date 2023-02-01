let num1 = "";
let num2 = "";
let operator = "";

document.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    let screenEquation = document.querySelector("#screen-equation");
    let screenNumber = document.querySelector("#screen-number");
    
    if (button.classList.contains("number")) {
        // Only allow 1 decimal symbol
        if (button.id === "decimal" && screenNumber.textContent.includes(".")) return;
        screenNumber.textContent += button.textContent;
    }
    else if (button.classList.contains("operator")) {
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
    }
    else if (button.id === "equal-operator") {
        if (operator) num2 = parseFloat(screenNumber.textContent)
        else return;

        result = calculate(num1, num2, operator);
        screenEquation.textContent = `${num1} ${operator} ${num2} =`
        screenNumber.textContent = result;
    
        num1 = result;
        operator = "";
    }
}))

document.querySelector("#ac").addEventListener('click', () => {
    clear();
})

function calculate(a, b, operator) {
    if (!a && !b && !operator) return 0
    else if (!b || !operator) return a;

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

function clearScreen() {
    document.querySelector("#screen-equation").textContent = "";
    document.querySelector("#screen-number").textContent = "";

    num1 = "";
    num2 = "";
    operator = "";
}