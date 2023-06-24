const jsConfetti = new JSConfetti();

const GameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const markField = (index, symbol) => {
    board[index] = symbol;
    DisplayController.update();
  };

  const checkForWinner = () => {
    if (
      // horizontal
      (board[0] === "X" && board[1] === "X" && board[2] === "X") ||
      (board[3] === "X" && board[4] === "X" && board[5] === "X") ||
      (board[6] === "X" && board[7] === "X" && board[8] === "X") ||
      // vertical
      (board[0] === "X" && board[3] === "X" && board[6] === "X") ||
      (board[1] === "X" && board[4] === "X" && board[7] === "X") ||
      (board[2] === "X" && board[5] === "X" && board[8] === "X") ||
      // diagonal
      (board[0] === "X" && board[4] === "X" && board[8] === "X") ||
      (board[6] === "X" && board[4] === "X" && board[2] === "X")
    ) {
      if (Game.getPlayer1().getSymbol() === "X") {
        return Game.getPlayer1();
      } else {
        return Game.getPlayer2();
      }
    } else if (
      // horizontal
      (board[0] === "O" && board[1] === "O" && board[2] === "O") ||
      (board[3] === "O" && board[4] === "O" && board[5] === "O") ||
      (board[6] === "O" && board[7] === "O" && board[8] === "O") ||
      // vertical
      (board[0] === "O" && board[3] === "O" && board[6] === "O") ||
      (board[1] === "O" && board[4] === "O" && board[7] === "O") ||
      (board[2] === "O" && board[5] === "O" && board[8] === "O") ||
      // diagonal
      (board[0] === "O" && board[4] === "O" && board[8] === "O") ||
      (board[6] === "O" && board[4] === "O" && board[2] === "O")
    ) {
      if (Game.getPlayer2().getSymbol() === "O") {
        return Game.getPlayer2();
      } else {
        return Game.getPlayer1();
      }
    }
    return false;
  };

  return {
    getBoard,
    reset,
    markField,
    checkForWinner,
  };
})();

const DisplayController = (() => {
  const toggleDarkMode = () => {
    const body = document.querySelector("body");
    body.classList.toggle("dark-mode");
  };

  const update = () => {
    const gameFields = document.querySelectorAll(".gamefield");
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
          Game.nextTurn();
        }
      });
    });
  };

  const restartButton = () => {
    const restartBtn = document.querySelector(".restart-btn");
    restartBtn.addEventListener("click", (e) => {
      Game.start();
    });
  };

  const addToggleDarkModeEventListener = () => {
    const darkModeToggleButton = document.querySelector(".dark-mode-toggle");
    darkModeToggleButton.addEventListener("click", (e) => {
      DisplayController.toggleDarkMode();
      e.target.classList.toggle("on");
    });
  };

  const setMessage = (text) => {
    const messageDiv = document.querySelector(".message");
    messageDiv.textContent = text;
  };

  const showEndGameWindowWithMessage = (msg) => {
    const endGameWindowWrapperElement = document.querySelector('.end-game-message-wrapper');
    const endGameWindowElement = document.querySelector('.end-game-message');

    endGameWindowElement.textContent = msg;
    endGameWindowWrapperElement.classList.remove('hidden');
    endGameWindowWrapperElement.addEventListener('click', (e) => {
      endGameWindowWrapperElement.classList.add('hidden');
    });
  };


  return {
    toggleDarkMode,
    addToggleDarkModeEventListener,
    update,
    addFieldClickEventListener,
    restartButton,
    setMessage,
    showEndGameWindowWithMessage,
  };
})();

function Player(name, symbol) {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
}

const Game = (() => {
  let player1;
  let player2;
  let playerTurn;

  const getPlayer1 = () => player1;

  const getPlayer2 = () => player2;

  const getPlayerTurn = () => playerTurn;

  const setPlayerTurn = (player) => {
    playerTurn = player;
  };

  const init = () => {
    DisplayController.addToggleDarkModeEventListener();
    DisplayController.restartButton();
    DisplayController.addFieldClickEventListener();
  };

  const setPlayers = () => {
    player1 = Player("Player", "X");
    player2 = Player("Computer", "O");
    changePlayer(player1);
  };

  const start = () => {
    GameBoard.reset();
    DisplayController.update();
    setPlayers();
  };

  const changePlayer = (player) => {
    setPlayerTurn(player);
    DisplayController.setMessage(`${playerTurn.getName()} turn`);
  };

  const nextTurn = () => {
    let winner;
    if (GameBoard.checkForWinner() === player1) {
      // Game ends
      // Player1 wins
      winner = player1;
      // Set to disable further marking of fields
      setPlayerTurn(player2);
      DisplayController.setMessage(`${winner.getName()} wins!`);
      playerWins();
    } else {
      changePlayer(player2);
      AITurn();
      setTimeout(() => {
        if (GameBoard.checkForWinner() === player2) {
          // AI wins
          winner = player2;
          // Set to disable further marking of fields
          setPlayerTurn(player2);
          AIwins();
        }
      }, 501);
    }
  };

  const AITurn = () => {
    console.log("AI turn");
    setTimeout(() => {
      const board = GameBoard.getBoard();
      let indexes = [];
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          indexes.push(i);
        }
      }
      if (indexes.length > 0) {
        let move = indexes[Math.floor(Math.random() * indexes.length)];
        GameBoard.markField(move, getPlayerTurn().getSymbol());
        changePlayer(player1);
      } else {
        DisplayController.setMessage(`No more moves, game over`);
      }
    }, 500);
  };

  return {
    init,
    start,
    getPlayerTurn,
    getPlayer1,
    getPlayer2,
    start,
    nextTurn,
  };
})();

const playerWins = () => {
  const msg = `You win! 💪🥳🎉`;
  jsConfetti.addConfetti();
  DisplayController.setMessage('Player wins!');
  DisplayController.showEndGameWindowWithMessage(msg);
}


const AIwins = () => {
  const msg = `Computer wins!`;
  DisplayController.setMessage(msg);
  DisplayController.showEndGameWindowWithMessage(msg + ' 🤖');
}

Game.init();
Game.start();
