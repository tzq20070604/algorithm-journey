/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
var knightProbability = function(n, k, row, column) {
    var dp = Array(k+1).fill(0).map(()=>{
        return Array(n).fill(0).map((item)=>{
            return Array(n).fill(-1)
        })
    })
    return f(row,column,k,n,dp)
};

 // 下一步
let derection = [
    [-1,-2],
    [-2,-1],
    [-2,1],
    [-1,2],
    [1,2],
    [2,1],
    [2,-1],
    [1,-2],
]
function f(row,col,k,n,dp){
    if (row < 0 || row >= n || col < 0 || col >=n){
        return 0
    }
    if (k == 0){
        return 1
    }
    if (dp[k][row][col] != -1){
        return dp[k][row][col]
    }
    let res = 0
    for(let [delRow,delCol] of derection){
        let nRow = row + delRow
        let nCol = col + delCol
        res += 0.125 * f(nRow,nCol,k-1,n,dp)
    }
    dp[k][row][col] = res
    return res
}
