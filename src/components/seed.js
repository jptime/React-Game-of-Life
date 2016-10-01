var matrix = [];
var row = 20;
var column = 100;
for (var i = 0; i < row; i++) {
    matrix[i] = [];
    for (var j = 0; j < column; j++) {
        matrix[i][j] = Math.round(Math.random());
    }
}

module.exports = {matrix: matrix, row: row, column: column}