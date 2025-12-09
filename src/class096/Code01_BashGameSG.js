const bashGame1 = function(n,m){
   return n % (m + 1) == 0 ? "后手" : '先手'
}

const bashGame2 = function(n,m){
   //sg[i] 标识i情况下的sg值，如果一个选手遇到了sg[i] == 0,表示这个选手输掉了比赛
   // 如果谁拿到最后一颗石子，谁胜利，意味着谁先面对0颗石子的情况谁输 所以sg[0] = 0
   let sg = Array(n + 1).fill(0)
   let appear = Array(m+1).fill(-1)
   for(let i = 1; i <= n; i++){
     //当前点的后继节点
     appear.fill(-1)
     for(let j = 1; j <= m && j <= i; j++){
         appear[sg[i-j]] = 1
     }
     for(let k = 0; k <= m; k++){
        if (appear[k] == -1){
            sg[i] = k
            break;
        }
     }
   }
   return sg[n] == 0 ? "后手" : "先手"
}

/**
 * 
 * @param {number} len >0 生成数组的长度
 * @param {最多值} max >= 0 生成数组的范围
 * @returns 生成[1,2*max + 1]之间的任意整数数组
 */
function generate(len,max){
    return Array.from({length:len},()=>{
        //random 范围​​：生成 ​​[0, 1)​​ 之间的伪随机浮点数，即包含 0 但不包含 1。
        let n = Math.floor((Math.random() * (max * 2 + 1))) + 1
        let m = Math.floor((Math.random() * (max * 2 + 1))) + 1
        return [n,m]
    })
}

function valudate(){
    // 构造输出数组 
    let times = 10000
    let max = 400
    let length = 200
    console.log('开始')
    for(let i = 0; i < times; i++){
        let n = Math.floor((Math.random() * (max * 2 + 1))) + 1
        let m = Math.floor((Math.random() * (max * 2 + 1))) + 1
        let res1 = bashGame1(n,m)
        let res2 = bashGame2(n,m)
        if (res1 != res2){
            console.log('有误:=========================')
            console.log(res1)
            console.log(res2)
            console.log("\n")
        } else {
        //    console.log("正确",res1,res2)
        }
    }
    console.log('结束') 
}
valudate()