let price = 1.87;
let cid = [
  ['PENNY', 1.01, 0.01],
  ['NICKEL', 2.05, 0.05],
  ['DIME', 3.1, 0.1],
  ['QUARTER', 4.25, 0.25],
  ['ONE', 90, 1],
  ['FIVE', 55, 5],
  ['TEN', 20, 10],
  ['TWENTY', 60, 20],
  ['ONE HUNDRED', 100, 100]
];

const purchaseBtn = document.getElementById('purchase-btn');
const input = document.getElementById('cash');
const changeDueElement = document.getElementById('change-due')
const priceScreen = document.getElementById('price-screen')
const cashDrawerDisplay = document.getElementById('cash-drawer-display')

priceScreen.textContent = `$${price}`

purchaseBtn.addEventListener('click', () => {
  const cash = input.valueAsNumber;
  if (price > cash) {
    alert('Customer does not have enough money to purchase the item');
  } else if (price === cash) {
    changeDueElement.textContent = "No change due - customer paid with exact cash";    
  } else {
    checkout(cash);
  }
})

const checkout = (cash) => {
  const changeDue = cash - price;
  const cashInDrawer = cid.reduce((acc, item) => acc + item[1], 0);
  if (cashInDrawer < changeDue) {
    changeDueElement.textContent = `Status: INSUFFICIENT_FUNDS`;
  } else if (cashInDrawer === changeDue) {
    changeDueElement.textContent = `Status: CLOSED ` + calculateChangeDue(changeDue);
  } else {
    changeDueElement.textContent = `Status: OPEN ` + calculateChangeDue(changeDue);
  }
}

const calculateChangeDue = (changeDue) => {
  console.log(changeDue);
  let res = ``;
  let remainder = changeDue;
  cid.reverse().forEach((item) => {
    console.log(item[0], item[1], remainder / item[1]);
    if ((item[1] >= item[2]) && (remainder / item[2]) > 1) {
      res += ` ${item[0]}: \$${item[2] * Math.floor(remainder / item[2])} `;
      remainder -= Math.floor(remainder / item[2]) * item[2];
      console.log(remainder);
    }
  })
  return res;
}
