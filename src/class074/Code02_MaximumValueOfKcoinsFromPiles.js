/**
 * @param {number[][]} piles
 * @param {number} k
 * @return {number}
 */
var maxValueOfCoins = function(piles, k) {
    let len = piles.length
    let dp = Array(len + 1).fill(0).map(()=>Array(k+1).fill(-1))
    let presum = Array(len).fill(0).map(()=>{return []})
    for(let i = 0; i < piles.length; i++){
        let all = 0
        for(let j = 0; j < piles[i].length; j++){
            all += piles[i][j]
            presum[i].push(all)
        }
    }
    return f(piles.length,dp,k,piles,presum)
};

// 前几个的意思
function f(group,dp,limitK,piles,presum){
   if(limitK == 0 || group == 0){
      return 0
   }
   if(dp[group][limitK] != -1){
     return dp[group][limitK]
   }
   // 不取
   let res = f(group - 1,dp,limitK,piles,presum)
   //前group组取i个的最大值
   for(let i = 1; i <= Math.min(limitK,piles[group - 1].length); i++){
        res = Math.max(res,presum[group - 1][i-1] + f(group - 1,dp,limitK - i,piles,presum))
   }
   dp[group][limitK] = res
   return res
}