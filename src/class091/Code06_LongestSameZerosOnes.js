const maxLengthOneZero1 = function(arr){
    let map = {}
    // 求[i,j]之间的0和1出现的次数，并以0-1次数作为key，出现这种情况的次数作为值
    for(let i = 0; i < arr.length;i++){
        let zeros = 0
        let ones = 0
        for(let j = i; j < arr.length; j++){
           arr[j] == 0 ? zeros++ : ones++
           let key = `${zeros}-${ones}`
           if (!map[key]){
              map[key] = 1
           } else {
              map[key] = map[key] + 1
           }
        }
      }
      let ans = 0
      for(let key of Object.keys(map)){
         if (map[key] > 1){
            let item = key.split('-').map(Number)
            ans = Math.max(ans,item[0] + item[1])
         }
      }
      return ans
}

const maxLengthOneZero2 = function(arr){
    let first0 = -1, first1 = -1
    for(let i = 0; i < arr.length; i++){
       if(arr[i] == 0 && first0 == -1){
          first0 = i
       }
       if(arr[i] == 1 && first1 == -1){
          first1 = i
       }
    }
    let last0 = -1, last1 = -1
    for(let i = arr.length - 1; i >= 0; i--){
       if(arr[i] == 0 && last0 == -1){
          last0 = i
       }
       if(arr[i] == 1 && last1 == -1){
          last1 = i
       }
    }
    let ans = 0
    if (first0 != -1){
       ans = last0 - first0
    }
    if (first1 != -1){
        ans = Math.max(ans, last1 - first1)
    }
    return ans
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
        let arr = generate(n)
        let res1 = maxLengthOneZero1(arr)
        let res2 = maxLengthOneZero2(arr)
        if (Math.abs(res1 - res2) >= epsilon){
            console.log(`${i+1}/${times}组有误`)
            console.log(arr)
            console.log(res1)
            console.log(res2)
            console.log("\n")
        }  else{
            console.log(`${i+1}/${times}组正确`)
            // console.log(arr)
            // console.log(res1)
            // console.log(res2)
            console.log("\n")
        }
    }
    console.log('结束')
}

function generate(n){
   let arr = []
   for(let i = 0; i < n; i++){
      let num = Math.random() < 0.5 ? 0 : 1 
      arr.push(num)
   }
   return arr
}

valudate()


