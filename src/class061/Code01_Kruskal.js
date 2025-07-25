// const fs = require('fs')
// const path = require('path')
// const absolutePath = path.resolve(__dirname, 'Code01_Kruskal.in'); // 基于当前脚本目录
// const fileStream = fs.createReadStream(absolutePath, {
//   encoding: 'utf8', // 指定编码（如处理 GBK 需用第三方库）
//   crlfDelay: Infinity // 兼容不同系统的换行符（\n 或 \r\n）
// })
// const readline = require('readline').createInterface({input:fileStream})
// 最小生成树，给人整体上的感觉就是，从一个点向外边缘扩散，每次发现了最小的边，便将最小的边，设为已访问，后续不会再计算。
// 不敢是Kruskal算法还是prim算法都是这种思路
const readline = require('readline').createInterface({input:process.stdin})
let count = 0
let N =0, M =0
let pathArr = []
let set

readline.on('line',(line)=>{
    count++
    if (count == 1){
       [N, M] = line.split(" ").map(Number)
       set = new Union(N+1)
    } else {
       pathArr.push(line.split(" ").map(Number))
       if(count == 1 + M){
          readline.close()
       }
    }
})

readline.on('close',()=>{
    console.log(shortPath())
})

function shortPath(){
    let res = 0
    let pathNum = 0
    pathArr.sort((item1,item2)=>{return item1[2] - item2[2]})
    for (let i = 0; i < pathArr.length;i++){
        let path = pathArr[i]
        if (!set.union(path[0],path[1])){
           pathNum++
           res += path[2]
        }
    }
    if (pathNum != N - 1){
        return "orz"
    }
    return res
}

class Union{
    len = 0
    father = []
    size = []
    constructor(length){
        for (let i = 0; i < length; i++){
            this.father.push(i)
            this.size.push(1)
        }
    }
    
    isSameUnion(i, j){
       return this.find(i) == this.find(j)
    }

    union(i, j){
       let ri = this.find(i)
       let rj = this.find(j)
       if (ri == rj){
          return true
       } else {
          if (this.size[ri] >= this.size[rj]){
             this.father[rj] = ri
             this.size[ri] += this.size[rj]
          } else {
            this.father[ri] = rj
            this.size[rj] += this.size[ri]
          }
          return false
       }
    }

    find(i){
        if (i != this.father[i]){
            this.father[i] = this.find(this.father[i])
        }
        return this.father[i]
    }
}