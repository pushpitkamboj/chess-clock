// This file contains the JavaScript code for the chess clock functionality.

let timer;
let isRunning = false;
let timeLeft1 = 0;
let timeLeft2 = 0;
let currentPlayer = 1;
let inputTime = 0; // Store the input time

const display1 = document.getElementById('display1');
const display2 = document.getElementById('display2');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const timeInput = document.getElementById('timeInput');
const setupDiv = document.getElementById('setup');
const clockDiv = document.getElementById('clock');
const player1Button = document.getElementById('player1');
const player2Button = document.getElementById('player2');
const startClock = document.getElementById('startClock');

function updateDisplay() {
    const minutes1 = Math.floor(timeLeft1 / 60);
    const seconds1 = timeLeft1 % 60;
    display1.textContent = `Player 1: ${String(minutes1).padStart(2, '0')}:${String(seconds1).padStart(2, '0')}`;

    const minutes2 = Math.floor(timeLeft2 / 60);
    const seconds2 = timeLeft2 % 60;
    display2.textContent = `Player 2: ${String(minutes2).padStart(2, '0')}:${String(seconds2).padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (currentPlayer === 1) {
                if (timeLeft1 > 0) {
                    timeLeft1--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    isRunning = false;
                }
            } else {
                if (timeLeft2 > 0) {
                    timeLeft2--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    isRunning = false;
                }
            }
        }, 1000);
    }
}

function switchPlayer(event) {
    if (isRunning && currentPlayer === 1 && event.target.id === 'player1') {
        clearInterval(timer);
        isRunning = false;
        currentPlayer = 2;
        startTimer();
    } else if (isRunning && currentPlayer === 2 && event.target.id === 'player2') {
        clearInterval(timer);
        isRunning = false;
        currentPlayer = 1;
        startTimer();
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function setTime() {
    inputTime = parseInt(timeInput.value); // Store the input time
    if (!isNaN(inputTime) && inputTime > 0) {
        timeLeft1 = inputTime * 60; // Convert minutes to seconds
        timeLeft2 = inputTime * 60; // Convert minutes to seconds
        updateDisplay();
        setupDiv.style.display = 'none';
        clockDiv.style.display = 'block';
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft1 = inputTime * 60; // Reset to the input time
    timeLeft2 = inputTime * 60; // Reset to the input time
    updateDisplay();
}

startButton.addEventListener('click', setTime);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
player1Button.addEventListener('click', (event) => switchPlayer(event));
player2Button.addEventListener('click', (event) => switchPlayer(event));
startClock.addEventListener('click', startTimer);
