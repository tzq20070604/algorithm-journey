/**
 * // 2分法
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minCapability = function(nums, k) {
    let min = nums[0]
    let max = nums[0]
    for(let item of nums){
        if(item > max){
            max = item
        } else if (item < min){
            min = item
        }
    }
    let res = max
    while(min <= max){
        var dp = Array(nums.length).fill(-1)
        let mid = min + ((max - min) >> 1)
        let count = f(mid,k,nums,0,dp) 
        if (count >= k){
           res = mid
           max = mid - 1
        } else {
           min = mid + 1
        }
    }
    return res
};

function f(mid,k,nums,index,dp){
    // 当前偷和不偷
    if (index >= nums.length){
        return 0
    }
    if (dp[index] != -1){
        return dp[index]
    }
    let res = f(mid,k,nums,index + 1,dp)
    // index 偷和不偷
    if (mid >= nums[index]){
        res = Math.max(res, 1 + f(mid,k,nums,index + 2,dp)) 
    }
    dp[index] = res
    return res
}
