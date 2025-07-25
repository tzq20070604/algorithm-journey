/**
 * 因为是一棵树，所以任意2个节点之间只能有一条路
 * 如果2个集合，互相联通，而且最大值数值相等，则最大值之间存在路径，计算完毕以后，集合内部
 * 不在有路径，将这个集合合并(并查集带标签(最大值、以及最大值次数))
 * @param {number[]} vals
 * @param {number[][]} edges
 * @return {number}
 */
var numberOfGoodPaths = function(vals, edges) {
    build(vals.length, vals)
    var ans = 0
    edges.sort((edge1,edge2)=>{return Math.max(vals[edge1[0]],vals[edge1[1]]) - Math.max(vals[edge2[0]],vals[edge2[1]])})
    for (var i = 0; i < edges.length; i++){
        var edge = edges[i]
        ans += union(edge[0], edge[1])
    }
    return ans + vals.length
};

var father = []
var size = []
var maxVulue = []
var maxCount = []
function build(n, vals){
    father = Array(n)
    size = Array(n)
    maxVulue = Array(n)
    maxCount = Array(n)
    for (var i = 0; i < n; i++) {
        father[i] = i
        size[i] = 1
        maxVulue[i] = vals[i]
        maxCount[i] = 1
    }
}

function find(i){
    if (i != father[i]){
        father[i] = find(father[i])
    }
    return father[i]
}

function isSameSet(i, j){
    return find(i) == find(j)
}

function union(i, j){
    var ri = find(i)
    var rj = find(j)
    let ans = 0
    if (ri != rj){
        // 如果有小于maxVulue，在这之前已经连接了
        if (maxVulue[ri] == maxVulue[rj]){
            ans = maxCount[ri] * maxCount[rj]
            father[rj] = ri
            size[ri] += size[rj]
            maxCount[ri] += maxCount[rj]
        } else if (maxVulue[ri] > maxVulue[rj]){
             father[rj] = ri
             size[ri] += size[rj]
        } else {
             father[ri] = rj
             size[rj] += size[ri]
        }
        return ans
    } else {
        return 0
    }
}
