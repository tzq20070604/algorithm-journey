/**
 * @param {string} stamp
 * @param {string} target
 * @return {number[]}
 */
var movesToStamp = function(stamp, target) {
    build(target.length)
    for (var i = 0; i < target.length - stamp.length + 1; i++){
         for (var j = 0; j < stamp.length; j++){
             if (target[i + j] != stamp[j]){
                  ingreeArr[i]++
                  graph[i + j].push(i)
             }
         }
         if (ingreeArr[i] == 0){
            queue[r++] = i
         }
    }
    var size = 0
    while(l < r) {
        var node = queue[l++]
        path.unshift(node)
        for (var j = 0; j < stamp.length; j++){
            if (!correct[j + node]){
                size++
                correct[j + node] = true
                var arr = graph[j + node] 
                for(var k = 0;k < arr.length; k++){
                    tp = arr[k]
                    ingreeArr[tp]--
                    if (ingreeArr[tp] == 0){
                        queue[r++] = tp
                    }
                }
            }
        }
    }
    if (size != correct.length){
       return []
    }
    // console.log(path)
    return path
};

var graph = []
var correct = []
var ingreeArr = []
var path = []
var queue = []
var l = r = 0

function build(n){
    correct = []
    graph = []
    path = []
    ingreeArr = []
    queue = []
   
    l = r = 0
    for(var i = 0; i < n; i++){
       correct.push(false)
       graph.push([])
       ingreeArr.push(0)
       queue.push(0)
    }
}

movesToStamp("cab", "cabbb")
