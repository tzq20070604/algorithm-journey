/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function(s) {
    let n = s.length
   // 因为 l <= r，[l,r]依赖[l,r-1] [l+1,r] [l+1,r-1]
   // 表示每一行的结果
   let dp = Array(n).fill(0)
   let leftdownCur = 0
   let leftdownPre = 0
   // [l,r]，显然还是从最后一行开始
   for(let l = n-1; l >= 0; l--){
       // 更新当前l行 r列
       for(let r = l; r < n; r++){
          // 先取旧行的值，在下一轮使用
          leftdownCur = dp[r]
          if (r == l){ // 用不了左下
             dp[r] = 1
          } else if (r == l + 1){ // 用不了左下，但是可能成为上一行的左下
             dp[r] = (s[r] == s[l])? 2 : 1
          } else {
            // 左和下都好说，左下如何保留? 每一轮开始的时候leftdown都为1
            if (s[r] == s[l]){
              dp[r] = leftdownPre + 2
            } else {
              dp[r] = Math.max(dp[r],dp[r-1])
            }
          }
          leftdownPre = leftdownCur
       }
   }
   return dp[n - 1]
};