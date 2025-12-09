// 将数组分成几个递增序列
// 给你一个有序的正数数组 nums 和整数 K
// 判断该数组是否可以被分成一个或几个 长度至少 为 K 的 不相交的递增子序列
// 数组中的所有数字，都要被，若干不相交的递增子序列包含
// 测试链接 : https://leetcode.cn/problems/divide-array-into-increasing-sequences/
canDivideIntoSubsequences = function(nums,k){
    let cnt = 1, max = 0
    for(let i = 1;i < nums.length; i++){
       if (nums[i] != nums[i-1]){
           max = Math.max(max, cnt)
           cnt = 1
       } else {
           cnt++
       }
    }
    max = Math.max(max, cnt)
    return nums.length / max >= k
}

// let ans = canDivideIntoSubsequences([2,3,3,3,6,7,8,9,10],3)
// console.log(ans)

