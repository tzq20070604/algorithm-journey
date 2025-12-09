/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
var minAbsDifference = function(nums, goal) {
    nums.sort((a,b)=>{return a - b})
    let n = nums.length
    let lArr = []
    let rArr = []
    select(0,n>>1,0,lArr,nums)
    select(n>>1,n,0,rArr,nums)
    lArr.sort((a,b)=>{return a - b})
    rArr.sort((a,b)=>{return a - b})
    var ans = Math.abs(goal)
    for (let p = 0,q = rArr.length - 1;p < lArr.length; p++){
        while(q > 0 && compare(lArr[p] + rArr[q-1], lArr[p] + rArr[q],goal)){
           q--
        }
        ans = Math.min(ans, Math.abs(lArr[p] + rArr[q] - goal))
    }
    return ans
};

function compare(a,b,goal){
  return Math.abs(a-goal) <= Math.abs(b-goal)
}

function select(l,e,sum,arr,nums){
    // 选和不选
    if (l >= e){
        arr.push(sum)
        return
    }
    // 选
     select(l+1,e,sum + nums[l],arr,nums)
    // 不选
     select(l+1,e,sum,arr,nums)
}