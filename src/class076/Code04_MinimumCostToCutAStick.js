/**
 * @param {number} n
 * @param {number[]} cuts
 * @return {number}
 */
var minCost = function(n, cuts) {
    cuts.sort((a,b)=>{return a - b})
    cuts.push(n)
    cuts.unshift(0)
    let dp = Array(cuts.length).fill(0).map(()=>{
        return Array(cuts.length).fill(-1)
    })
    return f(1,cuts.length-2,cuts,dp)
};

function f(l,r,cuts,dp){
    if (dp[l][r] != -1){
        return dp[l][r]
    }
    let res = Infinity
    if (r < l){
        res = 0
    }
    if (r == l){
        res = cuts[r+1] - cuts[l-1]
    }
    for(let k = l; k <= r; k++){
       res = Math.min(res,f(l,k-1,cuts,dp) + f(k+1,r,cuts,dp) + cuts[r + 1] - cuts[l-1])
    }
    dp[l][r] = res
    return res
}