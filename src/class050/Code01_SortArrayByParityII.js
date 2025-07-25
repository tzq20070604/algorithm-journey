/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParityII = function(nums) {
    var i = 0 // 当前偶数要处理的位置
    var j = 1 // 当前奇数要处理的位置
    while(i < nums.length){
        if (nums[i] % 2 == 0){
            i = i + 2
        } else {
            var tmp = nums[i]
            nums[i] = nums[j]
            nums[j] = tmp
            j = j + 2
        }
    }
    return nums
};
