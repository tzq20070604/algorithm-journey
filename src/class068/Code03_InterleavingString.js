/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(str1, str2, str3) {
    s1 = str1
    s2 = str2
    s3 = str3
    if (s1.length + s2.length != s3.length){
        return false
    }
    let dp = Array(s1.length + 1).fill(0).map(()=>{
       return Array(s2.length + 1).fill(-1)
    })
   return f(s1.length,s2.length,dp)
};

let s1,s2,s3
function f(l1,l2,dp){
    if (dp[l1][l2]!= -1){
       return dp[l1][l2]
    }
    if (l1 == 0){
        dp[l1][l2] = s2.slice(0,l2) == s3.slice(0,l2)
        return dp[l1][l2]
    }
    if (l2 == 0){
        dp[l1][l2] = s1.slice(0,l1) == s3.slice(0,l1)
        return dp[l1][l2]
    }
    
    let res = false
    if (s1[l1-1] == s3[l1+l2-1]){
        res |= f(l1-1,l2,dp)
    }
    if (s2[l2-1] == s3[l1+l2-1]){
        res |= f(l1,l2-1,dp)
    }
    dp[l1][l2] = res
    return dp[l1][l2]
}