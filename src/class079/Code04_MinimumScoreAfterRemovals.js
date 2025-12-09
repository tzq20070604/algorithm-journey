/**
 * 整体思路，使用dfn序来计算各个分支的异或值
 * @param {number[]} nums
 * @param {number[][]} edges
 * @return {number}
 */
var minimumScore = function(nums, edges) {
    graph = Array(nums.length).fill(0).map(()=>{
        return []
    })
    for(let i = 0;i < edges.length;i++){
        let [from, to] = edges[i]
        graph[from].push(to)
        graph[to].push(from)
    }
    cnt = 0
    dfn = {}
    size = Array(1002).fill(0)
    // 以它为根节点的子树的异或值
    orSum = Array(1002).fill(0)
    buildDfn(0,nums)
    let pre,pos,sum1,sum2,sum3,min = Infinity
    for (let i = 0; i < edges.length-1; i++){
        let [f1,t1] = edges[i]
        let max1 = Math.max(dfn[f1],dfn[t1])
        for(let j = i+1; j < edges.length;j++){
            let [f2,t2] = edges[j]
            // 分成3颗树
            let max2 = Math.max(dfn[f2],dfn[t2])
            pre = (max1 + max2) - Math.max(max1, max2)
            pos = (max1 + max2) - Math.min(max1, max2)
            // pre和pos是被分割后2颗子树的根节点
            // 判断pos是否是pre的子树
            if (pos < pre + size[pre]){ // 是子树
                sum1 = orSum[1] ^ orSum[pre]
                sum2 = orSum[pre] ^ orSum[pos]
                sum3 = orSum[1] ^ sum1 ^ sum2
            } else { // 不是子树
                sum2 = orSum[pre]
                sum3 = orSum[pos]
                sum1 = orSum[1]^sum2^sum3
            }
            let orMax = Math.max(Math.max(sum1,sum2),sum3) 
            let orMin = Math.min(Math.min(sum1,sum2),sum3) 
            min = Math.min(orMax-orMin,min)
        }
    }
    return min
};

let graph,dfn,cnt,size,orSum
function buildDfn(index,nums){
    let bak = ++cnt
    dfn[index] = bak
    // 表示它及其子树的异或值
    orSum[bak] = nums[index]
    size[bak] = 1
    for (let i = 0; i < graph[index].length;i++){
        let node = graph[index][i]
        if (dfn[node] === undefined){
            buildDfn(node,nums)
            size[bak] += size[dfn[node]]
            orSum[bak] ^= orSum[dfn[node]]
        }
    }
}