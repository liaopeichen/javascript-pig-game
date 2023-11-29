'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Defining Functions
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const gameOverSetting = function () {
  btnRoll.setAttribute('aria-disabled', 'true');
  btnRoll.setAttribute('tabindex', '-1');
  btnRoll.setAttribute('onfocus', 'blur()');
  btnRoll.classList.add('disabled-button');
  btnHold.setAttribute('aria-disabled', 'true');
  btnHold.setAttribute('tabindex', '-1');
  btnHold.setAttribute('onfocus', 'blur()');
  btnHold.classList.add('disabled-button');
};

// Starting Conditions
const totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let gameOver = false;

// Rolling Dice Functionality
btnRoll.addEventListener('click', () => {
  if (!gameOver) {
    // 1. Generate a random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice image
    diceEl.src = `./images/dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1 && dice > 0 && dice < 7) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (dice === 1) {
      // Switch to another player
      switchPlayer();
    }
  } else {
    gameOverSetting();
  }
});

// Holding Score Functionality
btnHold.addEventListener('click', () => {
  if (!gameOver) {
    // 1. Add current score to active player's score
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // 2. Check if player's score is >= 100
    if (totalScores[activePlayer] >= 20) {
      // if true: Finish the game
      gameOver = true;
      gameOverSetting();
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // if false: Switch to another player
      switchPlayer();
    }
  }
});
