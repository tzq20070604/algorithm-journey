const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
let lineNum = 0
let vArr = new Array(1e4+5).fill(0)
let wArr = new Array(1e4+5).fill(0)
let dp = new Array(1e7+5).fill(0)
let t,m
readline.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
       [t,m] = line.trim().split(' ').map(Number)
    } else {
       [vArr[lineNum-2],wArr[lineNum-2]] = line.trim().split(' ').map(Number)
    }
    if (lineNum == m + 1){
        f()
        readline.close()
    }
})

function f(){
   if (m === 1) {
     console.log(Math.floor((t / vArr[0])) * wArr[0])
     return;
  }
   for(let i = 1; i <= m; i++){
      let v = vArr[i-1]
      let w = wArr[i-1]
      for(let j = v; j <= t; j++){
         dp[j] = Math.max(dp[j], dp[j - v] + w)
      }
   }
   console.log(dp[t])
}