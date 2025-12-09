/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function(pairs) {
    // 这种排列对其他数是最有利的
    pairs.sort((a,b)=>{
        return a[1] - b[1]
    })
    let count = 1
    let pre = pairs[0]
    for(let i = 1; i < pairs.length; i++){
        if (pairs[i][0] > pre[1]){
            console.log(pairs)
            count++
            pre = pairs[i]
        }
    }
    return count
};
// 最后的结果一定是尾数从小到大排列，求严格递增子序列最大递增
var findLongestChain1 = function(pairs) {
    pairs.sort((a,b)=>{return a[1] - b[1]})
    return f(0,-Infinity,pairs)
    
}

function f(index, preEnd, pairs){
    if (pairs.length == index){
        return 0
    }
    let item = pairs[index]
    if (item[0] > preEnd){
        return 1 + f(index + 1, item[1], pairs)
    } else {
        return f(index + 1, preEnd, pairs)
    }
}