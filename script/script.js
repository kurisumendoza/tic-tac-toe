'use strict';

const gameBoardContainer = document.getElementById('game-board');
const boardDisplay = document.querySelectorAll('.marker');
const resetScoreBtn = document.querySelector('.score-btn');
const resetBoardBtn = document.querySelector('.board-btn');
const xScore = document.querySelector('.x-score');
const oScore = document.querySelector('.o-score');
const gameResult = document.querySelector('.announce-result');

const gameBoard = (function () {
  const board = Array(9).fill('');
  const winningLines = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];
  let currentMarker = 'x';
  let winner = '';
  let winningCombination = [];
  xScore.textContent = 0;
  oScore.textContent = 0;

  const insertMarker = function (marker, position) {
    if (board[position] === '') board[position] = marker;
  };

  const togglePlayer = function () {
    currentMarker = currentMarker === 'x' ? 'o' : 'x';
  };

  const playerAction = function (position) {
    insertMarker(currentMarker, position);
    checkCombination();
    displayMarker();
    togglePlayer();
  };

  const checkCombination = function () {
    const playerMoves = board.reduce((acc, move, i) => {
      if (move === currentMarker) acc.push(i);
      return acc;
    }, []);

    if (playerMoves.length < 3) return;

    const matchCheck = (function () {
      return winningLines.findIndex((line) =>
        line.every((el) => playerMoves.includes(el))
      );
    })();

    if (matchCheck !== -1) {
      currentMarker === 'x' ? xScore.textContent++ : oScore.textContent++;
      winner = `Player ${currentMarker.toUpperCase()} Wins!`;
      winningCombination = winningLines[matchCheck];
      addHighlight();
      displayWinner();
    }

    if ((playerMoves.length === 5) & (matchCheck === -1)) {
      winner = 'Tie!';
      displayWinner();
    }
  };

  const displayWinner = function () {
    gameResult.textContent = winner;
  };

  const addHighlight = function () {
    boardDisplay.forEach((item) => item.classList.remove('win'));
    winningCombination.forEach((num) => {
      boardDisplay.forEach((item, i) => {
        if (i === num) {
          item.classList.add('win');
        }
      });
    });
  };

  const winnerCheck = function () {
    return winner;
  };

  const resetBoard = function () {
    board.fill('');
    winner = '';
    displayWinner();
    winningCombination = [];
    addHighlight();
    currentMarker = 'x';
  };

  const resetScore = function () {
    xScore.textContent = 0;
    oScore.textContent = 0;
    resetBoard();
    winningCombination = [];
    addHighlight();
    currentMarker = 'x';
  };

  return { board, playerAction, winnerCheck, resetScore, resetBoard };
})();

const displayMarker = function () {
  boardDisplay.forEach((item, i) => {
    if (gameBoard.board[i] === '') {
      item.innerHTML = '';
    } else {
      item.innerHTML = `<p class="marker-${gameBoard.board[i]}">${gameBoard.board[i]}</p>`;
    }
  });
};

resetScoreBtn.addEventListener('click', () => {});

gameBoardContainer.addEventListener('click', (e) => {
  if (gameBoard.winnerCheck() || e.target.textContent) return;
  if (e.target.getAttribute('data-number') !== null) {
    gameBoard.playerAction(e.target.dataset.number);
  }
});
resetBoardBtn.addEventListener('click', () => {
  gameBoard.resetBoard();
  displayMarker();
});
resetScoreBtn.addEventListener('click', () => {
  gameBoard.resetScore();
  displayMarker();
});
