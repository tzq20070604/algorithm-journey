/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function(beginWord, endWord, wordList) {
    //console.log(wordList)
    let wordListSet = new Set(wordList)
    let cur = new Set([beginWord])
    let next = new Set()
    let res = false
    let graph = {}
    while(!res){
        for (let tmp of cur){
            wordListSet.delete(tmp)
        }
        // wordListSet = wordListSet.difference(cur)

        for (let word of cur){
            for(let l = 0; l < word.length; l++){
                let ch = word[l]
                    for (let j = 0; j < 26; j++){
                        let changCh =  String.fromCharCode(97 + j)
                        if (ch != changCh){
                            let str = word.slice(0,l) + changCh + word.slice(l+1)
                            if (str == endWord){
                                res = true
                            }
                            if (wordListSet.has(str)){
                                if(!graph[str]){
                                    graph[str] = new Set()
                                }
                                graph[str].add(word)
                                next.add(str)
                            }
                        }
                    }
            } 
        }
        cur = next
        next = new Set()
        if (cur.size == 0){
            return []
        }
    }
    pathArr = []
    dfs(endWord, graph, beginWord, [])
    return pathArr
};

var pathArr = []
function dfs(endWord, graph, beginWord, path){
    if (endWord == beginWord){
        path.unshift(endWord)
        pathArr.push([...path])
        path.shift(endWord)
    } else {
        path.unshift(endWord)
        graph[endWord].forEach((item)=>{
            dfs(item,graph,beginWord,path)
        })
        path.shift()
    }
}