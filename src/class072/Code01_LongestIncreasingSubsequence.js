/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    // 以index结尾的最长递增子序列的长度
    let dp = Array(nums.length + 1).fill(0)
    dp[0] = 1
    let max = 1
    for(let i = 1; i < nums.length; i++){
        let ans = 0
        // 找到所有小于nums[i]的元素，求出他们的最大值
        for(let j = i-1; j >= 0;j--){
            if (nums[i] > nums[j]){
               ans = Math.max(dp[j], ans)
            }
        }
        dp[i] = ans + 1
        max = Math.max(dp[i],max)
    }
    return max
};