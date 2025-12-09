/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    w1 = word1
    w2 = word2
    f()
    return dp[w2.length]
};

var w1,w2,dp
// 状态压缩
function f(){
    dp = Array.from({length:w2.length + 1},(_,k)=>{
       return k
    })
    // 更改前的备份
    let last = 0
    let cur = 0
    for(let i = 1; i < w1.length + 1; i++){
        for(let j = 0; j < w2.length + 1; j++){
            if (j == 0){
                last = dp[j]
                dp[j] = i
            } else {
                cur = dp[j]
                if (w1[i-1] == w2[j-1]){
                   dp[j] = last
                } else {
                   dp[j] = Math.min(last + 1, dp[j] + 1,dp[j-1] + 1)
                }
                last = cur
            }
        }
    }
}