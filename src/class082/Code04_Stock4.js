/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(k, prices) {
    let dp = Array(prices.length).fill(0).map(()=>{
       return Array(k+1).fill(0).map(()=>{
         return Array(2).fill(-1)
       })
    })
    return f(0,k,0,prices,dp)
};

/**
 * 
 * @param {*} index 当前来到第几天 
 * @param {*} k 还有几次交易机会，买入一次就算使用了一次机会
 * @param {*} hasStock 手里是否有股票 
 * @param {*} prices 股票的价格 
 * @param {*} dp 备忘录 
 * @returns 
 */
function f(index,k,hasStock,prices,dp){
    if (k < 0){
        return 0
    }
    if (index == prices.length){
        return 0
    }
    if (dp[index][k][hasStock] != -1){
        return dp[index][k][hasStock]
    }
    let res = 0
    // 显然可以买或者卖，如果当前手里有股票，只能卖，没有股票只能买
    if(hasStock == 0){// 没有股票
        res = f(index+1,k-1,1,prices,dp) - prices[index] // 买
        res = Math.max(res,f(index + 1,k,0,prices,dp)) // 不买
    } else { // 有股票，可以卖
        res = f(index + 1,k,0,prices,dp) + prices[index] //卖
        res = Math.max(res,f(index + 1,k,1,prices,dp)) // 不卖
    }
    dp[index][k][hasStock] = res
    return res
}