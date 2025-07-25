const readLine = require('readline').createInterface({input:process.stdin})
const Mod = 80112002
let row = 0
let n = 0
let m = 0
let head = []
let next = []
let to = []
let cnt = 1
let indgree = []

readLine.on('line', (line)=>{
    row++
    if (row == 1){
       [n, m] = line.split(' ').map(Number)
       build()
    } else {
       addEdge(line.split(' ').map(Number))
       if (m == row - 1){
           readLine.close()
       }
    }
})

readLine.on('close', ()=>{
    caculatePath()
})


var caculatePath = function(){
   let path = new Uint32Array(n + 1).fill(0)
   let queue =  new Uint32Array(n + 1).fill(0)
   let ans = 0
   let l = 0
   let r= 0
    for(let i = 1; i <= n; i++){
        if (indgree[i] == 0){
            queue[r++] = i
            path[i] = 1
        }
    }
    while(l < r){
       let cur = queue[l++]
       if (head[cur] == 0){
           ans = (ans + path[cur]) % Mod
           continue
       }
       for (let ei = head[cur]; ei != 0; ei = next[ei]){
            let tp = to[ei]
            path[tp] = (path[tp] + path[cur]) % Mod
            indgree[tp]--
            
            if (indgree[tp] == 0){
                queue[r] = tp
                r++
            }
       }
    }
    return ans
}

function build(){
   indgree = new Uint32Array(n + 1).fill(0)
   head = new Uint32Array(n + 1).fill(0)
   next = new Uint32Array(m + 1).fill(0)
   to = new Uint32Array(m + 1).fill(0)
   cnt = 1
}

function addEdge(edge){
    next[cnt] = head[edge[0]]
    to[cnt] = edge[1]
    head[edge[0]] = cnt++
    indgree[edge[1]]++
}