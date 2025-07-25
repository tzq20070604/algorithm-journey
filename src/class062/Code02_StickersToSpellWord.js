/**
 * @param {string[]} stickers
 * @param {string} target
 * @return {number}
 */
var minStickers = function(stickers, target) {
    target = [...target].sort((a,b)=>{return a.charCodeAt(0) - b.charCodeAt(0)}).join('')
    for (let i = 0; i < stickers.length; i++){
        stickers[i] = [...stickers[i]].sort((a,b)=>{return a.charCodeAt(0) - b.charCodeAt(0)}).join('')
    }
    var graph = Array(26).fill(0).map(()=>{return []})
    for (let i = 0; i < 26; i++){
        let chCode = 97 + i
        for (let j = 0; j < stickers.length; j++){
            if (stickers[j].indexOf(String.fromCharCode(chCode)) != -1){
                graph[i].push(stickers[j])
            }
        }
    }
    let queue = []
    let level = 0
    let set = new Set()
    queue.push(target)
    set.add(target)
    while(queue.length > 0){
       let size = queue.length
       level++
       for (let m = 0; m < size; m++){
           let str = queue.shift()
           // 搞定str的第一个字符
           let stringArr =  graph[str.charCodeAt(0) - 97]
           for (let i = 0; i < stringArr.length;i++){
               let next = leftStr(str,stringArr[i])
               if (next.length == 0){
                   return level
               } else {
                   if (!set.has(next)){
                     set.add(next)
                     queue.push(next) 
                   } 
               }
           }
       }
    }
    return -1
};

function leftStr(target, subStr){
    let next = ''
    let i =0, j= 0
    for(;j < subStr.length && i < target.length;){
        if (subStr[j].charCodeAt(0) < target[i].charCodeAt(0)){
            j++
        } else if (subStr[j].charCodeAt(0) == target[i].charCodeAt(0)){
            j++
            i++
        } else {
            next += target[i]
            i++
        }
    }
    return next + target.slice(i, target.length)
}