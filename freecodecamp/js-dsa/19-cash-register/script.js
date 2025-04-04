let price = 1.87;
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

const purchaseBtn = document.getElementById('purchase-btn');
const input = document.getElementById('cash');
const changeDueElement = document.getElementById('change-due')

purchaseBtn.addEventListener('click', () => {
  const cash = input.valueAsNumber;
  if (price > cash) {
    alert('Customer does not have enough money to purchase the item');
  } else if (price === cash) {
    changeDueElement.textContent = "No change due - customer paid with exact cash";    
  } else {
    calculateChangeDue(cash);
  }
})

const calcuateChangeDue = (cash) => {

}