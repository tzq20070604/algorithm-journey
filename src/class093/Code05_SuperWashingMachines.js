// 测试链接 : https://leetcode.cn/problems/super-washing-machines/
/**
 * 
 * @param {number[]} machines
 * @return {number}
 */
var findMinMoves = function(machines) {
   let n = machines.length
   sum = machines.reduce((pre,cur)=>{return pre + cur},0)
   if (sum % n != 0){
     return -1
   }
   let average = sum / n
   let count = 0,leftNeed = 0, rightNeed = 0, left = 0, right = 0
   for(let i = 1; i <= machines.length; i++){
      leftNeed = (i - 1) * average
      rightNeed = (n - i) * average
      right = sum - left - machines[i-1]
      let leftDel = left - leftNeed
      let rightDel = right - rightNeed
      // leftDel<0 表示左边
      if (leftDel * rightDel >= 0 && leftDel <= 0){
         count = Math.max(Math.abs(leftDel + rightDel),count)
      } else {
         count = Math.max(Math.max(Math.abs(leftDel),Math.abs(rightDel)),count)
      }
      left += machines[i-1]
   }
   return count
};