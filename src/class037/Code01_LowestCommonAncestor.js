// https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/
var lowestCommonAncestor = function(root, p, q) {
    if (root == null){
        return null
    }
    if (root == p || root == q){
        return root
    } else {
        var node1 = lowestCommonAncestor(root.left,p,q)
        var node2 = lowestCommonAncestor(root.right,p,q)
        if (node1 == null && node2 == null){
            return null
        } else if (node1 != null && node2 == null) {
            return node1
        } else if (node1 == null && node2 != null){
            return node2
        } else{
           return root
        }
    }
};