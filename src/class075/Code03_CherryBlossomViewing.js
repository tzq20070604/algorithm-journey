// 将分组背包转换成01背包
const readline = require('readline').createInterface({input:process.stdin})
let lineNum = 0, num = 0, time
let n,w,vArr=[],wArr=[],countArr=[],dp
readline.on('line',(line)=>{
   lineNum++
   if (lineNum == 1){
     let [st, end, nstr] = line.split(' ')
     let w = getTime(st, end)
     n = Number(nstr)
     let buffer4 = new ArrayBuffer((w + 1) * 8)
     dp = new Float64Array(buffer4)
   } else {
     let [w,v,c] = line.split(' ').map(Number)
     if (c == 0){
        c = Math.ceil(w / v)
     }
     for (let base = 1; base <= c; base = (base << 1)){
         vArr.push(base * v)
         wArr.push(base * w)
         c = c - base
     }
     if (c > 0){
         vArr.push(c * v)
         wArr.push(c * w)
     }
   }
   if (lineNum == n + 1){
      f()
   }
})

function getTime(st,end){
  let [sh,sm] = st.trim().split(":").map(Number)
  let [eh,em] = end.trim().split(":").map(Number)
  return eh * 60 + em - sh * 60 -sm
}
function f(){
    for(let i = 1; i <= wArr.length; i++){
        for(let m = w; m >= wArr[i-1]; m--){
            // 每组选择的个数 0 
            dp[m] = Math.max(dp[m],dp[m-wArr[i-1]] + vArr[i-1])
        }
    }
    console.log(dp[w])
    return dp[w]
}