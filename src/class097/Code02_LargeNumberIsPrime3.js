// 有3个测试用例通不过，不知道为什么？？？ 知道可以联系我 525835890@qq.com
const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0
rl.on('line',(line)=>{
    lineNum++
    line = line.trim()
    if (lineNum != 1){
        let ans = millerRabin(BigInt(line)) 
        console.log(ans ? "Yes" : "No")
    }
})
// 最关键的风险是，当可用的测试基数 nums[i]少于算法推荐的最小数量时，测试的可靠性会急剧下降。
// 质数的个数代表测试次数
// 如果想增加测试次数就继续增加更大的质数
let nums = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n, 53n, 59n, 61n, 67n, 71n, 73n, 79n, 83n, 89n, 97n]
function millerRabin(m){
     if (m <= 2n){
        return m == 2n
     }
     if (m % 2n == 0n){
        return false
     }
     if (m <= nums[nums.length - 1]){
        return nums.includes(m)
     }
     for(let i = 0;i < nums.length && nums[i] <= m; i++){
        if (witness(nums[i], m)){
            return false
        }
     }
     return true
}

/**
 * 
 * @param {number} a 质数因子
 * @param {number} m 需要判断的是否是质数
 * 你的 Miller-Rabin 算法实现（witness和 power函数）是正确的。主要问题在于调用它的循环条件过于严格，可能在测试小整数时因使用的测试基数不足而增加误判为质数的风险。修改循环逻辑以确保尽可能使用更多的测试基数，可以显著提高算法的可靠性。
 */
function witness(a, m){
   let u = m - 1n
   let t = 0n
   while((m % 2n) == 0){
     t = t + 1n
     u = u / 2n
   }
   let x1 = power(a,u,m),x2
   for(let i = 1n; i <= t; i = i + 1n){
      x2 = power(x1,2n,m)
      if (x2 == 1n && x1 != 1n && x1 != m-1n){
         return true
      }
      x1 = x2
   }
   if (x1 != 1n){
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
    let ans = 1n
    while(p > 0n){
        if ((p % 2n) == 1n){
            ans = (ans * a) % mod
        }
        a = (a * a) % mod
        p = p / 2n
    }
    return ans
}