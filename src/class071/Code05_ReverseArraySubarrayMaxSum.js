/**
 * 很有意思的一道题，写一个对数器验证一下
 * 
 */

function maxSumReverse1(nums){
    //求从0开头到i结尾之间的子数组的累加和最大值，这个是为了得到左侧的最大值
    let max = nums[0]
    let preMax = nums[0]
    let prefix = Array(nums.length).fill(0)
    let sum = 0
    prefix[0] = nums[0]
    for(let i = 1; i < nums.length; i++){
       sum += nums[i]
       let cur = nums[i]
       if (preMax > 0){
         cur += preMax
       }
       if (cur > max){
          max = cur
       }
       prefix[i] = max
       preMax = cur
    }
    //求以i开头到结尾之间并且以i开头的子数组的最大值
    let suffix = Array(nums.length).fill(0)
    suffix[nums.length - 1] = nums[nums.length - 1]
    for(let i = nums.length - 2;i >= 0; i--){
        suffix[i] = nums[i]
        if (suffix[i+1] > 0){
            suffix[i] += suffix[i+1]
        }
    }
    // 子数组有2个数的情况
    let ans = -Infinity
    for(let i = 1;i <= nums.length - 1;i++){
        let all = Math.max(prefix[i-1]) + Math.max(suffix[i]) 
        if (all > ans){
            ans = all
        }
    }
    // 子数组只有一个数的情况
    ans = Math.max(ans,prefix[nums.length - 1])
    return ans
}

// 暴力验证
function maxSumReverse2(nums){
    let ans = nums[0]
    for(let i = 0; i < nums.length; i++){
        for(let j = i; j < nums.length; j++){
            // [i,j]翻转
            reverse(nums,i,j)
            let res = getMaxSum(nums)
            if (res > ans){
                ans = res
            }
            // [i,j]恢复
            reverse(nums,i,j)
        }
    }
    return ans
}

function reverse(nums,i,j){
    for(let m = i, n = j; m <= n; m++,n--){
        let tmp = nums[m]
        nums[m] = nums[n]
        nums[n] = tmp
    }
}

function getMaxSum(nums){
    let max = nums[0]
    let preMax = nums[0]
    for(let i = 1; i < nums.length; i++){
       let cur = nums[i]
       if (preMax > 0){
         cur += preMax
       }
       if (cur > max){
         max = cur
       }
       preMax = cur
    }
    return max
}

function generate(len,max){
    return Array.from({length:len},()=>{
        //范围​​：生成 ​​[0, 1)​​ 之间的伪随机浮点数，即包含 0 但不包含 1。
        return Math.floor((Math.random() * (max * 2 + 1))) - max
    })
}

function valudate(){
    // 构造输出数组 
    let times = 2000
    let max = 400
    let length = 200
    console.log('开始')
    for(let i = 0; i < times; i++){
        let len = Math.floor(Math.random() * length) + 1
        let arr = generate(len,max)
        let res1 = maxSumReverse1(arr)
        let res2 = maxSumReverse2(arr)
        if (res1 != res2){
            console.log('有误:')
            console.log(arr)
            console.log(res1)
            console.log(res2)
            console.log("\n")
        } 
    }
    console.log('结束')
}





