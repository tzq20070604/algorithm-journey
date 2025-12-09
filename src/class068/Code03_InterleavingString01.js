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
    let last = true
    let dp = Array.from({length:s2.length + 1},(v,x)=>{
        if (x == 0){
           return true
        } else {
            if (s2[x] != s3[x]){
                last = false
            }
            return last && (s2.slice(0,x) == s3.slice(0,x))
        }
    })
    return f(s1.length,s2.length,dp)
};

let s1,s2,s3
function f(l1,l2,dp){
    for (let i = 1; i <= l1; i++){
        for (let j = 0; j <= l2; j++){
            if (j == 0){
                dp[j] = (dp[j] && (s1[i-1] == s3[i+j-1]))
            } else {
                let res = false
                if (s1[i-1] == s3[i+j-1]){
                    res |= dp[j]
                }
                if (s2[j-1] == s3[i+j-1]){
                    res |= dp[j-1]
                }
                dp[j] = res
            }
        }
    }
    return dp[l2]
}