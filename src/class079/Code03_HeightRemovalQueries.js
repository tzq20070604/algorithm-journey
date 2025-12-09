/**
 * 涉及到DFN序的问题，挺难的
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[]} queries
 * @return {number[]}
 */
var treeQueries = function(root, queries) {
    cnt = 0
    size = Array(10^5+2).fill(0)
    deep=Array(10^5+2).fill(0)
    dfn={}
    buildDfn(root,0)
    let maxL = Array(cnt + 2).fill(0)
    let maxR = Array(cnt + 2).fill(0)
    maxR[cnt] = deep[cnt]
    // [0,i],[i,cnt]
    for(let i=1; i <= cnt;i++){
        maxL[i] = Math.max(deep[i],maxL[i-1]) 
        maxR[cnt - i] = Math.max(deep[cnt - i],maxR[cnt - i + 1])
    }
    let res = []
    for(let val of queries){
        let st = dfn[val] - 1
        let end = dfn[val] + size[dfn[val]]
        res.push(Math.max(maxL[st], maxR[end]))
    }
    return res
};

let cnt,size,deep,dfn
function buildDfn(root,preDeep){
    cnt++
    let bakCnt = cnt
    dfn[root.val] = cnt
    size[cnt] = 1
    deep[cnt] = preDeep
    if (root.left){
         buildDfn(root.left,preDeep + 1)
         size[bakCnt] += size[dfn[root.left.val]]
    }
    if (root.right){
        buildDfn(root.right,preDeep + 1)
        size[bakCnt] += size[dfn[root.right.val]]
    }
}