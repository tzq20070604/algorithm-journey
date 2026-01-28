const readline = require('readline').createInterface({input:process.stdin})
let row = 0
let n = 0
let m = 0
let prices = []
let sum = 0
readline.on('line', (line)=>{
   row++
   if (row == 1){
      [n,m] = line.split(' ').map(Number)
   } else {
      for(let item of line.split(' ')){
          let price = parseInt(item)
          if (price <= m){
              prices.push(price)
              sum += price
          }
      }
      if(sum <= m){
         console.log(Math.pow(2,prices.length))
         return
      }
      prices.sort((a,b)=>{return a - b})
   }
   if (row == 2){
      console.log(numbersOfPrices())
      readline.close()
   }
})

readline.on('close',()=>{

})

let lArr = []
let rArr = []
function numbersOfPrices(){
    let mid = prices.length >> 1
    // 针对[0,mid) [mid, n) 每场比赛都有选与不选2种方案
    selectOrNotSelect(0,mid,0,lArr)
    selectOrNotSelect(mid,n,0,rArr)
    return calulate(lArr.sort((a,b)=>{return a-b}), rArr.sort((a,b)=>{return a-b}))
}

// 深度优先
// 来到当前位置[start]
function selectOrNotSelect(start,end,sum,arr){
   if (start >= end){
      arr.push(sum)
   }
    // 不选
    if(start < end && sum <= m){
       selectOrNotSelect(start + 1, end, sum,arr)
    }

    // 选
    sum += prices[start]
    if(start < end && sum <= m){ //有效
       selectOrNotSelect(start + 1, end, sum,arr)
    }
    // 值引用不用这样做
   //  sum -= prices[start]
}

function calulate(lArr, rArr){
  let ans = 0
   for (let p = lArr.length - 1, q = 0; p >= 0;){
       while(q < rArr.length && lArr[p] + rArr[q] <= m){
         q++
       }
       ans += q
       p--
   }
   return ans
}