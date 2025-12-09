/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let min = prices[0]
    let profile = 0
    // 假设在第i天卖掉
    for(let i = 1; i < prices.length;i++){
       profile = Math.max(prices[i] - min,profile)
       min = Math.min(min,prices[i])
    }
    return profile
};