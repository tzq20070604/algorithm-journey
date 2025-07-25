const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

// 小大小的位置 所有栈里面是小到大，遇到比栈顶小的，栈顶弹出结算
void async function () {
    // Write your code here
    var count = 0
    var n = 0
    while(line = await readline()){
        let tokens = line.split(' ');
        if (count == 0){
            count = parseInt(tokens[0])
            count++
            continue
        } 
        var nums = tokens.map(Number)
        getLowHighLowArr(nums)
    }
}()

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

    for (var i = arr.length - 1; i >= 0; i--){
        if (arr[i][1] != -1 && nums[arr[i][1]] == nums[i]){
            arr[i][1] = arr[arr[i][1]][1]
        }
    }
    var arr1 = arr.map((item)=>{
        return item[0] + " " + item[1]
    })
    var res = arr1.join('\n')
    console.log(res)
    return arr
}
