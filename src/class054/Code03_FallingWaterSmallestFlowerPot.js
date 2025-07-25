var readline = require('readline')
var reader = readline.createInterface({input:process.stdin})

var count = 0
var nums = []
var limit = 0
var totalCount = 0
reader.on('line', (input)=>{
    count++
    if (count == 1){
       [totalCount ,limit] = input.split(' ').map(Number)
    } else {
        nums.push(input.split(' ').map(Number))
    }
    if (count == (totalCount + 1)){
        reader.close()
    }
})

reader.on('close',()=>{
    nums.sort((a,b)=>{return a[0]-b[0]})
    longestSubarray(nums, limit)
})

/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function(nums, limit) {
    setup(nums, limit)
    //console.log(arr,distance)
    for(var l = 0, r = 0;  r < arr.length;){
        //console.log("for","l=",l,"r=",r)
        // 如果满足条件r一直++
        while((r < arr.length) && !isGreatThanLimit(r)){
            ////console.log("r=",r)
            push(r++)
        }
        if (r >= arr.length -1){
            if (ans == Infinity){
                ans = -1
            }
            console.log(ans)
            return ans
        }
        // 左边要减
        while(l < r && isGreatThanLimitLeft(l)){
             pop(l++)
        }
        // 减不动了
        // 这里要结算
        //console.log("l=",l,"r=", r)
        //console.log("ans=",ans,"D=" , arr[r][0] - arr[l][0])
        ans = Math.min(ans, arr[r][0] - arr[l][0])
        
        //console.log("\n")
        pop(l++)
    }
    //console.log("ans")
    if (ans == Infinity){
        ans = -1
    }
    console.log(ans)
    return ans
};

var arr = []
var distance = 0
var maxQueue = Array(100001).fill(0),minQueue = Array(100001).fill(0)
var maxl = 0, maxr = 0, minl = 0, minr = 0
var ans = Infinity

function setup(nums, limit){
    arr = nums, distance = limit
    maxl = 0, maxr = 0, minl = 0, minr = 0
    ans = Infinity
}

function isGreatThanLimit(r){
   var min = (minr > minl ? Math.min(arr[r][1], arr[minQueue[minl]][1]) : arr[r][1])
   var max = (maxr > maxl ? Math.max(arr[r][1], arr[maxQueue[maxl]][1]) : arr[r][1])
   //////console.log("max=",max, "max=",min)
   if (max - min >= distance) {
        return true
   } else {
        return false
   }
}

function isGreatThanLimitLeft(l){
    var min = 0
    if (minr > minl){
        if (l == minl){
            if (minr > minl + 1){
                min = arr[minQueue[minl + 1]][1]
            }
        } else {
            min = arr[minQueue[minl]][1]
        }
    }
    
    var max = 0
    if (maxr > maxl){
        if (l == maxl){
            if (maxr > maxl + 1){
                max = arr[maxQueue[maxl + 1]][1]
            }
        } else {
             max = arr[maxQueue[maxl]][1]
         }
    }
   if (max - min >= distance) {
        return true
   } else {
        return false
   }
}

function push(r){
    while(maxr > maxl && arr[maxQueue[maxr-1]][1] <= arr[r][1]){
        maxr--
    }
    maxQueue[maxr++] = r

    while(minr > minl && arr[minQueue[minr-1]][1] >= arr[r][1]){
        minr--
    }
    minQueue[minr++] = r
}

function pop(l){
   if (minQueue[minl] == l){
      minl++
   }
   if (maxQueue[maxl] == l){
      maxl++
   }
}