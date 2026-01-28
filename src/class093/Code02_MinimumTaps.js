// 这道题和上一道跳跃的题目比较像，
/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
var minTaps = function(n, ranges) {
    let map = {}
    for(let i = 0; i < ranges.length; i++){
      let st = Math.max(0, i - ranges[i])
      let end = i + ranges[i]
      if (map[st] === undefined){
         map[st] = end
      } else {
         map[st] = Math.max(end,map[st])
      }
    }
    //现在的问题变成，多少个在map里面的水龙头能灌溉所有的区间
    let count = 0
    // 当前最远能够灌溉的距离
    let cur = -1
    // 再打开一个水龙头能够灌溉的距离
    let next = map[0]

    for(let i = 0; i <= n; i++){
        // 灌溉不到i位置这里
        if (cur < i){
           // 必须再打开一个水龙头
           count++
           // 此时最远能够灌溉的距离更新
           cur = next
           if (cur < i){
               return -1
           }
        } 
        if (map[i] !== undefined){
           next = Math.max(next, map[i])
        } 
    }
    return count
};