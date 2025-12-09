const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0,n = 0,meettings = []
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
      n = Number(line.trim())
    } else {
      meettings.push(line.trim().split(' ').map(Number))
    }
    if (lineNum == n + 1){
        maxMeeting(meettings)
    }
})

const maxMeeting = function(meettings){
    meettings.sort((a,b)=>{return a[1] - b[1]})
    let ans = 0, lastEnd = -1
    for(let i = 0; i < meettings.length;i++){
        let [st,end] = meettings[i]
        if (st >= lastEnd){
            ans++
            lastEnd = end
        }
    }
    console.log(ans)
    return ans
}