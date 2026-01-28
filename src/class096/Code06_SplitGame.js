// 测试链接 : https://www.luogu.com.cn/problem/P3185
// const fs = require('fs')
// const path = require('path')
// const fileName = 'Code06_SplitGame.input'
// const absolutePath = path.resolve(__dirname, fileName); // 基于当前脚本目录
// const fileStream = fs.createReadStream(absolutePath, {
//   encoding: 'utf8', // 指定编码（如处理 GBK 需用第三方库）
//   crlfDelay: Infinity // 兼容不同系统的换行符（\n 或 \r\n
// })
// const rl = require('readline').createInterface({input:fileStream})
const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0
let MAXN = 21, sg = Array(MAXN).fill(0)
build()
rl.on('line',(line)=>{
    lineNum++
    line = line.trim()
    if (lineNum != 1 && (lineNum & 1) != 0){
        let arr = line.split(' ').map(Number) 
        compute(arr)
    }
})

function build(){
   for(let j = 1; j <= MAXN; j++){
       let appear = Array(MAXN * MAXN).fill(false)
       for(let k = j-1; k >= 0; k--){
          for(let m = j-1; m >=0; m--){
            //相当于k,m
            // 这里本来是sg(k,m),但是因为是独立的，sg(k,m) = sg[k] ^ sg[m] 
            appear[sg[k] ^ sg[m]] = true
          }
       }
       for(let s = 0; s <= MAXN * MAXN; s++){
           if(!appear[s]){
              sg[j] = s
              break
           }
       }
   }
}

function compute(arr){
    let ans = 0
    let n = arr.length
    // 这里i = n-1的时候sg[0] = 0,多少个奇数和偶数次异或结果都为0
    for(let i = 0; i < n-1;i++){
        if ((arr[i] & 1) == 1){ // 奇数
           ans ^= sg[n - 1 - i]
        }
    }
    if (ans == 0){
        console.log('-1 -1 -1') 
        console.log('0') 
        return
    }
    let a = -1, b =-1, c=-1, count = 0
    for(let j = n-1; j > 0; j--){
        if (arr[n-1-j] == 0){
           continue         
        }
        for(let k = j - 1; k >= 0; k--){
            for(let m = k; m >= 0; m--){
                let res = (ans ^ sg[j] ^ sg[k] ^ sg[m])
                if (res == 0){ // 后者输的局面
                    count++
                    if (a == -1){
                        a = j
                        b = k
                        c = m
                    }
                }
            }
        }
    }
    console.log(`${n-1-a} ${n-1-b} ${n-1-c}`)
    console.log(count)
}