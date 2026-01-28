class OneDiff{
    diff = []
    n = 0
    constructor(n){
        this.n = n
        this.diff = Array(this.n+1).fill(0)
    }
    /**c1和c2都是从0行作为标准*/
    add(c1,c2,k){
        this.diff[c1] += k
        this.diff[c2+1] -= k
    }
    build(){
       for(let i = 1; i < this.n; i++){
          this.diff[i] += this.diff[i-1]
       }
       this.diff.pop()
       return this.diff
    }
}



class ArithmeticDiff{
    diff = []
    n = 0
    constructor(n){
        this.n = n
        this.diff = Array(this.n+2).fill(0)
    }
    /**
     * 
     * @param {number} l 首项下标 从0开始计算
     * @param {number} r 末项下标 从0开始计算
     * @param {number} s 首项值
     * @param {number} e 末项值 e = s + (r-l) * d
     * @param {number} d 公差.  d = (e - s) / (r - l)
     */
    add(l, r, s, e, d) {
		this.diff[l] += s;
		this.diff[l + 1] += d - s;
		this.diff[r + 1] -= d + e;
		this.diff[r + 2] += e;
	}
 
    build(){
       for(let i = 1; i < this.n; i++){
          this.diff[i] += this.diff[i-1]
       }
       for(let i = 1; i < this.n; i++){
          this.diff[i] += this.diff[i-1]
       }
       this.diff.pop()
       this.diff.pop()
       return this.diff
    }
}

class DiffMatrix{
    diff = [[]]
    row = 0
    col = 0
    constructor(row, col){
        this.row = row
        this.col = col
        this.diff = new Array(this.row + 2).fill(0).map(()=>{
            return new Array(this.col + 2).fill(0)
        })
    }

    /**
     * 处理矩阵
     * @param {number} r1  左上角所在的行 从0开始计数
     * @param {number} c1  左上角所在的行 从0开始计数
     * @param {number} r2  右下角所在的行 从0开始计数
     * @param {number} c2  右下角所在的行 从0开始计数
     * @param {number} d   公差
     */
    add(r1, c1, r2, c2, d) {
        r1++,c1++,r2++,c2++
		this.diff[r1][c1] += d;
		this.diff[r2 + 1][c1] -= d;
		this.diff[r1][c2 + 1] -= d;
		this.diff[r2 + 1][c2 + 1] += d;
	}

    build() {
		for (let i = 1; i <= this.row; i++) {
			for (let j = 1; j <= this.col; j++) {
				this.diff[i][j] += this.diff[i - 1][j] + this.diff[i][j - 1] - this.diff[i - 1][j - 1];
			}
		}
        this.diff.shift()
        this.diff.pop()
        this.diff = this.diff.map((item)=>{
            item.shift();
            item.pop()
            return item
        })
        return this.diff
    }
}

/**
 * 
 * @param {number[[]]} arr 所求的二维矩阵
 * @return 累加和矩阵，不保留原来的矩阵
 */
function martrixPrefixSum(arr){
   function computePrefixSum(sums,r,c){
        if (r < 0 || c < 0){
            return 0
        } else {
            return sums[r][c]
        }
   }
   for(let r = 0; r < arr.length; r++){
      for(let c = 0; c < arr[0].length;c++){
          arr[r][c] += computePrefixSum(arr,r-1,c) + computePrefixSum(arr,r,c-1) - computePrefixSum(arr,r-1,c-1)
      }
   }
   return arr
}

/**
 * 
 * @param {number[[]]} arr 所求的矩阵
 * @param {number} r1 左上角所在行 从0开始计算
 * @param {number} c1 左上角所在列 从0开始计算
 * @param {number} r2 左下角所在行 从0开始计算
 * @param {number} c2 左下角所在列 从0开始计算
 * @return 返回矩阵区域的累加和
 */
function martrixRangeSum(arr,r1,c1,r2,c2){
    function computePrefixSum(sums,r,c){
        if (r < 0 || c < 0){
            return 0
        } else {
            return sums[r][c]
        }
    }
   //先求前缀和矩阵
   let sums = martrixPrefixSum(arr)
   return computePrefixSum(sums,r2,c2) - computePrefixSum(sums,r1-1,c2) - computePrefixSum(sums,r2,c1 - 1) + computePrefixSum(sums,r1-1,c1-1)
}


function compute1(){
    let diff = new OneDiff(5)
    diff.add(0,3,3)
    diff.add(2,4,4)
    let res = diff.build()
    console.log(res)
    return res
}

function compute2(){
    let adiff = new ArithmeticDiff(8)
    adiff.add(1,5,2,10,2)
    adiff.add(2,7,3,18,3)
    let arr = adiff.build()
    console.log(arr)
    return arr
}

function compute3(){
   let diffMatrix = new DiffMatrix(5,6)
   diffMatrix.add(0,0,4,5,5)
   diffMatrix.add(1,2,4,3,4)
   let res = diffMatrix.build()
   console.log(res)
   return res
}

function compute4(){
   let diffMatrix = [
    [1,2,3,4,5,6],
    [7,6,5,4,3,2],
    [1,3,5,7,9,11],
    [2,4,6,8,10,12],
    [1,0,-1,-1,0,1]
   ]
   let res = martrixPrefixSum(diffMatrix)
   console.log(res)
   return res
}

function compute5(){
   let diffMatrix = [
    [1,2,3,4,5,6],
    [7,6,5,4,3,2],
    [1,3,5,7,9,11],
    [2,4,6,8,10,12],
    [1,0,-1,-1,0,1]
   ]
   let res = martrixRangeSum(diffMatrix,2,3,4,5)
   console.log(res)
   return res
}

compute1()
compute2()
compute3()
compute4()
compute5()
