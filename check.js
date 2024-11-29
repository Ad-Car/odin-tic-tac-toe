function checkforWin (rows, marker) {
	for (row of rows) {
		let win = row.every( cell => cell === marker)
		console.log(win)
		if (win) { return }
	}
}
const	row1 = ["X","O","X"];
const row2 = ["X","O","X"];
const row3 = [,"O",];
const row4 = ["X","O","X"];
const row5 = ["X","X","0"];

rows = [ row1, row2, row3, row4, row5 ]

console.log(checkforWin(rows, "X"));

