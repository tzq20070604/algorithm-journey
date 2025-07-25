/**
 * @param {number[]} nums
 * @return {number}
 */
var stack = Array(50000).fill(0)
var maxWidthRamp = function(nums) {
    let r = 1
    let ans = 0
    const n = nums.length
    for (let i = 1; i < n ; i++){
        if(nums[i] < nums[stack[r-1]]){
            stack[r++] = i
        }
    }
    for (let j = n - 1; j >= 1; j--){
        while(r > 0 && nums[stack[r-1]] <= nums[j]){
            ans = Math.max(ans,(j - stack[--r]))
        }
    }
    return ans
};