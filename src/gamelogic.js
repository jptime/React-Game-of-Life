
var GOL = {
    Game: function(){
        
    },
    randomSeed: function(size){
      var matrix = [];
      for (var i = 0; i < size[0]; i++) {
         matrix[i] = [];
         for (var j = 0; j < size[1]; j++) {
           matrix[i][j] = Math.round(Math.random());
           }
        } 
        return matrix;
    },
    cycle: function(matrix, size) {
        var aliveArr = [];
        var deadArr = [];
        matrix.forEach(function(row, rowindex){
            row.forEach(function(cell, columnindex){
                var alive = 0;
                var dead = 0;
                var neighbors = getTheNeighbors(rowindex, columnindex);
                neighbors.forEach(function(coords){
                getCell(coords[0],coords[1]) ? alive +=1 : dead +=1;
                })
                checkIfAlive(cell, alive, dead) ? aliveArr.push([rowindex,columnindex]) : deadArr.push([rowindex,columnindex]);
            })
        })
        aliveArr.forEach(function(place){
          matrix[place[0]][place[1]] = 1;  
        })
        deadArr.forEach(function(place){
          matrix[place[0]][place[1]] = 0;  
        })
        return [matrix,1]
        
        function getTheNeighbors(row, column){
          

        return [[row - 1 < 0 ? size[0] -1 : row - 1, column - 1 < 0 ? size[1]-1 : column - 1],
                [row - 1 < 0 ? size[0]-1 : row - 1, column],
                [row - 1 < 0 ? size[0] -1 : row - 1, column + 1 > 0 ? size[1]+1 : column + 1],
                [row, column - 1 < 0 ? size[1]-1 : column - 1],
                [row, column + 1 > size[1]+1 ? 0 : column + 1],
                [row + 1 > size[0] -1? 0 : row + 1, column - 1 < 0 ? 0 : column - 1],
                [row + 1 > size[0] -1 ? 0 : row + 1, column],
                [row + 1 > size[0] -1 ? 0 : row + 1, column + 1 > size[1] -1 ? 0 : column + 1]
            ]
        }
        function getCell(row, column){
        return matrix[row][column];
    }
        function checkIfAlive(cell, alive, dead){
        if (cell == 0 && alive == 3){
            return true
        }
        if (alive < 2 || alive > 3){
            return false
        }
        return !!cell
    }
    }
    }

module.exports = GOL
/*var Game = setInterval(function(){
    GOL.cycle();
}, 500)
*/
