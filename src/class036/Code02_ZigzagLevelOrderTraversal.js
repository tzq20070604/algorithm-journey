var zigzagLevelOrder = function(root) {
    var queue = []
    if (!root){
        return []
    }
    queue.push(root)
    var pos = true
    var LastLevelCount = 1
    var total = []
    var oneLevel = []
    while(queue.length != 0){
        var node = queue.shift()
        oneLevel.push(node.val)
        if (node.left){
            queue.push(node.left)
        }
        if (node.right){
            queue.push(node.right)
        }
        LastLevelCount--
        if (LastLevelCount == 0){
          if (pos){
             total.push(oneLevel)
          } else {
             total.push(oneLevel.reverse())
          }
          pos = !pos
          oneLevel = []
          LastLevelCount = queue.length
        }
    }
    return total
};