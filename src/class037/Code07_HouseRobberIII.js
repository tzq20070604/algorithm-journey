// 二叉树打家劫舍问题
// 测试链接 : https://leetcode.cn/problems/house-robber-iii/
var hash = {}
var rob = function(root) {
    return Math.max(robRecursion(root, true), robRecursion(root, false)) 
};

var robRecursion = function(root, isrob){
    // console.log(hash)
    if (root == null){
        return 0
    }
    var ans = 0
    if (isrob){
        if (root.isrob){
            return root.isrob
        }
        if (root.rob !== undefined){
            return root.rob
        }
       ans = Math.max(ans,root.val + robRecursion(root.left, false) + robRecursion(root.right, false)) 
    } else {
        if (root.notrob !== undefined){
            return root.notrob
        }
       ans = Math.max(ans, rob(root.left) + rob(root.right))
    }
   
    if (isrob){
        root.rob = ans
    } else {
        root.notrob = ans
    }
    return ans
}