const rl = require("readline").createInterface({ input: process.stdin });
let lineNum = 0
let count = 0, arr, MOD = 19650827
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
       count = Number(line.trim())
    } else {
       arr = line.trim().split(' ').map(Number)
       heightNum(count,arr)
    }
})

function heightNum(count,arr){
    let n = arr.length
    let dp = Array(count).fill(0).map(()=>{
        return Array(count).fill(0).map(()=>{
            // 0表示左侧是最后进， 1表示右侧最后进
            return Array(2).fill(-1)
        })
    })
    let res = (f(0,n-1,0,arr,dp) + f(0,n-1,1,arr,dp))%MOD
    console.log(res)
}

function f(l,r,last,arr,dp){
    if (l > r){
        return 0
    }
    if (l == r){
        return 1
    }
    if (r == l + 1){
        if (arr[l] < arr[r]){
            return 1
        } else {
            return 0
        }
    }
    if (dp[l][r][last] != -1){
        return dp[l][r][last]
    }
    let res = 0
    // 表示左侧是最后进的
    if (last == 0){
       let cur = arr[l]
       let left = arr[l+1]
       let right = arr[r]
       // 能排到左侧，说明他比倒数第二进的数字小
       if (cur < left){ // 如果左侧倒数第二进
           res =(res + f(l+1,r,0,arr,dp))%MOD
       }
       if (cur < right){ // 如果右侧倒数第二进
           res = (res + f(l+1,r,1,arr,dp))%MOD
       }
    } else { // 表示右侧是最后进的
       let cur = arr[r]
       let left = arr[l]
       let right = arr[r-1]
       if (cur > left){
          res = (res + f(l,r-1,0,arr,dp))%MOD
       }
       if (cur > right){
           res = (res + f(l,r-1,1,arr,dp))%MOD
       }
    }
    dp[l][r][last] = res
    return res
}
