const fs = require('fs')
const path1 = require('path')
const fileName = 'Code02_Floyd.in'
const absolutePath = path1.resolve(__dirname, fileName); // 基于当前脚本目录
const fileStream = fs.createReadStream(absolutePath, {
  encoding: 'utf8', // 指定编码（如处理 GBK 需用第三方库）
  crlfDelay: Infinity // 兼容不同系统的换行符（\n 或 \r\n）
})
const readline = require('readline').createInterface({input:fileStream})

// const readline = require('readline').createInterface({input:process.stdin})
let lineNum = 0
let n,m,path = [],graph =[]
readline.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
       [n,m] = line.split(' ').map(Number)
    } else if (lineNum <= m + 1){
       let nodeArr = line.split(' ').map(Number)
       path.push(nodeArr[0])
    } else {
       let nodeArr = line.split(' ').map(Number)
       graph.push(nodeArr)
    }
    if (lineNum == m + 1 + n){
       console.log(calcaluteShortPath())
    }
})

let distance = []
function calcaluteShortPath(){
    // console.log(graph)
    // console.log(path)
    distance = graph
    for (let m = 1; m <= n; m++){
        for (let i = 1; i <= n; i++){
            for (let j = 1; j <= n; j++){
                if (distance[i-1][j-1] > distance[i-1][m-1] + distance[m-1][j-1]){
                    distance[i-1][j-1] = distance[i-1][m-1] + distance[m-1][j-1]
                }
            }
        }
    }
    let res = 0
    for (let i =0; i < path.length - 1;i++){
        res += distance[path[i] - 1][path[i+1]-1]
    }
    return res
}