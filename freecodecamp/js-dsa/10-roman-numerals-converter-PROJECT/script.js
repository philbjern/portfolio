const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const romanTable = {
  currentItem: 0,
  items: [
    {
      roman: "M",
      decimal: 1000,
    },
    {
      roman: "CM",
      decimal: 900,
    },
    {
      roman: "D",
      decimal: 500,
    },
    {
      roman: "CD",
      decimal: 400,
    },
    {
      roman: "C",
      decimal: 100,
    },
    {
      roman: "XC",
      decimal: 90,
    },
    {
      roman: "L",
      decimal: 50,
    },
    {
      roman: "XL",
      decimal: 40,
    },
    {
      roman: "X",
      decimal: 10,
    },
    {
      roman: "IX",
      decimal: 9,
    },
    {
      roman: "V",
      decimal: 5,
    },
    {
      roman: "IV",
      decimal: 4,
    },
    {
      roman: "I",
      decimal: 1,
    },
  ],
  reset() {
    this.currentItem = 0;
  },
  getNextItem() {
    if (this.currentItem === 0) {
      this.currentItem++;
      return this.items[0];
    }
    if (this.currentItem > this.items.length) {
      this.reset();
      return null;
    }
    return this.items[this.currentItem++];
  },
};

const convertToRoman = (number) => {
  let numberInt = parseInt(number);
  let result = "";

  const remainders = [];
  const numbers = [];

  let romanTableItem = romanTable.getNextItem();

  while (numberInt > 0) {
    if (numberInt < romanTableItem.decimal) {
      romanTableItem = romanTable.getNextItem();
      continue;
    } else {
      const quotient = Math.floor(numberInt / romanTableItem.decimal);
      numbers.push(numberInt);
      const remainder = numberInt % romanTableItem.decimal;
      remainders.push(remainder);

      for (let i = 0; i < quotient; i++) {
        result += romanTableItem.roman;
      }

      numberInt = remainder;
      if (numberInt === 1) {
        result += "I";
        break;
      }
      romanTableItem = romanTable.getNextItem();
    }
  }
  romanTable.reset();

  return result;
};

const validateInput = (input) => {
  const inputInt = parseInt(input);
  if (!input || isNaN(parseInt(input))) {
    output.textContent = "Please enter a valid number";
    return false;
  } else if (inputInt <= -1) {
    output.textContent = "Please enter a number greater than or equal to 1";
    return false;
  } else if (inputInt >= 4000) {
    output.textContent = "Please enter a number less than or equal to 3999";
    return false;
  }
  return true;
};

convertBtn.addEventListener("click", () => {
  if (validateInput(numberInput.value)) {
    output.textContent = convertToRoman(numberInput.value);
  }
});

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (validateInput(numberInput.value)) {
      output.textContent = convertToRoman(numberInput.value);
    }
  }
});
