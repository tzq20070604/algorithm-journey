const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0,n,arr1,arr2
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
       n = Number(line.trim())
    } else if (lineNum == 2){
       arr1 = line.trim().split(' ').map(Number)
    } else if (lineNum == 3){
       arr2 = line.trim().split(' ').map(Number)
    }
    if (lineNum == 3){
        compute3()
    }
})

function compute1(){
    let dp = Array(n+1).fill(0).map(()=>{
        return Array(n+1).fill(-1)
    })
   let ans = f(n,n,dp)
   console.log(ans)
}

function f(i,j,dp){
    if(i == 0 || j == 0){
        dp[i][j] = 0
        return 0
    }
    if (dp[i][j] != -1){
        return dp[i][j]
    }
    let ans = 0
    if (arr1[i-1] == arr2[j-1]){
       ans = f(i-1,j-1,dp) + 1 
    } else {
       ans = Math.max(f(i-1,j,dp),f(i,j-1,dp))
    }
    dp[i][j] = ans
    return ans
}

function compute2(){
    let dp = Array(n+1).fill(0)
   for(let i = 1; i <= n; i++){
      let leftup = 0, up = 0
      for(let j = 1; j <= n; j++){
          up = dp[j]
          if (arr1[i-1] == arr2[j-1]){
              dp[j] = leftup + 1 
          } else {
              dp[j] = Math.max(up,dp[j-1])
          }
          leftup = up
      }
   }
   console.log(dp[n])
   return dp[n]
}

function compute3(){
   let arr3 = []
   let map = {}
   for(let i = 0; i <= n; i++){
      map[arr1[i]] = i
   }
   for(let i = 0; i < n; i++){
      let index = map[arr2[i]]
      arr3.push(index)
   }
   //求 arr3最长递增子序列
   let ends = []
   for(let j = 0; j < n; j++){
       let value = arr3[j]
       let index = findEndsIndex(value,ends)
       if (index == -1){
          ends.push(value)
       } else {
          ends[index] = value
       }
   }
   console.log(ends.length)
   return ends.length
}

function findEndsIndex(value, ends){
   let index = -1
   let l = 0, r = ends.length-1
    while(l <= r){
        let mid = l + ((r - l) >> 1)
        if (value < ends[mid]){
           index = mid
           r = mid - 1
        } else {
           l = mid + 1
        }
    }
    return index
}