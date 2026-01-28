/**
 * @param {number} maxChoosableInteger
 * @param {number} desiredTotal
 * @return {boolean}
 */
var canIWin = function(maxChoosableInteger, desiredTotal) {
    let max = (1 << (maxChoosableInteger + 1))
    if (desiredTotal <= 0){
        return true
    }
    if (maxChoosableInteger * (maxChoosableInteger + 1) < 2 * desiredTotal){
        return false
    }
    let status = max - 1
    let dp = Array(max).fill(0)
    let res = f(maxChoosableInteger,status,desiredTotal,dp)
    return res
};

//当前的先手，在还有left的未达到的情况下，在status中有可挑选的中挑选,是否能稳赢
function f(n,status,left,dp){
    if(left <= 0){
        return false
    } 
    if (dp[status]!= 0){
        return dp[status] == 1
    }
    let ans = false
    for(let i = 1; i <= n; i++){
        if (((status >> i) & 1 == 1) && !f(n,status ^(1 << i),left - i,dp)){
            ans = true
            break;
        }
    }
    dp[status] = ans? 1 : 0
    return ans
}