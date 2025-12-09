const rl = require("readline").createInterface({ input: process.stdin });
let lineNum = 0
let s = ''
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
       s = line.trim()
       lessNum(s)
    }
})

function lessNum(s){
   let n = s.length
   let dp = Array(n).fill(0).map(()=>{
     return Array(n).fill(-1)
   })
   let res = f(0,n-1,s,dp)
   console.log(res)
}

// 有并列和包含 2种
function f(l,r,s,dp){
    if (r < l){
        return 0
    }
    if (r == l){
        return 1
    }
    if(dp[l][r] != -1){
        return dp[l][r]
    }
    let min = Infinity
    let c1 = (s[l] == "(" && s[r] == ")")
    let c2 = (s[l] == "[" && s[r] == "]")
    if (c1 || c2){
        min = Math.min(min,f(l+1,r-1,s,dp)) 
    }
    for(let k = l;k < r; k++){
        min = Math.min(min,f(l,k,s,dp) + f(k+1,r,s,dp))
    }
    dp[l][r] = min
    return min
}