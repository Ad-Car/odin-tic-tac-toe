function createGrid() {
	let occupiedSquares = 0;
	let grid = Array(9).fill(' ');
	const increaseSquares = () => occupiedSquares++;
	const getOccupiedSquares = () => occupiedSquares;
	return { grid, increaseSquares, getOccupiedSquares };
}

function createPlayer(name, marker) {
	let score = 0;
	const getScore = () => score;
	const increaseScore = () => score++;
	return { name, marker, getScore, increaseScore  };
}

function createScoreboard() {
	let round = 1;
	const getRound = () => round;
	const nextRound = () => round++;
	return { getRound, nextRound };
}

function createPlayerToggle() {
	let currentPlayer = 'player1';

	const getCurrentPlayer = () => {
		return currentPlayer;
	}
	const togglePlayer = () => {
		currentPlayer = (currentPlayer === 'player1') ? 'player2': 'player1';
		displayActivePlayer(currentPlayer);	
	}
		return { getCurrentPlayer, togglePlayer }
}

function drawGrid() {
	const existingCells = document.querySelectorAll(".cell");
	if (existingCells ) {
		existingCells.forEach( cell => {
			cell.remove();
		})
	};

	const gridContainer = document.querySelector(".grid-container");
	for (i = 0; i < 9; i++) {
		const cell = document.createElement("div");
		gridContainer.appendChild(cell);
		cell.setAttribute("id", `cell-${i}`);
		cell.classList.add("cell");
		document.getElementById(`cell-${i}`).textContent = gameBoard.grid[i];
		cell.addEventListener("click", () => {
			let cellNo = (cell.id).slice(-1);
			placeMarker(cellNo);
		});
	}
}

function drawScoreboard() {
	let existingMessages = document.querySelector(".messages");
	if (existingMessages) {
		existingMessages.remove();
	}

	const messageContainer = document.querySelector(".scoreboard-message-container");

	const messages = document.createElement("div");
	messages.classList.add("messages");
	messageContainer.appendChild(messages);

	const scoreboardContainer = document.querySelector(".scoreboard-container");

	let existingHolders = document.querySelectorAll(".scoreboard-holder")
	if (existingHolders) {
	existingHolders.forEach( holder => {
		holder.remove()
	})
  }

	for (i = 0; i < 3; i++) {
		const holder = document.createElement("div");
		scoreboardContainer.appendChild(holder);
		holder.setAttribute("id", `scoreboard-holder-${i}`);
		holder.classList.add("scoreboard-holder");
	}
}

function drawControls() {
	let existingButtons = document.querySelectorAll(".control-button");
	if (existingButtons) {
		existingButtons.forEach( button => {
			button.remove();
		})
	}

	const controlsContainer = document.querySelector(".controls-container");
	const controls = document.createElement("div");
	const enterPlayersButton = document.createElement("button");
	enterPlayersButton.innerText = "Enter players";
	const resetButton = document.createElement("button");
	resetButton.innerText = "Reset";

	controlsContainer.appendChild(resetButton);
	resetButton.classList.add("control-button")
	controlsContainer.appendChild(enterPlayersButton);
	enterPlayersButton.classList.add("control-button")
	
	resetButton.addEventListener("click", () => {
		window.location.reload()
	});

	const enterPlayersDialog = document.getElementById("enterPlayersDialog");

	enterPlayersButton.addEventListener("click", () => {
		enterPlayersDialog.showModal();
	});

	enterPlayersDialog.addEventListener("close", () => {
		const result = enterPlayersDialog.returnValue;
		if (result === "add") {
			const formData = new FormData(enterPlayersDialog.querySelector('form'));
			const name1 = formData.get('player1');
			const name2 = formData.get('player2');
			
			player1 = createPlayer(`${name1}`, "X");
			player2 = createPlayer(`${name2}`, "O");
			writeToScoreboard();

			console.log(player1, player2);
		}
	});
}

function displayActivePlayer(activePlayer) {
	if ( activePlayer === 'player1' ) { 
		document.querySelector('#scoreboard-holder-0').style.color = 'green'
		document.querySelector('#scoreboard-holder-2').style.color = 'red'
	} else {
		document.querySelector('#scoreboard-holder-2').style.color = 'green'
		document.querySelector('#scoreboard-holder-0').style.color = 'red'
	} 
}

function writeToScoreboard() {
	document.querySelector('#scoreboard-holder-0').textContent = `${player1.name}(${player1.marker}): ${player1.getScore()}`
	document.querySelector('#scoreboard-holder-1').textContent = `Round ${scoreboard.getRound()}`
	document.querySelector('#scoreboard-holder-2').textContent = `${player2.name}(${player2.marker}): ${player2.getScore()}`
}

function placeMarker(square) {
	let activePlayer = game.getCurrentPlayer()
	let marker = (activePlayer === 'player1') ? `${player1.marker}`: `${player2.marker}`;
	if (gameBoard.grid[square] === ' ') {
		gameBoard.grid[square] = marker;
		gameBoard.increaseSquares()
		console.log(gameBoard.getOccupiedSquares());
		drawGrid();
		if(checkForWin(activePlayer)) {
			console.log(`${activePlayer} WINS!`)
			if(activePlayer === 'player1') { 
				player1.increaseScore()
			} else { player2.increaseScore() }
			scoreboard.nextRound();
			writeToScoreboard();
			gameBoard = createGrid();
			drawGrid();
		}
		if(checkForDraw()) {
			scoreboard.nextRound();
			writeToScoreboard();	
			gameBoard = createGrid();
			drawGrid();
		}
		let result = checkGameComplete()
			if(result) {
				
				document.querySelector(".messages").textContent = result;
				console.log(result);
				setTimeout( () => {
				reset(); }, 2000);
		}
		game.togglePlayer();
	}
}

function checkForWin(player) {
	let row1 = gameBoard.grid.slice(0, 3);
	let row2 = gameBoard.grid.slice(3, 6);
	let row3 = gameBoard.grid.slice(6, 9);
	let col1 = [ gameBoard.grid[0], gameBoard.grid[3],gameBoard.grid[6] ];
	let col2 = [ gameBoard.grid[1], gameBoard.grid[4],gameBoard.grid[7] ];
	let col3 = [ gameBoard.grid[2], gameBoard.grid[5],gameBoard.grid[8] ];
	let diag1 = [ gameBoard.grid[0], gameBoard.grid[4],gameBoard.grid[8] ];
	let diag2 = [ gameBoard.grid[2], gameBoard.grid[4],gameBoard.grid[6] ];
	let checks = [row1, row2, row3, col1, col2, col3, diag1, diag2 ];
	for (check of checks) {
	let activePlayer = game.getCurrentPlayer()
	let marker = (activePlayer === 'player1') ? `${player1.marker}`: `${player2.marker}`;
		let win = check.every( cell => cell === marker);
		if (win) { 
			console.log(check)
			return true };
	} 
}

function checkForDraw() {
	if (gameBoard.getOccupiedSquares() === 9) {
		return true;
	}
	return;
}

function checkGameComplete() {
	if (scoreboard.getRound() === 6) {
		if (player1.getScore() === player2.getScore()) {
			return "Game is a draw"}
		if (player1.getScore() > player2.getScore()) {
			return `${player1.name} wins!`;
		} else {
			return `The winner is ${player2.name}`;
		}
	}
		return false;
}		

function reset() {
	gameBoard = createGrid();
	scoreboard = createScoreboard();
	/*message and controls must be removed first -
	 * otherwise they are duplicated when this function
	 * is called */
	drawGrid();
	drawScoreboard();
	writeToScoreboard();
	drawControls();
}
		
let gameBoard = createGrid();
let scoreboard = createScoreboard();

let player1 = createPlayer("Player 1", "X");
let player2 = createPlayer("Player 2", "O");
const game = createPlayerToggle();

window.addEventListener('load', () => {
	drawGrid();
	drawScoreboard();
	writeToScoreboard();
	displayActivePlayer(game.getCurrentPlayer());
	drawControls();
});
