//https://pintia.cn/problem-sets/91827364500/exam/problems/type/7?problemSetProblemId=91827367873&page=22
/**
 * 
 * @param {number} n n课树
 * @param {number} m m天
 * @param {number[]} arr 每棵树的初始重量和每天的增长量
 */
function getMaxCoin(n,m,arr){
    // 前m天，砍前n颗树 这样子可以有使用0的下标
    let dp = new Array(m + 1).fill(0).map(()=>{
        return Array(n+1).fill(0)
    })
    //按照增长的重量从小到大排列
    arr.sort((a,b)=>{return a[1] - b[1]})
    for(let i = 1; i <= m; i++){
        for(let j = 1; j <= n; j++){
            // 第i天砍第j课树 和 不砍第j课树 
            dp[i][j] = Math.max(dp[i-1][j],dp[i-1][j-1] + (i-1) * arr[j - 1][1] + arr[j - 1][0])
        }
    }
    return dp[m][n]
}