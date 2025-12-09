// x * x 发生了溢出
const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0, n=0
rl.on('line',(line)=>{
    lineNum++
    line = line.trim()
    if (lineNum == 1){
        n =  Number(line)
    } else {
        let ans = millerRabin(Number(line)) 
        console.log(ans ? "Yes" : "No")
    }
})
// 最关键的风险是，当可用的测试基数 nums[i]少于算法推荐的最小数量时，测试的可靠性会急剧下降。
// 质数的个数代表测试次数
// 如果想增加测试次数就继续增加更大的质数
let nums = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
function millerRabin(n){
     if (n <= 2){
        return n == 2
     }
     if ((n & 1) == 0){
        return false
     }
     if (n <= nums[nums.length - 1]){
        return nums.includes(n)
     }
     for(let i = 0;i < nums.length && nums[i] <= n; i++){
        if (witness(nums[i], n)){
            return false
        }
     }
     return true
}

/**
 * 
 * @param {number} a 质数因子
 * @param {number} n 需要判断的是否是质数
 * 你的 Miller-Rabin 算法实现（witness和 power函数）是正确的。主要问题在于调用它的循环条件过于严格，可能在测试小整数时因使用的测试基数不足而增加误判为质数的风险。修改循环逻辑以确保尽可能使用更多的测试基数，可以显著提高算法的可靠性。
 */
function witness(a, n){
   let u = n - 1
   let t = 0
   while((u & 1) == 0){
     t++
     u >>= 1
   }
   let x1 = power(a,u,n),x2
   for(let i = 1; i <= t; i++){
      x2 = power(x1,2,n)
      if (x2 == 1 && x1 != 1 && x1 != n-1){
         return true
      }
      x1 = x2
   }
   if (x1 != 1){
      return true
   }
   return false
}

/**
 * 乘法快速幂 取模
 * @param {number} a 
 * @param {number} p 
 * @param {number} mod 
 */
function power(a, p, mod){
    let ans = 1
    while(p > 0){
        if ((p & 1) == 1){
            ans = (ans * a) % mod
        }
        a = (a * a) % mod
        p >>= 1
    }
    return ans
}

// console.log(millerRabin(101))