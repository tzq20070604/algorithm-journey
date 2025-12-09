const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0
let a,b
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
        [a,b] = line.trim().split(' ').map(Number)
    }
    let ans = f(b) - f(a) + check(a)
    console.log(ans)
})

/**
 * 
 * @param {number} num 
 * @returns 
 */
function f(num){
    let nums = num.toString(10).split('').map(Number)
    let dp = Array(nums.length).fill(0).map(()=>{
       return Array(11).fill(0).map(()=>{
           return Array(2).fill(-1)
       })
    })
    return recursion(0,10,0,nums,dp) 
}

/**
 * 
 * @param {number} cur 当前是第几位
 * @param {number} pre 前一位选择的数字是多少
 * @param {number} freeSel 当前是否能够自由选择 1 可以 0 不可以
 * @param {[number]} nums 这个是每一位数组
 */
function recursion(cur,pre,freeSel,nums,dp){
   if (cur == nums.length){
      if (pre != 10){
        return 1
      } else {
        return 0
      }
   }
   if (dp[cur][pre][freeSel] != -1){
      return dp[cur][pre][freeSel]
   }
   let ans = 0
   if (pre == 10){ //前面没有选择过
      // 继续不选择
      ans += recursion(cur+1,pre,1,nums,dp)
      
      // 选择
      if (freeSel){
        for(let i = 1; i <= 9; i++){
           ans += recursion(cur+1,i,1,nums,dp)
        }
      } else {
        for(let i = 1; i < nums[cur]; i++){
           ans += recursion(cur+1,i,1,nums,dp)
        }
        ans += recursion(cur+1,nums[cur],0,nums,dp)
      }
   } else { //前一位已经选择了
      if (freeSel){
        for(let i = 0; i <= 9; i++){
           if (Math.abs(pre - i) >= 2){
             ans += recursion(cur+1,i,1,nums,dp)
           }
        }
      } else {
        for(let i = 0; i < nums[cur]; i++){
          if (Math.abs(pre - i) >= 2){
             ans += recursion(cur+1,i,1,nums,dp)
          }
        }
        if (Math.abs(pre - nums[cur]) >= 2){
            ans += recursion(cur+1,nums[cur],0,nums,dp)
        }
      }
   }
   dp[cur][pre][freeSel] = ans
   return ans
}

function check(num){
    let nums = num.toString(10).split('').map(Number)
    for(let i = 1; i < nums.length;i++){
        if (Math.abs(nums[i] - nums[i-1]) <= 1){
            return 0
        }
    }
    return 1
}