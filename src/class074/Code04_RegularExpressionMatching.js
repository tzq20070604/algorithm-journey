/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    // 0表示 无填充 1表示true -1 表示false
   let dp = Array(s.length + 2).fill(0).map(()=>{
      return Array(p.length + 2).fill(0)
   })
   return f(0,0,s,p,dp)
};
/**
 * 前i1个字符和前i2个字符是否匹配
 * @param {number} l1
 * @param {number} l2 
 * @param {string} s 
 * @param {string} p 
 * @returns {boolean}
 */
function f(l1,l2,s,p,dp){
    if (dp[l1][l2] != 0){
        return dp[l1][l2] == 1 ? true : false
    }
    let res = false
    if(l1 > s.length){
        if (l2 > p.length){
            res = true
        } else {
            if (l2 + 1 <= p.length && p[l2] == "*"){
                res = f(l1,l2 + 2,s,p,dp)
            } else {
                res = false
            }
        }
    } else {
        // l2是否有下一位，该位是否为星
        if (l2 + 1 <= p.length){
            let res2 = false
            if (p[l2] == "*"){
                // 可配
                if(p[l2-1] == "." || s[l1 - 1] == p[l2-1]){
                    res2 = f(l1+1,l2,s,p,dp)
                }
                //不配
                let res1 = f(l1,l2 + 2,s,p,dp)
                res = res1 || res2
            } else {
                if(p[l2-1] != "." && s[l1 - 1] != p[l2-1]){
                    res = false
                } else {
                    res = f(l1 + 1,l2 + 1,s,p,dp)
                }
            }
        } else { //没有下一位
            if(p[l2-1] != "." && s[l1 - 1] != p[l2-1]){
                res = false
            } else {
                res = f(l1 + 1,l2 + 1,s,p,dp)
            }
        }
    }
    dp[l1][l2] = res == true ? 1 : -1
    return res
}