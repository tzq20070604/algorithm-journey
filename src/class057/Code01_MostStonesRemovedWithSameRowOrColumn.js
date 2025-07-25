/**
 * 经典并查集题目
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function(stones) {
   var len = stones.length
   if (len <= 1){
     return 0
   }
   setCount = len
   build(len)
   var xMap = {}
   var yMap = {}
   for(var k = 0; k < len; k++){
       let [x , y] = stones[k]
       // 前面有没有出现过x坐标
       if (xMap[x] == undefined){
           xMap[x] = k
       } else {
           let index = xMap[x]
           if (!isSameSet(k, index)){
              union(k,index)
              setCount--
           }
       }
       if (yMap[y] == undefined){
          yMap[y] = k
       } else {
          let index = yMap[y]
          if (!isSameSet(index, k)){
             union(index, k)
             setCount--
          }
       }
   }
   return len - setCount
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


