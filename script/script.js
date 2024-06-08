'use strict';

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
  let hasWinner;

  const insertMarker = function (marker, position) {
    board[position] = marker;
  };

  const togglePlayer = function () {
    currentMarker = currentMarker === 'x' ? 'o' : 'x';
  };

  const playerAction = function () {
    const action = Number(
      prompt('Enter the position where you want to place your marker')
    );

    insertMarker(currentMarker, action);
    checkCombination();
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
      console.log(`Player ${currentMarker.toUpperCase()} Wins!`);
      hasWinner = true;
    }
  };

  const playGame = function () {
    while (!hasWinner) {
      playerAction();
      togglePlayer();
      console.log(board);
    }
  };

  return { playGame };
})();

gameBoard.playGame();
