/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let dp = Array(prices.length).fill(0).map(()=>{
        // 0 没有股票 前一天也没有卖股票
        // 1 没有股票 但是前一天有卖股票
        // 2 有股票
        return Array(3).fill(-1)
    })
    return f(0,0,prices,dp)
};

function f(index,hasStock,prices,dp){
    if (index == prices.length){
        return 0
    }
    if (dp[index][hasStock] != -1){
        return dp[index][hasStock]
    }
    let res = 0
    if (hasStock == 2){ // 可以卖股票
       res = f(index + 1,1,prices,dp) + prices[index]
       res = Math.max(res, f(index+1,2,prices,dp))
    } else if (hasStock == 0){ // 可以买股票
       res = f(index + 1,2,prices,dp) - prices[index]
       res = Math.max(res, f(index+1,0,prices,dp))
    } else { // 当天啥都不能操作
       res = f(index+1,0,prices,dp)
    }
    dp[index][hasStock] = res
    return res
}