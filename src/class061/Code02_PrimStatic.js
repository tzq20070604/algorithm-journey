const readline = require('readline').createInterface({input:process.stdin})
let count = 0
let N =0, M =0
let pathArr = []

readline.on('line',(line)=>{
    count++
    if (count == 1){
       [N, M] = line.split(" ").map(Number)
    } else {
       pathArr.push(line.split(" ").map(Number))
       if(count == (1 + M)){
          readline.close()
       }
    }
})

readline.on('close',()=>{
    console.log(shortPath())
})

function shortPath(){
    //1.第一步建图
    let where = Array(N + 1).fill(-1)
    let graph = Array(N + 1).fill(0).map(()=>{return []})
    for (let i = 0; i < pathArr.length; i++){
        let [p1,p2,s] = pathArr[i]
        graph[p1].push([p2, s])
        graph[p2].push([p1, s])
    }
    //2.将一个顶点弹出，出堆的时候进行结算。如果这个顶点相连的点没有被访问，将这个点相连的边放入小根堆，将这个点设置为已经访问,
    let nodeNum = 1
    where[1] = -2
    let res = 0
    let heap = new Heap(Heap.HeapType.SMALL, (item1, item2)=>{return item1[1] - item2[1]}, where)
    for(let j = 0; j < graph[1].length; j++){
        heap.insert(graph[1][j])
    }
    // 这里弹出<where[-2]>已经保证了后续到该点不会被记入答案了。
    while(!heap.isEmpty()){
       let [next, value] = heap.pop()
        res += value
        nodeNum++
        let nextLevel = graph[next]
        for(let i = 0; i < nextLevel.length; i++){
            heap.insert(nextLevel[i])
        }
    }
    if (nodeNum == N){
       return res
    } else {
       return "orz"
    }
}

class Heap {
    static HeapType = {
        SMALL:'small',
        BIG:'big'
    }
    type = Heap.HeapType.SMALL
    items = []
    size = 0
    where = []
    sortFunc = function(item1, item2){ return item1 - item2}
    constructor(type, sortFunc, where){
       if (type == Heap.HeapType.BIG){
           this.sortFunc = function(item1, item2){
               return 0 - sortFunc(item1, item2)
           }
       } else {
           this.sortFunc = sortFunc
       }
       this.type == Heap.HeapType.SMALL
       this.where = where
    }
    // 加入或者更新了 返回true 否则返回false
    insert(item){
        let index = this.where[item[0]]
        // 分2中情况，在堆中和不在堆中。在堆中，找到它更新，调整。不在堆中，加入到堆中。
        if (index == -2){
            return false
        } else if (index >= 0) {
            let oldItem = this.items[index]
            if (oldItem[1] <= item[1]){
               return false
            } else {
               oldItem[1] = item[1]
               // 往上调整
               this.up(index)
            }
            return true
        } else {
            this.items.push(item)
            this.size++
            let i = this.size - 1
            this.where[item[0]] = i
            this.up(i)
            return false
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
            this.where[tmp[0]] = -2
            this.size--
            this.heapify(0)
       }
       return tmp 
    }
    size(){
        return this.size
    }

    isEmpty(){
        return this.size == 0
    }

    swap(i, j) {
         let tmp = this.items[i]
         this.items[i] = this.items[j]
         this.items[j] = tmp

         this.where[this.items[i][0]] = i
         this.where[this.items[j][0]] = j
    }
    up(i){
         while(i > 0){
            let fi = ((i - 1) >> 1)
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

module.exports = Heap;