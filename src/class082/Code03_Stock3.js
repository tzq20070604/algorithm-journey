/**
 * 2笔交易
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    //先求[0,i]上面的最小值
    //[i,n-1]上面的最大值
    let n = prices.length
    let minArr = Array(n).fill(0)
    minArr[0] = prices[0]
    for(let i = 1; i < n; i++){
        if(prices[i] < minArr[i-1]){
           minArr[i] = prices[i]
        } else {
           minArr[i] = minArr[i-1]
        }
    }
    let maxArr = Array(n).fill(0)
    maxArr[n-1] = prices[n-1]
    for(let i = n-2; i >= 0; i--){
        if(prices[i] > maxArr[i+1]){
           maxArr[i] = prices[i]
        } else {
           maxArr[i] = maxArr[i+1]
        }
    }
    // 如果是一次交易,求得[0,i]区间上的最大收益
    let dp1 = Array(n).fill(0)
    for(let i = 1; i <= n-1; i++){
        //对于i点，有卖或不卖2种选择
        // 不卖
        dp1[i] = dp1[i-1]
        // 卖
        dp1[i] = Math.max(dp1[i],prices[i] - minArr[i])
    }
   
    // 如果是一次交易，求得[i,n-1]区间上的最大收益
     let dp2 = Array(n).fill(0)
     dp2[n-1] = 0
    for(let i = n-2; i >= 0;i--){
      //对于i点，有买或不买2种选择
      // 不买
      dp2[i] = dp2[i+1]
      //买
      dp2[i] = Math.max(dp2[i],maxArr[i] - prices[i])
    }
    // 最后的情况根据每个点划分 求出[0,i][i,n-1]收益和的最大值
    let ans = dp1[n-1]
    for(let i = 0;i < n;i++){
       let res = dp1[i] + dp2[i]
       ans = Math.max(ans,res)
    }
    return ans
};