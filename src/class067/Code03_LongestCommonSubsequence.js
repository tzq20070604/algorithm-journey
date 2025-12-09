/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    t1 = text1
    t2 = text2
    m = t1.length
    n = t2.length
    dp = Array(m + 1).fill(0).map(()=>{
        return Array(n + 1).fill(-1)
    })
    dp[0][0] = 0
    return longestSub(m,n)
    
};

var t1,t2,m,n,dp
function longestSub(i,j){
    if (dp[i][j] != -1){
        return dp[i][j]
    }
    if (i == 0 || j == 0){
        dp[i][j] = 0
        return 0
    }
    if (t1[i-1] == t2[j-1]){
        dp[i][j] = longestSub(i-1,j-1) + 1
    } else {
        dp[i][j] = Math.max(longestSub(i - 1,j),longestSub(i,j - 1))
    }
    return dp[i][j]
}