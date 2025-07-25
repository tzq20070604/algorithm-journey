var findPeakElement = function(nums){
  return findPart(nums,0, nums.length - 1)
}
// 其实是保证了 l左边的值肯定小于l 和 r右边的值肯定小于r
function findPart(nums, l, r){
   if (l == r){
      return l
   } else if (l == r - 1) {
      return nums[l] > nums[r] ? l : r
   } else {
      var mid = l + ((r - l) >> 1)
      if (nums[mid - 1] < nums[mid]){
         return findPart(nums,mid, r)
      } else {
         return findPart(nums, l, mid - 1)
      }
   }
}