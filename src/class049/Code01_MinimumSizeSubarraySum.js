/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    // 窗口 [l,r]
    var ans = Number.MAX_SAFE_INTEGER
    var sum = 0
    for (var l=0,r=0; r < nums.length; r++){
         sum += nums[r]
         if (sum < target){
            continue
         }
         // 窗口满足条件，
         // 能否调整左侧窗口,直到不能调整为止
         while (sum - nums[l] >= target){
            sum -= nums[l]
            l++
         }
         // 不能调整左侧窗口
         ans = Math.min(r - l + 1, ans)
    }
    if (ans == Number.MAX_SAFE_INTEGER){
       return 0
    } else {
       return ans
    }
};