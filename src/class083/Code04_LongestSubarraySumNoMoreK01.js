const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0,sum,nums,sumEndArr,sumEndIndexArr
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
      [_, sum] = line.trim().split(' ').map(Number)
    } else {
      nums = line.trim().split(' ').map(Number)
      let res = compute()
      console.log(res)
    }
})

function compute(){
    let n = nums.length
    // sumEndArr[i] 表示从i开始出发 累积和最小 是多少
    // sumEndIndexArr[i] 表示从i开始出发，累积和最小时的下标（包括）
    sumEndArr = Array(n).fill(0)
    sumEndIndexArr = Array(n).fill(0)
    sumEndArr[n-1] = nums[n-1]
    sumEndIndexArr[n-1] = n-1
    for(let i = n-2; i >= 0;i--){
        if(sumEndArr[i+1] <= 0){
            sumEndArr[i] = nums[i] + sumEndArr[i+1]
            sumEndIndexArr[i] =  sumEndIndexArr[i+1]
        } else {
            sumEndArr[i] = nums[i]
            sumEndIndexArr[i] = i
        }
    }
    let res = 0
    // 相当以i开头和不以i开头 2种选择
    for(let i =0, end = i, total = 0; i < nums.length;){
        while(end < nums.length && total + sumEndArr[end] <= sum){
            total += sumEndArr[end]
            res = Math.max(res, sumEndIndexArr[end] - i + 1)
            end = sumEndIndexArr[end] + 1
        } 
        i++
        end = i
        total = 0
    }
    return res
}