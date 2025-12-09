// 如果数字是斐波那契数字，先手必须一次性拿光，不然肯定会输
// 如果不是斐波那契数字，一定可以拆成几个不相邻的斐波那契数字之和，
// 那么新手可以拿光最小的斐波那契数字，而后手除非也一次拿光次小斐波那契数字
// 但是由于不相邻，最小的2倍>次小斐波那契数字，后手拿不光，所以后手输
// 但是先手如果拿的比最小的斐波那契数字小呢？
// const fs = require('fs')
// const path = require('path')
// const fileName = 'Code05_FibonacciGame.input'
// const absolutePath = path.resolve(__dirname, fileName); // 基于当前脚本目录
// const fileStream = fs.createReadStream(absolutePath, {
//   encoding: 'utf8', // 指定编码（如处理 GBK 需用第三方库）
//   crlfDelay: Infinity // 兼容不同系统的换行符（\n 或 \r\n
// })
// const rl = require('readline').createInterface({input:fileStream})
const rl = require('readline').createInterface({input:process.stdin})
rl.on('line',(line)=>{
   let ans = compute(parseInt(line.trim()))
   console.log(ans)
})
let MAX = 60
let arr = []
function compute(n){
    buildFibonacci()
    while(n >= 1){
       let index = find(n)
       // n 为一个斐波那契数字
       if (n == find(n)){
          break;
       } else {
          n = n - find(n)
       }
    }
    return n
}

function buildFibonacci(){
    arr[0] = 1
    arr[1] = 1
    for(let i = 2; i <= MAX; i++){
        arr[i] = arr[i-1] + arr[i-2]
    }
}

function find(n){
    let l = 0, r = arr.length, index = -1
    while(l <= r){
       let mid = l + ((r - l) >> 1)
       if (arr[mid] <= n){
          index = mid
          l = l + 1
       } else {
          r = mid - 1
       }
    }
    return arr[index]
}
