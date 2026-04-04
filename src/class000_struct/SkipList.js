class SkipList {

  // ==========================
  // 【1】构造函数（放最前面）
  // 支持自定义最大层数，不传默认 16 层
  // ==========================
  constructor(compareFn, maxLevel) {
    this.compareFn = compareFn;

    // 最大层数：不传默认 16
    this.MAX_LEVEL = maxLevel || 16;
    this.currentLevel = 0;

    // 空跳表头节点
    this.head = this._createNode(null, null, this.MAX_LEVEL);
  }

  // ==========================
  // 【2】插入（放最前面）
  // ==========================
  insert(idKey, value) {
    if (this.findById(idKey) !== null) {
      console.warn("id 已存在：" + idKey);
      return;
    }

    const newLevel = this._randomLevel();
    const newNode = this._createNode(idKey, value, newLevel + 1);
    const update = new Array(this.MAX_LEVEL).fill(this.head);
    let cur = this.head;

    for (let i = this.currentLevel; i >= 0; i--) {
      while (cur.next[i] && this._compare(cur.next[i].value, value) < 0) {
        cur = cur.next[i];
      }
      update[i] = cur;
    }

    for (let i = 0; i <= newLevel; i++) {
      newNode.next[i] = update[i].next[i];
      update[i].next[i] = newNode;
    }

    if (newLevel > this.currentLevel) {
      this.currentLevel = newLevel;
    }
  }

  // ==========================
  // 【3】获取有序列表（放最前面）
  // ==========================
  getSortedList() {
    const res = [];
    let cur = this.head.next[0];
    while (cur) {
      res.push({ idKey: cur.idKey, value: cur.value });
      cur = cur.next[0];
    }
    return res;
  }

  // ==========================
  // 【4】按ID查找（放最前面）
  // ==========================
  findById(idKey) {
    let cur = this.head.next[0];
    while (cur) {
      if (cur.idKey === idKey) return cur.value;
      cur = cur.next[0];
    }
    return null;
  }

  // ==========================
  // 【5】按ID删除（放最前面）
  // ==========================
  deleteById(idKey) {
    // 找到要删除的节点
    let target = null;
    let cur = this.head.next[0];
    while (cur) {
      if (cur.idKey === idKey) {
        target = cur;
        break;
      }
      cur = cur.next[0];
    }
    if (!target) return false;

    // 找到每一层前驱
    const update = new Array(this.MAX_LEVEL).fill(this.head);
    cur = this.head;
    for (let i = this.currentLevel; i >= 0; i--) {
      while (cur.next[i] && cur.next[i] !== target) {
        cur = cur.next[i];
      }
      update[i] = cur;
      cur = this.head;
    }

    // 删除各层节点
    for (let i = 0; i <= this.currentLevel; i++) {
      if (update[i].next[i] === target) {
        update[i].next[i] = target.next[i];
      }
    }
    return true;
  }

  // ==========================
  // 👇 以下全是内部私有方法（放后面）
  // ==========================
  _createNode(idKey, value, level) {
    return { idKey, value, next: new Array(level).fill(null) };
  }

  _randomLevel() {
    let level = 0;
    while (Math.random() < 0.5 && level < this.MAX_LEVEL - 1) {
      level++;
    }
    return level;
  }

  _compare(a, b) {
    if (!a) return -1;
    if (!b) return 1;
    return this.compareFn(a, b);
  }
}

module.exports = SkipList;