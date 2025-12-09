// https://www.nowcoder.com/questionTerminal/380d49d7f99242709ab4b91c36bf2acc
const rl = require("readline").createInterface({ input: process.stdin });
let lineNum = 0,
    n,
    rootVal,
    root,
    queue = [];
rl.on("line", (line) => {
    lineNum++;
    if (lineNum == 1) {
        [n, rootVal] = line.trim().split(" ").map(Number);
        root = new TreeNode(rootVal);
        queue.push(root);
    } else {
        let curRoot = queue.pop();
        let [fa, l, r] = line.trim().split(" ").map(Number);
        if (l != 0 && r != 0) {
            curRoot.left = new TreeNode(l);
            curRoot.right = new TreeNode(r);
            queue.push(curRoot.right);
            queue.push(curRoot.left);
        } else if (l != 0) {
            curRoot.left = new TreeNode(l);
            queue.push(curRoot.left);
        } else if (r != 0){
            curRoot.right = new TreeNode(r);
            queue.push(curRoot.right);
        }
    }
    if (lineNum == n + 1) {
        let res = largestBSTSubtree(root);
        console.log(res);
    }
});

class TreeNode {
    val = 0
    left = null
    right = null
    constructor(val) {
        this.val = val;
    }
}

function largestBSTSubtree(root) {
    let obj = f(root);
    return obj.maxCount;
}

function f(root) {
    if (!root){
        return {
            isBST: true,
            max: -1000001,
            min: 1000001,
            maxCount: 0,
        };
    }
    // 左树的最大值，右树的最小值，是否是二叉搜索树，最大的二叉搜索子树的大小
    // 显然如果是二叉搜索树，最大的二叉搜索子树的大小就是本颗二叉搜索树的大小. 
    let obj = {};
    let left = f(root.left);
    let  right = f(root.right);
    let c1 = left.isBST && right.isBST;
    let c2 = left.max < root.val && root.val < right.min;
    obj.max = Math.max(root.val, Math.max(left.max, right.max));
    obj.min = Math.min(root.val, Math.min(left.min, right.min));
    if (c1 && c2) {
        obj.isBST = true;
        obj.maxCount = left.maxCount + right.maxCount + 1;
    } else {
        obj.isBST = false;
        obj.maxCount = Math.max(left.maxCount, right.maxCount);
    }
    return obj
}
