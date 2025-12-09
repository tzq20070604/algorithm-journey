/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function(times, n, k) {
    // 建图
    let graph = Array(n+1).fill(0).map(()=>{ return []})
    for (let i = 0; i < times.length; i++){
        let [ui, vi, wi] = times[i]
        graph[ui].push([vi, wi])
    }

    // 流程
    let distance = Array(n+1).fill(Infinity)
    let visited = Array(n+1).fill(false)
    let heap = new Heap(Heap.HeapType.SMALL, (item1,item2)=>{
        return item1[1] - item2[1]
    })
    distance[k] = 0
    heap.insert([k, 0])
    while(!heap.isEmpty()){
       let [v,s] = heap.pop()
       if (!visited[v]){
          visited[v] = true
          for(let i = 0; i < graph[v].length; i++){
              let [u,c] = graph[v][i]
              if (s + c < distance[u]){
                 distance[u] = s + c
                 heap.insert([u, distance[u]])
              }
          }
       }
    }
    let ans = 0
    for (let i = 1; i <= n; i++){
        ans = Math.max(ans, distance[i])
    }
    return (ans == Infinity) ? -1 : ans
};

class Heap {
    static HeapType = {
        SMALL:'small',
        BIG:'big'
    }
    type = Heap.HeapType.SMALL
    items = []
    size = 0
    sortFunc = function(item1, item2){ return item1 - item2}

    constructor(type, sortFunc){
       if (type == undefined) {
         this.type = Heap.HeapType.SMALL
       }
       if (sortFunc == undefined){
           sortFunc = this.sortFunc
       }
       if (type == Heap.HeapType.BIG){
           this.sortFunc = function(item1, item2){
               return 0 - sortFunc(item1, item2)
           }
       } else {
           this.sortFunc = sortFunc
       }
       this.type == Heap.HeapType.SMALL
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

// module.exports = Heap;