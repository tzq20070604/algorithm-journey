function sort(nums){
    if (nums.length <= 1){
        return nums
    }
    fastSort(nums, 0, nums.length - 1)
    return nums
}

function fastSort(nums, l, r){
    if (l == r - 1) {
       if (nums[l] > nums[r]){
          swap(nums,l, r)
       }
    } else if (l < r) {
        var x = Math.floor(l + Math.random() * (r - l + 1))
        console.log(`l=${l},x=${x},r=${r}`)
        let [left, right]  = pointSort(nums, l, r, nums[x])
        console.log(`left=${left},right=${right}`)
        fastSort(nums, l, l + left)
        fastSort(nums, r - right, r)
    }

}

function pointSort(nums, l, r, value){
   var minLength = 0, maxLength = 0, i = l
   while(i <= r - maxLength){
     if (nums[i] == value){
        i++
     } else if(nums[i] < value){
      // l + minLength是一定<=value的
      // 当此时的出现==情况下就是自己<value，出现了就是=value,所以i++
        swap(nums, i, l + minLength)
        minLength++
        i++
     } else {
        swap(nums, i, r - maxLength)
        maxLength++
     }
   }
   return [minLength, maxLength]
}

function swap(nums, i, j){
    var tmp = nums[i]
    nums[i] = nums[j]
    nums[j] = tmp
}

console.log(sort([110, 100, 0]))