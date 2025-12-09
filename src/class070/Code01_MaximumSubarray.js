/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    dp = Array(nums.length).fill(0)
    pre = nums[0]
    max = pre
    f(1,pre,nums)
    return max
};

let max,cur
function f(index, pre, nums){
    if (index == nums.length){
        return;
    }
    let cur = nums[index]
    if (pre >= 0){
        cur += pre
    }
    max = Math.max(max,cur)
    f(index+1,cur,nums)
}