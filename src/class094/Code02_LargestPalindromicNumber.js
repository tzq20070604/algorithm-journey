/**
 * @param {string} num
 * @return {string}
 */
var largestPalindromic = function(num) {
   let cntArr = Array(10).fill(0)
   for(let i = 0; i < num.length; i++){
      cntArr[num[i]]++
   }
   let left = '',mid = -1
   for(let i = 9; i >= 0; i--){
      if (cntArr[i] > 0){
        if (cntArr[i] == 1){
           mid = Math.max(mid,i)
        } else {
            left += Array(cntArr[i] >> 1).fill(i).join('')
            if (cntArr[i] % 2 != 0){ // 奇数次,要更新最中间的数字
                 mid = Math.max(mid,i)
            }
        }
      }
   }
   if (left.length > 0 && left[0] == '0'){
      left = ''
   }
   let ans = left + (mid == -1? '' : mid) + left.split('').reverse().join('')
   return ans.length > 0 ? ans : "0"
};
