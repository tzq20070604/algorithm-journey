/**
 * 
 * @param {[number,number]} jobs 耗费 至少
 */
const atLeast1 = function(jobs){
    // 显然希望耗费少的先执行，至少大的先执行，因此 （至少 - 耗费）大的先执行
    // 因为是至少电量，所以使用倒推法
    // 1 是至少 0是耗费
    jobs.sort((a,b)=>{
        return (a[1] - a[0]) - (b[1] - b[0])
    })
    let left = 0
    for(let i = 0; i < jobs.length; i++){
        let item = jobs[i]
        left = Math.max(left + item[0],item[1])
    }
	return left
}

// 暴力方法 不同顺序 最后执行开始，最后剩下的电量为0
const atLeast2 = function(jobs){
   return f(0,0,jobs)
}

/**
 * 
 * @param {number} left 执行[0，index-1]至少需要的电量
 * @param {*} index 当前要执行的序号
 * @param {*} jobs // 工作
 * @return 返回
 */
function f(left, index, jobs){
    if (index == jobs.length - 1){
       return  Math.max(left + jobs[index][0], jobs[index][1])
    } else {
       let min = Infinity
       for(let j = index; j < jobs.length; j++){
           swap(index,j,jobs)
           let power = Math.max(left + jobs[index][0], jobs[index][1])
           min = Math.min(f(power, index + 1, jobs),min)
           swap(index,j,jobs)
       }
       return min
    }
}

function swap(i,j,jobs){
   if (i != j){
     let tmp = jobs[i]
     jobs[i] = jobs[j]
     jobs[j] = tmp
    }
}

function valudate(){
    // 构造输出数组 
    let times = 28
    let length = 10
    let max = 1000
    let epsilon = 1e-10
    console.log('开始')
    for(let i = 0; i < times; i++){
        //人数 [1,100]
        let n = Math.floor((Math.random() * length)) + 1
        let arr = generate(n,max)
        let res1 = atLeast1(arr)
        let res2 = atLeast2(arr)
        if (Math.abs(res1 - res2) >= epsilon){
            console.log(`${i+1}/${times}组有误`)
            console.log(res1)
            console.log(res2)
            console.log("\n")
        }  else{
            console.log(`${i+1}/${times}组正确`)
            console.log("\n")
        }
    }
    console.log('结束')
}

function generate(n, max){
   let arr = []
   for(let i = 0; i < n; i++){
      let a = Math.floor(max * Math.random()) + 1
      let b = Math.floor(max * Math.random()) + 1
      arr.push([a,b])
   }
   return arr
}

valudate()

