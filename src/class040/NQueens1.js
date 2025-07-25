/**
 * @param {number} n
 * @return {string[][]}
 */
var totalNQueens = function(n) {
     if (n == 1){
        return 1
     } else if (n == 2){
        return 0
     } else {
        var limit = (1 << n) - 1
        return solveNQueensResursion(limit,0, 0 ,0)
     }
};

// 第i行 在i-1行已经选择了col列 left列 和 right列的情况下
function solveNQueensResursion(limit,col,left,right){
    var ans = 0
    if (limit == col){
       return 1
    } else {
       // 总限制 1 表示放置了皇后 0 表示未放置
       var zong = col | left | right
       // 现在是看在总限制0的地方放置 1
       // fan 就是有1可以放置，0不可以放置
       var fan = ~zong
       fan = limit & fan
       
       while(fan != 0){
          // 最右侧的那个1
          var place = fan & (~fan + 1)
          fan = fan ^ place
          ans += solveNQueensResursion(limit, col | place , (left | place) << 1, (right | place) >>1)
       }
       return ans
    }
}

console.log(totalNQueens(4))