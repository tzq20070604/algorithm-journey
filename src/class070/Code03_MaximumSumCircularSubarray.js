/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function(nums) {
    min = nums[0]
    max = nums[0]
    preMin = nums[0]
    preMax = nums[0]
    all = nums[0]
    // 从index开始，最大值
    for(let i = 1; i < nums.length;i++){
        f(i,nums)
    }
    if (all - min == 0){
        return max
    } else {
        return Math.max(all - min, max)
    }
};
var min,max,all,preMin,preMax

// 分2种情况 最大值 最小值，以index结尾的最大值和最小值
function f(index, nums){
    if (index == nums.length){
        return 0
    }
    let tmin = nums[index]
    let tmax = nums[index]
    all += nums[index]
    if (preMax > 0){
        tmax += preMax
    }
    if (preMin < 0){
        tmin += preMin
    }
    max = Math.max(tmax,max)
    min = Math.min(tmin,min)
    preMax = tmax
    preMin = tmin
}