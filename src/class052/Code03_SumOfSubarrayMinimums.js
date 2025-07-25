/**
 * @param {number[]} arr
 * @return {number}
 */
var sumSubarrayMins = function(arr) {
    var mod = Math.pow(10,9) + 7
    var numArr = getLowHighLowArr(arr)
    var sum = 0
    for (var i = 0; i < numArr.length; i++){
       var item = numArr[i]
       var count = (i - item[0]) * (item[1] - i) * arr[i]
       sum = (((sum % mod) + (count % mod)) % mod)
    }
    return sum
};

/**
 * 
 * @param {[Number]} nums 
 */
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
    // 不能修正
    for (var i = arr.length - 1; i >= 0; i--){
        if (arr[i][1] == -1){
            arr[i][1] = arr.length
        }
    }
    return arr
}
