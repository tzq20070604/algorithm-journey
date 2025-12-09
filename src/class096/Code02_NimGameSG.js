const nimGame1 = function(arr){
    let ans = arr.reduce((pre,cur)=>{
         return Number(pre) ^ Number(cur)
     },0)
     return ans == 0 ? "后手":'先手'
}

const nimGame2 = function(arr){
   let max = arr[0]
   for(let i = 0; i < arr.length; i++){
       max = Math.max(max, arr[i])
   }
   let sg = Array(max + 1).fill(0)
   getSgValue(max, sg)
   let ans = 0
   for(let i = 0; i <= arr.length;i++){
     ans ^= sg[arr[i]]
   }
   return ans == 0 ? "后手":'先手'
}

function getSgValue(n,sg){
    //sg[i] 标识i情况下的sg值，如果一个选手遇到了sg[i] == 0,表示这个选手输掉了比赛
   // 如果谁拿到最后一颗石子，谁胜利，意味着谁先面对0颗石子的情况谁输 所以sg[0] = 0
   let appear = Array(n+1).fill(-1)
   for(let i = 1; i <= n; i++){
     //当前点的后继节点
     appear.fill(-1)
     for(let j = 1; j <= n && j <= i; j++){
         appear[sg[i-j]] = 1
     }
     for(let k = 0; k <= n; k++){
        if (appear[k] == -1){
            sg[i] = k
            break;
        }
     }
   }
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
        return n
    })
}

function valudate(){
    // 构造输出数组 
    let times = 10000
    let max = 400
    let length = Math.floor(2000 * Math.random()) + 1
    console.log('开始')
    for(let i = 0; i < times; i++){
        let arr = generate(length,max)
        let res1 = nimGame1(arr)
        let res2 = nimGame2(arr)
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