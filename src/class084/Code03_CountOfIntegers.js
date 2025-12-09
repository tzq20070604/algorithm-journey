/**
 * 这个题目的可以使用前导0 0035 其实就是35 省略了讨论
 * @param {string} num1
 * @param {string} num2
 * @param {number} min_sum
 * @param {number} max_sum
 * @return {number}
 */
var count = function(num1, num2, min_sum, max_sum) {
    max = max_sum
    min = min_sum
    nums = num2.split('').map(Number)
    dp = Array(nums.length).fill(0).map(()=>{
      return Array(max+1).fill(0).map(()=>{
         return Array(2).fill(-1)
      })
    })
    let r2 = f(0,0,0)

    nums = num1.split('').map(Number)
    dp = Array(nums.length).fill(0).map(()=>{
      return Array(max+1).fill(0).map(()=>{
         return Array(2).fill(-1)
      })
    })
    let r1 = f(0,0,0)
    let check = checkNum(nums,min_sum,max_sum)
    // 这里注意要加上MOD
    return (r2 - r1 + MOD + check) % MOD
  }

const MOD = 10**9 + 7
let nums,min,max,dp
function f(cur,preSum,freeSel){
    if (preSum > max){
      return 0
    }
    if ((preSum + (nums.length - cur) * 9) < min){
			return 0
	}
    if (cur == nums.length){
       if (preSum >= min && preSum <= max){
         return 1
       } else {
         return 0
       }
    }
    if (dp[cur][preSum][freeSel] != -1){
      return dp[cur][preSum][freeSel]
    }
    let ans = 0
    if(freeSel){ // 自由选择
        for(let i=0; i <= 9; i++){
            ans = (ans + f(cur + 1,preSum + i,1)) % MOD
        }
    } else { // 非自由选择
        for(let i=0; i < nums[cur]; i++){
            ans = (ans + f(cur + 1,preSum + i,1)) % MOD
        }
        ans = (ans + f(cur + 1,preSum + nums[cur],0)) % MOD
    }
    dp[cur][preSum][freeSel] = ans
    return ans 
}

function checkNum(num1,min_sum,max_sum){
   let res = num1.reduce((sum,cur)=>{return sum + cur},0)
   if (res >= min_sum && res <= max_sum){
     return 1
   } else {
     return 0
   }
}