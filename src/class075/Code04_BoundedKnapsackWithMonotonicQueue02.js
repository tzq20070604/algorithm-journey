// 将分组背包,根据同余原理 使用窗口进行优化，可以减少计算量，比如求在i组货物[vi,wi,ci]在背包容量是j的时候货物的最大值，
// 那么显然求到了i-1行的，背包容量在[j - ci * wi, j]区间中余数相等的最大值，
//在求 j + wi时，又求了背包容量在[j + wi - ci * wi, j + wi]区间中余数相等的最大值，显然这2个区间有重合，
// 可以维持一个单调队列窗口来求取最大值
// 空间压缩,❗理解很烧脑
const readline = require('readline').createInterface({input:process.stdin})
let lineNum = 0, num = 0
let n,weight,vArr=[],wArr=[],countArr=[],dp
readline.on('line',(line)=>{
   lineNum++
   if (lineNum == 1){
     [n,weight] = line.split(' ').map(Number)
     dp = Array(weight+1).fill(0)
   } else {
     let [v,w,c] = line.split(' ').map(Number)
     vArr.push(v)
     wArr.push(w)
     countArr.push(c)
   }
   if (lineNum == n + 1){
      f()
   }
})

// 显然这里求最大值可以优化
function f(){
    for(let i = 1; i <= wArr.length; i++){
        let [v,w,c] = [vArr[i-1],wArr[i-1],countArr[i-1]]
        for(let mod = 0; mod <= Math.min(weight,w-1);mod++){
            let l = 0
            let queue = []
            // 分批计算，相同余数的最大值
            // 首先将个数放好
            let end = weight - mod
            for(let j = end; j >= Math.max(0, end - (c-1) * w); j = j - w){
                // 当前物品是否可以放入，不能放入的时候计算
                while(queue.length - l > 0 && value(dp,i,queue[queue.length - 1],w,v) <= value(dp,i,j,w,v)){
                    queue.pop()
                }
                queue.push(j)
            }
            // 计算
            for(let j = end, enter = end - c * w; j >= mod ; j = j - w, enter = enter - w) {
                if (enter >= 0){
                     // 计算
                    while(queue.length - l > 0 && value(dp,i,queue[queue.length - 1],w,v) <= value(dp,i,enter,w,v)){
                        queue.pop()
                    }
                    queue.push(enter)
                }
                dp[j] = Math.floor(j/w)*v + value(dp,i,queue[l],w,v)
                if (queue[l] == j){
                    l++
                }
            }
        }
    } 
    console.log(dp[weight])
    return dp[weight]
}

function value(dp,i,j,w,v){
    return dp[j] - Math.floor(j / w) * v
}