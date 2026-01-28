/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    var ingreeArr = Array(numCourses).fill(0)
    build(numCourses,prerequisites.length)
    for (var i = 0; i < prerequisites.length; i++){
        var [p1,p2] = prerequisites[i]
        ingreeArr[p1]++
        addEdge([p2,p1])
    }
    //console.log("ingreeArr", ingreeArr)
    for (var i = 0; i < numCourses; i++){
        let ingree = ingreeArr[i]
        if (ingree == 0){
            queue[r++] = i
        }
    }
    //console.log("queue", queue)
    while(l < r){
        var fp = queue[l++]
        for(var ei = head[fp]; ei != 0; ei = next[ei]){
            var toP = to[ei]
            //console.log([fp,toP],ingreeArr[toP])
            ingreeArr[toP]--
            if (ingreeArr[toP] == 0){
                //console.log("toP",toP)
                queue[r++] = toP
            }
        }
    }
    if (r == numCourses){
        return queue.slice(0,r).map((item)=>{
            return item
        })
    } else {
        return []
    }
};

var head = []
var next = []
var to = []
var queue = []
var r=l=0
var cnt = 1

function build(n,m){
    head = Array(n).fill(0)
    next = Array(m).fill(0)
    to = Array(m).fill(0)
    queue = Array(n).fill(0)
    r = l = 0
    cnt = 1
}

function addEdge(edge){
   let [fp, tp] = edge
   next[cnt] = head[fp]
   to[cnt] = tp
   head[fp] = cnt++
}

