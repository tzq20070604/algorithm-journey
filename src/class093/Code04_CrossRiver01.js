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
      let ans = compute1(arr)
      console.log(ans)
    }
})

function compute1(arr){ 
    //2个最小者A，B一起乘船到对岸，A带船回来，然后2个最大者C、D一起乘船，B带船回来
    //1个最大者E和一个最小者F一起乘船到对岸，最小者F回来
    let dp = Array(arr.length).fill(0)
    for(let end = 0; end < arr.length; end++){
        if (end == 0){
            dp[end] = arr[end]
        } else if (end == 1){
            dp[end] = Math.max(arr[end - 1], arr[end])
        } else {
            let res1 =  arr[0] + arr[end] + arr[1] * 2 + dp[end - 2]
            let res2 =  arr[end] + arr[0] + dp[end - 1]
            dp[end] = Math.min(res1, res2)
        }
    }
    return dp[arr.length - 1]
}
