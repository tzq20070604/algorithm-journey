/**
 * @param {number[][]} mat
 * @return {number}
 */
var numSubmat = function(mat) {
    var row = mat.length
    var col = mat[0].length
    var cur = []
    var ans = 0
    // 第几行做底
    for (var i = 0; i < row; i++){
        if (i == 0){
            cur = mat[0]
        } else {
            for (var j = 0; j < col;j++){
                if(mat[i][j] == 0){
                    cur[j] = 0
                } else {
                    cur[j]++
                }
            }
        }
        //console.log(cur)
        var sum = getRectNumber(cur)
        //console.log(sum)
        ans += sum
    }
    return ans
};

function getRectNumber(arr){
    var stack = []
    var count = 0
    for (var i = 0; i < arr.length; i++){
        while(stack.length > 0 && arr[i] <= arr[stack[stack.length - 1]]){
            var top = stack.pop()
            if (arr[i] != arr[top]){ // 结算
               count +=  getCount(stack,arr,i,top)
            } 
        }
        stack.push(i)
    }
    while(stack.length > 0){
        var top = stack.pop()
        count += getCount(stack,arr,arr.length,top)
    }
    return count
}

function getCount(stack,arr,i,top){
    var count = 0
    var l = stack.length > 0 ? stack[stack.length - 1]: -1
    var lValue = (l == -1 ? 0 :arr[l])
    var r = i
    var rValue = (i == arr.length ? 0: arr[i])
    var high = arr[top] - Math.max(lValue, rValue)
    var width = r - l - 1
    count += ((width * (width+1)*high)>>1)
    return count
}

