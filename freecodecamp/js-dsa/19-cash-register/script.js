let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const TENDER = [
  {
    name: 'Pennies',
    value: 0.01
  },
  {
    name: 'Nickels',
    value: 0.05
  },
  {
    name: 'Dimes',
    value: 0.1
  },
  {
    name: 'Quarters',
    value: 0.25
  },
  {
    name: 'Ones',
    value: 1
  },
  {
    name: 'Fives',
    value: 5
  },
  {
    name: 'Tens',
    value: 10
  },
  {
    name: 'Twenties',
    value: 20
  },
  {
    name: 'Hundreds',
    value: 100
  } 
]

const purchaseBtn = document.getElementById('purchase-btn');
const input = document.getElementById('cash');
const changeDueElement = document.getElementById('change-due')
const priceScreen = document.getElementById('price-screen')
const cashDrawerDisplay = document.getElementById('cash-drawer-display')


const displayCid = () => {
  cashDrawerDisplay.innerHTML = `
  <b>Change in drawer:</b>`
  cid.forEach((item, index) => {
    cashDrawerDisplay.innerHTML += `<p>${TENDER[index].name}: $${item[1]}</p>`
  })
}

priceScreen.textContent = `Total: $${price}`
displayCid();

purchaseBtn.addEventListener('click', () => {
  let cash = input.valueAsNumber;
  if (isNaN(cash)) {
    cash = 0;
  }
  if (price > cash) {
    alert('Customer does not have enough money to purchase the item');
  } else if (price === cash) {
    changeDueElement.textContent = "No change due - customer paid with exact cash";    
  } else {
    checkout(cash);
  }
})

const checkout = (cash) => {
  let changeDue = cash - price;
  const cashInDrawer = cid.reduce((acc, item) => acc + item[1], 0)

  if (changeDue.toFixed(2) > cashInDrawer) {
    changeDueElement.textContent = `Status: INSUFFICIENT_FUNDS`;
  } else if (cashInDrawer.toFixed(2) === changeDue.toFixed(2)) {
    changeDueElement.innerHTML = `Status: CLOSED${calculateChangeDue(changeDue)}`;
  } else {
    try {
      changeDueElement.innerHTML = `Status: OPEN${calculateChangeDue(changeDue)}`;
    } catch (err) {
      changeDueElement.innerHTML = `Status: INSUFFICIENT_FUNDS`;
    }
  }
}

const tenderReversed = Object.assign(TENDER).reverse();

const calculateChangeDue = (changeDue) => {
  let res = '';
  let remainder = changeDue.toFixed(2);
  
  cid.reverse().forEach((item, index) => {
    let tenderValue = tenderReversed[index].value;
    if (item[1] !== 0 && (remainder / tenderValue) >= 1) {
      
      let amount = tenderValue * Math.floor(remainder / tenderValue);
      if (amount > item[1]) {
        amount = item[1];
      }
      res += ' ' + item[0] + ': $' + amount + '';
      remainder -= amount;
      remainder = remainder.toFixed(2);
      cid[index][1] -= amount.toFixed(2);
    }
  })
  
  if (remainder != 0) {
    throw "Insufficient funds";
  }
  cid.reverse();
  displayCid();
  return res;
}
