/**
 * 本质上还是严格递增最长子序列的问题
 * 思路：首先数对的按照开头位置由小到大的顺序排列，意味着后面的数，起点大于等于前面的数。如果某个数对，其开头在Ends结尾之内，则说明结尾可以更新，
 * 如果不在其结尾之内，则增加。
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function(pairs) {
    pairs.sort((a,b)=>{
        return a[1] - b[1]
    })
    // pairs最长严格递增子序列
    let ends = []
    for(let i = 0; i < pairs.length; i++){
        let item = pairs[i]
        let find = findIndex(ends, item)
        if (find == -1){
            // 未找到
            ends.push(item)
        } else if (find != -2){
            // 要更新
            ends[find] = item
        }
    }
    return ends.length
};
// -1 是未找到 -2不用更新，其他更新
function findIndex(ends, item){
    let find = -1
    let l = 0, r = ends.length - 1
    while(l <= r){
        let mid = l + ((r - l) >> 1)
        let midItem = ends[mid]
        if (item[0] <= midItem[1]){ // 说明可以更新
            find = mid
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    if(find != -1){
       if(ends[find][1] > item[1]){
           return find
       } else {
           return -2
       }
    }
    return find
}

// let res = findLongestChain([[1,2],[2,3],[3,4]])
// console.log(res)