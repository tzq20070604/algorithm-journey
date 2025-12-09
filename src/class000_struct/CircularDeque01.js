class CircularDeque {
    constructor(capacity) {
        this.array = Array(capacity).fill(null);
        this.capacity = capacity;
        this.size = 0;
        this.l = 0; // 队头指针（指向首个有效元素）
        this.r = 0; // 队尾指针（指向下一个空位）
    }

    push(item) {
        if (this.isFull()) return false;
        this.array[this.r] = item;
        this.r = ((this.r + 1) % this.capacity); // 先移动指针
        this.size++;
        return true
    }

    unshift(item) {
        if (this.isFull()) return false;
        this.l = ((this.l - 1 + this.capacity) % this.capacity); // 先移动指针
        this.array[this.l] = item;
        this.size++;
        return true
    }

    pop() {
        if (this.isEmpty()) return null;
        this.r = ((this.r - 1 + this.capacity) % this.capacity); // 右指针左移
        const item = this.array[this.r];
        this.array[this.r] = null;
        this.size--;
        return item;
    }

    shift() {
        if (this.isEmpty()) return null;
        const item = this.array[this.l];
        this.array[this.l] = null;
         this.l = ((this.l + 1) % this.capacity); // 左指针右移
        this.size--;
        return item;
    }

    isEmpty(){
        this.size == 0
    }

    isFull(){
        this.size == this.capacity
    }
}