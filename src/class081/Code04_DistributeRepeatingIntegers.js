/**
 * @param {number[]} nums
 * @param {number[]} quantity
 * @return {boolean}
 */
var canDistribute = function(nums, quantity) {
    let obj = {}
    for(let num of nums){
       if (obj[num] !== undefined){
          obj[num]++
       } else {
          obj[num] = 1
       }
    }
    let cnt = []
    for(let key in obj){
        cnt.push(obj[key])
    }
    //对quantity进行枚举，就是满足每个人的组合需要多少订单
    let n = quantity.length
    let max = (1 << n)
    let order = Array(max).fill(0)
    // 算出满足status订单需要的最少数字
    
    // 方法1 每种情况都取出1，然后相加，有重复计算
    // for(let j = 1,sum = 0; j < max; j++){
    //     sum = 0
    //     //取出所有的1
    //     for(let i = 0; i < n;i++){
    //         if(((j >> i) & 1) == 1){
    //             sum += quantity[i]
    //         }
    //     }
    //     order[j] = sum
    // }

    // 方法2,枚举当前i位置位1时起,比它位置低的情况，然后相加即可
    for(let i = 0; i < n; i++){
       let v = quantity[i]
       let max = (1 << i)
       for(let j = 0; j < max; j++){
          order[max|j] = order[j] + v
       }
    }

    let dp = Array(max).fill(0).map(()=>{
        return Array(cnt.length).fill(0)
    })
    return f(max-1,0,cnt.length-1,cnt,order,dp) 
}

// state那些顾客已经满足，index表示当前来得的订单号,cnt表示订单的个数，order表示给定一个订单能够满足那些人
function f(state,index,orderMax,cnt,order,dp){
    if(state == 0){
        return true
    }
    if (index > orderMax){
        return false
    }
    if (dp[state][index] != 0){
        return dp[state][index] == 1
    }
    
    let res = false
    // 分配给可以分配的人,找出state中有多少种1的组合
    for(let j = state; j > 0; j = ((j-1)&state)){
       if(order[j] <= cnt[index]){ // 可以分配
         res = f(j ^ state,index + 1,orderMax,cnt,order,dp)
         if (res){
            break;
         }
       }
    }
    if (!res){
        // index订单不分配给任何人
        res = f(state,index + 1,orderMax,cnt,order,dp)
    }
    dp[state][index] = res ? 1 : -1
    return res
}
