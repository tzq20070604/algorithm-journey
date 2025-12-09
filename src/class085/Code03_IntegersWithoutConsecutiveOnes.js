/**
 * @param {number} n
 * @return {number}
 */
var findIntegers = function(n) {
   let dp = Array(32).fill(0).map(()=>{
     return Array(3).fill(0).map(()=>{
        return Array(2).fill(-1)
     })
   })
   return f(31,2,0,n,dp) 
};

/**
 * 
 * @param {number} cur 当前的位数 从31到0
 * @param {number} pre 0前面选择了0 1前面选择了1 2前面没有选择
 * @param {number} freeSel 前面是否能够自由选择
 * @param {number} n 这个数字
 */
function f(cur,pre,freeSel,n,dp){
    if (cur == -1){
        return 1
    }
    if (dp[cur][pre][freeSel] != -1){
        return dp[cur][pre][freeSel]
    }
    let ans = 0
    let num = ((n >> cur) & 1)
    if (pre == 2){ // 首位
      if(num == 1){
        // 选择1
        ans += f(cur-1,1,0,n,dp)

        // 选择0
        ans += f(cur-1,0,1,n,dp)
      } else {
        ans += f(cur-1,0,0,n,dp)
      }
    } else if (pre == 1){ // 前面选择了1
        if (freeSel){
            ans += f(cur-1,0,1,n,dp)
        } else {
            if (num == 1){
               ans += f(cur-1,0,1,n,dp)
            } else {
               ans += f(cur-1,0,0,n,dp)
            }
        }
    } else {  // 前面选择了0
        if (freeSel){
            ans += f(cur-1,0,1,n,dp)
            ans += f(cur-1,1,1,n,dp)
        } else {
            if (num == 1){
               ans += f(cur-1,1,0,n,dp)
               ans += f(cur-1,0,1,n,dp)
            } else {
               ans += f(cur-1,0,0,n,dp)
            }
        }
    }
    dp[cur][pre][freeSel] = ans
    return ans
}