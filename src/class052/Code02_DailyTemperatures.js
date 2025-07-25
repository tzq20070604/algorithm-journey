 /**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
    var arr = getHighLowHighArr(temperatures)
    var res = arr.map((value,index)=>{
        if (value[1] == -1){
            return 0
        } else {
            return value[1] - index
        }
    })
    return res
};
 
 
 /* 
 * @param {[Number]} nums 
 */
function getHighLowHighArr(nums){
    var stack = []
    var i = 0
    var arr = []
    while(i < nums.length){
        if (stack.length == 0){
            stack.push(i)
            i++
        } else {
           var top = stack[stack.length - 1]
           if (nums[i] < nums[top]){
              stack.push(i)
              i++
           } else {
              while(stack.length > 0 && nums[i] >= nums[stack[stack.length - 1]]){
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
    // var arr1 = arr.map((item)=>{
    //     return item[0] + " " + item[1]
    // })
    // var res = arr1.join('\n')
    // console.log(res)
    return arr
}
 