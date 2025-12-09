const MOD = 1e9+7
/**
 * @param {number} n
 * @return {number}
 */
var countVowelPermutation = function(n) {
    let base = [
        [0,1,0,0,0],
        [1,0,1,0,0],
        [1,1,0,1,1],
        [0,0,1,0,1],
        [1,0,0,0,0]
    ]
    let start = [[1,1,1,1,1]]
    let res = matrixMultiply(start,matrixPower(base,n-1))
    let ans = 0
    for(let item of res[0]){
       ans = (ans + item) % MOD
    }
    return ans
};

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
            let ans = BigInt(0)
            for(let k = 0; k < a[0].length; k++){
               ans += BigInt(a[row][k]) * BigInt(b[k][col])
            }
            c[row][col] = Number(ans % BigInt(MOD))
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