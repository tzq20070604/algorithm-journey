// 将分组背包,根据同余原理 使用窗口进行优化，可以减少计算量，比如求在i组货物[vi,wi,ci]在背包容量是j的时候货物的最大值，
// 那么显然求到了i-1行的，背包容量在[j - ci * wi, j]区间中余数相等的最大值，
//在求 j + wi时，又求了背包容量在[j + wi - ci * wi, j + wi]区间中余数相等的最大值，显然这2个区间有重合，
// 可以维持一个单调队列窗口来求取最大值
// 未优化时间超时
const readline = require('readline').createInterface({input:process.stdin})
let lineNum = 0, num = 0
let n,weight,vArr=[],wArr=[],countArr=[],dp
readline.on('line',(line)=>{
   lineNum++
   if (lineNum == 1){
     [n,weight] = line.split(' ').map(Number)
     let buffer4 = new ArrayBuffer((weight + 1) * 8)
     dp = new Float64Array(buffer4)
   } else {
     let [v,w,c] = line.split(' ').map(Number)
     vArr.push(v)
     wArr.push(w)
     countArr.push(c)
   }
   if (lineNum == n + 1){
      f()
   }
})

function f(){
    for(let i = 1; i <= wArr.length; i++){
        for(let w = weight; w >= wArr[i-1]; w--){
            for (let k = 1; k <= countArr[i] && w- k * wArr[i] >= 0;k++){
                 dp[w] = Math.max(dp[w],dp[w-k*wArr[i]] + k*vArr[i])
            }
        }
    }
    console.log(dp[w])
    return dp[w]
}