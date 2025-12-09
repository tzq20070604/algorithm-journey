/**
 * 如果在特定条件下，就有最值
 * @param {number[][]} matrix
 * @return {number[]}
 */
var getMaxMatrix = function(matrix) {
    let res = [0,0,0,0], max = -Infinity
    // 以r为底部
    for(let down = 0; down < matrix.length; down++){
        let nums = Array(matrix[0].length).fill(0)
        for(let up = down; up < matrix.length; up++){
           nums = nums.map((item,index)=>{return item + matrix[up][index]})
           let [l,r,maxRes] = f(nums)
           //console.log(nums)
           //console.log(l,r,maxRes)
           if (maxRes > max){
              max = maxRes
              res = [down,l,up,r]
              //console.log(maxRes,max)
              //console.log(down,l,up,r)
              //console.log("\n")
           }
        }
    }
    return res
};

// 返回数组累加和的最大值和左右两侧
function f(nums){
    let r = 0, l = 0, max = nums[0], pre = nums[0],prel = 0
    for(let i = 1; i < nums.length; i++){
       let cur = nums[i]
       if (pre >= 0){
          cur += pre
       } else {
          prel = i
       }
       if (cur > max){
          max = cur
          l = prel
          r = i
       }
       pre = cur
    }
    return [l, r, max]
}