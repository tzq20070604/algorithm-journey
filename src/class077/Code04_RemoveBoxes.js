/**
 * 首先贪心，在一起的肯定是一起消
 * @param {number[]} boxes
 * @return {number}
 */
var removeBoxes = function(boxes) {
    let dp = Array(boxes.length).fill(0).map(()=>{
        return Array(boxes.length).fill(0).map(()=>{
            return Array(boxes.length).fill(0).map(()=>{
                return -1
            })
        })
    })
    return f(0,boxes.length-1,0,boxes,dp)
};

// 当前的是先合并还是跟后面一起合并,prefix,不包括l位置的boxes[l]的个数
function f(l,r,prefix,boxes,dp){
    // 两种选择，消除当前的包括前缀 当前和后面的一起消除
    if (l > r){
        return 0
    }
    if (l == r){
        return (prefix + 1) * (prefix + 1)
    }
    if (dp[l][r][prefix] != -1){
        return dp[l][r][prefix]
    }
    let m = l
    for(; m<=r && boxes[m] == boxes[l]; m++){}
    // [l,m-1] [m,r]
    let count = m - l + prefix
    let res = f(m,r,0,boxes,dp) + count * count
    for(let n = m+1; n <= r; n++){
        if (boxes[n] == boxes[l] && boxes[n-1] != boxes[n]){
            res = Math.max(res, f(m,n-1,0,boxes,dp) + f(n,r,count,boxes,dp))
        }
    }
    dp[l][r][prefix] = res
    return res
}