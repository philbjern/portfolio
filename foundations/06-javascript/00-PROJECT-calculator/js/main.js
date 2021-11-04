function add(a, b) {
  console.log(a, b);
  return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  let result = a * b;
  return Math.round(result * 10000) / 10000;
}

function divide(a, b) {
  if (b !== 0) {
    let result = a / b;
    return Math.round(result * 10000) / 10000;
  }
  return "ERROR: Can't divide by zero";
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

const calculator = {
  displayValue: "",
  lastDisplayValue: "",
  equationDisplayValue: "",
  firstInput: true,
  lastOperatorUsed: "",
  display: document.querySelector(".current"),
  equationInput: document.querySelector(".equation"),
  pointButton: document.querySelector(".point"),
  init() {
    this.displayValue = "";
    this.equationDisplayValue = "";
    this.updateDisplay();
  },
  addNumber(number) {
    if (this.firstInput) {
      this.firstInput = false;
      this.displayValue = "";
    }
    if (this.displayValue === "0") {
      this.displayValue = "";
    }
    if (this.displayValue.includes(".")) {
      this.pointButton.disabled = true;
    }
    this.displayValue += number;
    this.display.value = this.displayValue;
  },
  delete() {
    this.displayValue = this.displayValue.substr(
      0,
      this.displayValue.length - 1
    );
    if (this.displayValue === "") {
      this.displayValue = "0";
    }
    this.updateDisplay();
  },
  operate(operator) {
    this.lastOperatorUsed = operator;
    this.pointButton.disabled = false;

    if (this.equationDisplayValue !== "") {
      this.equationDisplayValue += operator;
    }
    this.equationDisplayValue += this.displayValue;

    let result;

    if (operator === "+") {
      result = this.computeEquation("add");
    } else if (operator === "-") {
      result = this.computeEquation("subtract");
    } else if (operator === "×") {
      result = this.computeEquation("multiply");
    } else if (operator === "÷") {
      result = this.computeEquation("divide");
    }

    this.equationDisplayValue = result;
    this.displayValue = result;

    this.firstInput = true;
    this.updateDisplay();
  },
  computeEquation(operation) {
    const equation = this.equationDisplayValue;

    let result;
    let operands;

    if (operation === "add") {
      operands = equation.split("+");
      console.log(operands);
      if (operands.length === 1) {
        return operands[0];
      }
      result = add(operands[0], operands[1]);
    } else if (operation === "subtract") {
      operands = equation.split("-");
      if (operands.length === 1) {
        return operands[0];
      }
      result = subtract(operands[0], operands[1]);
    } else if (operation === "multiply") {
      operands = equation.split("×");
      if (operands.length === 1) {
        return operands[0];
      }
      result = multiply(operands[0], operands[1]);
    } else if (operation === "divide") {
      operands = equation.split("÷");
      if (operands.length === 1) {
        return operands[0];
      }
      result = divide(operands[0], operands[1]);
    }
    return result;
  },
  updateDisplay() {
    this.display.value = this.displayValue;
    this.equationInput.value = this.equationDisplayValue;
  },
  equals() {
    this.equationDisplayValue += this.lastOperatorUsed;
    this.equationDisplayValue += this.displayValue;

    if (this.equationDisplayValue.includes("+")) {
      this.operate("+");
    } else if (this.equationDisplayValue.includes("-")) {
      this.operate("-");
    } else if (this.equationDisplayValue.includes("×")) {
      this.operate("×");
    } else if (this.equationDisplayValue.includes("÷")) {
      this.operate("÷");
    }

    this.firstInput = true;
    this.updateDisplay();
  },
  clear() {
    this.displayValue = "";
    this.equationDisplayValue = "";
    this.updateDisplay();
  },
};

calculator.init();

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    calculator.addNumber(e.target.textContent);
  });
});

const operationButtons = document.querySelectorAll(".operation");
operationButtons.forEach((operationBtn) => {
  operationBtn.addEventListener("click", (e) => {
    calculator.operate(e.target.textContent);
  });
});

const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", (e) => {
  calculator.equals();
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", (e) => {
  calculator.clear();
});

const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", (e) => {
  calculator.delete();
});

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "Digit0":
    case "Digit1":
    case "Digit2":
    case "Digit3":
    case "Digit4":
    case "Digit5":
    case "Digit6":
    case "Digit7":
    case "Digit8":
    case "Digit9":
      calculator.addNumber(e.code.substr(e.code.length - 1));
      break;

    case "NumpadAdd":
      calculator.operate("+");
      break;
    case "NumpadSubtract":
    case "Minus":
      calculator.operate("-");
      break;
    case "NumpadDivide":
    case "Slash":
      calculator.operate("÷");
      break;
    case "NumpadMultiply":
      calculator.operate("×");
      break;
    case "NumpadDecimal":
    case "Period":
      calculator.addNumber(".");
      break;

    case "Equal":
    case "Enter":123
      calculator.equals();
      break;

    case "Backspace":
      calculator.delete();
      break;
  }
});
