/**
 * @param {number} n
 * @return {number}
 */
var numDupDigitsAtMostN = function(n) {
    return n - countSpecialNumbers(n)
};

/**
 * @param {number} n
 * @return {number}
 */
var countSpecialNumbers = function(n) {
   nums = n.toString(10).split('').map(Number)
   let len = nums.length
   // 首先是比nums位数少的
   // 然后是和nums位数一样的
   if (nums.length <= 1){
      return n
   }
   // 比nums位数小的情况
   let ans = 0
   for(let i = 1, c = 9,pre = 1; i < len; i++){
      pre = pre * c
      ans += pre
      if (i != 1){
         c--
      }
   }
   // cnt[k]为前面已经选择了len -k (k < len)位且不为0,还剩下k位可以自由选择的情况下有多少种方案
   cnt = Array(len).fill(0)
   cnt[0] = 1
   for(let k = 1; k < len; k++){
      cnt[k] = (10 - (len - k)) * cnt[k-1]
   }
   return ans + f(1,0,1 << nums[0]) + (nums[0] - 1) * cnt[nums.length - 1]
};

let nums,cnt
/**
 * 在前面已经选择且不为0且各位都不相同的的情况下有多少种选择方案
 * @param {*} cur 当前来到那一位
 * @param {*} freeSel 当前位是否可以自由选择 0不可以自由选择 1可以自由选择
 * @param {*} state 那些数字已经选择， 0 表示没有选择 1 表示已经选择过了
 */
function f(cur,freeSel,state){
    if (cur == nums.length){
        return 1
    }
    let num = nums[cur]
    if (freeSel){
        return cnt[nums.length - cur]
    } else { // 不能自由选择
        let ans = 0
        // 当前数字比nums[cur]小的
        for(let i = 0;i < num;i++){
            // 这一位没有选择
             if(((state >> i)&1) == 0){
               ans += f(cur + 1,1,state | (1 << i))
             } 
        }
        // 如果选择跟当前数字一样
        if(((state >> num)&1) == 0){
            // &是置0 ｜是置1 ^是反转
            ans += f(cur+1,0,state | (1 << num))
        }
        return ans
    }
}
