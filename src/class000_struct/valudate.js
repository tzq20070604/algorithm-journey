/**
 * 
 * @param {number} len >0 生成数组的长度
 * @param {最多值} max >= 0 生成数组的范围
 * @returns 生成[-max,max]之间的任意整数数组
 */
function generate(len,max){
    return Array.from({length:len},()=>{
        //random 范围​​：生成 ​​[0, 1)​​ 之间的伪随机浮点数，即包含 0 但不包含 1。
        // 
        return Math.floor((Math.random() * (max * 2 + 1))) - max
    })
}

function valudate(){
    // 构造输出数组 
    let times = 2000
    let max = 400
    let length = 200
    console.log('开始')
    for(let i = 0; i < times; i++){
        let len = Math.floor(Math.random() * length) + 1
        let arr = generate(len,max)
        let res1 = func1(arr)
        let res2 = func2(arr)
        if (res1 != res2){
            console.log('有误:')
            console.log(arr)
            console.log(res1)
            console.log(res2)
            console.log("\n")
        } 
    }
    console.log('结束')
}

function func1(nums){
    return nums.length
}

function func2(nums){
    return nums.length
}

valudate()