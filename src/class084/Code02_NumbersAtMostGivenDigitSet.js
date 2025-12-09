/**
 * @param {string[]} digits
 * @param {number} n
 * @return {number}
 */
var atMostNGivenDigitSet = function(digits, n) {
    // 从最高位开始
    let nums = []
    let tmp = n
    while(tmp / 10 >= 1){
        nums.unshift(tmp % 10)
        tmp = (tmp - tmp % 10) / 10
    }
    nums.unshift(tmp)
    digits = digits.map(Number).sort((a,b)=>{return a- b})
    return f(0,0,0,nums,digits)
};

/**
 * 
 * @param {number} cur  当前的位置，从0开始
 * @param {number} preSel  0没有选择 1有选择
 * @param {number} free  0不可以自由选择 1可以自由选择
 * @param {number} nums 从高位到地位
 * @param {number} digits 所有的数字
 * @returns 
 */
function f(cur,preSel,free,nums,digits){
    if (cur == nums.length){
        return preSel == 1 ? 1 : 0
    } else {
        let num = nums[cur]
        let ans = 0
        if (!preSel){ // 前面没有选择过
           // 继续不选择
           ans += f(cur+1,preSel,1,nums,digits)
        }
        if (free){ // 可以自由选择
            ans +=  Math.pow(digits.length,nums.length - cur)
        } else { // 不能自由选择
            // 选择
            for(let val of digits){
                if (val < num){
                   ans += f(cur+1,1,1,nums,digits)
                } else if (val == num){
                   ans += f(cur+1,1,0,nums,digits)
                }
            }
        }
        return ans
    }
}