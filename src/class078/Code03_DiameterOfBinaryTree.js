
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
var diameterOfBinaryTree = function(root) {
   // 左边的高度
   // 右边的高度
   // 最大高度
   let obj = f(root)
   return obj.maxH - 1
};

function f(root){
    if(!root){
        return {
            height:0,
            maxH:0
        }
    }
    let left = f(root.left)
    let right = f(root.right)
    let obj = {}
    obj.height = Math.max(left.height + 1,right.height + 1)
    obj.maxH = Math.max(left.height + right.height + 1,Math.max(left.maxH, right.maxH))
    return obj
}