/**
 * @param {number[]} row
 * @return {number}
 */
var minSwapsCouples = function(row) {
    var n = row.length / 2
    set = 0
    build(n - 1)
    for(var i = 0; i < row.length; i += 2){
        var i0 = find(row[i] >> 1)
        var i1 = find(row[i+1] >> 1)
        if (i0 != i1){
            union(i0,i1)
            set++
        }
    }
    return set
};

var set = 0
function build(n){
    father = new Array(n + 1);
    size = new Array(n + 1);
    for(var i= 0; i < n + 1; i++){
        father[i] = i
        size[i] = 1
    }
}

function isSameSet(i, j){
    return find(i) == find(j)
}

function union(i,j){
    var ri = find(i)
    var rj = find(j)
    if (ri != rj){
        if (size[ri] > size[rj]){
            size[ri] += size[rj]
            father[rj] = ri
        } else {
            size[rj] += size[ri]
            father[ri] = rj
        }
    }
}

function find(i){
    if(i != father[i]){
        father[i] = find(father[i])
    }
    return father[i]
}
