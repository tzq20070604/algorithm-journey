/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    // 将每个数放到自己下标的位置上
    var index = 0
    while(true){
      var toIndex = nums[index]
      if (toIndex == nums[toIndex]){
         return nums[toIndex]
      } else {
         var tmp = nums[toIndex]
         nums[toIndex] = toIndex
         nums[index] = tmp
      }
    }
};
