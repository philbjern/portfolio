function add(a, b) {
  console.log(a, b);
  return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b !== 0) {
    return a / b;
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
  displayValue: '',
  lastDisplayValue: '',
  equationDisplayValue: '',
  equation: [],
  result: '',
  firstInput: true,
  display: document.querySelector('.current'),
  equationInput: document.querySelector('.equation'),
  init() {
    this.displayValue = '';
    this.equationDisplayValue = '';
    this.updateDisplay();
  },
  addNumber(number) {
    if (this.firstInput) {
      this.firstInput = false;
      this.displayValue = '';
    }
    this.displayValue += number;
    this.equationDisplayValue += number;

    this.equation.push(number);

    this.display.value = this.displayValue;
  },
  operate(operator) {
    this.equation.push(operator);
    if (operator === '+') {
      this.computeEquation('add');
    }
    this.equationDisplayValue += operator;
    this.firstInput = true;
    this.updateDisplay();
  },
  computeEquation(operation) {
    const equation = this.equationDisplayValue;
    if (operation === 'add') {
      const operands = equation.split('+');
      if (operands[1] === undefined) {
        return;
      }
      const result = add(operands[0], operands[1]);
      this.result = result;

      this.lastDisplayValue = result;
      this.equationDisplayValue = result;
    }

  },
  updateDisplay() {
    this.display.value = this.displayValue;
    this.equationInput.value = this.equationDisplayValue;
  },
  equals() {
    console.log(this.equation);
    this.displayValue = this.result;
    this.updateDisplay();
  },
  clear() {
    this.displayValue = '';
    this.equationDisplayValue = '';
    this.updateDisplay();
  }
};

calculator.init();

const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
  number.addEventListener('click', (e) => {
    console.log(e.target.textContent);
    calculator.addNumber(e.target.textContent);
  })
});

const operationButtons = document.querySelectorAll('.operation');
operationButtons.forEach((operationBtn) => {
  operationBtn.addEventListener('click', (e) => {
    calculator.operate(e.target.textContent);
  })
});

const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', (e) => {
  calculator.equals();
})

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', (e) => {
  calculator.clear();
})