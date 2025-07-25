/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */

var arr = []
var cnt = 0

var serialize = function(root) {
    var prefix = []
    serializeWithPrefix(root, prefix)
    return prefix.join(",")
};

function serializeWithPrefix(root, prefix){
    if (!root){
       prefix.push("#")
    } else {
        prefix.push(root.val)
        serializeWithPrefix(root.left, prefix)
        serializeWithPrefix(root.right, prefix)
    }
}


/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */

var deserialize = function(data) {
//    console.log(data)
   arr = data.split(",")
//    console.log(arr)
   cnt = 0
   return deserializeDetail()
};

// 等于给一个数组，让将其转化为先序遍历的树
/*
[
  '1',    '2',    'null',
  'null', '3',    '4',
  'null', 'null', '5',
  'null', 'null'
]
  */

function deserializeDetail(){
    // console.log("cnt",cnt)
    // console.log(arr)
   if (cnt < arr.length){
      var num = arr[cnt]
      // 当前的左子树结束
      if (num == "#"){
         cnt++
         return null
      } else {
        var node = new TreeNode(parseInt(num))
        // 左子树
        cnt++
        node.left = deserializeDetail()
        node.right = deserializeDetail()
        return node
      }
   } else {
      return null
   }
}


