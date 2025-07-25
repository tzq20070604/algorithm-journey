/**
 * @param {number} n
 * @param {number[][]} meetings
 * @param {number} firstPerson
 * @return {number[]}
 */
var findAllPeople = function(n, meetings, firstPerson) {
    meetings.sort((item1, item2)=>{ return item1[2] - item2[2]})
    //console(meetings)
    build(n)
    union(0, firstPerson)
    var lastTimeSet = new Set()
    for (var i = 0; i <= meetings.length; i++){
       if (i == 0){
          lastTimeSet.add(meetings[i])
       } else {
          if ((i != meetings.length) && (meetings[i][2] === meetings[i - 1][2])){
              lastTimeSet.add(meetings[i])
          } else {
             // 结算
               let lastMeettings = [...lastTimeSet]
               //console("\n", lastMeettings)
               //1. 先计算上一次 知晓秘密的人
               for(let j = 0; j < lastMeettings.length;j++){
                    let meet = lastMeettings[j]
                    union(meet[0], meet[1])
               }
               for(let j = 0; j < lastMeettings.length;j++){
                    let meet = lastMeettings[j]
                    if (!isSameSet(0, meet[0])){
                       father[meet[0]] = meet[0]
                       father[meet[1]] = meet[1]
                    }
               }
               if (i < meetings.length){
                  // 重置
                  lastTimeSet = new Set()
                  lastTimeSet.add(meetings[i])
               } 
          }
       }
    }
    var ans = []
    for (var l = 0; l < n; l++){
        if (isSameSet(0,l)){
            ans.push(l)
        }
    }
    return ans
};

var setCount = 0
var father = []
var size = []

function build(length){
    father = Array(length)
    size = Array(length)
    for (var i = 0; i < length; i++){
        father[i] = i
        size[i] = 1
    }
}

function isSameSet(i, j){
    return find(i) == find(j)
}

function union(i, j){
    var fi = find(i)
    var fj = find(j)
    if (fi != fj){
        if (size[fi] > size[fj]){
            size[fi] += size[fj]
            size[fj] = 0
            father[fj] = fi
        } else {
            size[fj] += size[fi]
            size[fi] = 0
            father[fi] = fj 
        }
    }
}

function find(i){
    var stack = []
    while (i !== father[i]){
       stack.push(i)
       i = father[i]
    }
    while(stack.length > 0){
        var tmp = stack.pop()
        father[tmp] = i
    }
    return i
}


