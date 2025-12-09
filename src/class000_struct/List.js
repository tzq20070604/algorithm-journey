// 默认first小，last大，如果想反过来，请修改compare函数
// 缺点就是数组的缺点，查找快，但是插入要平移内存
class List {
    arr = []
    size = this.arr.length
    compare(a,b){
        return a - b
    }
    constructor(compare){
        this.compare = compare ?? this.compare
    }

    // 插入到正确位置
    insert(item){
       let index = this.findIndex(item)
       if (index == -1){
          this.arr.push(item)
       } else {
          this.arr.splice(index,0,item)
       }
       this.size++
    }

    peekFirst(){
        if (!this.isEmpty()){
            return this.arr[0]
        }
        return undefined
    }
    peekLast(){
        if (!this.isEmpty()){
            return this.arr[this.size - 1]
        }
        return undefined
    }
    popFirst(){
        if (!this.isEmpty()){
           this.size--
           return this.arr.shift()
        }
        return undefined
    }
    popLast(){
        if (!this.isEmpty()){
           this.size--
           return this.arr.pop()
        }
        return undefined
    }
    // 查找item的位置，找到大于等于item，最靠左的位置，没有找到返回-1
    findIndex(item){
       let l = 0, r = this.arr.length - 1
       let index = -1
       while(l <= r){
          let mid = l + ((r - l) >> 1)
          if (this.compare(item, this.arr[mid]) <= 0){
              index = mid
              r = mid - 1
          } else {
              l = mid + 1
          }
       }
       return index
    }

    isEmpty(){
        return this.size == 0
    }
}