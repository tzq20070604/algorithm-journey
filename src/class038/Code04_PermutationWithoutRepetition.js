// 有重复项数组的去重全排列
// 测试链接 : https://leetcode.cn/problems/permutations-ii/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var total = []
var numArr = []
var len = 0
var permuteUnique = function(nums) {
    if (nums.length == 0){
        return []
    }
    set = new Set()
    numArr = nums
    len = numArr.length
    total = []
    permuteResursion(0)
    return total
};

function permuteResursion(index){
    // var sortPrefix = numArr.slice(0,index).join()
    // if(set.has(sortPrefix)){
    //    return
    // } else {
    //     set.add(sortPrefix)
    // }
    if (index == len){
        total.push([...numArr])
        return
    } else {
        var set = new Set()
        for(var i = index; i < len; i++){
            if(!set.has(numArr[i])){
                set.add(numArr[i])
                swap(index,i,true)
                permuteResursion(index + 1)
                swap(index,i,false)
            }
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