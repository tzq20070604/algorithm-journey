const { read } = require('fs')

const rl = require('readline').createInterface({input:process.stdin})
var lineNo = 0
var nums = []
var res = []
rl.on('line',(line)=>{
    if (lineNo != 0){
       readNums(line)
    }
    lineNo++
})

rl.on('close', ()=>{
   // console.log(nums)
   sub()
   for (var i = 0; i < nums.length;i++){
       process.stdout.write(nums[i] + " ")
   }
})

function readNums(line){
   nums = []
   var arr = line.split(" ")
   for(var i = 0; i < arr.length; i++){
      nums.push(parseInt(arr[i]))
   }
}
function sub(){
    // 小 大 小，结尾不修正，这次使用一个r表示栈中元素的个数
    var len = nums.length
    var r = 0
    res = Array(len).fill(0)
    var stack = Array(len).fill(0)
    for (var i = 0; i < len; i++){
        while(r > 0 && nums[i] > nums[stack[r - 1]]){
            // 可以弹出
            nums[stack[--r]] = i + 1
        }
        stack[r++] = i
    }
    while(r > 0){
        nums[stack[--r]] = 0
    }
}

