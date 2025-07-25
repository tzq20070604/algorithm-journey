/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
   
    matrix = matrix.map((value)=>{
       return [0,...value]
    })
    matrix.unshift(Array.from({length: matrix[0].length},()=>{return 0}))
    //  console.log(matrix)
    this.matrix = matrix
    build(matrix)
};

function build(matrix){
    for (var i = 1; i < matrix.length;i++){
        for (var j = 1; j < matrix[0].length;j++){
           matrix[i][j] =  matrix[i][j - 1] + matrix[i-1][j] + matrix[i][j] - matrix[i - 1][j - 1]
        } 
    }
}


/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    row1 = row1 + 1
    row2 = row2 + 1
    col1 = col1 + 1
    col2 = col2 + 1
    return this.matrix[row2][col2] - this.matrix[row2][col1 -1] - this.matrix[row1 - 1][col2] + this.matrix[row1 - 1][col1 - 1]
};
