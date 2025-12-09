/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function(strs, m, n) {
    let dp = Array(m+1).fill(0).map(()=>{
       return Array(n+1).fill(0).map(()=>{
           return Array(strs.length + 1).fill(-1)
       })
    })
    // 当前字符串选与不选
    return f(strs,0,m,n,dp)
};

// 从index出发，还剩余m个0和n个1，最大的子集合数量
function f(strs,index,m,n,dp){
    if (index == strs.length){
        return 0
    }
    if (dp[m][n][index] != -1){
        return dp[m][n][index]
    }
    let res = 0
    let str = strs[index]
    let [zero,one] = calculate0or1(str)
    // 选当前字符
    if (zero <= m && one <= n){
       res = 1 + f(strs,index+1,m-zero,n-one,dp)
    }

    // 不选当前字符
    res = Math.max(res, f(strs,index+1,m,n,dp))
    dp[m][n][index] = res
    return res
}

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