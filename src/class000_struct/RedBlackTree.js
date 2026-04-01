const RED = true;
const BLACK = false;

// 节点类：唯一idKey + 自定义value
class Node {
  constructor(idKey, value) {
    this.idKey = idKey;
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.color = RED;
  }
}

// 对外方法置顶：初始化、插入、排序、查找、删除
class RedBlackTree {
  // 【1.初始化】传入自定义排序函数(同Array.sort规则)
  constructor(compareFn) {
    if (typeof compareFn !== "function") {
      throw new Error("必须传入value排序函数：(a,b)=> -1|0|1");
    }
    this.compare = compareFn;
    // 哨兵空节点
    this.NIL = new Node(null, null);
    this.NIL.color = BLACK;
    this.root = this.NIL;
  }

  // 【2.插入】按唯一idKey插入，重复拦截
  insert(idKey, value) {
    if (this._findNodeById(idKey)) {
      console.warn(`id已存在：${idKey}，跳过插入`);
      return;
    }

    const newNode = new Node(idKey, value);
    newNode.left = this.NIL;
    newNode.right = this.NIL;

    let parent = null;
    let current = this.root;
    // 按自定义value比较找插入位置
    while (current !== this.NIL) {
      parent = current;
      if (this.compare(newNode.value, current.value) < 0) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    newNode.parent = parent;
    if (!parent) {
      this.root = newNode;
    } else if (this.compare(newNode.value, parent.value) < 0) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    // 根节点强制黑
    if (!newNode.parent) {
      newNode.color = BLACK;
      return;
    }
    // 无祖父节点无需修复
    if (!newNode.parent.parent) return;

    this._insertFix(newNode);
  }

  // 【3.获取有序列表】中序遍历，按初始化排序规则输出
  getSortedList() {
    const result = [];
    const dfs = (node) => {
      if (node !== this.NIL) {
        dfs(node.left);
        result.push({
          idKey: node.idKey,
          value: node.value,
          color: node.color ? "红" : "黑"
        });
        dfs(node.right);
      }
    };
    dfs(this.root);
    return result;
  }

  // 【4.精准查找】按唯一idKey查value
  findById(idKey) {
    const target = this._findNodeById(idKey);
    return target ? target.value : null;
  }

  // 【5.删除】按唯一idKey删除，自动修复红黑平衡
  deleteById(idKey) {
    const delNode = this._findNodeById(idKey);
    if (!delNode) return false;

    let replaceNode;
    let originColor = delNode.color;
    let tempNode = delNode;

    // 左右缺其一，直接顶替
    if (delNode.left === this.NIL) {
      replaceNode = delNode.right;
      this._transplant(delNode, delNode.right);
    } else if (delNode.right === this.NIL) {
      replaceNode = delNode.left;
      this._transplant(delNode, delNode.left);
    } else {
      // 找后继顶替
      tempNode = this._getMinNode(delNode.right);
      originColor = tempNode.color;
      replaceNode = tempNode.right;
      this._transplant(tempNode, tempNode.right);
      this._transplant(delNode, tempNode);
      tempNode.left = delNode.left;
      tempNode.left.parent = tempNode;
      tempNode.right = delNode.right;
      tempNode.right.parent = tempNode;
      tempNode.color = delNode.color;
    }

    // 删除黑色节点需要补平衡
    if (originColor === BLACK) {
      this._deleteFix(replaceNode);
    }
    return true;
  }

  // ========== 内部私有工具方法（后置） ==========
  // 判断是否红节点
  _isRed(node) {
    return node !== this.NIL && node.color === RED;
  }

  // 左旋
  _rotateLeft(x) {
    const y = x.right;
    x.right = y.left;
    if (y.left !== this.NIL) y.left.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x;
    x.parent = y;
  }

  // 右旋
  _rotateRight(y) {
    const x = y.left;
    y.left = x.right;
    if (x.right !== this.NIL) x.right.parent = y;
    x.parent = y.parent;
    if (!y.parent) this.root = x;
    else if (y === y.parent.right) y.parent.right = x;
    else y.parent.left = x;
    x.right = y;
    y.parent = y;
  }

  // 插入后修复红黑规则
  _insertFix(z) {
    while (this._isRed(z.parent)) {
      if (z.parent === z.parent.parent.left) {
        const uncle = z.parent.parent.right;
        if (this._isRed(uncle)) {
          z.parent.color = BLACK;
          uncle.color = BLACK;
          z.parent.parent.color = RED;
          z = z.parent.parent;
        } else {
          if (z === z.parent.right) {
            z = z.parent;
            this._rotateLeft(z);
          }
          z.parent.color = BLACK;
          z.parent.parent.color = RED;
          this._rotateRight(z.parent.parent);
        }
      } else {
        const uncle = z.parent.parent.left;
        if (this._isRed(uncle)) {
          z.parent.color = BLACK;
          uncle.color = BLACK;
          z.parent.parent.color = RED;
          z = z.parent.parent;
        } else {
          if (z === z.parent.left) {
            z = z.parent;
            this._rotateRight(z);
          }
          z.parent.color = BLACK;
          z.parent.parent.color = RED;
          this._rotateLeft(z.parent.parent);
        }
      }
    }
    this.root.color = BLACK;
  }

  // 内部：按id找节点
  _findNodeById(id) {
    const dfs = (n) => {
      if (n === this.NIL) return null;
      if (n.idKey === id) return n;
      return dfs(n.left) || dfs(n.right);
    };
    return dfs(this.root);
  }

  // 节点移栽（删除辅助）
  _transplant(u, v) {
    if (!u.parent) this.root = v;
    else if (u === u.parent.left) u.parent.left = v;
    else u.parent.right = v;
    v.parent = u.parent;
  }

  // 找最左最小节点（后继）
  _getMinNode(node) {
    while (node.left !== this.NIL) node = node.left;
    return node;
  }

  // 删除后修复黑高平衡
  _deleteFix(x) {
    while (x !== this.root && !this._isRed(x)) {
      if (x === x.parent.left) {
        let brother = x.parent.right;
        if (this._isRed(brother)) {
          brother.color = BLACK;
          x.parent.color = RED;
          this._rotateLeft(x.parent);
          brother = x.parent.right;
        }
        if (!this._isRed(brother.left) && !this._isRed(brother.right)) {
          brother.color = RED;
          x = x.parent;
        } else {
          if (!this._isRed(brother.right)) {
            brother.left.color = BLACK;
            brother.color = RED;
            this._rotateRight(brother);
            brother = x.parent.right;
          }
          brother.color = x.parent.color;
          x.parent.color = BLACK;
          brother.right.color = BLACK;
          this._rotateLeft(x.parent);
          x = this.root;
        }
      } else {
        let brother = x.parent.left;
        if (this._isRed(brother)) {
          brother.color = BLACK;
          x.parent.color = RED;
          this._rotateRight(x.parent);
          brother = x.parent.left;
        }
        if (!this._isRed(brother.right) && !this._isRed(brother.left)) {
          brother.color = RED;
          x = x.parent;
        } else {
          if (!this._isRed(brother.left)) {
            brother.right.color = BLACK;
            brother.color = RED;
            this._rotateLeft(brother);
            brother = x.parent.left;
          }
          brother.color = x.parent.color;
          x.parent.color = BLACK;
          brother.left.color = BLACK;
          this._rotateRight(x.parent);
          x = this.root;
        }
      }
    }
    x.color = BLACK;
  }
}

module.exports = RedBlackTree
