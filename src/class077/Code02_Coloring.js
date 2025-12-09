/**
 * 首先肯定是边上最先搞定
 * @param {string} s
 * @return {number}
 */
var strangePrinter = function(s) {
    let n = s.length
    let dp = Array(n).fill(0).map(()=>{
        return Array(n).fill(-1)
    })
    return f(0,n-1,s,dp)
};

function f(l,r,s,dp){
    if (dp[l][r] != -1){
        return dp[l][r]
    }
    if (l == r){
        return 1
    }
    if (s[l] == s[r]){
        return f(l+1,r,s,dp)
    }
    let res = Infinity
    for (let m = l; m < r; m++){
        res = Math.min(res,f(l,m,s,dp) + f(m+1,r,s,dp))
    }
    dp[l][r] = res
    return res
}