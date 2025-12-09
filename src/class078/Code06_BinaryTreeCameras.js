//Definition for a binary tree node.
// lamp 拼写不一致导致错误，要注意
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var minCameraCover = function(root) {
    lampCount = 0
    let res = f(root)
    if (!res.cover){
        lampCount += 1
    }
    return lampCount
};

let lampCount = 0
function f(node){
    if (!node){
        return {
            lamp:false,
            cover:true
        }
    }
    let left = f(node.left)
    let right = f(node.right)
    let obj = {}
    // 左右如果有一个没有覆盖则，node必须有灯
    if ((!left.cover) || (!right.cover)){ // 左右有一个没有被覆盖
        lampCount += 1
        obj.lamp = true
        obj.cover = true
    } else if (left.lamp || right.lamp) { //左右都被覆盖，其中至少一个还有灯
        obj.lamp = false
        obj.cover = true
    } else { // 左右都被覆盖，但是没有灯
        obj.lamp = false
        obj.cover = false
    }
    return obj
}

// function createTree(arr){
//     let queue = []
//     queue.push(arr[0])
//     let root = TreeNode(arr[0])
//     let j = 1
//     while(queue.length > 0){
//         let len = queue.length
//         // 这一层
//         for(let i = 0; i < len; i++){
//            let node = queue.shift()
//            if (node !== null){
//               let left = TreeNode(arr[j++])
//               node.left = left
//               queue.push(left)

//               let right = TreeNode(arr[j++])
//               node.right = right
//               queue.push(right)
//            }
//         }
//     }
//     return root
// }

// function print(root){
    
// }