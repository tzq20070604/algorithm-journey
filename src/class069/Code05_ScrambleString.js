/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {
   str1 = s1
   str2 = s2
   l1 = str1.length
   l2 = str2.length
   if (l1 != l2){
     return false
   }
   // -1 表示 没有填写  0 表示不能变换成功  1 表示能变换成功
   dp = Array(l1).fill(0).map(()=>{
      return Array(l1).fill(0).map(()=>{
         return Array(l1 + 1).fill(-1)
      })
   })
   return f(0,0,l1,dp)
};

// 枚举 然后正反匹配
let str1, str2,l1,l2,dp
function f(i,j,l){
    if (l >= l1+1 || l == 0){
        return 1
    } else if (l == 1){
        return str1[i] == str2[j] ? 1 : 0
    } else {
        if (dp[i][j][l] != -1){
            return dp[i][j][l]
        }
        // 同向
        for (let k = 1; k < l; k++){
          res = f(i,j,k) && f(i + k,j + k, l - k)
          if (res == 1){
             dp[i][j][l] = 1
             return dp[i][j][l]
          }
        }
        // 反向
        for (let k = 1; k < l; k++){
          res = f(i,j + l - k, k) && f(i + k, j, l - k)
          if (res == 1){
             dp[i][j][l] = 1
             return dp[i][j][l]
          }
        }
        dp[i][j][l] = 0
        return dp[i][j][l]
    }
}