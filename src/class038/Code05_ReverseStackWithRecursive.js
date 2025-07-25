/**
 * 
 * @param {[int]} stack 
 * @returns 
 */

function reverseStack(stack){
    if (isEmpty(isEmpty) == 0){
        return 
    }
    var num = getButtomNum(stack)
    reverseStack(stack)
    stack.push(num) 
}

function isEmpty(stack){
    if (stack.length == 0){
        return true
    } else {
        return false
    }
}

/**
 * 取得栈底元素并移除
 * @param {[int]} stack 
 * @returns {[any]} 
 */
function getButtomNum(stack){
    if (stack.length == 0){
        return []
    }
   var num =  stack.pop()
   if (stack.length == 0){
      return num
   }
   // 这个是栈底的数字
   var last = getButtomNum(stack)
   stack.push(num)
   return last
}


var nums = [2,4,7,1,3,6,9]
reverseStack(nums)
console.log(nums)