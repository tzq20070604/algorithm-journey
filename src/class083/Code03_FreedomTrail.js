/**
 * @param {string} ring
 * @param {string} key
 * @return {number}
 */
var findRotateSteps = function(ring, key) {
    let dict = {}
    for(let i = 0;i < ring.length;i++){
       if (!dict[ring[i]]){
         dict[ring[i]] = []
       } 
       dict[ring[i]].push(i)
    }
    let dp = Array(ring.length).fill(0).map(()=>{
        return Array(key.length).fill(-1)
    })
    return f(0,0,ring,key,dict,dp)
};

/**
 * 
 * @param {Number} cur 当前顶点对应与ring的位置
 * @param {Number} keyIndex 现在匹配哪一个
 * @param {String} ring 
 * @param {String} key 
 * @param {Object} dict // 每个字符出现在ring里的位置
 * @returns 最少匹配成功的次数
 */
function f(cur,keyIndex,ring,key,dict,dp){
    if (keyIndex == key.length){
        return 0
    }
    if (dp[cur][keyIndex] != -1){
        return dp[cur][keyIndex]
    }
    let res = 0
    let ringCh = ring[cur]
    let keyCh = key[keyIndex]
    if (ringCh == keyCh){
        res = 1 + f(cur,keyIndex + 1,ring,key,dict,dp)
    } else { // 找到顺时针或者逆时针最近的一个
        if(dict[keyCh].length == 1){
           let wantIndex = dict[keyCh]
           let min = Math.min(Math.abs(cur-wantIndex),ring.length - Math.abs(cur-wantIndex))
           res = 1 + min + f(wantIndex,keyIndex + 1,ring,key,dict,dp)
        } else if (dict[keyCh].length == 2){
           let wantArr = dict[keyCh]
           let wantIndex0 = wantArr[0]
           let min0 = Math.min(Math.abs(cur-wantIndex0),ring.length - Math.abs(cur-wantIndex0))
           let res0 = 1 + min0 + f(wantIndex0,keyIndex + 1,ring,key,dict,dp)

           let wantIndex1 = wantArr[1]
           let min1 = Math.min(Math.abs(cur-wantIndex1),ring.length - Math.abs(cur-wantIndex1))
           let res1 = 1 + min1 + f(wantIndex1,keyIndex + 1,ring,key,dict,dp)
           return Math.min(res0,res1)
        } else { //找出最近的2个index
           let wantArr = findShort(cur,dict[keyCh])
           let wantIndex0 = wantArr[0]
           let min0 = Math.min(Math.abs(cur-wantIndex0),ring.length - Math.abs(cur-wantIndex0))
           let res0 = 1 + min0 + f(wantIndex0,keyIndex + 1,ring,key,dict,dp)

           let wantIndex1 = wantArr[1]
           let min1 = Math.min(Math.abs(cur-wantIndex1),ring.length - Math.abs(cur-wantIndex1))
           let res1 = 1 + min1 + f(wantIndex1,keyIndex + 1,ring,key,dict,dp)
           res = Math.min(res0,res1)
        }
    }
    dp[cur][keyIndex] = res
    return res
}

// 找到cur在arr中最近的2个值
function findShort(cur,arr){
  if (cur < arr[0] || cur > arr[arr.length - 1]){
    return [arr[0],arr[arr.length - 1]]
  }
  let i = 0
  while(cur > arr[i]){
    i++
  }
  return [arr[i-1],arr[i]]
}