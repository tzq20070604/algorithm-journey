/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
var makesquare = function(matchsticks) {
   let n = matchsticks.length
   let sum = 0
   let max = 0
   for(let i = 0; i < matchsticks.length;i++){
        sum += matchsticks[i]
        max = Math.max(max,matchsticks[i])
   }
   if (sum % 4 != 0){
      return false
   }
   if (sum / 4 < max){
      return false
   }
   let status = (1 << n) - 1
   let dp = Array(1 << n).fill(-1)
   return f(n,matchsticks,status,0,sum / 4,dp, sum / 4)
};

function f(n,matchsticks,status,ei,left,dp,edgeLength){
    if (ei == 4){
        return true
    }
    if (dp[status] != -1){
        return dp[status] == 1
    }
    if (left == 0){
        return f(n,matchsticks,status,ei + 1,edgeLength,dp,edgeLength)
    }
    let ans = false
    for(let i = 0; i < matchsticks.length; i++){
        // 没有用过，且比left要小或者相等
        if(((status>>i)&1 != 0) && (matchsticks[i] <= left)){
            if(f(n,matchsticks,status ^ (1 << i),ei,left - matchsticks[i],dp,edgeLength)){
                ans = true
                break;
            }
        }
    }
    dp[status] = ans ? 1 : -1
    return ans
}