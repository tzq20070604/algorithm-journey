// 选择k个数字使得两集合累加和相差不超过1
// 给定一个正数n，表示1~n这些数字都可以选择
// 给定一个正数k，表示要从1~n中选择k个数字组成集合A，剩下数字组成集合B
// 希望做到集合A和集合B的累加和相差不超过1
// 如果能做到，返回集合A选择了哪些数字，任何一种方案都可以
// 如果不能做到，返回长度为0的数组
// 2 <= n <= 10^6
// 1 <= k <= n
// 来自真实大厂笔试，没有测试链接，用对数器验证
const pickNumbersClosedSum = function(n, k){
   let sum = ((n * (n+1)) >> 1)
   let aim = (sum >> 1)
   let ans = f(n,k,aim)
   // (aim & 1) == 1 累加和为奇数，才有可能是奇数+偶数
   if (ans.length == 0 && (aim & 1) == 1){
      ans = f(n,k,aim + 1)
   }
   return ans
}

function f(n,k,aim){
    // 1到k 
    let min = (((k + 1) * k) >> 1)
    let max = (((n + n - k + 1) * k) >> 1)
    if (aim < min || aim > max){
        return []
    }
    let range = n - k
    // 至少提升几轮 4.3轮，就是说有4个被从最小移到最大，另外一个没有移到，其余不变
    let d = (aim - min) % range
    let count = Math.floor((aim - min - d) / range)
    let left = aim - min - count * range
    console.log(aim,range,d,count,left)
    let ans = []
    if (d == 0){
      // 前面k - count个不需要动，后面count个需要移动range
      for(let i = 1;i <= k; i++){
         if (i <= k -count){
            ans.push(i)
         } else {
            ans.push(i + range)
         }
      }
    } else {
      // 前面k - count - 1 不用动，k - count 移动 left，后面count个需要移动range
       for(let i = 1;i <= k; i++){
          if (i <= k - count - 1){
            ans.push(i)
         } else if (i == k - count) {
            ans.push(i + left)
         } else {
            ans.push(i + range)
         }
       }
    }
    return ans
}

let res = pickNumbersClosedSum(100,4)
console.log(res)