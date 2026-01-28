// const readLine = require('readline').createInterface({input:process.stdin})
// let lineNum = 0, time, n, arr 
// readLine.on('line',(line)=>{
//     lineNum++
//     if (lineNum == 1){
//         [time, n] = line.split(' ').map(Number)
//         arr = []
//     } else {
//        arr.push(line.split(' ').map(Number)) 
//     }
//     if (lineNum == 1 + n){
//         let res = calculate(time, arr)
//     }
// })

function calculate(time,arr){
    let dp = new Array(arr.length).fill(0).map(()=>{
        return new Array(time+1).fill(-1)
    })
    return recursion(0,time,arr,dp)
}

function recursion(index,time, arr, dp){
    if (index == arr.length){
        return 0
    }
    if (dp[index][time] != -1){
        return dp[index][time]
    }
    let [itemTime, itemValue] = arr[index]
    let res = 0
    if (time >= itemTime){
       res = recursion(index + 1, time - itemTime,arr,dp) + itemValue
    } 
    res = Math.max(res,recursion(index + 1, time, arr, dp))  
    dp[index][time] = res
    return res
}

let res = calculate(70,[[71,100],[69,1],[1,2]])
console.log(res)