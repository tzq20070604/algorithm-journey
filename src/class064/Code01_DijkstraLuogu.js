const fs  = require('fs')
const path = require('path')
const fileName = 'test.in'
const filepath =  path.resolve(__dirname,fileName)
const fsStream = fs.createReadStream(filepath,{encoding:'utf-8',crlfDelay:Infinity})
const readline = require('readline').createInterface({input:fsStream})
let row = 0
let n,m,s
readline.on('line',(line)=>{
   row++
   if (row == 1){
     [n,m,s] = line.split(' ').map(Number)
     build()
   } else {
     let edge = line.split(' ').map(Number)
     addEdge(edge)
   }
   if (row == 1 + m){
      readline.close()
   }
})

readline.on('close',()=>{
    dijkstra()
})

let head = []
let next = []
let to = []
let weight = []
let cnt = 1
function build(){
    cnt = 1
    head = Array(n+1).fill(0)
    next = Array(m+1).fill(0)
    to = Array(m+1).fill(0)
    weight = Array(m+1).fill(0)
}

function addEdge(edge){
    let [u,v,w] = edge
    // 当前边号cnt
    next[cnt] = head[u]
    to[cnt] = v
    weight[cnt] = w
    head[u] = cnt++
}

function dijkstra(){
    let distance = Array(n+1).fill(Infinity)
    // 控制是否从堆中弹出，和 当前在堆中的位置
    let where = Array(n+1).fill(-1)
    let heap = new Heap(Heap.HeapType.SMALL, (item1,item2)=>{
       return item1[1] - item2[1]
    },where)
    distance[s] = 0
    heap.insert([s, 0])
    while(!heap.isEmpty()){
       let [u, s] = heap.pop()
       for(let edgeIndex = head[u]; edgeIndex != 0; edgeIndex = next[edgeIndex]){
           let v = to[edgeIndex]
           if (where[v] == -1){
               distance[v] = s + weight[edgeIndex]
               heap.insert([v, distance[v]])
           } else if (where[v] >= 0) {
               if (distance[v] > s + weight[edgeIndex]){
                   distance[v] = s + weight[edgeIndex]
                   heap.insert([v, distance[v]])
               }
           }
       }
    }
    distance.shift()
    console.log(distance.join(' '))
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
