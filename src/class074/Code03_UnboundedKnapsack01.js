// 二进制优化
const fs = require('fs')
let arr = fs.readFileSync('/dev/stdin','utf8').trim().split('\n').map((item)=>{return item.trim().split(' ').map(Number)})
let [t,m] = arr[0]
arr = arr.slice(1)
let vArr = []
let wArr = []
for(let i = 0; i < m; i++){
   let [time, value] = arr[i]
   let count = Math.ceil(t / time)
   let j = 1
   while(j <= count){
      count -= j
      vArr.push(j * time)
      wArr.push(j * value)
      j = (j << 1)
   }
   if (count > 0){
      vArr.push(count * time)
      wArr.push(count * value)
   }
}
let dp = new Array(t + 1).fill(0)
for(let i = 1; i <= vArr.length;i++){
    let v = vArr[i-1]
    let w = wArr[i-1]
    for(let time=t; time >= v; time--){
        dp[time] = Math.max(dp[time],dp[time-v] + w)
    }
}
console.log(dp[t])