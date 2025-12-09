/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
   if (src === dst) return 0; // 特判相同城市
   let graph = Array(n).fill(0).map(()=>{return []})
   for (let i = 0; i < flights.length; i++){
       let [u,v,s] = flights[i]
       graph[u].push([v,s])
   }
   let distance = Array(n).fill(0).map((item)=>{
       return Array(k+2).fill(Infinity)
   })

   let visit = Array(n).fill(0).map((item)=>{
       return Array(k+2).fill(false)
   })

   let heap = new Heap(Heap.HeapType.SMALL,(item1,item2)=>{
      return item1[2] - item2[2]
   })
   distance[src][k+1] = 0
   heap.insert([src, k+1, 0])
   while(!heap.isEmpty()){
      let [u,c,s] = heap.pop()
      if (u == dst){
          return s
      }
      if (visit[u][c]){
         continue
      }
      // 访问
      visit[u][c] = true
      if (c > 0){
         for (let i = 0; i < graph[u].length;i++){
             let [v,w] = graph[u][i]
             if (!visit[v][c-1] && distance[v][c-1] > distance[u][c] + w){
                  distance[v][c-1] = distance[u][c] + w
                  heap.insert([v,c-1,distance[u][c] + w])
             }
         }
      }
   }
   return -1
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

// findCheapestPrice(4,[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],0,3,1)
