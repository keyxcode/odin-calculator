let num1 = "";
let num2 = "";
let operator = "";

document.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    let calcScreen = document.querySelector("#screen");
    
    if (button.classList.contains("number") && operator == "") {
        calcScreen.textContent += button.textContent;;
    }
    else if(button.classList.contains("number")) {
        calcScreen.textContent += button.textContent;
    }
    else if(button.id === "decimal") {
        if (calcScreen.textContent.includes(".")) return;
        calcScreen.textContent += ".";
    }
    else if (button.classList.contains("operator")) {
        num1 = parseFloat(calcScreen.textContent)
        operator = button.textContent;
        calcScreen.textContent = operator;
    }
    else if (button.id === "equal-operator") {
        num2 = parseFloat(calcScreen.textContent);
        result = calculate(num1, num2, operator);
        num1 = result;
        operator = "";
        calcScreen.textContent = result;
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
            result = a . b;
            break;
        case "/":
            result = a / b;
            break
    }

    return result;
}