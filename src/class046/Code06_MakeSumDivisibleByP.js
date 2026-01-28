/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
var minSubarray = function(nums, p) {
    let sums = Array(nums.length).fill(0)
    for(let i = 1; i <= nums.length; i++){
        sums[i] = sums[i-1] + nums[i-1]
    }
    if (sums[nums.length] % p == 0 ){
        return 0
    }
    let mod = sums[nums.length] % p
    // 也就是说移除的中间的数字之和对p取余数为mod或者p-mod
    let map = {}
    let ans = Infinity
    map[0]= -1
    for(let j = 1; j <= nums.length; j++){
        let res = sums[j] % p 
        let aim = res - mod >= 0 ? res - mod : res - mod + p
        if (map[aim] !== undefined){
            ans = Math.min(ans, j - 1 - map[aim])
        }
        map[res] = j-1
    }
    if (ans == Infinity || ans == nums.length){
        ans = -1
    }
    return ans
};