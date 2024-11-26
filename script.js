function Gameboard() {
	const board = Array(9);
	return board;
}

function Player(name, marker) {
	return { name, marker };
}

function Play(player, square) {
	if (!board[square] ) {
		board[square] = player.marker;
	}
}
function checkForWin(board, player) {
	let row1 = board.slice(0, 3);
	let row2 = board.slice(3, 6);
	let row3 = board.slice(6, 9);
	let col1 = [ board[0], board[3], board[6] ];
	let col2 = [ board[1], board[4], board[7] ];
	let col3 = [ board[2], board[5], board[8] ];
	let diag1 = [ board[0], board[4], board[8] ];
	let diag2 = [ board[2], board[4], board[6] ];
	let rows = [row1, row2, row3, col1, col2, col3, diag1, diag2 ];

	for (row of rows) {
		let win = row.every( cell => cell === player.marker)
	/*	console.log(player.name, player.marker, row, win)
		*/if (win) { return true }
	} 
	return false;
}

const board = Gameboard();
const player1 = Player("Adam", "X");
const player2 = Player("Bryn", "O");



