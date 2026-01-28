const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0
let n, nums
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
       n = Number(line.trim())
    } else {
       nums = line.trim().split(' ').map(Number)
    }
    if (lineNum == 2){
      let res = compute(n,nums)
      console.log(res.join(' '))
    }
})

function compute(n,nums){
    //求出以i位置开头的最长递增子序列长度
    let dp = Array(n).fill(0)
    //下标加1 长度为index加1的递增子序列，是以[index]开头的
    // 显然ends数组是递减的，如果不是递减的，假设现在[a1,a2,a3,a4]
    // 如果a4 > a3,那么冲到3长度的最小值是a3，a4>a3,说明a4冲到4长度是不可能的
    let ends = []
    for(let i = nums.length-1; i >= 0; i--){
        let num = nums[i]
        let index = findIndexAtEnds(num,ends)
        if (index == -1){
            ends.push(num)
            dp[i] = ends.length
        } else {
            ends[index] = num
            dp[i] = index + 1
        }
    }
    let len = ends.length
    let ans = Array(len).fill(Infinity)
    //将dp[i]
    for(let i = 0; i < nums.length; i++){
        if (dp[i] == len){
             ans[0] = nums[i]
        } else {
            // ans[i] 必然是先于ans[i]填的，这个非常巧妙
            // len - 1 - index + 1 = dp[i]
            //这个数所在的位置为 len - dp[i]
            if(ans[len - dp[i] - 1] < nums[i]){
                ans[len - dp[i]] = nums[i]
            }
            
        }
    }
    return ans
}

// 在ends数组中找到比num小最左侧位置，更新它
// 没有找到就返回-1
function findIndexAtEnds(num,ends){
    let index = -1
    let l = 0, r = ends.length - 1
    while(l <= r){
        let mid = l + ((r - l) >> 1)
        if (ends[mid] <= num){
            index = mid
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    return index
}