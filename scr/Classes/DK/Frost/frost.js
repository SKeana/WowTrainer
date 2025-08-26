let startTime;
let timerInterval;
const sampleText = document.getElementById('sampleText').textContent;
const inputText = document.getElementById('inputText');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');

function startTest() {
    inputText.value = '';
    inputText.disabled = false;
    inputText.focus();
    startTime = new Date();
    timerDisplay.textContent = 'Time: 0s';
    wpmDisplay.textContent = 'WPM: 0';
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    inputText.addEventListener('input', checkInput);
}

function updateTimer() {
    const currentTime = new Date();
    const seconds = Math.floor((currentTime - startTime) / 1000);
    timerDisplay.textContent = `Time: ${seconds}s`;
}

function checkInput() {
    const typedText = inputText.value;
    if (typedText === sampleText) {
        clearInterval(timerInterval);
        inputText.disabled = true;
        calculateWPM();
    }
}

function calculateWPM() {
    const endTime = new Date();
    const timeInMinutes = (endTime - startTime) / 1000 / 60;
    const wordCount = sampleText.split(' ').length;
    const wpm = Math.round(wordCount / timeInMinutes);
    wpmDisplay.textContent = `WPM: ${wpm}`;
}