// GET DOM ELEMENTS
function getTextSpace()  {
    const textSpace = document.getElementById("answer");
    return textSpace;
}
function getCreditCardValue() {
    const creditCardNumber = document.getElementById("creditCardNumber").value;
    return creditCardNumber;
}
function getCardInputElement() {
    const cardValueInput = document.getElementById("creditCardNumber");
    return cardValueInput;
}
function getResultArea() {
    const resultArea = document.getElementById("answer");
    return resultArea;
}

// CONSTANTS
const cardRegexes = {
    'Visa': /^4[0-9]{12}(?:[0-9]{3})?$/,
    'Mastercard': /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
}

// ACTIONS
function loopAndTestRegexes(regexObject,number) {
    let result = '';
    for (let r in regexObject) {
        let value = regexObject[r];
        if(value.test(number)) result = r;
    }
    if (result === '') return 'invalid';
    return result;
}
function updateScreen(result) {
    const resultArea = getResultArea();
    if(result != 'invalid') {
        resultArea.className = 'alert alert-success';
        setInterval(clearResultArea, 5000);
        return resultArea.textContent = `${result} card detected!`;
    }
    setInterval(clearResultArea, 5000);
    resultArea.className = 'alert alert-danger';
    return resultArea.textContent = "No valid card number recognised.";
}
function matchCreditCardNumberToRegex() {
    const cardNumber = getCreditCardValue(); 
    const result = loopAndTestRegexes(cardRegexes,cardNumber);
    return updateScreen(result);
};
function clearInput() {
    const cardInput = getCardInputElement();
    return cardInput.value = '';
}
function clearResultArea() {
    const resultArea = getResultArea();
    resultArea.className = '';
    return resultArea.textContent = '';
}
function clearInputAndResultArea() {
    clearInput();
    clearResultArea();
}

// EVENTS
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
submitButton.addEventListener('click', matchCreditCardNumberToRegex);
resetButton.addEventListener('click', clearInputAndResultArea);


