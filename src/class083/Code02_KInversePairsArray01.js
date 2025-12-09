/**
 * 其实也是背包问题，只是涉及到枚举，还可以根据空间来优化枚举
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var kInversePairs = function(n, k) {
    const MOD = 1e9+7
    //如果前n-1个已经排好，有j个逆序对，加入第n个，则刚好有k个逆序对
    let dp = Array(n+1).fill(0).map(()=>{
        return Array(k+1).fill(0)
    })
    dp[0][0] = 1
    for(let i = 1; i <= n; i++){
        let window = 1
        dp[i][0] = 1;
        for(let j=1;j<=k;j++){
            // 后面插入进来的最多可以提供i-1个逆序对这个是固定的[0,i-1]，
            // 前面i-1个数可以提供逆序对范围[j-(i-1),j]
            if(i-1 < j){ 
                dp[i][j] = ((dp[i][j-1] + dp[i-1][j])% MOD - dp[i-1][j-(i-1)-1] + MOD)% MOD
            } else { //前面i-1个数可以提供逆序对范围[0,j]个逆序对
                dp[i][j] = (dp[i][j-1] + dp[i-1][j])% MOD
            }
        }
    }
    return dp[n][k]
};
