const readline = require('readline').createInterface({input:process.stdin})
let lineNum = 0
let n,w,vArr,wArr,countArr,dp
readline.on('line',(line)=>{
   lineNum++
   if (lineNum == 1){
     [n,w] = line.split(' ').map(Number)
     let buffer1 = new ArrayBuffer((n + 1) * 8)
     let buffer2 = new ArrayBuffer((n + 1) * 8)
     let buffer3 = new ArrayBuffer((n + 1) * 8)
     vArr = new Float64Array(buffer1)
     wArr = new Float64Array(buffer2)
     countArr =  new Float64Array(buffer3)
     let buffer4 = new ArrayBuffer((w + 1) * 8)
     dp = new Float64Array(buffer4)
   } else {
     let item = line.split(' ').map(Number)
     vArr[lineNum - 2] = item[0]
     wArr[lineNum - 2] = item[1]
     countArr[lineNum - 2] = item[2]
   }
   if (lineNum == n + 1){
      f()
   }
})

function f(){
    for(let group = 1; group <= n; group++){
        let [v1,w1,count1] = [vArr[group - 1],wArr[group - 1],countArr[group - 1]]
        for(let m = w; m >= 0; m--){
            // 每组选择的个数 0 
            for(let j = 1; j <= count1; j++){
                if (m >= j * w1){
                   dp[m] = Math.max(dp[m],dp[m-j * w1] + j* v1)
                }
            }
        }
    }
    console.log(dp[w])
    return dp[w]
}