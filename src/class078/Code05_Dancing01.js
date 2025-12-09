// 可以找到父节点 
const rl = require('readline').createInterface({input:process.stdin})
let n = 0, lineNum = 0,sum = 0
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
       n = Number(line.trim())
       sum = (n+1)*n/2
       build()
    } else if (lineNum <= n + 1) {
       let happy = Number(line.trim())
       vals[lineNum-1] = happy
    } else if (lineNum <= 2*n){
        let edge = line.trim().split(' ').map(Number)
        addEdge(edge)
    }
    if (lineNum == 2*n){
      let res = f(sum)
      console.log(Math.max(res.do, res.notDo))
    }
})

let heads,nexts,to,vals,cnt = 1
function build(){
    cnt = 1
    heads = Array(n+1).fill(0)
    vals = Array(n+1).fill(0)
    // 其实是有n-1条边，但是设置n条边也无妨
    nexts = Array(n+1).fill(0)
    to = Array(n+1).fill(0)
}

 // k 是 l 的直接上司,说明k到l有一条路
function addEdge([l,k]){
   sum -= l
   let cur = heads[k]
   nexts[cnt] = cur
   heads[k] = cnt
   to[cnt] = l
   cnt++
}

function f(root){
    // 当前
    let obj = {do:vals[root],notDo:0}
    for(let ei = heads[root];ei != 0; ei = nexts[ei]){
      let node = to[ei]
      // 当前偷
      let tmp = f(node)
      obj.do += tmp.notDo
      // 当前不偷
      obj.notDo += Math.max(tmp.do,tmp.notDo)
    }
    return obj
}

