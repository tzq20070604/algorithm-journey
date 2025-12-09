/**
 * (n - 1) % (k - 1) == 0 这个是判断是否可以合成一堆的条件
 * @param {number[]} stones
 * @param {number} k
 * @return {number}
 */
var mergeStones = function(stones, k) {
    if((stones.length - 1) % (k-1) != 0){
        return -1
    }
    let sum = Array(stones.length + 1).fill(0)
    for(let i = 1; i <= stones.length; i++){
        sum[i] = sum[i-1] + stones[i-1]
    }
    let dp = Array(stones.length).fill(0).map(()=>{
        return Array(stones.length).fill(-1)
    })
    return f(0,stones.length - 1,k,stones,dp,sum)
};

/** 在[l,r]范围内合并到不能合并为止的最小代价 */
function f(l,r,k,stones,dp,sum){
    if (l == r){
        return 0
    }
    if (dp[l][r] != -1){
        return dp[l][r]
    }
    //前多少个弄一份
    let res = Infinity
    for(let m = l; m < r; m += (k-1)){
        res = Math.min(res,f(l,m,k,stones,dp,sum) + f(m+1,r,k,stones,dp,sum))
    }
    // 如果l和r还能够继续合并
    if ((r-l+1-1)%(k-1) == 0){
        // 这个地方特别要注意 [l,r] 范围内的之和
        res = res + sum[r+1] - sum[l]
    }
    dp[l][r] = res
    return res
}