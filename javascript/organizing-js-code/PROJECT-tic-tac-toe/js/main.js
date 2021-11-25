const GameBoard = (() => {
  let board = ["O", "X", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const markField = (index, symbol) => {
    board[index] = symbol;
  };

  return { getBoard, reset, markField };
})();

const DisplayController = (() => {
  toggleDarkMode = () => {
    const body = document.querySelector("body");
    body.classList.toggle("dark-mode");
  };

  const update = () => {
    const gameFields = document.querySelectorAll(".gamefield");
    console.log(GameBoard.getBoard());
    gameFields.forEach((field, index) => {
      field.classList.remove("player-X");
      field.classList.remove("player-O");

      if (GameBoard.getBoard()[index] === "X") {
        field.classList.add("player-X");
      } else if (GameBoard.getBoard()[index] === "O") {
        field.classList.add("player-O");
      }
    });
  };

  const addFieldClickEventListener = () => {
    const gameFields = document.querySelectorAll(".gamefield");
    gameFields.forEach((field) => {
      field.addEventListener("click", (e) => {
        if (
          field.classList.contains("player-O") ||
          field.classList.contains("player-X")
        ) {
          // field already in use
          return;
        }

        const index = field.dataset.index;
        const symbol = Game.getPlayerTurn().getSymbol();
        if (symbol === "X") {
          GameBoard.markField(index, symbol);
          update();
        }
      });
    });
  };

  const restartButton = () => {
    const restartBtn = document.querySelector(".restart-btn");
    restartBtn.addEventListener("click", (e) => {
      Game.restart();
    });
  };

  const toggleDarkModeEventListener = () => {
    const darkModeToggleButton = document.querySelector(".dark-mode-toggle");
    darkModeToggleButton.addEventListener("click", (e) => {
      DisplayController.toggleDarkMode();
      e.target.classList.toggle("on");
    });
  };

  return { toggleDarkMode, toggleDarkModeEventListener, update, addFieldClickEventListener, restartButton };
})();

function Player(name, symbol) {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
}

const Game = (() => {
  let playerTurn;

  const getPlayerTurn = () => playerTurn;

  const init = () => {
    DisplayController.toggleDarkModeEventListener();
    DisplayController.restartButton();
  };

  const start = () => {
    console.log(GameBoard.board);
    DisplayController.update();
    DisplayController.addFieldClickEventListener();
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    playerTurn = player1;
    console.log(getPlayerTurn().getSymbol());
    // waitForPlayerTurn();
    // checkForWinner();
    // nextTurn();
  };

  const restart = () => {
    GameBoard.reset();
    DisplayController.update();
  };

  return { init, start, getPlayerTurn, restart };
})();

Game.init();
Game.start();
