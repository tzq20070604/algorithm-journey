/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    // 从[0,i1+1]和[0,i2+1]是否匹配 
    let dp = Array(s.length +1).fill(0).map(()=>{
        return Array(p.length +1).fill(0)
    })
    return f(0,0,s,p,dp)
};

function f(i1,i2,s,p,dp){
    if (dp[i1][i2] != 0){
        return dp[i1][i2] == 1
    }
    let res = false
    if (i1 == s.length){
        if (i2 == p.length){
            res = true 
        } else {
            if(p[i2] != '*'){
                res = false
            } else {
                res = f(i1,i2 + 1,s,p,dp)
            }
        }
    } else {
        if(i2 == p.length){
            res = false
        } else {
            let sch = s[i1]
            let pch = p[i2]
            if (pch == "?" || sch == pch){
                res = f(i1+1,i2 + 1,s,p,dp)
            } else if (pch == "*"){
                res = f(i1,i2 + 1,s,p,dp) || f(i1+1,i2,s,p,dp)
            } else{
                res = false
            }
        }
    }
    dp[i1][i2] = (res == true ? 1 : -1)
    return res
}