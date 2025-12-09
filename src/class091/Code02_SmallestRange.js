/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var smallestRange = function(nums) {
    let list = new List((a,b)=>{return a[0] - b[0]})
    let k = nums.length
    let gIndex = Array(k).fill(0)
    let range = [0-10**5, 1e5]
    for(let g = 0; g < k; g++){
        list.insert([nums[g][0],g])
        gIndex[g] = gIndex[g] + 1
    }
    while(list.size == k){
        let newRange = [list.peekFirst()[0],list.peekLast()[0]]
        if (newRange[1] - newRange[0] < range[1] - range[0]){
            range = newRange
        }
        let [_,g] = list.popFirst()
        if (gIndex[g] < nums[g].length){
          list.insert([nums[g][gIndex[g]],g])
          gIndex[g] =  gIndex[g] + 1
        }
    }
    return range
};

// 默认first小，last大，如果想反过来，请修改compare函数
// 缺点就是数组的缺点，查找快，但是插入要平移内存
class List {
    arr = []
    size = this.arr.length
    compare(a,b){
        return a - b
    }
    constructor(compare){
        this.compare = compare ?? this.compare
    }

    // 插入到正确位置
    insert(item){
       let index = this.findIndex(item)
       if (index == -1){
          this.arr.push(item)
       } else {
          this.arr.splice(index,0,item)
       }
       this.size++
    }

    peekFirst(){
        if (!this.isEmpty()){
            return this.arr[0]
        }
        return undefined
    }
    peekLast(){
        if (!this.isEmpty()){
            return this.arr[this.size - 1]
        }
        return undefined
    }
    popFirst(){
        if (!this.isEmpty()){
           this.size--
           return this.arr.shift()
        }
        return undefined
    }
    popLast(){
        if (!this.isEmpty()){
           this.size--
           return this.arr.pop()
        }
        return undefined
    }
    // 查找item的位置，找到大于等于item，最靠左的位置，没有找到返回-1
    findIndex(item){
       let l = 0, r = this.arr.length - 1
       let index = -1
       while(l <= r){
          let mid = l + ((r - l) >> 1)
          if (this.compare(item, this.arr[mid]) <= 0){
              index = mid
              r = mid - 1
          } else {
              l = mid + 1
          }
       }
       return index
    }

    isEmpty(){
        return this.size == 0
    }
}

let list = new List((a,b)=>{
    return a[0] - b[0]
})


/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var smallestRange1 = function (nums) {
    // 使用最小堆
    let minRange = [-1e5, 1e5];
    let max = -Infinity;
    const heap = new CustonHeap((a, b) => a.val - b.val);

    // 初始化堆，每个数组取第一个元素
    for (let i = 0; i < nums.length; i++) {
        heap.push({ val: nums[i][0], row: i, idx: 0 });
        max = Math.max(max, nums[i][0]);
    }

    while (true) {
        const { val, row, idx } = heap.pop();
        if (max - val < minRange[1] - minRange[0]) {
            minRange = [val, max];
        }
        if (idx + 1 === nums[row].length) break;
        const nextVal = nums[row][idx + 1];
        heap.push({ val: nextVal, row, idx: idx + 1 });
        if (nextVal > max) max = nextVal;
    }
    return minRange;
};