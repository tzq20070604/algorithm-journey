/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    var row = grid.length
    var col = grid[0].length
    setCount = 0
    build(row * col)
    for (var i = 0; i < row; i++){
        for (var j = 0; j < col; j++){
            var cur = grid[i][j]
            if (cur == '1'){
                setCount++
            } else {
                continue
            }
            // 这里没有初始化容易出问题，因为var非循环的局部变量，是函数的全局变量
            var up = null
            var left = null
            if (i > 0){
                up = grid[i - 1][j]
            }
            if (j > 0){
               left = grid[i][j - 1]
            }
            if (cur == "1"){
                if (up == "1"){
                   if (!isSameSet(i * col + j, (i - 1) * col + j)){
                       union(i * col + j, (i - 1) * col + j)
                       setCount--
                   }
                }
                if (left == "1"){
                   if (!isSameSet(i * col + j, i * col + j - 1)){
                       union(i * col + j, i * col + j - 1)
                       setCount--
                   }
                }
            }
        }
    }
    return setCount
};

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


