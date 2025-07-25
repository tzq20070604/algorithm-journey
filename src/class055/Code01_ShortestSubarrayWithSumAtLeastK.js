/**
 * 因为有负数，所以比较特殊
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var shortestSubarray = function(nums, k) {
    queue = Array(nums.length).fill(0)
   
    // preSum[0],表示前0个数的时候的累加和
    var preSum = Array(nums.length + 1).fill(0)
    var queue = Array(nums.length + 1).fill(0)
    queue[0] = 0
    ql = 0
    qr = 1
    var len = Infinity
    for (var r=0; r < nums.length; r++){
        // 以nums[r]结尾，能否找到子数组和>=k
        preSum[r+1] = preSum[r] + nums[r]
        while(ql < qr && (preSum[r + 1] - preSum[queue[ql]] >= k)){
            // 前ql个数，当前是r+1个数
            len = Math.min(len,r + 1 - queue[ql])
            ql++
        }
        while((ql < qr) && (preSum[r+1] <= preSum[queue[qr - 1]])){
            qr--
        }
        queue[qr++] = r+1
    }
    return len == Infinity ? -1 : len
};

var preSum = [0]
var ql = 0
var qr = 0
var len = Infinity
var queue = []