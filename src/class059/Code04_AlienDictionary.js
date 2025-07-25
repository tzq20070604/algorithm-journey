/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function(words) {
    build(26)
    for (let m = 0; m < words.length; m++){
       let word = words[m]
       for (let k = 0; k < word.length; k++){
          set.add(word[k].charCodeAt(0) - 97)
       }
    }
    for (let i = 0; i < words.length - 1;i++){
        let cur = words[i]
        let next = words[i+1]
        let len = Math.min(cur.length, next.length) 
        for (var j = 0; j < len;j++){
            let ch1 = cur[j]
            let ch2 = next[j]
            if (ch1 != ch2){ //ch1->ch2
                let tos = graph[ch1.charCodeAt(0) - 97]
                let to = ch2.charCodeAt(0) - 97
                if (!tos.includes(to)){
                   tos.push(to)
                   ingreeArr[to]++
                }
                break;
            }
        }
        if (j == len && next.length < cur.length){
            return ""
        }
    }
    for(let k = 0; k < 26; k++){
        if (set.has(k) && ingreeArr[k] == 0){
            queue[r++] = k
        }
    }
    while(l < r){
        var from = queue[l++]
        path += String.fromCharCode(97 + from)
        var tos = graph[from]
        for (let node of tos){
            ingreeArr[node]--
            if (ingreeArr[node] == 0){
                queue[r++] = node
            }
        }
    }
    if (path.length != set.size){
         return ""
    } else {
        return path
    }
};

var graph = []
var ingreeArr = []
var queue = []
var set = new Set()
var l = r = 0
var path = ""

function build(n){
    // Array(n).fill([]) 填充的是同一个数组
    graph = Array(n).fill(0).map(()=>{return []})
    ingreeArr = Array(n).fill(0)
    queue = Array(n).fill(0)
    l = r = 0
    set = new Set()
    path = ""
}