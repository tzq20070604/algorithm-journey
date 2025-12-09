
function maxSum1(nums,k){
    // 滑动窗口  队列 求最小值，最小值放到最左边
    let queue = Array(nums.length).fill(0)
    let qr = 0, ql = 0
    let ans = -Infinity
    let sum = 0
    for(let l = 0, r = 0; l <= nums.length - k; r++){
        // [l, r）
        while(ql < qr && nums[queue[qr-1]] >= nums[r]){
            qr--
        }
        queue[qr++] = r
        if (r - l < k){ // 窗口没有满 r-l+1 < k + 1
            sum += nums[r]
        } else { // 窗口已经满了，结算
            sum += nums[r]
            let max = sum - nums[queue[ql]]
            if (max > ans){
                ans = max
            }
            if (l == queue[ql]){
                ql++
            }
            sum -= nums[l]
            l++
        }
    }
    return ans
}

function maxSum2(nums,k){
    let ans = -Infinity
    for(let i = 0; i < nums.length; i++){
        let arr = deleteItem(nums, i)
        let res = maxSumArrOfK(arr, k)
        if (res > ans){
           ans = res
        }
    }
    return ans
}

/**
 * 
 * @param {Array} nums 
 * @param {Number} i 
 * @returns 
 */
function deleteItem(nums, i){
    let tmp = nums.slice()
    tmp.splice(i,1)
    return tmp
}

function maxSumArrOfK(nums, k){
    let sum = 0
    let ans = -Infinity
    for(let i = 0; i <= nums.length - k; i++){
        sum = 0
        for(let j = i; j <= i + k - 1; j++){
            sum += nums[j]
            if (j == i + k - 1){
                if (sum > ans){
                    ans = sum
                }
            }
        }
    }
    return ans
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
        let len = Math.floor(Math.random() * length) + 2
        let k = Math.max(1,Math.floor(Math.random() * len))
        let arr = generate(len,max)
        let res1 = maxSum1(arr,k)
        let res2 = maxSum2(arr,k)
        if (res1 != res2){
            console.log('有误:')
            console.log(k)
            console.log(arr)
            console.log(res1)
            console.log(res2)
            console.log("\n")
        } 
    }
    console.log('结束')
}

valudate()

/**
 * 5
[
   -77, -156,  342,  284, -320,
   356,  274, -101,   37, -154,
   309,  -91, -124, -290,  398,
  -136,  163,   40,  130,  124
]
1100
1155
 */

// let arr = [
//    -77, -156,  342,  284, -320,
//    356,  274, -101,   37, -154,
//    309,  -91, -124, -290,  398,
//   -136,  163,   40,  130,  124
// ]

// let res = maxSum1(arr,5)
// console.log(res)
