const RED = true;
const BLACK = false;
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

class RedBlackTree {
  // 1. 初始化
  constructor(compareFn) {
    if (typeof compareFn !== "function") {
      throw new Error("必须传入排序函数");
    }
    this.compare = compareFn;

    this.NIL = new Node(null, null);
    this.NIL.color = BLACK;
    this.NIL.left = this.NIL;
    this.NIL.right = this.NIL;
    this.NIL.parent = this.NIL;

    this.root = this.NIL;
  }

  // 2. 插入
  insert(idKey, value) {
    if (this._findNodeById(idKey)) {
      console.warn("id 已存在：" + idKey);
      return;
    }

    const z = new Node(idKey, value);
    z.left = this.NIL;
    z.right = this.NIL;
    z.parent = this.NIL;

    let p = this.NIL;
    let cur = this.root;

    while (cur !== this.NIL) {
      p = cur;
      if (this.compare(z.value, cur.value) < 0) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }

    z.parent = p;
    if (p === this.NIL) {
      this.root = z;
    } else if (this.compare(z.value, p.value) < 0) {
      p.left = z;
    } else {
      p.right = z;
    }

    if (z.parent === this.NIL) {
      z.color = BLACK;
      return;
    }

    if (z.parent.parent === this.NIL) return;
    this._insertFix(z);
  }

  // 3. 获取有序列表
  getSortedList() {
    const res = [];
    const dfs = (node) => {
      if (node === this.NIL) return;
      dfs(node.left);
      res.push({
        idKey: node.idKey,
        value: node.value,
        color: node.color ? "红" : "黑",
      });
      dfs(node.right);
    };
    dfs(this.root);
    return res;
  }

  // 4. 按 ID 查找
  findById(idKey) {
    const n = this._findNodeById(idKey);
    return n ? n.value : null;
  }

  // 5. 按 ID 删除
  deleteById(idKey) {
    const z = this._findNodeById(idKey);
    if (!z || z === this.NIL) return false;

    let y = z;
    let yOriginColor = y.color;
    let x;

    if (z.left === this.NIL) {
      x = z.right;
      this._transplant(z, z.right);
    } else if (z.right === this.NIL) {
      x = z.left;
      this._transplant(z, z.left);
    } else {
      y = this._minNode(z.right);
      yOriginColor = y.color;
      x = y.right;

      if (y.parent === z) {
        x.parent = y;
      } else {
        this._transplant(y, y.right);
        y.right = z.right;
        y.right.parent = y;
      }

      this._transplant(z, y);
      y.left = z.left;
      y.left.parent = y;
      y.color = z.color;
    }

    if (yOriginColor === BLACK) {
      this._deleteFix(x);
    }
    return true;
  }

  // ==================== 内部方法（安全不报错） ====================
  _isRed(node) {
    // ✅ 修复：防止 node 为 null 报错
    if (!node || node === this.NIL) return false;
    return node.color === RED;
  }

  _rotateLeft(x) {
    const y = x.right;
    x.right = y.left;
    if (y.left !== this.NIL) y.left.parent = x;
    y.parent = x.parent;
    if (x.parent === this.NIL) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x;
    x.parent = y;
  }

  _rotateRight(y) {
    const x = y.left;
    y.left = x.right;
    if (x.right !== this.NIL) x.right.parent = y;
    x.parent = y.parent;
    if (y.parent === this.NIL) this.root = x;
    else if (y === y.parent.right) y.parent.right = x;
    else y.parent.left = x;
    x.right = y;
    y.parent = x;
  }

  _insertFix(z) {
    while (this._isRed(z.parent)) {
      if (z.parent === z.parent.parent.left) {
        let uncle = z.parent.parent.right;
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
        let uncle = z.parent.parent.left;
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

  _findNodeById(id) {
    const dfs = (n) => {
      if (n === this.NIL) return null;
      if (n.idKey === id) return n;
      return dfs(n.left) || dfs(n.right);
    };
    return dfs(this.root);
  }

  _transplant(u, v) {
    if (u.parent === this.NIL) this.root = v;
    else if (u === u.parent.left) u.parent.left = v;
    else u.parent.right = v;
    v.parent = u.parent;
  }

  _minNode(node) {
    while (node.left !== this.NIL) node = node.left;
    return node;
  }

  _deleteFix(x) {
    while (x !== this.root && !this._isRed(x)) {
      if (x === x.parent.left) {
        let w = x.parent.right;
        if (this._isRed(w)) {
          w.color = BLACK;
          x.parent.color = RED;
          this._rotateLeft(x.parent);
          w = x.parent.right;
        }
        if (!this._isRed(w.left) && !this._isRed(w.right)) {
          w.color = RED;
          x = x.parent;
        } else {
          if (!this._isRed(w.right)) {
            w.left.color = BLACK;
            w.color = RED;
            this._rotateRight(w);
            w = x.parent.right;
          }
          w.color = x.parent.color;
          x.parent.color = BLACK;
          w.right.color = BLACK;
          this._rotateLeft(x.parent);
          x = this.root;
        }
      } else {
        let w = x.parent.left;
        if (this._isRed(w)) {
          w.color = BLACK;
          x.parent.color = RED;
          this._rotateRight(x.parent);
          w = x.parent.left;
        }
        if (!this._isRed(w.right) && !this._isRed(w.left)) {
          w.color = RED;
          x = x.parent;
        } else {
          if (!this._isRed(w.left)) {
            w.right.color = BLACK;
            w.color = RED;
            this._rotateLeft(w);
            w = x.parent.left;
          }
          w.color = x.parent.color;
          x.parent.color = BLACK;
          w.left.color = BLACK;
          this._rotateRight(x.parent);
          x = this.root;
        }
      }
    }
    x.color = BLACK;
  }
}

module.exports = RedBlackTree