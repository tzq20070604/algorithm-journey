/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    var leftArr = []
    var rightArr = []
    var leftMax = 0
    var rightMax = 0
    for (var i = 0; i < height.length;i++){
       leftMax = Math.max(leftMax, height[i])
       leftArr[i] = leftMax
       var index = height.length - 1 - i
       rightMax = Math.max(rightMax, height[index])
       rightArr[index] = rightMax
    }
    var sum = 0
    for (var i = 1; i < height.length - 1;i++){
        sum += Math.max(0, Math.min(leftArr[i - 1], rightArr[i + 1]) - height[i])
    }
    return sum
};

// console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]))