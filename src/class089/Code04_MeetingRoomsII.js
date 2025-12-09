// https://www.nowcoder.com/practice/1ae8d0b6bb4e4bcdbf64ec491f63fc37
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void async function () {
    let lineNum = 0
    let n = 0
    let arr = []
    while(line = await readline()){
        lineNum++
        if (lineNum == 1){
           n = parseInt(line.trim())
        } else {
           arr.push(line.trim().split(' ').map(Number))
        }
        if (lineNum == n + 1){
            compute(n,arr)
        }
    }
}()

function compute(n,arr){
    arr.sort((a,b)=>{
        if (a[1] == b[1]) {
            return a[0] - b[0]
        } else {
            return a[1] - b[1]
        }
    })
    let ans = 0
    // 只有结束，才会影响结果，计算每个元素结束前，有多少是跟它重合的
    for(let i = 0; i < n;i++){
        let end = arr[i][1]
        let max = 1
        for(let j = i + 1; j < n; j++){
            if (arr[j][0] < end){
               max++
            }
        }
        ans = Math.max(ans,max)
    }
    console.log(ans)
    return ans
}