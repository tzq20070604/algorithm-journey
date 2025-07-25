sort([9,78,9,9,5,3,89,67,45])

function sort(nums){
     if (nums.length <= 1){
        return nums
     }
     heapSort(nums)
     var size = nums.length
     while(size > 1){
       swap(nums, 0, size - 1)
       size--
       heapify(nums, 0, size)
     }
     console.log(nums)
}

function heapSort(nums){
    // 如何从头开始调整就往下调，如果从尾部开始调整就往上调
    for(let i = nums.length - 1; i >= 0; i--){
       heapify(nums, i, nums.length)
    }
}

function heapify(nums, i, size){
    while ( 2*i + 1 < size){
        // 大根堆
       var left = 2*i + 1
       var right = left + 1
       var best = left
       if (right < size){
          best = nums[right] >= nums[left]? right : left;
       }
       best = nums[best] >= nums[i]? best : i;
       if (best == i){
         break
       }
       swap(nums, i, best)
       i = best
    }
}

function swap(nums,i,j){
   var tmp = nums[i]
   nums[i] = nums[j]
   nums[j] = tmp
}