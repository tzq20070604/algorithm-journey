/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function(strs, m, n) {
    let dp = Array(strs.length + 1).fill(0).map(()=>{
         return Array(m+1).fill(0).map(()=>{
              return Array(n+1).fill(0)
        })
    })
    for(let i = 1; i <= strs.length; i++){
        let str = strs[i-1]
        let [zero,one] = calculate0or1(str)
        // 前i个字符集，在0不大于j,1不大于k的情况下的方法数
        for(let j = 0; j <= m; j++){
            for(let k = 0; k <= n; k++){
                dp[i][j][k] = dp[i-1][j][k]
                if (zero <= j && one <= k){
                    dp[i][j][k] = Math.max(dp[i-1][j][k],1 + dp[i-1][j-zero][k-one])
                }
            }
        }
    }
    return dp[strs.length][m][n]
};

function calculate0or1(str){
    let zero = 0
    let one = 0
    for(let i =0; i < str.length; i++){
       let ch = str[i]
       if (ch == '0'){
          zero++
       } else {
          one++
       }
    }
    return [zero,one]
}