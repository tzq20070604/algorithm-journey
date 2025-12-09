const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0, a,b,p 
rl.on('line',(line)=>{
    lineNum++
    line = line.trim()
    if (lineNum == 1){
        [a,b,p] = line.split(' ').map(Number) 
        let ans = quickPower(a,b,p)
        console.log(`${a}^${b} mod ${p}=${ans}`)
    }
})

function quickPower(a,b,p){
   let ans = 1
   while(b > 0){
      if ((b & 1) == 1){
          ans = (BigInt(ans) * BigInt(a)) % BigInt(p)
      }
      a = Number((BigInt(a) * BigInt(a)) % BigInt(p))
      b >>= 1
   }
   return Number(ans)
}

function quickPower1(a,b,p){
   let ans = 1
   while(b > 0){
      if ((b & 1) == 1){
        // ans * a 有可能溢出
          ans = (ans * a) % p
      }
      // a * a 有可能溢出
      a = a * a % p
      b >>= 1
   }
   return ans
}