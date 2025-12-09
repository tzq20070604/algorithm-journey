/**
 * @param {number[]} values
 * @return {number}
 */
var minScoreTriangulation = function(values) {
    let dp = Array(values.length).fill(0).map(()=>{
        return Array(values.length).fill(-1)
    })
    return f1(values, dp)
    // return f(0, values.length-1,values,dp)
};

// 递归加上记忆化搜索
function f(st,end,values,dp){
    if (dp[st][end] != -1){
        return dp[st][end]
    }
    let res = 0
    if (st >= end - 1){
        res = 0
    } else if (st == end - 2) {
        res = values[st] * values[st + 1] * values[st + 2]
    } else {
        let ans = Infinity
        for(let k = st+1;k <= end - 1;k++){
           ans = Math.min(ans,f(st,k,values,dp) + f(k,end,values,dp) + values[st] * values[end] * values[k])
        }
        res = ans
    }
    dp[st][end] = res
    return res
}

// 严格位置依赖的动态规划
function f1(values,dp){
    for(let st = values.length - 1; st >= 0; st--){
        for(let end = st; end <= values.length - 1; end++){
             if (end <= st + 1){
                 dp[st][end] = 0
             } else if (end == st + 2){
                 dp[st][end] = values[st] * values[st + 1] * values[st + 2]
             } else {
                let res = Infinity
                for(let k = st + 1; k < end; k++){
                    res = Math.min(res, dp[st][k] + dp[k][end] + values[st] * values[end] * values[k])
                }
                dp[st][end] = res
             }
        }
    }
    return dp[0][values.length - 1]
}