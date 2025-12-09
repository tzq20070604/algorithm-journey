
// Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var distributeCoins = function(root) {
  let obj = f(root)
  return obj.cost
};

function f(node){
    // 当前节点的硬币数目，当前节点的花费
    if (!node){
        return {
            nodeCount:0,
            coinCount:0,
            cost:0
        }
    }
    let left  = f(node.left)
    let right = f(node.right)
    let obj = {}
    // 配平左右子树的代价
    obj.cost = Math.abs(left.nodeCount - left.coinCount) + Math.abs(right.nodeCount - right.coinCount) + left.cost + right.cost
    // 当前节点为根节点时的总币数
    obj.coinCount = left.coinCount + right.coinCount + node.val
    // 当前节点为根节点时的总币数
    obj.nodeCount = left.nodeCount + right.nodeCount + 1
    return obj
}