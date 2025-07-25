const rl = require("readline").createInterface({ input: process.stdin, output:process.output });
rl.on('line',(input)=>{
    var arr1 = input.split(' ').map(Number)
    if (count == 0){
       [N , M] = arr1
    } else {
        data.push(arr1)
    }
    count++
})

rl.on('close',()=>{
    resolve(N, M, data)
})

var data = []
var N = 1
var M = 1000001
var count = 0
var offset = 0
var col = 0
var arr = []
function reset(){
   offset = 10000 * 3
   col = M + 1 + offset * 2 + 2
   arr = Array.from({length:col},()=>{return 0})
}

function resolve(n, m, data){
    N = n
    M = m
    reset()
    // n,m 行数和湖面宽度
    // v,x
    for (var item of data){
        dealArr(item[0], item[1])
    }
    build()
}

function dealArr(v,x){
    var x = x + offset
    set(x-3*v,x-2*v,0,1,v)
    set(x-2*v+1,x,v-1,-1,-v)
    set(x+1,x+2*v,-v+1,1,v)
    set(x+2*v+1,x+3*v,v-1,-1,0)
}

function set(l,r,s,d,e){
    arr[l] += s
    arr[l+1] += d-s
    arr[r+1] -= (d + e)
    arr[r+2] += e
}

function build(){
   for (var i = 1; i < arr.length; i++){
      arr[i] += arr[i-1]
   }

   for (var i = 1; i < arr.length; i++){
      arr[i] += arr[i-1]
   }
   var bbb = arr.slice(offset + 1, M + offset + 1).join(' ')
   console.log(bbb)
}
// resolve(1,10,[[1,5]])
// resolve(2,10,[[2,6],[3,1]])