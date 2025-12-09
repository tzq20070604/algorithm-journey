/**
 * 整体思路，如果两边不一致，肯定要进行插入
 * @param {string} s
 * @return {number}
 */
var minInsertions = function(str) {
    let dp = Array(str.length).fill(0).map(()=>{
       return Array(str.length).fill(0)
    })
    for(let st = str.length - 1; st >= 0; st--){
        for(let end = st; end <= str.length - 1; end++){
            if (st == end){
                dp[st][end] = 0
            } else if (st == end-1){
                dp[st][end] = (str[end] == str[st] ? 0 : 1)
            } else {
                if(str[end] == str[st]){
                    dp[st][end] = dp[st+1][end-1]
                } else {
                     dp[st][end] = Math.min(dp[st+1][end],dp[st][end-1]) + 1
                }
            }
        }
    }
    return dp[0][str.length - 1]
};
