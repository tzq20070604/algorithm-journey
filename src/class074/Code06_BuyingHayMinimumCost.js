const fs = require('fs')
let lines = fs.readFileSync('/dev/stdin','utf8').trim().split('\n')
let [N,H] = lines[0].trim().split(' ').map(Number)
lines = lines.slice(1).map((item)=>{
    return item.trim().split(' ').map(Number)
}) 
let max = 0
for(let i = 0; i < lines.length;i++){
    let [v,w] = lines[i]
    max = Math.max(v,max) 
}
max = H + max


function f1(){
    let dp = Array(N+1).fill(0).map(()=>{
      return Array(max+1).fill(Infinity)
    })
    // base case
    dp[0][0] = 0
    for(let i = 1; i <= N; i++){
        dp[i][0] = 0
    }

    for(let i = 1; i <= N; i++){
        let [v,w] = lines[i-1]
        for(let j = 1; j <= max; j++){
            dp[i][j] = dp[i-1][j]
            if (j >= v && dp[i][j-v] != Infinity){
            dp[i][j] = Math.min(dp[i][j],dp[i][j-v] + w)
            }
        }
    }
    let cost = Infinity
    for(let i = H; i <= max; i++){
        if (dp[N][i] != Infinity){
            cost = Math.min(cost, dp[N][i])
        }
    }
    console.log(cost)
}
// 空间压缩
function f2(){
    let dp = Array(max+1).fill(Infinity)
    // base case
    dp[0] = 0
    for(let i = 1; i <= N; i++){
        let [v,w] = lines[i-1]
        for(let j = 1; j <= max; j++){
            if (j >= v && dp[j-v] != Infinity){
               dp[j] = Math.min(dp[j],dp[j-v] + w)
            }
        }
    }
    let cost = Infinity
    for(let i = H; i <= max; i++){
        if (dp[i] != Infinity){
            cost = Math.min(cost, dp[i])
        }
    }
    console.log(cost)
}
// f1()
f2()

