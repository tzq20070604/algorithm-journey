/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
   // 当前的步数
   let count = 0

   // 当前步数左侧的位置
   let l = 0
   // 当前步数 右侧最远能够到达的位置
   let r = 0
   // 当前步数的范围[l,r]
   // 如果最右侧，达不到nums.length - 1, 则需要跨一步
   while (r < nums.length - 1){
            //从左侧和右侧范围内 走一步 最远能够达到的位置
            count++
            let max = 0
            for(let j = l; j <= r; j++){
                max = Math.max(j + nums[j],max)
                //走一步最远可以达到的位置 max
                if (max >= nums.length - 1){
                    return count
                }
            }
            //跨一步最远能够到达的距离max 这一步能够到达的距离 [r+1, max]
            l = r + 1
            r = max
    }
    return count
}

