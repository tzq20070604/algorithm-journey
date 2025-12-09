/**
 * 由1打表得到f(n) = 2*f(n-1) + f(n-3)
 * // [ [ 1, 0 ], [ 1, 2 ], [ 2, 4 ], [ 5, 8 ], [ 11, -1 ], [ 24, -1 ] ]
 * @param {number} n
 * @return {number}
 */
var numTilings = function(n){
   if (n == 0){
    return 1
   }
   if (n == 1){
    return 1
   }
   if (n == 2){
    return 2
   }
   let base = [
     [2,1,0],
     [0,0,1],
     [1,0,0],
   ]
   let res = matrixMultiply([[2,1,1]], matrixPower(base,n-2))
   return res[0][0]
}

/**
 * 
 * @param {number[][]} a 矩阵
 * @param {number[][]} b 矩阵
 * @return {number[][]} 矩阵
 */
function matrixMultiply(a,b){
    let c = Array(a.length).fill(0).map(()=>{
        return Array(b[0].length).fill(0)
    })
    for(let row = 0; row < a.length; row++){ // 行
        for(let col = 0; col < b[0].length; col++){ // 列
            let ans = 0
            for(let k = 0; k < a[0].length; k++){
                // 这里有乘法不能溢出 
                // a[row][k]  b[k][col] 都小于10**9 + 7
                // 但是它们的乘积可能会溢出
               ans = (ans + Number(BigInt(a[row][k]) * BigInt(b[k][col]) % BigInt(MOD))) % MOD
            }
            c[row][col] = ans
        }
    }
    return c
}

/**
 * 矩阵快速幂
 * 要求是正方形矩阵 因为矩阵乘法 要求 要求第一个矩阵的列数等于第二个矩阵的行数，又是一个矩阵，则必然是正方形矩阵
 * 对角线全是1、剩下数字都是0的正方形矩阵，称为单位矩阵
 * 相当于正方形矩阵中的1，矩阵a * 单位矩阵 = 矩阵a
 * @param {number[][]} a 矩阵
 * @param {number} p 矩阵
 * @return {number[][]} 矩阵
 */
function matrixPower(a,p){
   let ans = Array(a.length).fill(0).map(()=>{
      return Array(a.length).fill(0)
   })
   for(let i = 0; i < a.length; i++){
      ans[i][i] = 1
   }
   while(p > 0){
       if ((p & 1) == 1){
           ans = matrixMultiply(a, ans)
       }
       a = matrixMultiply(a, a)
       p >>= 1
   }
   return ans
}

/**
 * @param {number} n
 * @return {number}
 */
var numTilings1 = function(n) {
    if (n == 0){
        return 0
    }
    if (n == 1){
        return 1
    }
    if (n == 2){
        return 2
    }
    let dp = Array(n+1).fill(0).map(()=>{
        return Array(2).fill(-1)
    })
    dp[0][0] = 1
    dp[0][1] = 0
    dp[1][0] = 1
    dp[1][1] = 2
    dp[2][0] = 2
    dp[2][1] = 4
    let ans = recursion(n,0,dp)
    console.log(dp)
};

const MOD = 10**9 + 7
function recursion(cur,state,dp){
    // 平角
    if (dp[cur][state] != -1){
        return dp[cur][state]
    }
    let ans = 0
    if (state == 0){
        // 最后一块是D型  竖着放
        ans = (ans + recursion(cur-1,0,dp)) % MOD
        
        // 最后一块是D型  横着放
        ans = (ans + recursion(cur-2,0,dp)) % MOD

        // 最后一块是T型
        ans = (ans + recursion(cur-2,1,dp)) % MOD

    } else { // 凸角
        // 最后一块是D型  竖着放，不可能

        // 最后一块是D型  横着放
        ans = (ans + recursion(cur-1,1,dp)) % MOD

        // 最后一块是T型
        ans = (ans + recursion(cur-1,0,dp) * 2) % MOD
    }
    dp[cur][state] = ans
    return ans
}


