var stack = []
function sort(stackArr){
    if (isEmpty(stackArr)){
        return []
    }
    stack = stackArr
    // 找到最大深度 找到最大值 和 最大值的次数，将最大值下沉到底部，直到nums长度为0
    var deep = findMaxDeep(stack)
    //console.log(deep)
    while(deep > 0){
        var max = findMax(deep)
        //console.log("max = ", max)
        var times = findTimes(max, deep)
        //console.log("times = ", times)
        // console.log("stack = ", stack)
        downMaxs(max, deep, times)
        deep = deep - times
    }
    return stack
}

function isEmpty(stack){
    if (stack.length == 0){
        return true
    } else {
        return false
    }
}

function findMaxDeep(){
    if (isEmpty(stack)){
        return 0
    } else {
       var num = stack.pop()
       var deep = findMaxDeep()
       stack.push(num)
       return deep + 1
    }
}

function findMax(deep){
    if (deep == 0){
        return Number.MIN_SAFE_INTEGER
    } else {
       var num = stack.pop()
       var max = findMax(deep - 1)
       stack.push(num)
       return Math.max(num, max)
    }
}

function findTimes(max,deep){
    if (deep == 0){
        return 0
    } else {
       var num = stack.pop()
       var times = findTimes(max, deep - 1)
       stack.push(num)
       return times + (num == max ? 1 : 0)
    }
}

function downMaxs(max, deep, times){
    // //console.log("\n",max,deep)
    if (deep == 0){
        for (var i = 0; i < times; i++){
             stack.push(max)
        }  
        return
    }
    var num = stack.pop()
    downMaxs(max, deep - 1, times)
    if (num != max){
       stack.push(num)
    }
}

var kkk= sort([3,7,9,3,6,9,6,102,8,2,1,44,33,6,-89,-67,102,22,34,56])
console.log(kkk)