/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray1 = function(nums) {
    let l = -1, r = -1
    for(let i = 0; i < nums.length; i++){
        for(let j = i+1;j < nums.length; j++){
            if (nums[i] > nums[j]){
                l = i
                break;
            }
        }
        if (l != -1){
            break;
        }
    }
    for(let i = 0; i < nums.length; i++){
        for(let j = i+1;j < nums.length; j++){
            if (nums[nums.length - 1 - i] < nums[nums.length - 1 - j]){
                r = nums.length - 1 - i
                break;
            }
        }
        if (r != -1){
            break;
        }
    }
    if (l == -1){
        return 0
    } else {
        return r - l + 1
    }
};

/**
 * 左侧那些是不需要动的，右侧那些是不需要动的
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function(nums) {
    let l = -1, r = -1
    let n = nums.length
    let max = -Infinity
    let min = Infinity
    // 左侧从头到尾看，如果大于前面的最大值，这个数的位置是合格的，可以取到尾部合格的数
    // 右侧从尾到头看，如果小于后面的最小值，这个数的位置是合格的，可以取到首部合格的数
    for(let i = 0; i < n; i++){
        // 取最后一个不合格的位置
        if (nums[i] < max){ // 说明最大值必须要调到i或者i的后面
            r = i
        }
        max = Math.max(max, nums[i])
    }
    for(let i = n-1; i >= 0; i--){
        // 取最前一个不合格的位置
        if (nums[i] > min){ // 说明最小值必须调到i或者i的前面
            l = i
        }
        min = Math.min(min, nums[i])
    }
    // [l,r]就是必须要调的空间
    if (l == -1){
        return 0
    }
    return r - l + 1
};