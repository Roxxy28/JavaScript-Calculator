// DOM selectors
const displayResult = document.getElementById("result");
const btnClear = document.getElementById("btnClear");
const btnEqual = document.getElementById("btnEqual");
const btnValue = document.querySelectorAll(".btnValue");
const btnOperator = document.querySelectorAll(".btnOperator");
const dotValue = document.getElementById("dotValue");

let valueOne = "";
let valueTwo = "";
let operatorValue = "";
let resultValue = 0;
let isValueOneActive = true;
let isValueTwoActive = false;
let isCalculatorActive = true;

const operatorArr = ["+", "/", "-", "*"];
const numberArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

const add = function (a, b) {
    resultValue = a + b;
    displayResult.value = resultValue;
};

const subtract = function (a, b) {
    resultValue = a - b;
    displayResult.value = resultValue;
};

const multiply = function (a, b) {
    resultValue = a * b;
    displayResult.value = resultValue;
};

const divide = function (a, b) {
    if (a % b !== 0) {
        resultValue = (a / b).toFixed(6);
        displayResult.value = resultValue;
    } else {
        resultValue = a / b;
        displayResult.value = resultValue;
    }
};

const operate = function (operator, value1, value2) {
    if (operator == "+") {
        add(value1, value2);
    } else if (operator == "-") {
        subtract(value1, value2);
    } else if (operator == "*") {
        multiply(value1, value2);
    } else {
        divide(value1, value2);
    }
    valueOne = resultValue;
    valueTwo = "";
    isValueOneActive = false;
    isValueTwoActive = true;
};

const init = function () {
    valueOne = "";
    valueTwo = "";
    isValueOneActive = true;
    isValueTwoActive = false;
    resultValue = 0;
    operatorValue = "";
    displayResult.value = "";
    isCalculatorActive = true;
    removeDisabledAttribute();
};

const removeLastCharacter = function () {
    let slicedValue = displayResult.value.slice(-1);

    if (!operatorArr.some((operator) => slicedValue.includes(operator))) {
        let removeChar = displayResult.value.slice(0, -1);
        displayResult.value = removeChar;
    }
};

const toggleActiveUser = function () {
    isValueOneActive = !isValueOneActive;
    isValueTwoActive = !isValueTwoActive;
};

const removeDisabledAttribute = function () {
    if (dotValue.hasAttribute("disabled")) {
        dotValue.removeAttribute("disabled");
    }
};

const setDisplayValue = function (nodeValue) {
    displayResult.value += nodeValue;
};

const setButtonValue = function (nodeValue) {
    if (isCalculatorActive) {
        setDisplayValue(nodeValue);

        if (isValueOneActive) {
            valueOne += nodeValue;
            valueOne.includes(".") ? dotValue.setAttribute("disabled", "") : "";
        } else {
            valueTwo += nodeValue;
            valueTwo.includes(".") ? dotValue.setAttribute("disabled", "") : "";
        }
    }
};

const setOperatorValue = function (nodeValue) {
    if (displayResult.value !== "") {
        isCalculatorActive = true;
        if (operatorValue !== "") {
            operate(operatorValue, +valueOne, +valueTwo);
            removeDisabledAttribute();
            operatorValue = nodeValue;
            setDisplayValue(nodeValue);
        } else {
            setDisplayValue(nodeValue);
            removeDisabledAttribute();
            operatorValue = nodeValue;
            toggleActiveUser();
        }
    }
};

const useEqualButton = function () {
    if (operatorValue !== "" && valueOne !== "" && valueTwo !== "") {
        operate(operatorValue, +valueOne, +valueTwo);
        removeDisabledAttribute();
        isCalculatorActive = false;
    }
};

btnValue.forEach((node) => {
    node.addEventListener("click", () => {
        setButtonValue(node.value);
    });
});

btnOperator.forEach((node) => {
    node.addEventListener("click", () => {
        setOperatorValue(node.value);
    });
});

btnEqual.addEventListener("click", () => {
    useEqualButton();
});

btnClear.addEventListener("click", () => {
    init();
});

document.addEventListener("keyup", (e) => {
    if (operatorArr.some((operator) => e.key.includes(operator))) {
        setOperatorValue(e.key);
    } else if (e.key === "Enter") {
        useEqualButton();
    } else if (numberArr.some((number) => e.key.includes(number))) {
        setButtonValue(e.key);
    } else if (e.key === "Backspace") {
        removeLastCharacter();
    } else if (e.key === "Delete") {
        init();
    }
});