/**
 * @param {number} n
 * @param {number} minProfit
 * @param {number[]} group
 * @param {number[]} profit
 * @return {number}
 */
var profitableSchemes = function(n, minProfit, group, profit) {
    // n组 完成group计划的方法数，利润小于minProfit的方法数
    res = 0
    let dp = Array(group.length + 1).fill(0).map(()=>{
        return Array(n+1).fill(0).map(()=>{
            return Array(minProfit + 1).fill(-1)
        })
    })
   return f(0, n, 0, minProfit, profit,dp) 
};

var minProfit = 0
var res = 0
// 在n个人的限制下，group组的限制下，至少产生大于minProfit的利润
function f(index, n, minProfit, group, profit,dp){
    if (index == group.length + 1){
        if (minProfit <= 0){
            return 1
        } else {
            return 0
        }
    } 
    if (dp[index][n][minProfit < 0 ? 0: minProfit] != -1){
        return dp[index][n][minProfit]
    }
    let res = 0
    // 当前这一组选择可选
    if (group[index] <= n){
      res = f(index + 1, n - group[index],minProfit-profit[index], group, profit,dp)
    }
    // 不选
    res += f(index + 1, n,minProfit, group, profit,dp)
    dp[index][n][minProfit < 0 ? 0: minProfit] = res
    return res
}
