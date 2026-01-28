/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestDistancePair = function(nums, k) {
    nums = nums.sort((a,b)=>{return a-b })
    var right = nums[nums.length - 1] - nums[0]
    var left = 0
    var ans = right
    // console.log(nums,left,right)
    // 假设第k小的数对的距离是x，则必有f(x) == k
    while(left <= right){
        var mid = left + ((right - left)>>1)
        var count = distanceStatifyCount(mid, nums)
        console.log(mid,count)
        if (count >= k){
             ans = mid
             right = mid - 1
        } else {
            left = mid + 1
        }
    }
    return ans
};

function distanceStatifyCount(distance, arr){
      var sum = 0
      for(var l = 0, r = 0; l < arr.length-1; l++){
          while(r + 1 < arr.length && (arr[r + 1] - arr[l]) <= distance){
             r++
          }
          sum += (r - l)
      }
    //   console.log("aaa",distance,sum)
      return sum
}



// smallestDistancePair([1,6,1], 3)