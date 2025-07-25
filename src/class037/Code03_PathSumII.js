var pathSum = function(root, targetSum) {
   var pathArr = pathSumRecursion(root, targetSum)
   //console.log(pathArr)
   return pathArr ? pathArr : []
};

function arrAddVal(arr, val){
    //console.log("\n")
    //console.log(arr, val)
     if (!arr){
        return null
     } else {
        for(var i = 0; i < arr.length; i++){
            arr[i] = [val, ...arr[i]]
        }
     }
     return arr
}

var pathSumRecursion = function(root, targetSum){
    if (root.left == null && root.right == null){
     if(targetSum == root.val){
        return [[targetSum]]
     } else {
        return null
     }
  } else {
     var arr = null
     if (root.left){
        var left = pathSumRecursion(root.left, targetSum - root.val)
        if (left){
           arr = [...left]
        }
     }
     if (root.right){
        var right = pathSumRecursion(root.right, targetSum - root.val)
        if (right){
           if (arr){
              arr = [...arr, ...right]
           } else {
              arr = [...right]
           }  
        }
     }
     return arrAddVal(arr, root.val)
  }
}