let lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n')
let lineNum = 0,arr,n, money, happy = 0
for(let i =0; i < lines.length;i++){
    let line = lines[i]
    if (i == 0){
        [n,money] = line.split(' ').map(Number);
        arr = [];
    } else {
        let [old, cur, value] = line.split(' ').map(Number)
        if (old - cur >= cur){
            money += old - 2 * cur
            happy += value
        } else {
            arr.push([cur * 2 - old,value])
        }
    }
}
