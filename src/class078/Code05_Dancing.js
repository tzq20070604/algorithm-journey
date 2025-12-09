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
var rob = function(root) {
   let obj = f(root)
   return Math.max(obj.do, obj.notDo)
};

function f(root){
   if (!root){
      return {
         do: 0,
         notDo: 0
      }
   }
   let left = f(root.left)
   let right = f(root.right)
   // root 偷
   let obj = {}
   obj.do = left.notDo + right.notDo + root.val
   obj.notDo = Math.max(left.do, left.notDo) + Math.max(right.do, right.notDo)
   return obj
}