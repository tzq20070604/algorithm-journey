/**
 * @param {number} n
 * @return {number}
 */
var findIntegers = function(n) {
   // 分2种情况，一种是自由选择只要没有连续的1就行，一种前面的那个值是相等的
   // 自由发挥 i位如果为1，则i-1为0，i-2位自由发挥
   // 自由发挥 i位如果为0，则i-1位自由发挥
   let cnt = Array(33).fill(0)
   cnt[0] = 1
   cnt[1] = 2
   for(let i = 2;i <= 32; i++){
      cnt[i] = cnt[i-1] + cnt[i-2]
   }
   // 正整数第31为0，30为可为0或者1
   return f(30,n,cnt) 
};

/**
 * 前一位跟n一致的情况下，当前来到cur位，有多少个不连续的1的方法
 * @param {number} cur 当前的位数 从31到0
 * @param {number} n 这个数字
 * @param {[number]} cnt cnt[len] 当长度为len时自由发挥能够有多少个不连续的1的方法
 */
function f(cur,n,cnt){
    if (cur == -1){
        return 1
    }
    let ans = 0
    let pre = ((n >> (cur+1)) & 1)
    let num = ((n >> cur) & 1)

    // 如果n当前位为1
    if (num == 1){
        // 当前位如果选择0,则[0, cur-1]则可以自由选择
        ans += cnt[cur]
        // 如果当前位选择1
        if (pre == 0){
            ans += f(cur-1,n,cnt)
        }
    } else {
        ans += f(cur-1,n,cnt)
    }
    return ans
}