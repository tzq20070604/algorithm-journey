/**
 * @param {number[]} quality
 * @param {number[]} wage
 * @param {number} k
 * @return {number}
 */
var mincostToHireWorkers = function(quality, wage, k) {
    // 一份质量支付的价格
    let arr = []
    for(let i = 0; i < quality.length; i++){
       arr.push([wage[i] / quality[i],quality[i]])
    }
    // 按照性价比由大到小来排列
    arr.sort((a,b)=>{return a[0]-b[0]})
    // 质量从大到小排列
    let heap = new CustomHeap(CustomHeap.HeapType.BIG, (a,b)=>{return a - b})
    let sum = 0,ans = Infinity
    // 按照i的比例支付时
    for(let i = 0; i < arr.length; i++){
        // 以i作为瓶颈，找出k个质量最小的
       let [ratio, weight] = arr[i]
       if (heap.size < k){
         // 先将i加入
         sum += weight
         heap.insert(weight)
       } else {
         let item = heap.peek()
         if (item > weight){
             sum -= item
             sum += weight
             heap.pop()
             heap.insert(weight)
         }
       }
       if (heap.size == k) {
          ans = Math.min(ans, sum * ratio)
       }
    }
    return ans
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