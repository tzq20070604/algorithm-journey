/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    var maxAear = 0
    if (height.length <= 2){
        return Math.min(height[0], height[1])
    } else {
        var left = 0
        var right = height.length - 1
        while(left < right){
           if (height[left] < height[right]){
              maxAear = Math.max(maxAear, height[left] * (right - left))
              left++
           } else {
              maxAear = Math.max(maxAear, height[right] * (right - left))
              right--
           }
        }
        return maxAear
    }
};