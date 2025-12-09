/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    anser = 0
    str = s
    n = str.length
    dp = Array(str.length + 1).fill(-1)
    for(let j = str.length;j >= 0;j--){
        calculate(j)
    }
    return anser
};

let str,dp,anser = 0,n = 0
function calculate(index){
    if (index == n - 1 && index == n){
        anser = Math.max(anser, 0)
        dp[index] = 0
        return 0
    }
    if (dp[index] != -1){
        return dp[index]
    }
    let res = 0
    if (str[index] == "("){
        if (index + 1 < n){
            if (str[index + 1] == ")"){
               res = 2 + calculate(index + 2)          
            } else {
               let length = calculate(index + 1)
               if (length > 0 && index + length + 1 < n && str[index + length + 1] == ")"){
                  res = length + 2 + calculate(index + length + 2)
               }
            }
        } 
    }
    console.log(res)
    dp[index] = res
    anser = Math.max(anser, res)
    return res
}