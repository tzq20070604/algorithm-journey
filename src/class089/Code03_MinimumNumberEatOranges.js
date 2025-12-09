/**
 * @param {number} n
 * @return {number}
 */
var minDays = function(n) {
    let arr = [0,1,2,2]
    let dp = {}
    return f(n,dp,arr)
};

function f(m,dp,arr){
   if (m <= 3){
        dp[m] = arr[m]
        return arr[m]
   }
   if (dp[m] != undefined){
     return dp[m]
   }
   let ans = Infinity
   // 最小值只有可能是向下找到一个最近的能被3整除的进行加速，向下找到一个最近的能被2整除的进行加速
   ans = Math.min(ans, m % 2 + 1 + f((m - (m % 2)) / 2, dp, arr))
   ans = Math.min(ans, m % 3 + 1 + f((m - (m % 3)) / 3, dp, arr))
   dp[m] = ans
   return ans
}