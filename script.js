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
	const scoreboardContainer = document.querySelector(".scoreboard-container");
	for (i = 0; i < 3; i++) {
		const holder = document.createElement("div");
		scoreboardContainer.appendChild(holder);
		holder.setAttribute("id", `scoreboard-holder-${i}`);
		holder.classList.add("scoreboard-holder");
	}
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
	document.querySelector('#scoreboard-holder-0').textContent = `${player1.name} ${player1.getScore()}`
	document.querySelector('#scoreboard-holder-1').textContent = `Round ${scoreboard.getRound()}`
	document.querySelector('#scoreboard-holder-2').textContent = `${player2.name} ${player2.getScore()}`
}

function placeMarker(square) {
	let activePlayer = game.getCurrentPlayer()
	let marker = (activePlayer === 'player1') ? `${player1.marker}`: `${player2.marker}`;
	if (gameBoard.grid[square] === ' ') {
		gameBoard.grid[square] = marker;
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
		game.togglePlayer();
	}
}

function play(player, square) {
	if (gameBoard.grid[square] === ' ') {
		gameBoard.grid[square] = player.marker;
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

gameBoard = createGrid();
scoreboard = createScoreboard();

const player1 = createPlayer("Adam", "X");
const player2 = createPlayer("Bryn", "O");
const game = createPlayerToggle();

window.addEventListener('load', () => {
	drawGrid();
	drawScoreboard();
	writeToScoreboard();
	displayActivePlayer(game.getCurrentPlayer());
});
