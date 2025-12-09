/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var numberOfPaths = function(grid, k) {
    const MOD = 10**9 + 7
    let m = grid.length
    let n = grid[0].length
    let dp = Array(m).fill(0).map(
          ()=>{
            return Array(n).fill(0).map(
                ()=>{
                    return Array(k).fill(-1)
                }
            )
        }
    )
    // dp[r][c][j] 代表 [r,c,j] 要求从r，c开始到最后一个数的路径和余数是j的路径数
    for(let r = m-1;r >= 0;r--){
        for(let c = n-1;c >= 0;c--){
            for(let j = 0; j <= k-1;j++){
                let cur = grid[r][c] % k
                let need = (k + j - cur)%k
                if (r == m-1 && c == n-1){
                    dp[r][c][j] = cur == j ? 1 : 0
                } else if (r == m - 1){
                    dp[r][c][j] = dp[r][c+1][need]
                } else if (c == n - 1){
                    dp[r][c][j] = dp[r+1][c][need]
                } else {
                    dp[r][c][j] = (dp[r+1][c][need] + dp[r][c+1][need]) % MOD
                }
            }
        }
    }
    return dp[0][0][0]
};

