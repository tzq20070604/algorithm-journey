/**
 * 先解锁项目，然后做最赚钱的项目，再解锁项目，直到满足k个
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
var findMaximizedCapital1 = function(k, w, profits, capital) {
    let heap = new CustomHeap(CustomHeap.HeapType.SMALL,(a,b)=>{
        return b[1] - a[1]
    })
    let items = []
    for(let i = 0; i < profits.length; i++){
        items.push([capital[i],profits[i]])
    }
     items.sort((a,b)=>{return a[0] - b[0]})
     let i = 0,n = items.length,count = 0
     // count 表示当前完成的项目个数
     while(count < k){
       while(i < n && items[i][0] <= w){
          heap.insert(items[i])
          i++
       }
       // 找一个利润最大的来做
       if(!heap.isEmpty()){
         let item = heap.pop()
         w += item[1]
         count++
       } else {
         return w
       }
     }
     return w
};

/**
 * 先解锁项目，然后做最赚钱的项目，再解锁项目，直到满足k个
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
var findMaximizedCapital = function(k, w, profits, capital) {
    // 未解锁的项目
    let lockHeap = new CustomHeap(CustomHeap.HeapType.SMALL,(a,b)=>{
        return a[0] - b[0]
    })
    
    // 已经解锁的项目
    let unlockHeap = new CustomHeap(CustomHeap.HeapType.SMALL,(a,b)=>{
        return b[1] - a[1]
    })

    for(let i = 0; i < profits.length; i++){
        lockHeap.insert([capital[i],profits[i]])
    }

     // count 表示当前完成的项目个数
    while(k > 0){
       // 当前成本能解锁那些
       while(!lockHeap.isEmpty() && lockHeap.peek()[0] <= w){
           unlockHeap.insert(lockHeap.pop())
       }
       // 已经解锁找一个利润最大的来做
       if(!unlockHeap.isEmpty()){
         let item = unlockHeap.pop()
         w += item[1]
         k--
       } else {
         return w
       }
    }
    return w
};

class CustomHeap {
    static HeapType = {
        SMALL:'small',
        BIG:'big'
    }
    type = CustomHeap.HeapType.SMALL
    items = []
    size = 0
    sortFunc = function(item1, item2){ return item1 - item2}

    constructor(type, sortFunc){
       if (type == undefined) {
         this.type = CustomHeap.HeapType.SMALL
       }
       if (sortFunc == undefined){
           sortFunc = this.sortFunc
       }
       if (type == CustomHeap.HeapType.BIG){
           this.sortFunc = function(item1, item2){
               return 0 - sortFunc(item1, item2)
           }
       } else {
           this.sortFunc = sortFunc
       }
       this.type == CustomHeap.HeapType.SMALL
    }

    insert(item){
        this.items.push(item)
        this.size++
        let i = this.size - 1
        while(i > 0){
            var fi = ((i - 1) >> 1)
            // 小根堆
            let res = (this.sortFunc(this.items[fi],this.items[i]) > 0)
            if (res){
               this.swap(i, fi)
               i = fi
            } else {
               break
            }
        }
    }

    peek(){
        if (this.isEmpty()){
            return null
        } else {
            return this.items[0]
        }
    }
    pop(){
       let tmp = null
       if (this.isEmpty()){
            return tmp
       } else {
            this.swap(0, this.size - 1)
            tmp = this.items.pop()
            this.size--
            this.heapify(0)
       }
       return tmp 
    }
    
    isEmpty(){
        return this.size == 0
    }

    swap(i, j) {
         let tmp = this.items[i]
         this.items[i] = this.items[j]
         this.items[j] = tmp
    }

    heapify(i) {
        while(i < this.size){
           let best = i
           let li = (i << 1) + 1
           let ri = (i << 1) + 2
           // 首先要lIndex和lRight 存在
           if (li < this.size && this.sortFunc(this.items[i],this.items[li]) > 0){
                best = li
           }
           if (ri < this.size && this.sortFunc(this.items[best],this.items[ri]) > 0){
                best = ri
           }
           if (best == i){
              break
           } else {
              this.swap(best, i)
              i = best
           }
        }
    }
}