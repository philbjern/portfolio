const GameBoard = (() => {
  board = ['X', 'O', '', '', '', '', '', '', ''];
  return {board};
})();

const DisplayController = (() => {
  toggleDarkMode = () => {
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');
  }
  return { toggleDarkMode }
})();

function Player(name) {
  const getName = () => name;
  return {getName};
}

const Game = (() => {
  const start = () => {
    console.log(GameBoard.board);
  }
  return { start }
})();

Game.start();

const darkModeToggleButton = document.querySelector('.dark-mode-toggle');
darkModeToggleButton.addEventListener('click', (e) => {
  DisplayController.toggleDarkMode();
  e.target.classList.toggle('on')
})