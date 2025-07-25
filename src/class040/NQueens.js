/**
 * @param {number} n
 * @return {string[][]}
 */
var N = 0
var total = 0
var totalNQueens = function(n) {
     if (n == 1){
        return 1
     } else if (n == 2){
        return 0
     } else {
        N = n
        total = 0
        solveNQueensResursion(0,[])
        return total
     }
};

// 第i行 在i-1行已经选择selectedCols的情况下
function solveNQueensResursion(i,selectedCols){
    if (i == N){
       total += 1
    } else {
       for (var j = 0; j < N; j++){
            if (i == 0){
                solveNQueensResursion(i+1, [j])
            } else {
                var condition = true
                // 查询[i, j] 是否符合条件
                for(var k = 0; k < selectedCols.length; k++){
                    let [x, y] = [k, selectedCols[k]]
                    if (y == j){
                        condition = false
                        break
                    }
                    if (Math.abs(x - i) == Math.abs(y - j)){
                        condition = false
                        break;
                    }
                }
                if (condition){
                   solveNQueensResursion(i+1, [...selectedCols, j])
                } 
            }
        }
    }
}
