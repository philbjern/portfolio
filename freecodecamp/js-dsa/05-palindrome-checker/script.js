const inputText = document.getElementById('text-input');
const checkButton = document.getElementById('check-button');

checkButton.addEventListener('click', () => {
    const text = inputText.value;
    const sanitizedText = text.replace(/[^a-zA-Z]/g, '').toLowerCase();
    let result;
    if (sanitizedText.length === 0) {
        result = 'Please enter a valid text';
    } else {
        result = isPalindrome(sanitizedText);
    }
    alert(result);
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