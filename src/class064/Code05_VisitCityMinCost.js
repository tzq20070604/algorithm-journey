/**
 * @param {number[][]} paths
 * @param {number} cnt
 * @param {number} start
 * @param {number} end
 * @param {number[]} charge
 * @return {number}
 */
var electricCarPlan = function(paths, cnt, start, end, charge) {
    let n = charge.length

    // 建图
    build(paths,n)
    
    // dijstra
    let visited = Array(n).fill(0).map(()=>{
           return Array(cnt + 1).fill(false)})
    
    let distance = Array(n).fill(0).map(()=>{
           return Array(cnt + 1).fill(Infinity)
    })

    distance[start][0] = 0
    let heap = new Heap(Heap.HeapType.SMALL, (item1, item2)=>{
        return item1[2] - item2[2]
    })
    heap.insert([start,0,0])
    while(!heap.isEmpty()){
       let [p,s,cost] = heap.pop()
       if (p == end){
          return cost
       }
       if (visited[p][s]){
          continue
       }
       visited[p][s] = true
       // 在本地充电
       if (s < cnt){
          if (distance[p][s + 1] > distance[p][s] + charge[p] && !visited[p][s+1]){
               distance[p][s + 1] = distance[p][s] + charge[p]
               heap.insert([p,s+1, distance[p][s + 1]])
          }
       }
       // 直接去下一个目的地
       for (let i = 0; i < graph[p].length; i++){
            let [v,w] = graph[p][i]
            if (s >= w){
              if (distance[v][s - w] > distance[p][s] + w && !visited[v][s-w]){
                  distance[v][s - w] = distance[p][s] + w
                  heap.insert([v, s - w, distance[v][s - w]])
               }
            }
       }
    }
    return -1
};

let graph = []
function build(paths,n){
   graph = Array(n).fill(0).map(()=>{return []})
   for (let i = 0;i < paths.length;i++){
      let [w,v,s] = paths[i]
      graph[w].push([v,s])
      graph[v].push([w,s])
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
