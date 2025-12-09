/**
 * 题目的3个很特殊，如果是3个必然有中间一个，枚举不同的中间一个得到最大值
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSumOfThreeSubarrays = function(nums, k) {
    // 前i长度的累积和
    let sums = Array(nums.length).fill(0)
    let sum = 0
    for(let l = 0, r =0; r < nums.length; r++){
       if(r - l < k - 1){
          sum += nums[r]
          continue
       }
       sum += nums[r]
       sums[l] = sum
       sum -= nums[l]
       l++
    }
    // console.log(sums)
    //prefix(i) 求从0到i的下标中长度为k的子数组的和的最大值的起始下标
    //suffix(i) 求从i到nums.length-1的下标中长度为k的子数组的和的最大值的起始下标
    let prefix = Array(nums.length).fill(0)
    let suffix = Array(nums.length).fill(0)
    prefixMax(nums,k,prefix,sums)
    suffixMax(nums,k,suffix,sums)
    // console.log(prefix)
    // console.log(suffix)
    // 中间一个的起点
    let st = k, end = nums.length - 2*k
    let s1 = 0,s2 = 0,s3 = 0
    let max = -Infinity
    for(let i = st; i <= end; i++){
         let midSt = i
         let midEnd = i + k - 1
         let midValue = sums[i]
         let left = prefix[midSt - 1]
         let right = suffix[midEnd + 1]
         let all = midValue + sums[left] + sums[right]
         if (all > max){
            s1 = left
            s2 = midSt
            s3 = right
            max = all
         }
    }
    return [s1,s2,s3]
}

//从0到i [0,i] 长度为k的子数组和最大的下标
function prefixMax(nums,k,prefix,sums){
    let max = 0
    let maxIndex = 0
    for(let r = k-1; r < nums.length;r++){
        let l = r - k + 1
        if (r == k - 1){
            prefix[r] = l
            max = sums[l]
            maxIndex = l
        } else {
            if (sums[l] > max){
                prefix[r] = l
                max = sums[l]
                maxIndex = l
            } else {
                prefix[r] = maxIndex
            }
        }
    }
}

function suffixMax(nums,k,suffix,sums){
    let max = 0
    let maxIndex = 0
    for (let l = nums.length - k; l >= 0; l--){
        if (l == nums.length - k){
            suffix[l] = l
            max = sums[l]
            maxIndex = l
        } else {
            if (sums[l] >= max){
                suffix[l] = l
                max = sums[l]
                maxIndex = l
            } else {
                suffix[l] = maxIndex
            }
        }
    }
}