/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
   let dp = Array(prices.length).fill(0).map(()=>{
       return Array(2).fill(-1)
   })
   return f(0,0,prices,fee,dp)
};

function f(index,hasStock,prices,fee,dp){
    if (index == prices.length){
        return 0
    }
    if (dp[index][hasStock] != -1){
        return dp[index][hasStock]
    }
    let res = 0
    if (hasStock){ //有股票
        // 卖和不卖
       res = f(index + 1, 0,prices,fee,dp) + prices[index]
       res = Math.max(res,f(index+1,1,prices,fee,dp))
    } else { //没有股票
       // 买
       // 不买
       res = f(index + 1, 1,prices,fee,dp) - prices[index] - fee
       res = Math.max(res, f(index + 1, 0,prices,fee,dp))
    }
     dp[index][hasStock] = res
     return res
}