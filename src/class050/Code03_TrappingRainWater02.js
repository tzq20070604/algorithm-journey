/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    if (height.length <= 2){
        return 0
    }
    var left = 0
    var right = height.length - 1
    var leftMax = height[left]
    var rightMax = height[right]
    var res = 0
    while(left + 1 < right){
        if (leftMax < rightMax){
            if (leftMax < height[left + 1]){
                leftMax = height[left + 1]
            } else {
                res +=  (leftMax - height[left + 1])
            }
            left++
        } else {
            if (rightMax < height[right - 1]){
                rightMax = height[right - 1]
            } else {
                res +=  (rightMax - height[right - 1])
            }
            right--
        }
    }
    return res
};
