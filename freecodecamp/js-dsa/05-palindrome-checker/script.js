const inputText = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const resultElement = document.getElementById("result");

checkButton.addEventListener('click', () => {
  const text = inputText.value;
  const sanitizedText = text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  let result;
  if (sanitizedText.length === 0) {
    alert('Please input a value');
  } else {
    if (isPalindrome(sanitizedText)) {
      resultElement.innerText = `${text} is a palindrome`;
    } else {
      resultElement.innerText = `${text} is not a palindrome`;
    }
  }
});

function isPalindrome(text) {
  const length = text.length;
  for (let i = 0; i < length / 2; i++) {
    if (text[i] !== text[length - i - 1]) {
      return false;
    }
  }
  return true;
}