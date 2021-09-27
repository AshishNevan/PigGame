'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//initial values
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
// let currentScore = 0;

const playerSwitch = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayer = ++activePlayer % 2;
};

// dice roll funtionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generate dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2 display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for '1'
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      playerSwitch();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    console.log(scores);
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (currentScore < 20) {
      //switch to next player
      playerSwitch();
    } else {
      //player wins
      playing = false;
      diceEl.classList.add('hidden');
      currentScore = 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
    }
  }
});

btnNew.addEventListener('click', function () {
  playing = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  if (!player0El.classList.contains('player--active')) {
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
});
