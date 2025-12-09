/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function(s1) {
    s = s1
    n = s.length
    dp = Array(n).fill(0).map(()=>{
        return Array(n).fill(-1)
    })
    return longestRecursion(0, n-1)
};

var s,n,dp
function longestRecursion(i, j){
    if (dp[i][j] != -1){
        return dp[i][j]
    } 
    if (i == j){
        dp[i][j] = 1
        return dp[i][j]
    } else if (i > j){
        return 0
    } else if (i == j - 1){
        if (s[i] == s[j]){
             dp[i][j] = 2
             return dp[i][j]
        } else {
             dp[i][j] = 1
            return  dp[i][j]
        }
    } else {
         if (s[i] == s[j]){
             dp[i][j] = longestRecursion(i+1,j-1) + 2
         } else {
             dp[i][j] = Math.max(longestRecursion(i+1,j), longestRecursion(i,j-1))
         }
         return dp[i][j]
    }
}