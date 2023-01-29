let num1 = "";
let num2 = "";
let operator = "";

document.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    let calcScreen = document.querySelector("#screen");
    
    if (button.classList.contains("number") && operator == "") {
        num1 += button.textContent;
        calcScreen.textContent = num1;
    }
    else if(button.classList.contains("number")) {
        num2 += button.textContent;
        calcScreen.textContent = num2;
    }
    else if (button.classList.contains("operator")) {
        operator = button.textContent;
        calcScreen.textContent = operator;
    }
    else if (button.id === "equal-operator") {
        num1 = parseInt(num1);
        num2 = parseInt(num2);
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
            result = add(a, b)
            break;
    }

    return result;
}

function add(a, b) {
    return a + b;
}