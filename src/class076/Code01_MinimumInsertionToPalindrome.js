/**
 * 整体思路，如果两边不一致，肯定要进行插入
 * @param {string} s
 * @return {number}
 */
var minInsertions = function(s) {
    let dp = Array(s.length).fill(0).map(()=>{
       return Array(s.length).fill(-1)
    })
    return f(0,s.length - 1,s,dp)
};

function f(st,end,str,dp){
    if (dp[st][end] != -1){
        return dp[st][end]
    }
    let res = 0
    if(st == end){
        res = 0
    } else if (st == end - 1){
        res = (str[end] == str[st] ? 0 : 1)
    } else {
        if (str[end] == str[st]){
            res = f(st+1,end - 1, str, dp)
        } else {
            res = Math.min(f(st+1,end, str, dp),f(st,end-1, str, dp)) + 1
        }
    }
    dp[st][end] = res
    return res
}