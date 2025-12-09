/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var numberOfPaths = function(grid1, k1) {
    grid = grid1
    k = k1
    m = grid.length
    n = grid[0].length
    dp = Array(m).fill(0).map(
          ()=>{
            return Array(n).fill(0).map(
                ()=>{
                    return Array(k).fill(-1)
                }
            )
        }
    )
    return f(0,0,0)
};

const MOD = 10**9 + 7
let m,n,grid,k,dp
let derect = [[1,0],[0,1]]

// 进入[i,j,need]，当前需要need的余数的路径
function f(i,j,need){
    if (i < 0 || i >= m || j < 0 || j >=n){
        return 0
    }
    if (dp[i][j][need] != -1){
        return dp[i][j][need]
    }
    if (i == m-1 && j == n-1){
      return grid[i][j] % k == need ? 1 : 0
    }
    let need1 = (k + need - grid[i][j] % k) % k
    let res = 0
    for (let [delx,dely] of derect){
        let [x,y] = [i + delx, j + dely]
        res = (res + f(x,y,need1)) % MOD
    }
    dp[i][j][need] = res
    return res
}

