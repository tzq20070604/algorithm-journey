/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function(nums, k) {
   let n = nums.length
   let sum = 0
   let max = 0
   for(let i = 0; i < nums.length;i++){
        sum += nums[i]
        max = Math.max(max,nums[i])
   }
   if (sum % k != 0){
      return false
   }
   if (sum / k < max){
      return false
   }
   let status = (1 << n) - 1
   let dp = Array(1 << n).fill(0)
   return f(n,nums,status,0,sum / k,dp, sum / k,k)
};

function f(n,matchsticks,status,ei,left,dp,edgeLength,k){
    if (ei == k){
        return true
    }
    if (dp[status] != 0){
        return dp[status] == 1
    }
    if (left == 0){
        return f(n,matchsticks,status,ei + 1,edgeLength,dp,edgeLength,k)
    }
    let ans = false
    for(let i = 0; i < matchsticks.length; i++){
        // 没有用过，且比left要小或者相等
        if(((status>>i)&1 != 0) && (matchsticks[i] <= left)){
            if(f(n,matchsticks,status ^ (1 << i),ei,left - matchsticks[i],dp,edgeLength,k)){
                ans = true
                break;
            }
        }
    }
    dp[status] = ans ? 1 : -1
    return ans
}