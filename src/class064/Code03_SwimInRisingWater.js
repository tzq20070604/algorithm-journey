/**
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function(grid) {
    let m = grid.length
    let n = grid[0].length
    visited = Array(m).fill(0).map(()=>{return Array(n).fill(false)})
    distance = Array(m).fill(0).map(()=>{return Array(n).fill(Infinity)})
    let heap = new Heap(Heap.HeapType.SMALL, (item1, item2)=>{
       return item1[2] - item2[2]
    })
    heap.insert([0,0,grid[0][0]])
    while(!heap.isEmpty()){
       let [u,v,h] = heap.pop()
       if (visited[u][v]){
          continue
       }
       if (u == m - 1 && v == n - 1){
          return h
       }
       visited[u][v] = true
       let derect = [[1,0],[-1,0],[0,1],[0,-1]]
       for (let [delx, dely] of derect){
         let row = u + delx
         let col = v + dely
         if (row < 0 || row >= m || col < 0 || col >= n || visited[row][col]){
            continue
         }
         let c = Math.max(grid[row][col], h)
         if (c < distance[row][col]){
            distance[row][col] = c
            heap.insert([row,col,c])
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

swimInWater([[0,2],[1,3]])