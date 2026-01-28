const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0, n=0, arr=[] 
rl.on('line',(line)=>{
    lineNum++
    line = line.trim()
    arr = line.split(' ').map(Number)
    let max =0,min = 0
    if (arr[0] >= arr[1]){
        max = arr[0]
        min = arr[1]
    } else {
        max = arr[1]
        min = arr[0]
    }
    let res = compute(max,min)
    console.log(res)
})

// 黄金分割点
let rate = BigInt('161803398874989484')
function compute(max,min){
    // 差值成完以后取整，但是rate是小数，没办法转为BigInt
     let ans = BigInt(min) - BigInt(max - min) * rate / BigInt(1e17)
     return ans == 0 ? 0 : 1
}

function test2(){
   const fs = require('fs')
   const data = fs.readFileSync('/dev/stdin')
   var arr = data.toString('ascii').trim().split(' ').map(x=>parseInt(x));

   function G(a,b){
   return Math.trunc((b-a)*((Math.sqrt(5.0)+1)/2)) !== a;
   } 
   console.log(G(Math.min(arr[0],arr[1]),Math.max(arr[0],arr[1]))?1:0);
   process.exit();
}