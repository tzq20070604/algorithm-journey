// 测试链接 : https://leetcode.cn/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/
/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function(nums, limit) {
    setup(nums, limit)
    ////console.log(arr,distance)
    for(var l = 0, r = 0; l<arr.length; l++){
        //console.log("for","l=",l,"r=",r)
        // 如果满足条件r一直++
        while((r < arr.length) && isLessThanLimit(r)){
            ////console.log("r=",r)
            push(r++)
        }
        // 这里要结算
        ans = Math.max(ans, r - l)
        // if (r - l == 11){
        //     //console.log(arr.slice(l,r))
        // }
        //console.log("l=",l,"r=", r)
        //console.log("\n")
        pop(l)
    }
    return ans
};
var arr = []
var distance = 0
var maxQueue = Array(100001).fill(0),minQueue = Array(100001).fill(0)
var maxl = 0, maxr = 0, minl = 0, minr = 0
var ans = 0

function setup(nums, limit){
    arr = nums, distance = limit
    maxl = 0, maxr = 0, minl = 0, minr = 0
    ans = 0
}

function isLessThanLimit(r){
   var min = (minr > minl ? Math.min(arr[r], arr[minQueue[minl]]) : arr[r])
   var max = (maxr > maxl ? Math.max(arr[r], arr[maxQueue[maxl]]) : arr[r])
   ////console.log("max=",max, "max=",min)
   if (max - min <= distance) {
        return true
   } else {
        return false
   }
}

function push(r){
    while(maxr > maxl && arr[maxQueue[maxr-1]] <= arr[r]){
        maxr--
    }
    maxQueue[maxr++] = r

    while(minr > minl && arr[minQueue[minr-1]] >= arr[r]){
        minr--
    }
    minQueue[minr++] = r
}

function pop(l){
   if (minQueue[minl] == l){
      minl++
   }
   if (maxQueue[maxl] == l){
      maxl++
   }
}