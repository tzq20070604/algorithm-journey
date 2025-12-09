const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0,n = 0
// 既是会议的规模，也是开始、结束时间的规模
let MAXN = 1000001;
let meets = Array(MAXN).fill(-1)
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
      n = Number(line.trim())
    } else {
      let [st,end] = line.trim().split(' ').map(Number)
      if (meets[end] == -1){
         meets[end] = st
      } else {
         meets[end] = Math.max(meets[end], st)
      }
    }
    if (lineNum == n + 1){
        maxMeeting(meets)
    }
})

const maxMeeting = function(meets){
    let cur = 0,ans = 0
    for(let end = 0; end <= MAXN; end++){
        let st = meets[end]
        if (cur <= st){
           ans++
           cur = end
        }
    }
    console.log(ans)
    return ans
}