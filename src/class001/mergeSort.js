// 测试链接 : https://leetcode.cn/problems/sort-an-array/
// 归并排序
function sort(nums){
    if (nums.length <= 1){
        return nums
    }
    mergeSort(nums, 0, nums.length - 1)
    return nums
}

function mergeSort(arr, l, r){
    console.log(l,r)
    // 分
    if(l == r) {

    } else if (l == r-1){
        if (arr[l] > arr[r]){
           [arr[l],arr[r]] = [arr[r],arr[l]]
        }
    } else {
        var m = l + ((r - l)>>1)
        console.log(`l=${l},m=${m},r=${r}`)
        if (l < m){
           mergeSort(arr,l, m)
        } 
        if (m + 1 < r) {
           mergeSort(arr,m+1, r)
        }
        // 合
        combine(l,m,r,arr)
    }
}

function combine(l,m,r,arr){
    var i = 0, k = 0, j = 0
    var help = []
    while(l + i <= m && m + 1 + k <= r){
      console.log(`combine111:l=${l},m=${m},r=${r}`)
      if ((arr[l + i]) > arr[m + 1 + k]){
          help[j++] = arr[m + 1 + k++]
      } else {
          help[j++] = arr[l + i++]
      }
    }
    if (l + i == m + 1){
       while(m + 1 + k <= r){
         help[j++] = arr[m + 1 + k++]
       }
    } else {
       while(l + i <= m){
         help[j++] = arr[l + i++]
       }
    }
    while(--j >= 0){
       arr[l+j] = help[j]
    }
}

console.log(sort([5,2,3,1,8]))