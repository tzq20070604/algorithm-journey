/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
   let dp = Array(nums.length).fill(-1)
   return f(0,nums,dp) 
};

function f(index,nums,dp){
   if(index >= nums.length){
       return 0
   }
   if (dp[index] != -1){
       return dp[index]
   } else {
       dp[index] = Math.max(f(index+1,nums,dp), nums[index] + f(index+2,nums,dp))
   }
   return dp[index]
}