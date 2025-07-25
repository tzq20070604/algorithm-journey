const fs = require('fs')
const path = require('path')
const absolutePath = path.resolve(__dirname, 'P3366_1.in'); // 基于当前脚本目录
const fileStream = fs.createReadStream(absolutePath, {
  encoding: 'utf8', // 指定编码（如处理 GBK 需用第三方库）
  crlfDelay: Infinity // 兼容不同系统的换行符（\n 或 \r\n）
})
const Heap = require('./Heap')
const readline = require('readline').createInterface({input:fileStream})
// const readline = require('readline').createInterface({input:process.stdin})
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
    let visited = Array(N + 1).fill(false)
    let graph = Array(N + 1).fill(0).map(()=>{return []})
    for (let i = 0; i < pathArr.length; i++){
        let [p1,p2,s] = pathArr[i]
        graph[p1].push([p2, s])
        graph[p2].push([p1, s])
    }
    //2.将一个顶点弹出，出堆的时候进行结算。如果这个顶点相连的点没有被访问，将这个点相连的边放入小根堆，将这个点设置为已经访问,
    let heap = new Heap(Heap.HeapType.SMALL, (item1, item2)=>{return item1[1] - item2[1]})
    for(let j = 0; j < graph[1].length; j++){
        heap.insert(graph[1][j])
    }
    visited[1] = true
    let nodeNum = 1
    let res = 0
    while(!heap.isEmpty()){
       let [next, value] = heap.pop()
       if (!visited[next]){
          visited[next] = true
          res += value
          nodeNum++
          let nextLevel = graph[next]
          for(let i = 0; i < nextLevel.length; i++){
             heap.insert(nextLevel[i])
          }
       }
    }
    if (nodeNum == N){
       return res
    } else {
       return "orz"
    }
}
