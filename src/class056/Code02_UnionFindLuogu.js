// const rl = require("readline").createInterface({ input: process.stdin });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;
// await readline()

// 洛谷 输出 最好一起输出 但是控制输出的长度 本题目的10000长度
const rl = require("readline").createInterface({ input: process.stdin, output:process.stdout });
var N , M
var lineNo = 0
var father = []
var size = []
var consoles = []

rl.on('line', (line)=>{
    lineNo++
    if (lineNo == 1){
       [N, M] = line.split(' ').map(Number)
       consoles = []
       build()
    } else {
       const [op, x, y] = line.split(' ').map(Number)
       if (op == 2){
        //  console.log(isSameSet(x, y) ? "Y" : "N")
         consoles.push(isSameSet(x, y) ? "Y" : "N")
         if (consoles.length >= 10000){
            console.log(consoles.join('\n'))
            consoles = []
         }
       } else {
         union(x,y)
       }
    }
    if (lineNo - 1 == M){
      rl.close()
    }
})

rl.on('close', ()=>{
    console.log(consoles.join('\n'))
    process.exit(0)
})


function build(){
    father = new Array(N + 1);
    size = new Array(N + 1);
    for(var i= 0; i < N + 1; i++){
        father[i] = i
        size[i] = 1
    }
}

function isSameSet(i, j){
    return find(i) == find(j)
}

function union(i,j){
    var ri = find(i)
    var rj = find(j)
    if (ri != rj){
        if (size[ri] > size[rj]){
            size[ri] += size[rj]
            father[rj] = ri
        } else {
            size[rj] += size[ri]
            father[ri] = rj
        }
    }
}

function find(i){
    if(i != father[i]){
        father[i] = find(father[i])
    }
    return father[i]
}
