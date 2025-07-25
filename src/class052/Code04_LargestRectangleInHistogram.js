/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    var res = getLowHighLowArr(heights)
    console.log(res)
    var ans = 0
    for (var i = 0; i < res.length; i++){
        var [left, right] = res[i]
        var right = (right == -1 ? heights.length : right)
        ans = Math.max(ans, heights[i] *(right - left - 1))  
    }
    return ans
};

function getLowHighLowArr(nums){
    var stack = []
    var i = 0
    var arr = []
    while(i < nums.length){
        if (stack.length == 0){
            stack.push(i)
            i++
        } else {
           var top = stack[stack.length - 1]
           if (nums[i] > nums[top]){
              stack.push(i)
              i++
           } else {
              while(stack.length > 0 && nums[i] <= nums[stack[stack.length - 1]]){
                  // 收集
                  var top = stack.pop()
                  if (stack.length > 0){
                     arr[top] = [stack[stack.length - 1],i]
                  } else {
                     arr[top] = [-1,i]
                  }
              }
              stack.push(i++)
           }
        }
    }
    while(stack.length > 0){
       var top = stack.pop()
       if (stack.length > 0){
          arr[top] = [stack[stack.length - 1],-1]
        } else {
          arr[top] = [-1,-1]
        }
    }

    for (var i = arr.length - 1; i >= 0; i--){
        if (arr[i][1] != -1 && nums[arr[i][1]] == nums[i]){
            arr[i][1] = arr[arr[i][1]][1]
        }
    }
    return arr
}
