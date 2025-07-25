/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number}
 */
var findMaxValueOfEquation = function(points, k) {
    queue = Array(points.length).fill(0)
    max = Number.NEGATIVE_INFINITY
    ql = 0
    qr = 0
    for (var l = 0, r = 0; r < points.length; r++){
        let [x, y] = points[r]
        // 判断points[r]是否可以进队列
        while (l < r && points[r][0] - points[l][0] > k){
            // 移除l的位置
            // console.log("l=",l,"r=",r)
            if (queue[ql] == l){
                ql++
            }
            l++
        }
        if (ql < qr){
            var point = points[queue[ql]]
            // 先结算
            max = Math.max(max, x + y + point[1] - point[0])
            // 将自己的差值加入进去单调队列 按照差值从大到小的顺序
            while((ql < qr) && ((y - x) >= (points[queue[qr - 1]][1] - points[queue[qr - 1]][0]))){
                qr--
            }
        } 
        queue[qr++] = r
    }
    return max
};

max = Number.NEGATIVE_INFINITY
queue = [0]
ql = 0
qr = 1
