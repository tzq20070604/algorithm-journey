/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysWithKDistinct = function(nums, k) {
    var ans1 = subarraysWithKDistinctWithLength(nums, k)
    var ans2 = subarraysWithKDistinctWithLength(nums, k - 1)
    return ans1 - ans2
};

var subarraysWithKDistinctWithLength = function(nums, k) {
    var category = 0
    var dict = {}
    var ans = 0
    // 以当前r作结尾的 满足条件的个数
    for (var r = 0, l = 0; r < nums.length; r++){
        var ch = nums[r]
        if (dict[ch] === undefined || dict[ch] == 0){
            if (dict[ch] === undefined){
                dict[ch] = 0
            }
            category++
        }
        dict[ch]++
        if (category <= k){ //此时可以结算
            ans += (r - l + 1)
        } else {//超过了k 则缩窗口，直到满足条件为止
            while(true){
                if (--dict[nums[l]] == 0){
                    category--
                }
                l++
                if (category == k){
                    ans += (r - l + 1)
                    break
                }
            }
        }
    } 
    return ans
};
