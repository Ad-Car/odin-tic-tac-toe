function Gameboard() {
	const board = Array(9).fill(' ');
	return board;
}

function Player(name, marker) {
	return { name, marker };
}

function Play(player, square) {
	if (gameboard[square] === ' ') {
		gameboard[square] = player.marker;
	}
}

function checkForWin(player) {
	let row1 = gameboard.slice(0, 3);
	let row2 = gameboard.slice(3, 6);
	let row3 = gameboard.slice(6, 9);
	let col1 = [ gameboard[0], gameboard[3], gameboard[6] ];
	let col2 = [ gameboard[1], gameboard[4], gameboard[7] ];
	let col3 = [ gameboard[2], gameboard[5], gameboard[8] ];
	let diag1 = [ gameboard[0], gameboard[4], gameboard[8] ];
	let diag2 = [ gameboard[2], gameboard[4], gameboard[6] ];
	let checks = [row1, row2, row3, col1, col2, col3, diag1, diag2 ];
	for (check of checks) {
		let win = check.every( cell => cell === player.marker);
		if (win) {return true };
	} 
}

gameboard = Gameboard();
const player1 = Player("Adam", "X");
const player2 = Player("Bryn", "O");

