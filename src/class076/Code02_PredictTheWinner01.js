/**
 * 空间压缩，根据递归来进行空间压缩，递归和正向递推互为逆过程
 * @param {number[]} nums
 * @return {boolean}
 */
var predictTheWinner = function(nums) {
    let dp = Array(nums.length).fill(0)
    for(l = nums.length -1; l >= 0;l--){
        for(let r =l; r <= nums.length-1; r++){
            if (r == l){
                dp[r] = nums[r]
            } else if (r == l + 1){
                dp[r] = nums[l] + nums[r] - 2 * Math.min(nums[l],nums[r])
            } else {
                dp[r] = Math.max(nums[r] - dp[r-1], nums[l] - dp[r])
            }
        }
    }
    return dp[nums.length - 1] >= 0
};
