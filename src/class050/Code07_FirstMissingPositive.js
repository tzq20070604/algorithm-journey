// https://leetcode.cn/problems/first-missing-positive/description/

/**
 * 如果nums 刚好是1 到 nums.length 这nums.length个数，则最小正整数为nums.length + 1，否则
 * 最小正整数一定小于nums.length + 1，不妨设置（0, l-1]为已经排序好的，[r+1,nums.length]为垃圾区
 * 现在
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    // 一个垃圾都没有 [l,r] 都是符合条件的，总共r-l+1个
    // [l,r]符合条件，则arr[l]在[l+1，r+1]以内
    var l = 0, r = nums.length-1
    while(l <= r){
        if (nums[l] == l + 1){
            l++
        } else if (nums[l] >= l+1 && nums[l] <= r+1 && (nums[nums[l] - 1] != nums[l])) {
            swap(nums, l, nums[l] - 1)
        } else {
            swap(nums, l, r--)
        }
    }
    return ++l
};

function swap(nums, i ,j){
    var tmp = nums[i]
    nums[i] = nums[j]
    nums[j] = tmp
}