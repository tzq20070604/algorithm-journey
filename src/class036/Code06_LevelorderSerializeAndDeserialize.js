
var serialize = function(root) {
    if (!root){
        return "#"
    } 
    var queue = [root]
    var levelCount = 1
    var total = []
    var levelArr = []
    while(queue.length != 0){
      var cur = queue.shift()
      if (cur != null){
         queue.push(cur.left)
         queue.push(cur.right)
         levelArr.push(cur.val)
      } else {
         levelArr.push("#")
      }
      levelCount--
      if (levelCount == 0){
         levelCount = queue.length
         levelStr = levelArr.join(",")
         total.push(levelStr)
         levelArr = []
      }
    }
     total = total.join("@")
     //console.log(total)
     return total
};


var deserialize = function(data) {
   var arr = data.split("@")
   //console.log(arr)
   if (arr.length == 0){
    return null
   }
   var head = arr[0].split(",")[0]
   if (head === "#"){
      return null
   } else {
     //console.log("head",head)
     var headNum = parseInt(head)
     //console.log("headNum",headNum)
     headNode = new TreeNode(headNum)
   }
   var lastNodeQueue = [headNode]
   var cnt = 1
   while(cnt < arr.length - 1){
      var curNodeQueue = []
      var valQueue = arr[cnt].split(",")
      // 上一层的有效节点nodeQueue
      for(var i = 0; i < lastNodeQueue.length; i++){
         var curNode = lastNodeQueue[i]
         var left = transform(valQueue[2*i])
         var right = transform(valQueue[2*i + 1])
         curNode.left = left
         curNode.right = right
         if (left){
            curNodeQueue.push(left)
         }
         if (right){
            curNodeQueue.push(right)
         }
      }
      cnt++
      lastNodeQueue = curNodeQueue
   }
   return headNode
};

function transform(str){
    if (str === "#"){
        return null
    } else {
        //console.log("\n")
        //console.log(str)
        //console.log(parseInt(str))
        return new TreeNode(parseInt(str))
    }
}
