let num1;
let num2;
let operator;

document.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    let screen = document.querySelector("#screen");
    
    if (button.classList.contains("number") && operator == undefined) {
        num1 = parseInt(button.textContent);
        screen.textContent = num1;
    }
    else if(button.classList.contains("number")) {
        num2 = parseInt(button.textContent);
        screen.textContent = num2;
    }
    else if (button.classList.contains("operator")) {
        operator = button.textContent;
        screen.textContent = operator;
    }
    else if (button.id === "equal-operator") {
        result = calculate(num1, num2, operator);
        num1 = result;
        screen.textContent = result;
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

    console.log(a);
    console.log(b);
    console.log(operator);
    console.log(result);
    return result;
}

function add(a, b) {
    return a + b;
}