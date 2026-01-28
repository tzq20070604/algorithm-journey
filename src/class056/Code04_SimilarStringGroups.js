/**
 * @param {string[]} strs
 * @return {number}
 */
var numSimilarGroups = function(strs) {
     let len = strs.length
     build(len)
     setCount = len
     for(var i = 0; i < len - 1; i++){
        var str1 = strs[i]
        for (j = i+1; j < len; j++){
             var str2 = strs[j]
             var same = isSameSimilarString(str1, str2)
             if (same && !isSameSet(i, j)){
                    union(i,j)
                    setCount--
             }
        }
     }
    return setCount
};

function isSameSimilarString(str1, str2){
    var diff = 0
    for (var i = 0; (i < str1.length) && (diff < 3); i++){
        if (str1[i] != str2[i]){
            diff++
        }
    }
    if (diff === 0 || diff === 2){
        return true
    }
    return false
}

var father = []
var size = []
var setCount = 0

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
            father[fj] = fi
        } else {
            size[fj] += size[fi]
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

