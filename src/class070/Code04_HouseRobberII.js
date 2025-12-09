/**
 * 最主要的是如果选择第一个就不能选择第N-1个
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums1) {
   nums = nums1
   dp = Array(nums.length).fill(0).map(()=>Array(nums.length).fill(-1))
   return Math.max(nums[0] + f(2, nums.length - 2), f(1, nums.length - 1))
};
let nums,dp
function f(st,end){
    if(st > end){
        return 0
    } else if (st == end){
        return nums[st]
    } else {
        if (dp[st][end] != -1){
            return dp[st][end]
        } else {
            dp[st][end] = Math.max(nums[st] + f(st+2, end), f(st+1, end))
            return dp[st][end]
        }
    }
}