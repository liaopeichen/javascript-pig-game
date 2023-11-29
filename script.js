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
const init = function () {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = Math.round(Math.random());
  gameOver = false;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  btnRoll.classList.remove('disabled-button');
  btnHold.classList.remove('disabled-button');

  if (activePlayer === 0) {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  } else {
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
  }
};

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
let totalScores, currentScore, activePlayer, gameOver;
init();

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
    if (totalScores[activePlayer] >= 100) {
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

// Resetting Game Functionality
btnNew.addEventListener('click', init);
