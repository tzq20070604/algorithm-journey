/**
 * 其实也是背包问题，只是涉及到枚举，还可以根据空间来优化枚举
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var kInversePairs = function(n, k) {
    //如果前n-1个已经排好，有j个逆序对，加入第n个，则刚好有k个逆序对
    let dp = Array(n+1).fill(0).map(()=>{
        return Array(1000 + 1).fill(-1)
    })
    return f(n,k,dp)
};

const MOD = 1e9+7
function f(n,k,dp){
    if (k == 0){
        return 1
    }
    if (n == 1){
        return 0
    }
    if (dp[n][k] != -1){
        return dp[n][k]
    }
    let res = 0
    // 这个i是指第n个数和前面n-1个数形成逆袭对的数目
    for(let i = 0; i <= Math.min(k,n-1); i++){
        res = (res + f(n-1,k-i,dp) % MOD) % MOD
    }
    dp[n][k] = res
    return res
}

console.log(kInversePairs(1000,1000))