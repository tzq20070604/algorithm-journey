// 测试链接：https://leetcode.cn/problems/maximal-rectangle/
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
    var ans = 0
    var len = matrix[0].length
    var last = Array(len).fill(0)
    for(var i = 0; i < matrix.length;i++){
        for (var j = 0; j < len; j++){
            if(matrix[i][j] === "0"){
                last[j] = 0
            } else {
                last[j]++
            }
        }
        ans = Math.max(ans,largestRectangleArea(last))  
    }
    return ans
};

var largestRectangleArea = function(nums){
    // 小 大 小，结尾不修正，这次使用一个r表示栈中元素的个数
    var Count = nums.length
    var r = 0
    var stack = Array(Count).fill(0)
    // 小大小
    var ans = 0
    var len = nums.length
    for (var i = 0; i < len; i++){
        while(r > 0 && nums[i] <= nums[stack[r - 1]]){
            // 可以弹出
            var top = stack[--r]
            var l = (r > 0 ? stack[r - 1]: -1)
            ans = Math.max(ans,nums[top] * (i - l - 1)) 
        }
        stack[r++] = i
    }
    while(r > 0){
        var top = stack[--r]
        var l = (r > 0 ? stack[r - 1]: -1)
        ans = Math.max(ans,nums[top] * (len - l - 1))
    }
    return ans
}
