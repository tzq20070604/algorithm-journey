/**
 * 穿过和不穿过该点2种情况，求最大值
 * @param {number[]} parent
 * @param {string} s
 * @return {number}
 */
var longestPath = function(parent, s) {
    n = s.length
    str = s
    graph = Array(n).fill(0).map(()=>{
        return []
    })
    for(let i = 1; l < parent.length; i++){
        graph[parent[i]] = i
    }
    let res = f(0)
    return res.subLength
};

let graph,n,str

function f(index){
    let res = {
        start:s[index],
        deep:0,
        subLength:0
    }
    let first = 0
    let second = 0
    let subLength = 0
    for(let i = 0; i < graph[index].length; i++){
        let obj = graph[index]
        //必须穿过的情况下
        if(obj.start == res.start){
          [first, second] = firstAndSecond(first, second, 0)
        } else { 
          [first, second] = firstAndSecond(first, second, obj.deep)
        }
        // 以啥开头 从它开始最大无相邻字符串的长度，它的子树最大无相邻子串的长度
        subLength = Math.max(subLength, obj.subLength)
    }
    res.deep = first + 1
    res.subLength = Math.max(subLength, first + second + 1)
    return res
}

function firstAndSecond(a,b,c){
   let max = Math.max(a,Math.max(b,c))
   let min = Math.min(a,Math.min(b,c))
   let sum = a + b + c
   return [max,sum-min]
}