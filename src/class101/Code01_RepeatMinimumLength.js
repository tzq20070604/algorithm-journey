const rl = require('readline').createInterface({input:process.stdin})
let n, str
let lineNum = 0
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
       n = Number(line)
    } else {
       str = line
       compute(str)
    } 
})

function compute(str){
   let next = Array(n + 1).fill(0)
   computeNext(str, next)
   //len = t*(k-1)+l, n = t * k + l  t = n - len
   console.log(n - next[n])
}

function computeNext(str, next){
    next[0] = -1
    let x = 1, y = 0
    while(x < str.length){
        if (str[x] == str[y]){
            x++
            y++
            next[x] = y
        } else if (y > 0){
            y = next[y]
        } else {
            x++
        }
    }
}
