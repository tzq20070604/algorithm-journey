const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

// 小大小的位置 所有栈里面是小到大，遇到比栈顶小的，栈顶弹出结算
void async function () {
    // Write your code here
    var count = 0
    var n = 0
    while(line = await readline()){
        let tokens = line.split(' ');
        if (count == 0){
            count = parseInt(tokens[0])
            count++
            continue
        } 
        var nums = tokens.map(Number)
        getLowHighLowArr1(nums)
    }
}()

/**
 * 
 * @param {[Number]} nums 
 */
function getLowHighLowArr(nums){
    var stack = []
    var i = 0
    var arr = []
    while(i < nums.length){
        if (stack.length == 0){
            stack.push(i)
            i++
        } else {
           var top = stack[stack.length - 1]
           if (nums[i] > nums[top]){
              stack.push(i)
              i++
           } else {
              while(stack.length > 0 && nums[i] <= nums[stack[stack.length - 1]]){
                  // 收集
                  var top = stack.pop()
                  if (stack.length > 0){
                     arr[top] = [stack[stack.length - 1],i]
                  } else {
                     arr[top] = [-1,i]
                  }
              }
              stack.push(i++)
           }
        }
    }
    while(stack.length > 0){
       var top = stack.pop()
       if (stack.length > 0){
          arr[top] = [stack[stack.length - 1],-1]
        } else {
          arr[top] = [-1,-1]
        }
    }

    for (var i = arr.length - 1; i >= 0; i--){
        if (arr[i][1] != -1 && nums[arr[i][1]] == nums[i]){
            arr[i][1] = arr[arr[i][1]][1]
        }
    }
    var arr1 = arr.map((item)=>{
        return item[0] + " " + item[1]
    })
    var res = arr1.join('\n')
    console.log(res)
    return arr
}

/**
 * 
 * @param {[Number]} nums 
 */
function getLowHighLowArr1(nums){
    let stack = new MonotonicStack(nums)
    let arr = stack.getAnswer()
    var arr1 = arr.map((item)=>{
        return item[0] + " " + item[1]
    })
    var res = arr1.join('\n')
    console.log(res)
    return arr
}

// 单调栈 递增 找到离自己最近严格小于自己的数的位置
class MonotonicStack{
    arr = [[]]
    constructor(nums){
       let stack = []
       let len = nums.length
       this.arr = Array(len).fill(0).map(()=>{
          return [-1,-1]
       })
       for(let i = 0; i < len; i++){
           while(stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]){
               let index = stack.pop()
               this.arr[index][0] = (stack.length == 0 ? -1 : stack[stack.length - 1])
               this.arr[index][1] = i
           }
           stack.push(i)
       }
       while(stack.length > 0){
          let index = stack.pop()
          this.arr[index][0] = (stack.length == 0 ? -1 : stack[stack.length - 1])
          this.arr[index][1] = -1
       }

       for(let i = len - 1; i >= 0; i--){
           if (this.arr[i][1] != -1 && (nums[i] == nums[this.arr[i][1]])){
                this.arr[i][1] = this.arr[[this.arr[i][1]]][1]
           }
       }
    }
    getAnswer(){
       return this.arr
    }
}

class Heap {
    static HeapType = {
        SMALL:'small',
        BIG:'big'
    }
    type = Heap.HeapType.SMALL
    items = []
    size = 0
    sortFunc = function(item1, item2){ return item1 - item2}

    constructor(type, sortFunc){
       if (type == undefined) {
         this.type = Heap.HeapType.SMALL
       }
       if (sortFunc == undefined){
           sortFunc = this.sortFunc
       }
       if (type == Heap.HeapType.BIG){
           this.sortFunc = function(item1, item2){
               return 0 - sortFunc(item1, item2)
           }
       } else {
           this.sortFunc = sortFunc
       }
       this.type == Heap.HeapType.SMALL
    }

    insert(item){
        this.items.push(item)
        this.size++
        let i = this.size - 1
        while(i > 0){
            var fi = ((i - 1) >> 1)
            // 小根堆
            let res = (this.sortFunc(this.items[fi],this.items[i]) > 0)
            if (res){
               this.swap(i, fi)
               i = fi
            } else {
               break
            }
        }
    }

    peek(){
        if (this.isEmpty()){
            return null
        } else {
            return this.items[0]
        }
    }
    pop(){
       let tmp = null
       if (this.isEmpty()){
            return tmp
       } else {
            this.swap(0, this.size - 1)
            tmp = this.items.pop()
            this.size--
            this.heapify(0)
       }
       return tmp 
    }
    
    isEmpty(){
        return this.size == 0
    }

    swap(i, j) {
         let tmp = this.items[i]
         this.items[i] = this.items[j]
         this.items[j] = tmp
    }

    heapify(i) {
        while(i < this.size){
           let best = i
           let li = (i << 1) + 1
           let ri = (i << 1) + 2
           // 首先要lIndex和lRight 存在
           if (li < this.size && this.sortFunc(this.items[i],this.items[li]) > 0){
                best = li
           }
           if (ri < this.size && this.sortFunc(this.items[best],this.items[ri]) > 0){
                best = ri
           }
           if (best == i){
              break
           } else {
              this.swap(best, i)
              i = best
           }
        }
    }
}