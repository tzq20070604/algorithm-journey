// Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function(root, targetSum) {
     let record = {}
     record[0] = 1
     pathCnt = 0
     f(root,0,record,targetSum)
     console.log(record)
     return pathCnt
    
};
let pathCnt = 0
function f(root,preSum,record,targetSum){
    //判断以root节点作为结尾，有几条路径
    if (root){
        preSum += root.val
        let diff = preSum - targetSum
        pathCnt += (record[diff] === undefined ? 0 : record[diff])
        if (record[preSum] === undefined){
            record[preSum] = 1
        } else {
            record[preSum]++
        }
        // 先左节点
        f(root.left,preSum,record,targetSum)
        f(root.right,preSum,record,targetSum)
        if (root != null){
            record[preSum]--
        }
    }
}