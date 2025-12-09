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