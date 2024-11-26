function createGrid() {
	let grid = Array(9).fill(' ');
	return grid;
}

function createPlayer(name, marker) {
	let score = 0;
	const getScore = () => score;
	const increaseScore = () => score++;
	return { name, marker, getScore, increaseScore  };
}

function play(player, square) {
	if (grid[square] === ' ') {
		grid[square] = player.marker;
	}
}

function checkForWin(player) {
	let row1 = grid.slice(0, 3);
	let row2 = grid.slice(3, 6);
	let row3 = grid.slice(6, 9);
	let col1 = [ grid[0], grid[3], grid[6] ];
	let col2 = [ grid[1], grid[4], grid[7] ];
	let col3 = [ grid[2], grid[5], grid[8] ];
	let diag1 = [ grid[0], grid[4], grid[8] ];
	let diag2 = [ grid[2], grid[4], grid[6] ];
	let checks = [row1, row2, row3, col1, col2, col3, diag1, diag2 ];
	for (check of checks) {
		let win = check.every( cell => cell === player.marker);
		if (win) {return true };
	} 
}

grid = createGrid();
const player1 = createPlayer("Adam", "X");
const player2 = createPlayer("Bryn", "O");

