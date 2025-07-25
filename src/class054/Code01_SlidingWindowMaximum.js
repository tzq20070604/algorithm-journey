/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    var ans = []
    r = 0, l = 0
    for(var st = 0, end = 0; end < nums.length;){
        if (end - st < k){
            // 进队列
            while(r - l > 0 && nums[end] >= nums[dequeue[r - 1]]){
                r--
            }
            dequeue[r++] = end
            if (end == nums.length){
                ans.push(nums[dequeue[l]])
                return ans
            } else {
                if (end - st == k - 1){
                   ans.push(nums[dequeue[l]])
                   // 左侧滑动
                   if (dequeue[l] == st){
                      l++
                   }
                   st++
                 }
            }
            end++
        }
    }
    return ans
};

// 从大到小的顺序
var dequeue = Array(10**5 + 1).fill(0)
var l = 0
var r = 0