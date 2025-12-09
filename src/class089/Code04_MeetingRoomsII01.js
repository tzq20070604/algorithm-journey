// https://www.nowcoder.com/practice/1ae8d0b6bb4e4bcdbf64ec491f63fc37
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void async function () {
    let lineNum = 0
    let n = 0
    let arr = []
    while(line = await readline()){
        lineNum++
        if (lineNum == 1){
           n = parseInt(line.trim())
        } else {
           arr.push(line.trim().split(' ').map(Number))
        }
        if (lineNum == n + 1){
            compute(n,arr)
        }
    }
}()

function compute(n,arr){
    arr.sort((a,b)=>{
        if (a[0] == b[0]) {
            return a[1] - b[1]
        } else {
            return a[0] - b[0]
        }
    })
    let ans = 0
    // 判断开始位置在这项任务之前的，结束位置大于本项任务开始的时间
    let heap = new CustomHeap(CustomHeap.HeapType.SMALL,(a,b)=>{return a - b})
    for(let i =0; i < arr.length; i++){
        while(!heap.isEmpty() && heap.peek() <= arr[i][0]){
            heap.pop()
        }
        heap.insert(arr[i][1])
        ans = Math.max(ans,heap.size)
    }
    console.log(ans)
    return ans
}

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