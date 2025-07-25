// 搜索二叉树上寻找两个节点的最近公共祖先
// 测试链接 : https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/
var lowestCommonAncestor = function(root, p, q) {
    // 1 p和q是包含关系
    // 2 p和q是在2颗不同的子树上
    if (root == p || root == q) {
        return root
    } else {
        // 一个在自己左子树，一个在自己右子树
        if (root.val > Math.min(p.val, q.val) && root.val < Math.max(p.val, q.val)){
            return root
        } else if (Math.min(p.val, q.val) < root.val){
            // 则必然都在左子树上面
            return lowestCommonAncestor(root.left,p,q)
        } else {
            return lowestCommonAncestor(root.right,p,q)
        }
    }
};