/**
 * A-B=T
 * A+B=SUM
 * A = ((T + SUM)>>1)
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
    let sum = 0
    for(let i = 0; i < nums.length; i++){
        sum += nums[i]
    }
    // 奇偶相同
    let res = ((sum ^ target) & 1)
    if (res == 1){
        return 0
    }
    if (Math.abs(target) > sum){
        return 0
    }
    let t1 = ((sum + target) >> 1)
    let dp = Array(nums.length + 1).fill(0).map(()=>{
        return Array(t1 + 1).fill(0)
    })
    dp[0][0] = 1
    for(let len = 1; len <= nums.length; len++){
        for(let t = 0; t <= t1; t++){
            let item = nums[len-1]
            if (t >= item){
                dp[len][t] = dp[len-1][t - item] 
            } 
            dp[len][t] += dp[len - 1][t]
        }
    }
    return dp[nums.length][t1]
};