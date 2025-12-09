/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    let max = nums[0]
    let preMin = nums[0]
    let preMax = nums[0]
    for(let i = 1;i < nums.length; i++){
         let cur = nums[i]
         let a1 = cur * preMax 
         let a2 = cur * preMin
         preMin = Math.min(cur,Math.min(a1,a2))
         preMax = Math.max(cur,Math.max(a1,a2))
         if (preMax > max){
              max = preMax
         }
    }
    return max
};