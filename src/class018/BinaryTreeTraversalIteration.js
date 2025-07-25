var inOrder = function(root){
    if (root == null){
        return []
    }
   var nums = []
   var stack = []
   stack.push(root)
   while(stack.length > 0){
      var node = stack[stack.length - 1]
      var right = node.right
      var left = node.left
      if (right != null){
         stack.pop()
         stack.push(right)
         node.right = null
         stack.push(node)
      }
      if(left != null){
         var left = node.left
         stack.push(left)
         node.left = null
      }
      if (left == null && right == null){
         var last = stack.pop()
         nums.push(last.val)
      }
   }
   return nums
}

var postOrder = function(root){
    if (root == null){
        return []
    }
   var nums = []
   var stack = []
   stack.push(root)
   while(stack.length > 0){
      var node = stack[stack.length - 1]
      var right = node.right
      var left = node.left
      if (right != null){
         stack.push(right)
         node.right = null
      }
      if(left != null){
         var left = node.left
         stack.push(left)
         node.left = null
      }
      if (left == null && right == null){
         var last = stack.pop()
         nums.push(last.val)
      }
   }
   return nums
}