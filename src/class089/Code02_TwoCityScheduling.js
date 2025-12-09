/**
 * @param {number[][]} costs
 * @return {number}
 */
var twoCitySchedCost = function(costs) {
    // 差值从大到小排序,越靠前，说明costs[0]的影响越大
    costs.sort((a,b)=>{
        return (a[0] - a[1]) - (b[0] - b[1])
    })
    let sum = 0
    let n = costs.length >> 1
    for(let i = 0; i < n; i++){
        sum += costs[i][0]
    }
    for(let i = n; i < costs.length; i++){
        sum += costs[i][1]
    }
    return sum
};
