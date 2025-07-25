// 没有重复项数字的全排列
// 测试链接 : https://leetcode.cn/problems/permutations/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var total = []
var numArr = []
var len = 0
var permute = function(nums) {
    if (nums.length == 0){
        return []
    }
    numArr = nums
    len = numArr.length
    total = []
    permuteResursion(0)
    return total
};

function permuteResursion(index){
    if (index == len){
        total.push([...numArr])
        return
    } else {
        for(var i = index; i < len; i++){
            swap(index,i,true)
            permuteResursion(index + 1)
            swap(index,i,false)
        }
    }
}

function swap(i, j, ff){
    //console.log.log("\n",i, j, ff?"前进":"后退")
    if (i != j){
      var tmp = numArr[i]
      numArr[i] = numArr[j]
      numArr[j] = tmp
    }
}