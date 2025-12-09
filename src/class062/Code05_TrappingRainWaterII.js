/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function(heightMap) {
    let m = heightMap.length
    let n = heightMap[0].length
    if (n*m <= 4){
        return 0
    }
    let heap = new Heap(Heap.HeapType.SMALL,(item1,item2)=>{
        return item1[2] - item2[2]
    })
    for(let i = 0;i < n; i++){
        heap.insert([0,i,heightMap[0][i]]) 
        heap.insert([m-1,i,heightMap[m-1][i]]) 
    }
    for(let j = 1; j < m-1; j++){
        heap.insert([j,0,heightMap[j][0]]) 
        heap.insert([j,n-1,heightMap[j][n-1]]) 
    }
    let res = 0
    while(!heap.isEmpty()){
        let [x, y, h] = heap.pop()
        if (heightMap[x][y] == -1){
            continue
        } else {
           // h 是一定大于等于heightMap[x][y]的，放入队列的时候已经决定
            res += (h - heightMap[x][y])
            heightMap[x][y] = -1
            // 它四周的可以结算
            let derect = [[1,0],[-1,0],[0,1],[0,-1]]
            for(let [delx,dely] of derect){
                let [x1, y1] = [x+delx, y+dely]
                if (x1 < 0 || x1 >= m || y1 < 0 || y1 >= n || (heightMap[x1][y1] == -1)){
                    continue
                }
                // 放入的就是这个点最大水位高度，超出这个高度就要计算了
                heap.insert([x1,y1,Math.max(heightMap[x1][y1],h)]) 
            }
        }
    }
    return res
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

var heap = new Heap()