/**
 * @param {number[]} arr 
 * @param {number} k 
 * @returns {number} 最小平均值
 */
const minAverageSum1 = function minAverageSum1(arr, k){
     let cnts = new Array(k).fill(0)
     let sums = new Array(k).fill(0)
     return f(0,arr,k,cnts,sums)
}

function f(index,arr,k,cnts,sums){
    if (index == arr.length){ // 所有人选择完毕
        let ans = 0
        for(let i = 0; i < k; i++){
            if (cnts[i] == 0){
                return Infinity
            } else {
               ans += sums[i] / cnts[i]
            }
        }
        return ans
    } else {
        // 当前这个人选择第i个集合
        let ans = Infinity
        for(let i = 0; i < k; i++){
            cnts[i]++
            sums[i] += arr[index]
            ans = Math.min(ans, f(index + 1, arr, k, cnts, sums)) 
            cnts[i]--
            sums[i] -= arr[index]
        }
        return ans
    }
}


/**
 * @param {number[]} arr 
 * @param {number} k 
 * @returns {number} 最小平均值
 */
const minAverageSum2 = function minAverageSum1(arr, k){
    arr.sort((a,b)=>{return a - b})
    let sum = 0, other = 0
    for(let i=0;i < arr.length; i++){
        if(i < k -1){
            sum += arr[i]
        } else {
            other += arr[i]
        }
        if (i == arr.length - 1){
            sum += other / (arr.length - (k-1))
        }
    }
    return sum
}

function valudate(){
    // 构造输出数组 
    let times = 28
    let length = 10
    let max = 1000
    let epsilon = 1e-10
    console.log('开始')
    for(let i = 0; i < times; i++){
        //人数 [1,100]
        let n = Math.floor((Math.random() * length)) + 1
        let k = Math.floor((Math.random() * n)) + 1
        let arr = generate(n,max)
        let res1 = minAverageSum1(arr,k)
        let res2 = minAverageSum2(arr,k)
        if (Math.abs(res1 - res2) >= epsilon){
            console.log(`${i+1}/${times}组有误`)
            console.log(arr, k)
            console.log(res1)
            console.log(res2)
            console.log("\n")
        }  else{
            console.log(`${i+1}/${times}组正确`)
            console.log("\n")
        }
    }
    console.log('结束')
}

function generate(n, max){
   let arr = []
   for(let i = 0; i < n; i++){
      let b = Math.floor(max * Math.random()) + 1
      arr.push(b)
   }
   return arr
}

valudate()