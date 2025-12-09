const fs = require('fs')
const path = require('path')
const fileName = 'Code04_SPFA.in'
const absolutePath = path.resolve(__dirname, fileName); // 基于当前脚本目录
const fileStream = fs.createReadStream(absolutePath, {
  encoding: 'utf8', // 指定编码（如处理 GBK 需用第三方库）
  crlfDelay: Infinity // 兼容不同系统的换行符（\n 或 \r\n）
})
const readline = require('readline').createInterface({input:fileStream})

// const readline = require('readline').createInterface({input:process.stdin})
let lineNum = 0
let n,m,group,lineHead,lineStart,lineEnd
let edges = []
let arr = []
readline.on('line', (line)=>{
    lineNum++
    if (lineNum == 1){
      group = line.split(' ').map(Number)[0]
      lineHead = 2
    } 
   
    if (lineNum == lineHead){
        group--
        edges = [];
        [n,m] = line.split(' ').map(Number)
        lineStart = lineHead + 1
        lineEnd = lineHead + m
    } else {
        edges.push(line.split(' ').map(Number))
        if (lineNum == lineEnd){
           arr.push([n,m,edges])
           lineHead = lineEnd+1
           if (group == 0){
              claculateTotal(arr)
           }
        } 
    } 
})

function claculateTotal(arr){
   for(let k=0;k < arr.length; k++){
      let [n,m,edges] = arr[k]
      claculate(n,m,edges)
   }
}
let MAXQ = 4000001
let queue = Array(MAXQ).fill(0)
function claculate(n,m,edges){
    let distance = Array(n + 1).fill(Infinity)
    let enter = Array(n + 1).fill(false)
    let anser =  Array(n + 1).fill(0)
    let l =0, r=0
    let graph = Array(n + 1).fill(0).map(()=>{return []});
    for(let i =0; i < edges.length; i++){
        let [u,v,w] = edges[i]
        if (w >= 0){
           graph[u].push([v,w])
           graph[v].push([u,w])
        } else {
           graph[u].push([v,w])
        }
    }
    distance[1] = 0
    queue[r++] = 1
    enter[1] = true
    anser[1] = 1
    while(l < r){
        let u = queue[l++]
        enter[u] = false
        for (let j =0;j < graph[u].length;j++){
           // 当下的边 
           let [v,w] = graph[u][j]
           if (distance[u] + w < distance[v]) {
               distance[v] = distance[u] + w
               if (!enter[v]){
                  anser[v]++
                  if (anser[v] > n -1){
                      console.log("YES")
                      return true
                  }
                  enter[v] = true
                  queue[r++] = v
               }
           }
        }
    }
    console.log("NO")
    return false
}