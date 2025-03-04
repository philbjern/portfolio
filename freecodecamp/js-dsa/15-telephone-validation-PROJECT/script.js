const userInput = document.getElementById("user-input")
const checkBtn = document.getElementById("check-btn")
const clearBtn = document.getElementById("clear-btn")
const resultsDiv = document.getElementById("results-div")


const validateNumber = (numberStr) => {
  let matchFound = false;
  let hasCountryCode = false;
  let numberLength = 0;

  const regex = /(-?[0-9] |[0-9]\()?( )?(\()?(\d+)(\)|-| )?( )?(\d+)(-|\)| )?(\d+)/;
  const result = numberStr.replace(regex, (_match, countryCode, space, par1, num1, par2, g3, num2, g4, num3) => {

    if (numberStr.includes('!')) {
      matchFound = false;
      return;
    }

    console.log(countryCode);
    if (countryCode) {
      countryCode = countryCode.replace(/\s+/g, '');
      if (countryCode.includes("(")) {
        countryCode = countryCode.replace("(", "");
        par1 = "(";
      }

      if (countryCode !== '1') {
        console.log('Country code invalid: ' + countryCode)
        matchFound = false;
        return;
      }
    } 

    if (par1 || par2){
    console.log("Parentesies detected: ", par1, par2)
      if (par1 === "(" && par2 !== ")" || par2 === ")" && par1 !== "(") {
          matchFound = false;
          return;
      }
    }
    
    numberLength = num1.length + num2.length + num3.length;
    if (numberLength != 10) {
      console.error('Number length is not 10 digits')
      console.log(num1, num2, num3)
      console.log("numberLength: " + numberLength)
      matchFound = false;
      return;
    }
  
    matchFound = true;
  })

  if (matchFound) {
    resultsDiv.textContent = `Valid US number: ${numberStr}`
    console.log(`Valid US number: ${numberStr}`);
  } else {
    resultsDiv.textContent = `Invalid US number: ${numberStr}`
    console.log(`Invalid US number: ${numberStr}`);
  }
}


const isEmpty = (str) => {
  return str === '';
}


window.onload = () => {
  checkBtn.addEventListener('click', (e) => {
    const inputValue = userInput.value;

    if (isEmpty(inputValue)) {
      alert("Please provide a phone number")
      return;
    }
    validateNumber(inputValue);
  })

  clearBtn.addEventListener('click', e => {
    resultsDiv.textContent = '';
  })
}