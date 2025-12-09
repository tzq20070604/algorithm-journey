const fs = require('fs')
const arr = fs.readFileSync('/dev/stdin','utf8').trim().split('\n').map((item)=>{return item.split(' ').map(Number)})
let v,w,time
let [t,m] = arr[0]
let buffer = new ArrayBuffer((t + 1) * 8)
let dp = new Float64Array(buffer)
f(m,t,dp)
function f(m,t,dp){
    for(let i = 2; i <= m+1;i++){
        [v,w] = arr[i-1]
        for(time=v; time <= t; time++){
            dp[time] = Math.max(dp[time],dp[time-v] + w)
        }
    }
    console.log(dp[t])
    return dp[t]
}