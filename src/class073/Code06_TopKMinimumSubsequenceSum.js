// 暴力解法
function topKSubset1(arr,k){
    let ans = []
    f(0,arr,0,ans)
    ans.sort((a,b)=>{return a - b})
    return ans.slice(0,k)
}

// 当前index，arr子序列的累积和数组
function f(index,arr,sum,ans){
    if (index == arr.length){
         ans.push(sum)
    } else {
        f(index+1,arr,sum,ans)
        f(index+1,arr,sum + arr[index],ans)
    }
}



// 背包，每个数都有要跟不要2种选择，导致结果不同
/**
 * 
 * @param {Array} arr 
 * @param {Number} k 
 */
function topKSubset2(arr,k){
    let sum = 0
    for(let i = arr.length - 1; i >= 0; i--){
       sum += arr[i]
    }
    let dp = Array(arr.length + 1).fill(0).map(()=>{
        return Array(sum + 1).fill(0)
    })
    dp[0][0] = 1
    for(let m = 1; m <= arr.length; m++){
        for(let n = 0; n <= sum; n++){
            dp[m][n] = dp[m-1][n]
            if (n >= arr[m-1]){
               dp[m][n] += dp[m-1][n - arr[m-1]]
            }
        }
    }
    //m个数不变，n从0到sum从小到大排列
    let ans = []
    for(let i = 0; i <= sum; i++){
        if (ans.length >= k){
            break;
        }
        if (dp[arr.length][i] > 0){
            if (ans.length + dp[arr.length][i] <= k){
               ans.splice(ans.length,0,...(Array(dp[arr.length][i]).fill(i)))
            } else{
               let left = k - ans.length
               if (left > 0){
                  ans.splice(ans.length,0,...(Array(left).fill(i)))  
               }
            } 
        }
    }
    return ans
}

// 堆,本质原因就是可以一步步递增来决定子序列的大小，这个方法要记住
function topKSubset3(arr,k){
    let heap = new Heap(Heap.HeapType.SMALL,(item1,item2)=>{
        return item1[1] - item2[1]
    })
    arr.sort((item1,item2)=>{
        return item1 - item2
    })
    // 所有的情况都要考虑，r表示处理到那里，未处理之前的总和
    let ans = [0]
    let i = 1
    heap.insert([0,arr[0]])
    while(heap.size > 0 && ans.length < k){
       let [r, sum] = heap.pop()
       ans.push(sum)
       if (r+1 < arr.length){
           heap.insert([r+1, sum - arr[r] + arr[r+1]])
           heap.insert([r+1, sum + arr[r+1]])
       }
    }
    return ans.slice(0,k)
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

// console.log("1",topKSubset1([1,2,3],5))
// console.log("2",topKSubset2([1,2,3],5))
// console.log("3",topKSubset3([1,2,3],5))

function generate(len,max){
    return Array.from({length:len},()=>{
        //范围​​：生成 ​​[0, 1)​​ 之间的伪随机浮点数，即包含 0 但不包含 1。
        // return Math.floor((Math.random() * (max * 2 + 1))) - max
        return Math.floor((Math.random() * (max * 2 + 1)))
    })
}

function valudate(){
    // 构造输出数组 
    let times = 200
    let max = 400
    let length = 20
   
    console.log('开始')
    for(let i = 0; i < times; i++){
        let len = Math.floor(Math.random() * length) + 1
        let k = Math.floor(Math.random() * len) + 1
        let arr = generate(len,max)
        // console.log(arr)
        let res1 = topKSubset1(arr,k).join(' ')
        let res2 = topKSubset2(arr,k).join(' ')
        let res3 = topKSubset3(arr,k).join(' ')
        if (res1 != res2 || res2 != res3){
            console.log('有误:')
            console.log(arr)
            console.log(k)
            console.log(res1)
            console.log(res2)
            console.log(res3)
            console.log("\n")
        } 
    }
    console.log('结束')
}

valudate()