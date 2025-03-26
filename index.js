function add(a, b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}
function percentage(a){
    return a/100;
}

let num1 = '',num2 = '',op = null;
let resetDisplay = false;


function operate(){

    if(num1 === '' || num2 === '' || op === null) return;

    let result;

    let n1 = parseFloat(num1);
    let n2 = parseFloat(num2);

    if (op === "/" && n2 === 0) {
        updateDisplay("Error");
        setTimeout(() => {
            clearCalculator();
        }, 1500); 
        return;
    }

    if(op === "+")
        result =  add(n1,n2);
    if(op === '-')
        result =  subtract(n1,n2);
    if(op === 'x')
        result =  multiply(n1,n2);
    if(op === '/')
        result =  divide(n1,n2);
    if(op === '%')
        result =  percentage(n1);


    result = parseFloat(result.toFixed(10));
    updateDisplay(result);

    if (result === 0) {
        num1 = "0";
    } else {
        num1 = result.toString();
    }

    num2 = '';
    op = null;
    resetDisplay = true;
}

function updateDisplay(value) {
    let display = document.getElementById("display");
    display.textContent = value;
}

function addNumber(num) {
    let display = document.getElementById("display");

    if (num === "." && display.textContent.includes(".")) return;

    if (resetDisplay || display.textContent === "ERROR") {
        display.textContent = num;
        resetDisplay = false;
    } else {
        display.textContent = display.textContent === "0" ? num : display.textContent + num;
    }

    if (op === null) {
        num1 = display.textContent;
    } else {
        if (num2 === "") num2 = "0";
        num2 = display.textContent;
    }
}

function addOperator(oper){
    if (num1 === '') return;

    if(op !== null && num2!== '') operate();

    op = oper;
    resetDisplay = true;
}

function clearCalculator() {
    num1 = "";
    num2 = "";
    op = null;
    resetDisplay = false;
    updateDisplay("0");
}

function removeDigit(){
    display = document.getElementById("display");

    number = display.textContent;

    if(number.length === 1){
        display.textContent = "0";
    }
    else{
       display.textContent =  number.slice(0,number.length - 1);
    }

    if(op === null){
        num1 = display.textContent;
    }
    else num2 = display.textContent;

}


document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (!isNaN(key)) {
        addNumber(key);
    } else if (key === ".") {
        addNumber(".");
    } else if (["+", "-", "*", "/"].includes(key)) {
        addOperator(key === "*" ? "x" : key);
    } else if (key === "Enter" || key === "=") {
        operate();
    } else if (key === "Backspace") {
        removeDigit();
    } else if (key === "Escape") {
        clearCalculator();
    }
});
