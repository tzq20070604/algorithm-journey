/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
    // 注意这里一定要加上带空节点
    // 首先将root和subRoot，变成一个带空节点的前序遍历字符串
    // 使用KMP加速判断是否包含模式串
    let pathArr1 = []
    let pathArr2 = []
    preOrder(root,pathArr1)
    preOrder(subRoot,pathArr2)
    let next = computeNext(pathArr2)
    let res = compute(pathArr1, pathArr2, next)
    return res
};

function preOrder(root,pathArr){
   if(root === null){
     pathArr.push('#')
   } else {
     pathArr.push(root.val)
     preOrder(root.left,pathArr)
     preOrder(root.right,pathArr)
   }
}

function computeNext(arr){
   let next = Array(arr.length).fill(0)
   next[0] = -1
   next[1] = 0
   let x = 1, y = 0
   while(x < arr.length){
     if(arr[x] === arr[y]){
        x++
        y++
        next[x] = y
     } else if (y > 0){
        y = next[y]
     } else {
        x++
     }
   }
   return next
}

function compute(arr1, arr2, next){
    let x = 0, y = 0
    while(x < arr1.length){
       if (arr1[x] === arr2[y]){
         x++
         y++
       } else if (y > 0){
         y = next[y]
       } else {
         x++
       }
       if (y == arr2.length){
        return true
       }
    }
    return false
}