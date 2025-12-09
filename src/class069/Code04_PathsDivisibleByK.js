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

// 进入[i,j]的时候还有pre的剩余
function f(i,j,pre){
    if (i < 0 || i >= m || j < 0 || j >=n){
        return 0
    }
     if (dp[i][j][pre] != -1){
        return dp[i][j][pre]
    }
    let sum = pre + grid[i][j]
    let left = sum % k
    if (i == m-1 && j == n-1){
       if (left == 0){
         dp[i][j][pre] = 1
         return 1
       } else {
         dp[i][j][pre] = 0
         return 0
       }
    }
    let res = 0
    for (let [delx,dely] of derect){
        let [x,y] = [i + delx, j + dely]
        res = (res + f(x,y,left) % MOD) % MOD
    }
    dp[i][j][pre] = res
    return res
}


