/**
 * 整体思路，分别各组的非严格递增子序列的长度之和，然后使用数组长度减去这个值
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var kIncreasing = function(arr, k) {
    let group = Array(k).fill(0).map(()=>{
        return []
    })
    for(let i = 0; i < arr.length;i++){
        group[i % k].push(arr[i])
    }
    let sum = 0
    for(let i=0; i < k; i++){
        sum += maxSubLength(group[i])
    }
    return arr.length - sum
};

// 非严格递增子序列的长度
function maxSubLength(nums){
    let ends = []
    for(let i = 0; i < nums.length; i++){
        let find = findIndex(nums[i], ends)
        if (find != -1){
            ends[find] = nums[i]
        } else {
            ends.push(nums[i])
        }
    }
    return ends.length
}

//找到ends中大于value的最小下标位置 非严格递增，所有相等的时候，不会更新，只会增加
function findIndex(value, ends){
   let find = -1
   let l = 0,r = ends.length -1
   while(l <= r){
      let mid = l + ((r-l)>>1)
      if(value < ends[mid]){
         find = mid
         r = mid - 1
      } else {
        l = mid + 1
      }
   }
   return find
}