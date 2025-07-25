/**
 * @param {number} n
 * @param {number[][]} edgeList
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var distanceLimitedPathsExist = function(n, edgeList, queries) {
    edgeList = edgeList.sort((a,b)=> {return a[2] - b[2]})
    for (let i = 0; i < queries.length; i++){
        queries[i].push(i)
    }
    let set = new Union(n)
    let answer = Array(queries.length).fill(false)
    queries.sort((a,b)=>{return a[2] - b[2]})
    // i是问题的编号，e是边的编号
    for (let i = 0, e = 0; i < queries.length; i++){
        let [fp,tp,limit,index] = queries[i]
        // 在<limit情况下，是否能够达成fp,tp在同一个集合
        while(e < edgeList.length && edgeList[e][2] < limit){
            let [p1, p2, s] = edgeList[e]
            set.union(p1, p2)
            e++
        }
        if (set.isSameUnion(fp, tp)){
            answer[index] = true
        }
    }
    return answer
};

class Union{
    len = 0
    father = []
    size = []
    constructor(length){
        for (let i = 0; i < length; i++){
            this.father.push(i)
            this.size.push(1)
        }
    }

    isSameUnion(i, j){
       return this.find(i) == this.find(j)
    }

    union(i, j){
       let ri = this.find(i)
       let rj = this.find(j)
       if (ri == rj){
          return true
       } else {
          if (this.size[ri] >= this.size[rj]){
             this.father[rj] = ri
             this.size[ri] += this.size[rj]
          } else {
            this.father[ri] = rj
            this.size[rj] += this.size[ri]
          }
       }
    }

    find(i){
        if (i != this.father[i]){
            this.father[i] = this.find(this.father[i])
        }
        return this.father[i]
    }
}