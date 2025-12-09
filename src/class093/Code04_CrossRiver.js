// 测试链接 : https://www.luogu.com.cn/problem/P1809
const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0, arr = [], n = 0
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
       n = parseInt(line.trim())
    } else {
       arr.push(parseInt(line.trim()))
    }
    if (lineNum == n + 1){
      let ans = compute(arr)
      console.log(ans)
    }
})

function compute(arr){ 
    //2个最小者A，B一起乘船到对岸，A带船回来，然后2个最大者C、D一起乘船，B带船回来
    //1个最大者E和一个最小者F一起乘船到对岸，最小者F回来
    let dp = Array(arr.length).fill(0).map(()=>{
        return Array(arr.length).fill(-1)
    })
    return f(0, arr.length - 1,arr,dp)

}

// [st,end]范围内人要坐船，且船也在东岸.分2种情况尝试
//2个最小者A，B一起乘船到对岸，A带船回来，然后2个最大者C、D一起乘船，B带船回来
//1个最大者E和一个最小者F一起乘船到对岸，最小者F回来
function f(st,end,arr,dp){
    if (st == end){
       return arr[st]
    } else if (st > end){
       return 0
    } else {
       if (dp[st][end] != -1){
         return dp[st][end]
       } else {
         if (st + 1 == end){
           let res = Math.max(arr[st], arr[end])
           dp[st][end] = res
           return res
         } else if (st + 2 == end){
            let res = arr[st] + arr[st+1] + arr[st+2]
            dp[st][end] = res
            return res 
         } else {
           let res1 =  arr[st] + arr[end] + arr[st + 1] * 2 + f(st,end - 2, arr,dp)
           let res2 =  arr[end] + arr[st] + f(st,end-1,arr,dp)
           let res = Math.min(res1, res2)
           dp[st][end] = res
           return res 
         }
       }
    }
}
