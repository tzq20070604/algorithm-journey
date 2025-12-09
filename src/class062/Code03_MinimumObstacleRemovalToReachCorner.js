/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumObstacles = function(grid) {
    let m = grid.length
    let n = grid[0].length
    let visit = Array(m).fill(0).map(()=>{
       return Array(n).fill(false)
    })
    let distance = Array(m).fill(0).map(()=>{
       return Array(n).fill(Infinity)
    })
    let heap = new Heap(Heap.HeapType.SMALL,(item1,item2)=>{return item1[2] - item2[2]})
    distance[0][0] = 0
    visit[0][0] = true
    heap.insert([0,1,grid[0][1]])
    if (m > 1){
 heap.insert([1,0,grid[1][0]])
    }
    let directs = [[0,-1],[0,1],[-1,0],[1,0]]
    while(!heap.isEmpty()){
       let [x,y,s] = heap.pop()
       if (!visit[x][y]){ // 得计算
          visit[x][y] = true
          distance[x][y] = s
          // 上下左右
          for (let i =0; i< 4; i++){
             let x1 = x + directs[i][0]
             let y1 = y + directs[i][1]
             if (x1 < 0 || y1 < 0 || x1 >= m || y >= n || visit[x1][y1]){
                continue
             }
             heap.insert([x1,y1,s + grid[x1][y1]])
          }
       }
    }
    return distance[m-1][n - 1]
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