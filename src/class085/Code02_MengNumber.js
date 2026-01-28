// const fs = require('fs')
// const path = require('path')
// let filePath = path.resolve(__dirname,'Code02_MengNumber.in')
// let stream = fs.createReadStream(filePath,{encoding:'utf8'})
// const rl = require('readline').createInterface({input:stream})
const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0
let aStr,bStr
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
       [aStr,bStr] = line.trim().split(/\s+/)
       //console.log(aStr,bStr)
    }
    let aa = stringMod(aStr,MOD)
    let bb = stringMod(bStr,MOD)
    //console.log(aa,bb)
    let ans = ((bb - f(bStr) + MOD) - (aa - f(aStr) + MOD)  + MOD + check(aStr)) % MOD 
    console.log(ans)
})

const MOD = 10**9 + 7
/**
 * [1,num] 上不存在回文的数量
 * @param {number} num 
 * @returns 
 */
function f(num){
    if (num.length <= 1){
        return Number(num)
    }
    let nums = num.split('').map(Number)
    let dp = Array(nums.length).fill(0).map(()=>{
       return Array(11).fill(0).map(()=>{
           return Array(11).fill(0).map(()=>{
               return Array(2).fill(-1)
           })
       })
    })
    // //console.log(nums)
    return recursion(0,10,10,0,nums,dp) 
}

/**
 * 非回文的长度
 * @param {number} cur 当前是第几位
 * @param {number} prepre 前前一位选择的数字是多少 10 表示未选择
 * @param {number} pre 前一位选择的数字是多少
 * @param {number} freeSel 当前是否能够自由选择 1 可以 0 不可以
 * @param {[number]} nums 这个是每一位数组
 * @param {[[[number]]]} dp 记忆本
 */
function recursion(cur,prepre,pre,freeSel,nums,dp){
   if (cur == nums.length){
      if (pre != 10){
        return 1
      } else {
        return 0
      }
   }
   if (dp[cur][prepre][pre][freeSel] != -1){
     return dp[cur][prepre][pre][freeSel]
   }
   let ans = 0
   let num = nums[cur]
   // 没有选择过
   if (pre == 10){
      //继续不选择,后面可以自由选择
      ans = (ans + recursion(cur + 1,10,10,1,nums,dp)) % MOD
      if (freeSel){
        // 选择
        for(let i = 1; i <= 9; i++){
            ans = (ans + recursion(cur + 1,10,i,1,nums,dp)) % MOD
        }
      } else {
        // 选择
        for(let i = 1; i < num; i++){
            ans = (ans + recursion(cur + 1,10,i,1,nums,dp)) % MOD
        }
        ans = (ans + recursion(cur + 1,10,num,0,nums,dp)) % MOD
      }
   } else { //选择过
    if (freeSel){ // 可自由选择
      // 选择
      for(let i = 0; i <= 9; i++){
         if (i != pre && i != prepre){
            ans = (ans + recursion(cur + 1,pre,i,1,nums,dp)) % MOD
         }
      }
    } else { // 不能自由选择
      // 选择
      for(let i = 0; i < num; i++){
         if (i != pre && i != prepre){
            ans = (ans + recursion(cur + 1,pre,i,1,nums,dp)) % MOD
         }
      }
      if (num != pre && num != prepre){
            ans = (ans + recursion(cur + 1,pre,num,0,nums,dp)) % MOD
      }
    }
   }
   dp[cur][prepre][pre][freeSel] = ans
   ////console.log(":",cur,prepre,pre,freeSel,ans)
   return ans
}

// 回文 返回1 非回文返回0
function check(numStr){
    let nums = numStr.split('').map(Number)
    for(let i = 1; i < nums.length;i++){
        if (nums[i] == nums[i-1]){
            return 1
        }
        if (i >= 2 && nums[i] == nums[i-2]){
            return 1
        }
    }
    return 0
}

// 如果不依赖 BigInt和第三方库，可以利用模运算的数学性质，通过处理大数字符串的每一位来计算结果
// 。其基本原理是：对于大数 N（表示为字符串）和模数 m，有公式 (a * b) mod m = [(a mod m) * (b mod m)] mod m和 (a + b) mod m = [(a mod m) + (b mod m)] mod m
// 。将大数视为十进制数，从高位到低位逐位处理，将当前结果乘以10再加上当前位的数字，然后立即对模数取余，从而始终在一个安全整数范围内进行运算
// 。
function stringMod(dividendStr, divisor) {
    let remainder = 0;
    for (let i = 0; i < dividendStr.length; i++) {
        // 将当前余数乘以10，加上当前位的数字
        let currentDigit = parseInt(dividendStr[i], 10);
        remainder = (remainder * 10 + currentDigit) % divisor;
    }
    return remainder;
}

// 其实就是求10**n对MOD取余
function getDpMod(n,MOD){
  let dp = Array(n + 1).fill(0)
  function f(n, MOD){
      if (n == 0){
         dp[0] = 1
         return 1
      } else {
         dp[n] = ((10 % MOD) * f(n-1, MOD)) % MOD
         return dp[n]
      }
  }
  f(n, MOD)
  return dp
}

let res = getDpMod(5,7)
console.log(res)

