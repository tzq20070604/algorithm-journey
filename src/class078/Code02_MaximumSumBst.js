
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
var maxSumBST = function(root) {
    //是否是二叉树
    //最大节点和(因为有负数)
    //节点和
    // 最大值
    // 最小值
    return f(root).maxSum
};

function f(root){
    if(!root){
        return {
            isBST:true,
            maxSum:0,
            sum:0,
            max:-Infinity,
            min:Infinity
        }
    }
    let left = f(root.left)
    let right = f(root.right)
    let c1 = left.isBST && right.isBST
    let c2 = left.max < root.val && root.val < right.min
    let obj = {}
    obj.max = Math.max(root.val,Math.max(left.max,right.max))
    obj.min = Math.min(root.val,Math.min(left.min,right.min))
    obj.sum = left.sum + right.sum + root.val
    if (c1 && c2){
         obj.isBST = true
         obj.maxSum = Math.max(obj.sum,Math.max(left.maxSum,right.maxSum))
    } else {
         obj.isBST = false
         obj.maxSum = Math.max(left.maxSum,right.maxSum)
    }
    return obj
}