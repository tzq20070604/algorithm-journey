// 倒推法 既然要修改，显然修改肯定比不修改要好，假设[X0,X1,X2,X3,...Xm-1,Xm,Xm+1,...,Xm+k-1,Xm+k,...,Xn]是最后的最长子序列，假设Xm-1,Xm,Xm+1,...,Xm+k-1为修改的值，那么将它修改成为Xm+k的值，肯定是最佳的，此时可以保证左侧最长。
// 所以最长不下降子序列肯定是遍历所有的点，求得其中最长的。
// 下标位置i来说，假设i位置的值为val，可将原始序列划分为[0,...,i-k-1] [i-k,...,i-1] [i,...,n] 3段
// prefix(i,val) 表示从[0,i-k-1] 位置且小于等于val最长不下降子序列的长度，suffix(i),表示以i开头的最长不下降子序列的长度
// dp[i] = prefix(i,val) + k + suffix(i)
let lineNum = 0
let n, k, nums
const readLine = require('readline').createInterface({input:process.stdin})
readLine.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
      [n,k] = line.split(' ').map(Number)
    } else {
        line.split(' ').map(Number)
        let res = maxLengthOfK(n,k,nums)
        console.log(res)
    }
})

function maxLengthOfK(n,k,nums){
    let suffix = maxLengthStartIndex(nums)
    let ends = []
    let max = 0
    for(let i = k; i <= nums.length; i++){
        if (i == k){
            max = Math.max(max,k + suffix[k]) 
        } else if (i == nums.length){
            max = Math.max(max,ends.length + k)
        } else {
           // 首先加入[0, i-k-1] [i-k， i-1] [i, n]
           let enter = nums[i-k-1]
           let index = findIndex(ends,enter)
           if (index == -1){
               ends.push(enter)
           } else {
               ends[index] = enter
           }
           let l = 0
           let lIndex = findIndex(ends,nums[i])
           if (lIndex == -1){
              l =  ends.length
           } else {
              l = lIndex 
           }
           max = Math.max(max,l + k + suffix[i])
        }
    }
    return max
}

// 返回以index开头的非下降子序列，等于返回从末尾到来看以index结尾的非严格递减子序列
function maxLengthStartIndex(nums){
    nums = [...nums].reverse()
    let ends = []
    let suffix = Array(nums.length + 1).fill(0)
    ends[0] = nums[0]
    suffix[nums.length - 1] = 1
    for(let i = 1; i < nums.length; i++){
         let item = nums[i]
         let index = findMunusIndex(ends,item)
         if (index != -1){
              ends[index] = item
              suffix[nums.length - i - 1] = index + 1
         } else {
              ends.push(item)
              suffix[nums.length - i - 1] = ends.length
         } 
    }
    return suffix
}

// 找到非严格递减的val要更新的位置，如果没有返回-1
// 显然ends里面是从大到小排列的，end要找到第一个大于该值的，这样就可以进行更换
function findMunusIndex(ends,val){ 
    let find = -1
    let l = 0, r = ends.length - 1
    while(l <= r){
       let mid = l + ((r - l) >> 1)
       if(val > ends[mid]){
          find = mid
          r = mid - 1
       } else {
          l = mid + 1
       }
    }
    return find
}

//非严格递增子序列
function findIndex(ends,val){
    let l = 0, r = ends.length - 1,find = -1
    while(l <= r){
        let mid = l + ((r - l) >> 1)
        let item = ends[mid]
        if (val < item){
            find = mid
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    return find
}