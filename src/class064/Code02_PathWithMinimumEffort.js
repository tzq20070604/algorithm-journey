/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function(heights) {
    let m = heights.length
    let n = heights[0].length
    let visited = Array(n * m).fill(false)
    let heap = new Heap(Heap.HeapType.SMALL, (item1, item2)=>{
        return item1[1] - item2[1]
    })
    heap.insert([0, 0])
    let min = 0
    while(!heap.isEmpty()){
       let [u, s] = heap.pop()
       if (!visited[u]){
            visited[u] = true
            min = Math.max(s, min)
            if (u == n * m - 1){
              return min
           }
           let row = Math.floor(u / n)
           let col = u % n
           let derect = [[0,1],[0,-1],[1,0],[-1,0]]
           for (let i = 0; i < derect.length;i++){
              let x = row + derect[i][0]
              let y = col + derect[i][1]
              if (x < 0 || x >= m || y < 0 || y >= n || visited[x * n + y]){
                continue
              }
              let del = Math.abs(heights[x][y] - heights[row][col])
              heap.insert([x * n + y, del])
           }
       }
    }
    return Infinity
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

minimumEffortPath([[1,2,2],[3,8,2],[5,3,5]])