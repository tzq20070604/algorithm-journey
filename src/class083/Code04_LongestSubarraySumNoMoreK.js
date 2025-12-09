const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0,sum,nums
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
      [_, sum] = line.trim().split(' ').map(Number)
    } else {
      nums = line.trim().split(' ').map(Number)
      let res = compute()
      console.log(res)
    }
})

function compute(){
   let len = 0
   let preSum = Array(nums.length + 1).fill(0)
   let all = 0
   // 显然
   for(let i = 1; i <= nums.length;i++){
      all += nums[i-1]
      if (all > preSum[i-1]){
        preSum[i] = all
      } else {
        preSum[i] = preSum[i-1]
      }
      let index = findIndex(all - sum, preSum, i+1)
      if (index != -1){
        len = Math.max(len, i - index)
      }
   }
   return len
}
// 从presum里面找到第一个值大于等于value的
function findIndex(value, preSum,length){
   let l = 0,r = length -1
   let res = -1
   while(l <= r){
      let mid = l + ((r - l) >> 1)
      if (preSum[mid] >= value) {
         res = mid
         r = mid - 1
      } else {
         l = mid + 1
      }
   }
   return res
}