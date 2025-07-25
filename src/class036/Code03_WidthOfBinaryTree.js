var widthOfBinaryTree = function(root) {
    var ans = 0
    if (!root){
        return ans
    }
    var queue = []
    var numQueue = []
    queue.push(root) 
    numQueue.push(1)
    LastLevelCount = 1
    oneLevel = []
    while(queue.length != 0){
        var node = queue.shift()
        var num = numQueue.shift()
        oneLevel.push(num)
        if (node){
           if (node.left){
              queue.push(node.left)
              numQueue.push(2 * num % Math.pow(2,32))
           }
           if(node.right){
              queue.push(node.right)
              numQueue.push((2 * num + 1) % Math.pow(2,32) )
           }
        }
        LastLevelCount--
        if (LastLevelCount == 0){
          ans = Math.max(ans, oneLevel[oneLevel.length - 1] - oneLevel[0] + 1)
          oneLevel = []
          LastLevelCount = queue.length
        }
    }
    return ans
};
