// https://www.luogu.com.cn/problem/P2148
// 由分析得知道每堆石子是独立的,但是Si最大为2x10^^9,二维就更大，所以观察规律打表
const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0, arr=[]
rl.on('line',(line)=>{
    lineNum++
    line = line.trim()
    if (lineNum != 1 && (lineNum & 1) == 1){
        arr = line.split(' ').map(Number) 
        console.log(win(arr))
    }
})

// 独立 异或即可
function win(arr){
    let ans = 0
    for(let i = 0; i < arr.length;i+=2){
        ans ^= computeSg2(arr[i],arr[i+1])
    }
    return ans != 0 ? "YES" : "NO"
}

function computeSg2(x,y){
    return lowerZero((x-1) | (y-1))
}

function lowerZero(n){
    let ans = 0
    while(n >= 0){
       if ((n & 1) == 0){
         break;
       }
       n = (n >> 1)
       ans++
    }
    return ans
}
