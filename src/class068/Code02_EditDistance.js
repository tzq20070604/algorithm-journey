/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    w1 = word1
    w2 = word2
    dp = Array(w1.length + 1).fill(0).map(()=>{
        return Array(w2.length + 1).fill(-1)
    })
    return f(w1.length,w2.length)
};

var w1,w2,dp
function f(l1,l2){
    if (l1 == 0){
        return l2
    }
    if (l2 == 0){
        return l1
    }
    if (dp[l1][l2] != -1){
        return dp[l1][l2]
    }
    // 如果是删除word1
    let ans = Infinity
    if (w1[l1-1] == w2[l2-1]){
        ans = Math.min(ans, f(l1-1,l2-1))
    } else {
        // 删除
        ans = Math.min(ans, f(l1-1,l2) + 1)

        //替换
        ans = Math.min(ans, f(l1-1,l2-1) + 1)

        // 插入
        ans = Math.min(ans, f(l1,l2-1) + 1)
    }
    dp[l1][l2] = ans
    return ans
}