// const Path = require('path')
// const FS = require('fs')
// const filePath = Path.resolve(__dirname,'Code01_BuyMonster.txt')
// const stream = FS.createReadStream(filePath,{encoding:'utf8'})
// const rl = require('readline').createInterface({input:stream})
const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0, n,arr=[],total = 0,totalMoney = 0
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
        [n] = line.trim().split(' ').map(Number)
    } else {
        let item = line.trim().split(' ').map(Number)
        total += item[0]
        totalMoney += item[1]
        arr.push(item)
    }
    if (lineNum == n + 1){
       compute4()
    }
})

function compute(){
   let dp = Array(arr.length+1).fill(0).map(()=>{
       return Array(total + 1).fill(-1)
   })
   let ans = f(0,0,dp)
   console.log(ans)
}

// 从0号怪兽开始，当前的能力是0，通过所有怪兽，最少的钱数
function f(index,p,dp){
   let ans = 0
   if (index == arr.length){
      ans = 0
   } else {
      if (dp[index][p] != -1){ 
         return dp[index][p]
      }
      let [power,money] = arr[index]
      if (p < power){ // 只能贿赂
         ans = f(index + 1, p + power,dp) + money
      } else {
          // 贿赂
          let ans1 =  f(index + 1, p + power,dp) + money
          // 不贿赂
          let ans2 =  f(index + 1, p, dp)
          ans = Math.min(ans1, ans2)
      }
   }
   dp[index][p] = ans
   return ans
}

function compute1(){
   let dp = Array(arr.length+1).fill(0).map(()=>{
       return Array(total + 1).fill(Infinity)
   })
   dp[0][0] = 0
   // dp[i][j] 表示通过前i个怪兽后能力正好是j，最少要花多少钱
   for(let i = 1; i <= arr.length;i++){
       let [power,money] = arr[i - 1]
       for(let j = 0; j <= total; j++){
          if (j >= power){// 可贿赂i-1，和不贿赂i-1
              // 不贿赂
              dp[i][j] =  dp[i - 1][j] 
              // 贿赂
              if (dp[i-1][j-power] != Infinity){
                 // 贿赂    
                 dp[i][j] = Math.min(dp[i][j], dp[i-1][j-power] + money)
              }
          } else { // 不能选择
              dp[i][j] = Infinity
          }
       }
   }
   let ans = Infinity
   for(let j = 0; j <= total; j++){
      ans = Math.min(ans, dp[arr.length][j])
   }
   console.log(ans)
}

function compute2(){
   let dp = Array(total + 1).fill(Infinity)
   dp[0] = 0
   // dp[i][j] 表示通过前i个怪兽后能力正好是j，最少要花多少钱
   for(let i = 1; i <= arr.length; i++){
       let [power,money] = arr[i - 1]
       for(let j = total; j >= 0; j--){
          if (j >= power){// 可贿赂i-1，和不贿赂i-1
              // 不贿赂
              // 贿赂
              if (dp[j-power] != Infinity){
                 // 贿赂    
                 dp[j] = Math.min(dp[j], dp[j-power] + money)
              }
          } else { // 不能选择
              dp[j] = Infinity
          }
       }
   }
   let ans = Infinity
   for(let j = 0; j <= total; j++){
      ans = Math.min(ans, dp[j])
   }
   console.log(ans)
}

function compute3(){
    // 通过前i个怪兽，花钱正好为j时能获得的最大能力值，如果不能通过返回-1
   let dp = Array(arr.length+1).fill(0).map(()=>{
       return Array(totalMoney + 1).fill(-1)
   })
   for(let j = 0; j <= totalMoney;j++){
     dp[0][j] = 0
   }
   // dp[i][j] 表示通过前i个怪兽后花钱正好是j，最大能获得的能量
   for(let i = 1; i <= arr.length;i++){
       let [power,money] = arr[i - 1]
       for(let j = 0; j <= totalMoney; j++){
          let ans = -1
          // 最大能量是通过贿赂得到的
          if (j >= money && dp[i-1][j - money] != -1){
              ans = Math.max(ans,dp[i-1][j - money] + power) 
          }
          // 最大能量是不贿赂得到
          if (dp[i-1][j] >= power){// 可贿赂i-1，和不贿赂i-1
              // 不贿赂
              ans = Math.max(ans,dp[i - 1][j])
          }
          dp[i][j] = ans
       }
   }
   let res = Infinity
   for(let j = 0; j <= totalMoney; j++){
      if (dp[arr.length][j] != -1){
           res = j
           break
      }
   }
   console.log(res)
}

function compute4(){
    // 通过前i个怪兽，花钱正好为j时能获得的最大能力值，如果不能通过返回-1
   let dp = Array(totalMoney + 1).fill(0)
   // dp[i][j] 表示通过前i个怪兽后花钱正好是j，最大能获得的能量
   for(let i = 1; i <= arr.length;i++){
       let [power,money] = arr[i - 1]
       for(let j = totalMoney; j >= 0; j--){
          let ans = -1
          // 最大能量是通过贿赂得到的
          if (j >= money && dp[j - money] != -1){
              ans = Math.max(ans,dp[j - money] + power) 
          }
          // 最大能量是不贿赂得到
          if (dp[j] >= power){// 可贿赂i-1，和不贿赂i-1
              // 不贿赂
              ans = Math.max(ans,dp[j])
          }
          dp[j] = ans
       }
   }
   let res = Infinity
   for(let j = 0; j <= totalMoney; j++){
      if (dp[j] != -1){
           res = j
           break
      }
   }
   console.log(res)
}