/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    m = grid.length
    n = grid[0].length
    let dp = Array(m).fill(0).map(()=>{
        return  Array(n).fill(-1)
    })
    dp[0][0] = 1
    return f(m-1,n-1,grid)
};

var m,n
function f(i,j){
    if (dp[i][j] != -1){
        return dp[i][j]
    } else {
        let m = Infinity
        if (i - 1 >= 0){
           m = dp[i - 1][j]
        }
        if (j - 1 >= 0){
           m = Math.min(m, dp[i][j - 1])
        }
        dp[i][j] = m + grid[i][j]
        return  dp[i][j]
    }
}