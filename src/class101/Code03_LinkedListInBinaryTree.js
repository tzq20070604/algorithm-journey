/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSubPath = function(head, root) {
    let arr = getArrayFromHead(head)
    // console.log(arr)
    let nexts = computeNexts(arr)
    // console.log(nexts)
    return compute(root,0,arr,nexts)
};

function getArrayFromHead(head){
   let arr = []
   while(head !== null){
     arr.push(head.val)
     head = head.next
   }
   return arr
}

function computeNexts(arr){
   let nexts = Array(arr.length+1).fill(0)
   nexts[0] = -1, nexts[1] = 0
   let x = 1, y = 0
   while(x < arr.length){
      if (arr[x] === arr[y]){
         x++
         y++
         nexts[x] = y
      } else if (y > 0){
        y = nexts[y]
      } else {
        x++
      }
   } 
   return nexts
}

// j 表示当前字符串要比对的 node当前比对的节点
function compute(node,j,arr,nexts){
    if (j == arr.length){
         return true
    }
    if (node === null){
        return false
    }
    // 找到能匹配的最长的前后缀，如果没有找到j等于-1
    while(j >= 0 && arr[j] !== node.val){
        j = nexts[j]
    }
    return compute(node.left,j+1,arr,nexts) || compute(node.right,j+1,arr,nexts)
}