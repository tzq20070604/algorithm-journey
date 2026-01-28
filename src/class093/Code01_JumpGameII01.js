/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
   // 当前的步数
   let count = 0
   
   // 当前步数 右侧最远能够到达的位置
   let cur = 0

   // 再跳一步 右侧最远能够到达的位置
   let next = 0 + nums[0]

   // 遍历每个点，如果当前点不在当前点最远能够到达的位置以内，则需要走一步
   for(let i = 1; i <= nums.length - 1; i++){
       // 说明来不到i，需要再走一步
       if (i > cur){
          count++
          //更新最大值 
          cur = next
       }
       next = Math.max(next, nums[i] + i)
   }
   return count
}

