/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function(s1) {
    let n = s1.length
   // 因为 l <= r，[l,r]依赖[l,r-1] [l+1,r] [l+1,r-1]
   let dp = Array(n).fill(0).map(()=>{
       return Array(n).fill(0)
   })
   // [l,r]
   for(let l = n-1; l>=0; l--){
       for(let r = l; r < n; r++){ 
          if (l == r){
              dp[l][r] = 1
          } else if (l + 1 == r){
              dp[l][r] = (s[l] == s[r] ? 2 : 1)
          } else {
              if (s[l] == s[r]){
                 dp[l][r] +=  dp[l + 1][r - 1] + 2
              } else {
                 dp[l][r] = Math.max(dp[l + 1][r],dp[l][r - 1])
              }
          }
       }
   }
   return dp[0][n-1]
};