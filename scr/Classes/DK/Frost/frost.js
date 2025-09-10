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

let isRemoveMode = false;

function addButton() {
    const select = document.getElementById('imageSelect');
    const imageUrl = select.value;
    if (!imageUrl) {
        alert('Please select an image.');
        return;
    }

    const button = document.createElement('button');
    button.className = 'image-button';
    button.style.backgroundImage = `url(${imageUrl})`;
    button.onclick = function() {
        if (isRemoveMode) {
            button.remove();
            toggleRemoveMode(); // Reset remove mode after deletion
        }
        // Add other click functionality here if needed
    };

    const container = document.getElementById('buttonContainer');
    container.appendChild(button);
}

function toggleRemoveMode() {
    isRemoveMode = !isRemoveMode;
    const removeButton = document.getElementById('removeButton');
    removeButton.classList.toggle('active', isRemoveMode);
}