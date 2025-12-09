/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var makeArrayIncreasing = function(arr1, arr2) {
    arr2 = arr2.sort((a,b)=>{return a - b}).filter((value,index,arr)=>{
        if (index == 0){
            return true
        } else {
            return value != arr[index - 1]
        }
    })
    let dp = Array(arr1.length).fill(-1)
    let ans = f(0,arr1,arr2,dp)
    return ans == Infinity ? -1 : ans
};

// index-1是arr1中没有替换的，[0, index-1]已经递增前提下，
//[index,arr1.length-1]也递增需要的最少替换次数
// pre是arr1[index - 1]的值，index = 0 是为-Infinity，
function f(index,arr1,arr2,dp){
   let pre = index == 0 ? -Infinity : arr1[index - 1]
   if (index >= arr1.length){
      return 0
   }
   if (dp[index] != -1){
      return dp[index]
   }
   let ans = Infinity
    // j为下一个不替换的位置
   for(let j = index; j <= arr1.length; j++){
       let arr_j = (j == arr1.length ? Infinity: arr1[j])
       let count = j-index
       let condition = find(arr2,pre,arr_j,count)
       if (j == arr1.length){
         if (condition){
            ans = Math.min(ans,count)
         }
       } else if (pre < arr1[j]){
         if (condition){
            let res = f(j+1,arr1,arr2,dp) 
            if (res != Infinity){
               ans = Math.min(ans, res + count)
            }
         }
       }
   }
   dp[index] = ans
   return ans
}

// 求arr2 中 (min,max)数值个数是否>=count
// function find(arr2,min,max,count){
//   if (min >= max){
//    return false
//   }
//    // 二分法(min,max)
//   if (count == 0){
//     return true
//   }
  
//   let c = 0
//   for(let i = 0; i < arr2.length; i++){
//      if(arr2[i] >= max){
//         break
//      }
//      if (arr2[i] <= min){
//         continue
//      }
//      c++
//   }
//   return c >= count
// }

// 求arr2 中 (min,max)数值个数是否>=count,arr2是有序数组
function find(arr2,min,max,count){
  if (min >= max){
   return false
  }
  if (count == 0){
    return true
  }
  // 求<= min 个数 
  let a = 0
  let b = 0
  {
     let find = -1
     let l = 0, r = arr2.length-1
     while(l <= r){
       let mid = l  + ((r - l ) >> 1)
       if (arr2[mid] <= min){// 合格
            find = mid
            l = mid + 1
       } else {
            r = mid - 1
       }
     }
     if (find != -1){
        a = find + 1
     }
  }
  // 求出< max 个数
  {
     let find = -1
     let l = 0, r = arr2.length-1
     while(l <= r){
       let mid = l  + ((r - l ) >> 1)
       if (arr2[mid] < max){// 合格
            find = mid
            l = mid + 1
       } else {
            r = mid - 1
       }
     }
     if (find != -1){
        b = find + 1
     }
  }
  return (b - a) >= count
}
