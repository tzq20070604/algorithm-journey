/**
 * 空间压缩
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function(strs, m, n) {
    let dp = Array(m+1).fill(0).map(()=>{
         return Array(n+1).fill(0)
    })
    for(let i = 1; i <= strs.length; i++){
        let str = strs[i-1]
        let [zero,one] = calculate0or1(str)
        // 后i个字符串，在0不大于j,1不大于k的情况下的方法数
         for(let j=m; j >=0 && zero <= j; j--){
            for(let k=n; k >= 0 && one <= k; k--){
                dp[j][k] = Math.max(dp[j][k],1 + dp[j-zero][k-one])
            }
        }
    }
    return dp[m][n]
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