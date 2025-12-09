/**
 * 整体思路，如果两边不一致，肯定要进行插入
 * @param {string} s
 * @return {number}
 */
var minInsertions = function(str) {
    let dp = Array(str.length).fill(0)
    for(let st = str.length - 1; st >= 0; st--){
        let curUse
        let nextUse
        /* 更新dp[j]之前
       1、先保存dp[j]起来，给下次使用nextUse
       2、使用当前值、上次保存起来的值和左侧的值 更新当前值
       3、然后把nextUse的值赋值给curUse，保证下一轮可以使用
        */
        for(let end = st; end <= str.length - 1; end++){
            if (end == st){
                dp[end] = 0
            } else if (end == st + 1){
                nextUse = dp[end]
                dp[end] = (str[end] == str[st] ? 0 : 1)
            } else {
                nextUse = dp[end]
                if(str[end] == str[st]){
                    dp[end] = curUse
                } else {
                    dp[end] = Math.min(dp[end],dp[end-1]) + 1
                }
            }
            curUse = nextUse
        }
    }
    return dp[str.length - 1]
};
