// 这个是会员题目，无法验证，只举例验证一组数据 [6,-3,3,-3,3,-6]
/**
 * 
 * @param {[Number]} transactions 
 */
var minTransfers = function(transactions){
   transactions = transactions.filter((value)=>{return value != 0})
   let n = transactions.length
   let max = (1 << n)
   let satify = max - 1
   let dp = Array(max).fill(-1)
   let res = transactions.length - f(0,0,satify,transactions,dp)
   return res
}
// 累加和为sum的数组，还有status没有拆分，能够凑成和为0的集合最大数量
function f(status,sum,satify,transactions,dp){
   if (status == satify){
      return 0
   }
   if (dp[status] != -1){
     return dp[status]
   }
   let ans = 0
   if (sum == 0){
      for(let i = 0; i < transactions.length;i++){
          if (((status >> i) & 1) == 0){// 这个没有使用
             ans = f(status | (1 << i),sum - transactions[i],satify,transactions,dp) + 1
             break;
          }
      }
   } else {
      for(let i = 0; i < transactions.length;i++){
        // 这里一定要加上()
          if (((status >> i) & 1) == 0){// 这个没有使用
             let tmp = f(status | (1 << i),sum - transactions[i],satify,transactions,dp)
             ans = Math.max(ans,tmp)
          }
      }
   }
   dp[status] = ans
   return ans
}

let nums1 = [6,-3,3,0,-3,3,-6,0]
let res1 = minTransfers(nums1)
console.log(res1)

let nums2 = [6,4,-5,-5,2,2,-4]
let res2 = minTransfers(nums2)
console.log(res2)