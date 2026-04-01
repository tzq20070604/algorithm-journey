const rl = require('readline').createInterface({input:process.stdin})
let str, pattern, stack1,stack2, next, r = 0
let lineNum = 0
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
        str = line
        stack1 = Array(str.length).fill(0)
        stack2 = Array(str.length).fill(0)
    } else {
        pattern = line
        compute()
    }
})

function compute(){
    // console.log(str)
    // console.log(pattern)
    //使用一个栈记录 当前主串当前的位置和模式串匹配的位置，一旦匹配成功，便从栈里删除
    next = Array(pattern.length+1).fill(0)
    computeNext()
    computeResult()
}

function computeNext(){
    let x = 1, y = 0
    while(x < pattern.length){
        if (pattern[x] == pattern[y]){
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

function computeResult(){
    let x = 0, y = 0
    while(x < str.length){
        if (str[x] == pattern[y]){
            stack1[r] = x
            stack2[r] = y
            r++
            x++
            y++
        } else if (y > 0){
            y = next[y]
        } else {
            stack1[r] = x
            stack2[r] = -1
            r++
            x++
        }
        if (y == pattern.length){
            r = r - pattern.length
            if (r == 0){
               y = 0
            } else {
               y = stack2[r-1] + 1
            }
        }
    }
    if (r == 0){
        console.log('')
    } else {
       let res = stack1.slice(0,r).map((index)=>{ return str[index]}).join('')
       console.log(res)
    }
}

