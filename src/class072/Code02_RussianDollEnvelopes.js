/**
 * 先按照宽度排序，宽度相同的，取大于前一个值的最小高度
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes1 = function(envelopes) {
    envelopes.sort((a,b)=>{
        if(a[0] != b[0]){
            return a[0] - b[0]
        } else {
            return a[1] - b[1]
        }
    })
    // 高度严格递增的子序列，只是宽度相同时，只能选择一个，可以考虑以index结尾的套娃的最大个数
    var dp = Array(envelopes.length).fill(1)
    dp[0] = 1
    let res = 1
    for(let i = 1; i < envelopes.length;i++){
        let item = envelopes[i]
        let max = 0
        for(let j = i-1; j >=0; j--){
            let preItem = envelopes[j]
            if (item[0] > preItem[0] && item[1] > preItem[1]){
                max = Math.max(max, dp[j])
            }
        }
        dp[i] = max + 1
       res = Math.max(res,dp[i])
    }
    return res
};

var maxEnvelopes = function(envelopes) {
    envelopes.sort((a,b)=>{
        if(a[0] != b[0]){
            return a[0] - b[0]
        } else {
            return -(a[1] - b[1])
        }
    })
    let ends = Array(envelopes.length).fill(0)
    let len = 0
    for(let i = 0; i < envelopes.length;i++){
       let item = envelopes[i]
       let index = findIndex(item,ends,len)
       if (index != -1){
          ends[index] = item
       } else {
          ends[len++] = item
       }
    }
    return len
}

function findIndex(item,ends,len){
    let find = -1
    let l = 0, r = len-1
    while(l <= r){
        let mid = l + ((r -l) >> 1)
        let midItem = ends[mid]
        if (item[1] <= midItem[1]){
            find = mid
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    return find
}