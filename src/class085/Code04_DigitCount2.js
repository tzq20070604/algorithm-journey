const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0,a,b
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
       [a, b] = line.trim().split(' ').map(Number)
       f(a,b)
    }
})

function f(a,b){
    let str = ''
    let aArr = (a-1).toString().split('').map(Number)
    let bArr = b.toString().split('').map(Number)
    for(let i = 0; i <= 9; i++){
       let res = calculte(b,i,bArr) - calculte(a-1,i,aArr)
       str += ' ' + res
    }
    console.log(str.trim())
}

/**
 * @param {number} num 
 * @param {number} d 
 * @param {[number]} arr 
 * @returns 在[1,num]上面出现数字i的次数
 */
function calculte(num,d,arr){
    let ans = 0
    let len = arr.length
    for(let m = arr.length - 1,base = 1; m >= 0; m--,base = base * 10){
       let left = Math.floor(num / (base * 10))
       let right = num % base
       // console.log(num,d,m,cur,left,right)
       if (d == 0){
         left--
       }
       // 左侧分2种情况，
       // left比num的left小，右侧自由选择
       // left和num的left相等，右侧不能大于num的右侧
       // 当当前要寻找的数字为0时，左侧不能全为0
        
       // 当左侧小于num左侧时
       ans += left * base
        
       // 当左侧等于num左侧时
       if (cur > d){
          ans += base
       } else if (cur == d){
          ans += right + 1
       }
    }
    // console.log("ans:",ans,"\n")
    return ans
}