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

// Starting Conditions
const totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Rolling Dice Functionality
btnRoll.addEventListener('click', () => {
  // 1. Generate a random dice number
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice image
  diceEl.src = `./images/dice-${dice}.png`;
  diceEl.classList.remove('hidden');

  // 3. Check for rolled 1: if true, switch to next player
  if (dice !== 1 && dice > 0 && dice < 7) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`score--${activePlayer}`).textContent =
      currentScore;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else if (dice === 1) {
    // Switch to another player
    totalScores[activePlayer] += currentScore;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
});
