/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function(nums) {
    nums.unshift(1)
    nums.push(1)
    var dp = Array(nums.length).fill(0).map(()=>{
        return Array(nums.length).fill(-1)
    })
    return f(0,nums.length - 1,nums,dp)
};

// 在(l,r)范围内的气球可被击落 l和r是边界，不可击落
function f(l,r,nums,dp){
    // 边界里没有气球
    if (r <= l+1){
        return 0
    }
    if (dp[l][r] != -1){
        return dp[l][r]
    }
    let res = 0
    // 假设(l,r)范围内最后被击落的气球为k,既然最后被击落，说明旁边的都不存在，只有边界
    for(let k = l + 1; k < r; k++){
        // 这一句很重要 一定是nums[l]和nums[r]
        let valueK = nums[l] * nums[k] * nums[r]
        res = Math.max(res,valueK + f(l,k,nums,dp) + f(k,r,nums,dp))
    }
    dp[l][r] = res
    return dp[l][r]
}