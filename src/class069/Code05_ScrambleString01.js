/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {
   let n = s1.length
   if (n != s2.length){
     return false
   }
   if (s1.split('').sort().join('') !== s2.split('').sort().join('')) {
     return false;
    }
    if(n == 0){
        return true
    }

   // -1 表示 没有填写  0 表示不能变换成功  1 表示能变换成功
   let dp = Array(n).fill(0).map(()=>
         Array(n).fill(0).map(()=>Array(n + 1).fill(false)))

   // 长度为 1 的情况
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
           dp[i][j][1] = s1[i] === s2[j];
        }
    }

   for(let len = 2; len <= n; len++){
      for (let i = 0; i <= n-len; i++){
        for (let j = 0; j <= n-len; j++){
            for (let k = 1; k < len; k++){
                if (dp[i][j][k] && dp[i+k][j+k][len - k]){
                    dp[i][j][len] = true
                    break;
                }
            }
            if (dp[i][j][len]){
                continue;
            }
            // 反向
            for (let k = 1; k < len; k++){
                if (dp[i][j+len-k][k] && dp[i+k][j][len - k]){
                    dp[i][j][len] = true
                    break;
                }
            }
        }
     }
   }
   return dp[0][0][n]
};

// let str1 =
// "acccacbcaaaabbaaa"
// let str2 =
// "aacaacbabacbacaac"
// let res = isScramble(str1,str2)
// console.log(res)


