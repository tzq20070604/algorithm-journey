function swap(nums,i,j){
    if (i != j){
       nums[i] = nums[i] + nums[j]
       nums[j] = nums[i] - nums[j]
       nums[i] = nums[i] - nums[j]
    }
}
function insertSort(nums){
    // 外层循环是记录要插入第几个数
    for (var i = 1; i < nums.length; i++){
        for (var j = i; j > 0; j--){
            if (nums[j] < nums[j - 1]){
                 swap(nums,j, j-1)
            }
        }
    }
}
var nums = [1,3,89,3,23,5,8,6,9,2,34,35,23,78]
insertSort(nums)
console.log(nums)