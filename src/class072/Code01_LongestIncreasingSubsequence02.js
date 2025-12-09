/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    // end数组 index的数值表示，长度为index+1的结尾的数
    let arr = Array(nums.length).fill(0)
    let r = 0 //[0,r)
    // 找到第一个大于value的值的位置，就是要更新的位置
    arr[r++] = nums[0]
    for(let i = 1; i < nums.length;i++){
        let find = findIndex(arr,nums[i],r)
        if (find != -1){
           arr[find] = nums[i]
        } else {
           arr[r++] = nums[i]
        }
    }
    return r
};

function findIndex(arr,value,len){
    let find = -1
    let l = 0
    let r = len - 1
    while(l <= r){
        let mid = l + ((r - l) >> 1)
        let midValue = arr[mid]
        if (midValue >= value){
            find = mid
            r = mid - 1
        } else {
           l = mid + 1
        }
    }
    return find
}