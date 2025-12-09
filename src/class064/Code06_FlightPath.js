const { count } = require('console')

const readline = require('readline').createInterface({input:process.stdin})
let n,m,k,start,end
let lineNum = 0
readline.on('line',(line)=>{
   lineNum++
   if (lineNum == 1){
       [n,m,k] = line.split(' ').map(Number)
       build()
   } else if (lineNum == 2){
       [start, end] = line.split(' ').map(Number)
   } else {
       addEdge(line.split(' ').map(Number))
   }
   if (m + 2 == lineNum){
      console.log(lessCost(start, end))
   }
}) 

let graph = []
let distance = []
let visit = []
function build(){
   graph = Array(n).fill(0).map(()=>{return []})
   distance = Array(n).fill(0).map(()=>{
     return Array(k+1).fill(Infinity)
   })
   visit = Array(n).fill(0).map(()=>{
     return Array(k+1).fill(false)
   })
}

function addEdge(edge){
   let [u,v,w] = edge
   graph[u].push([v,w])
   graph[v].push([u,w])
}

function lessCost(from, to){
    let heap = new Heap(Heap.HeapType.SMALL, (item1,item2)=>{
        return item1[2] - item2[2]
    })
    heap.insert([from,k,0])
    distance[from][k] = 0
    while(!heap.isEmpty()){
        let [u,l,s] = heap.pop()
        if (u == to){
            return s
        }
        if (visit[u][l]){
            continue
        }
        visit[u][l] = true
        for (let i = 0; i < graph[u].length; i++){
            let [v,w] = graph[u][i]
            // 是否使用免费名额
            if (l > 0){
                if (!visit[v][l - 1] && distance[v][l-1] > distance[u][l]){
                    distance[v][l - 1] = distance[u][l]
                    heap.insert([v, l-1, distance[v][l - 1]])
                }
            } 
            if (!visit[v][l] && distance[v][l] > distance[u][l] + w){
                distance[v][l] = distance[u][l] + w
                heap.insert([v, l, distance[v][l]])
            }
        }
    }
    return -1
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
