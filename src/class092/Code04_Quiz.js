const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void async function () {
    // Write your code here
    let lineNum = 0
    let n = 0
    let nums = []
    while(line = await readline()){
        lineNum++
        if (lineNum == 1){
           n = parseInt(line.trim())
        } else {
          nums.push(line.split(' ').map(Number))
        }
        if (lineNum == n + 1){
            compute(n,nums)
        }
    }
}()

function compute(n,nums){
    nums.sort((a,b)=>{return Math.abs(a[0]- a[1]) - Math.abs(b[0]-b[1])})
    let min = -Infinity
    let max0Index = 0, max1Index = 0
    for(let i = 1; i < nums.length;i++){
        let [a0,a1] = nums[i]
        if (a0 >= a1){ // a2是瓶颈
             min = Math.max(min, (a1 + nums[max1Index][1]) / 2)
        } else {
             min = Math.max(min, (a0 + nums[max0Index][0]) / 2)
        }
        if (a0 > nums[max0Index][0]){
            max0Index = i 
        } 
        if (a1 > nums[max1Index][1]){
            max1Index = i 
        }
    }
    console.log(min.toFixed(1))
    return min
}
