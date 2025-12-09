/**
 * @param {number[]} nums
 * @return {boolean}
 */
var predictTheWinner = function(nums) {
    let dp = Array(nums.length).fill(0).map(()=>{
        return Array(nums.length).fill(null)
    })
    return f(0,nums.length - 1,nums,dp) >= 0
    
};

// 在l，r区间上，先手-后手的分差
function f(l,r,nums,dp){
    if (dp[l][r] !== null){
        return dp[l][r]
    }
    let res = 0
    if (l == r){
        res = nums[l]
    } else if (l == r - 1) {
        res = nums[l] + nums[r] - 2 * Math.min(nums[l],nums[r])
    } else {
        // 如果取左边
        let res1 = nums[l] - f(l+1, r, nums,dp)
        // 如果取右边
        let res2 = nums[r] - f(l, r-1, nums,dp)
        res = Math.max(res1, res2)
    }
    dp[l][r] = res
    return res
}