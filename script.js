let num1 = "";
let num2 = "";
let operator = "";

document.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    let screenEquation = document.querySelector("#screen-equation");
    let screenNumber = document.querySelector("#screen-number");
    
    if (button.classList.contains("number")) {
        if (button.id === "decimal" && screenNumber.textContent.includes(".")) return;
        screenNumber.textContent += button.textContent;
    }
    else if (button.classList.contains("operator")) {
        num1 = parseFloat(screenNumber.textContent)
        operator = button.textContent;
        screenEquation.textContent = `${num1} ${operator}`;
        screenNumber.textContent = "";
    }
    else if (button.id === "equal-operator") {
        if (operator) num2 = parseFloat(screenNumber.textContent)
        else return;

        result = calculate(num1, num2, operator);
        screenNumber.textContent = result;
        screenEquation.textContent = `${num1} ${operator} ${num2} =`
    
        num1 = result;
        operator = "";
    }
}))

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