/**
 * 题目其实就是求离sum/2 最近的的值
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function(stones) {
    let sum = 0
    for(let i=0; i < stones.length;i++){
        sum += stones[i]
    }
    let t = (sum >> 1)
    // 前stones.length块石头，重量不超过t能取得的最大值
    let dp = Array.from({length:stones.length + 1}, (v,k)=>{
        return Array(t+1).fill(0)
    })
    
    for(let m = 1;m <= stones.length; m++){
        for(let n = 0;n <= t;n++){
            dp[m][n] = dp[m-1][n]
            if (n-stones[m-1] >= 0){
                dp[m][n] = Math.max(dp[m][n],dp[m-1][n-stones[m-1]] + stones[m-1])
            }
        }
    }
    return sum - 2 * dp[stones.length][t]
};