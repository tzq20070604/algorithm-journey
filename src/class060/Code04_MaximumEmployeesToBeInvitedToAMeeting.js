/**
 * 根据题意，如果没有环将会是0人可安排
 * 如果是小环（2个人组成的环）则安排环和各自的最长链
 * 如果是大环（3个人组成的环），则只能安排环
 * 每个人坐下的依赖条件是他喜欢的人坐下了
 * @param {number[]} favorite
 * @return {number}
 */
var maximumInvitations = function(favorite) {
    let n = favorite.length
    let queue = []
    let lineLenArr = Array(n).fill(0)
    let indgree = Array(n).fill(0)
    for (let i = 0; i < n;i++){
        indgree[favorite[i]]++
    }
    for (let i = 0; i < n;i++){
        if (indgree[i] == 0){
            queue.push(i)
        }
    }
    while(queue.length > 0){
        let node = queue.shift()
        var next = favorite[node]
        lineLenArr[node] = lineLenArr[node] + 1
        if (lineLenArr[node] > lineLenArr[next]){
            lineLenArr[next] = lineLenArr[node]
        }
        indgree[next]--
        if (indgree[next] == 0){
            queue.push(next)
        }
    }
    let small = 0
    let big = 0
    // 剩下的就是环
     for (let i = 0; i < n; i++){
        // 剩下的就是环 判断小环还是大环
        if (indgree[i] > 0){
            indgree[i] = 0
            let next = favorite[i]
            let next2 = favorite[next] 
            if (i == next2){ // 小环
                indgree[next] = 0
                small += (lineLenArr[i] + lineLenArr[next] + 2)
            } else {
                let j = favorite[i]
                let count = 1
                while(j != i){
                   indgree[j] = 0
                   count++
                   j = favorite[j]
                }
                big = Math.max(big,count)
            }
        }
    }
    return Math.max(small,big)
};