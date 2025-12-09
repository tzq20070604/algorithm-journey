// 测试链接 : https://leetcode.cn/problems/string-transforms-into-another-string/

/**
 * 
 * @param {string} str1 
 * @param {string} str2 
 */
function canConvert(str1, str2){
   if (str1 == str2){
     return true
   }
   let map = {}
   let count = 0
   for(let i = 0; i < str2.length;i++){
      let ch = str2[i]
      if (map[ch] === undefined){
        count++
        map[ch] = 1
      }
   }
   if (count == 26){
      return false
   }
   map = {}
   for(let i = 0; i < str1.length; i++){
       let ch = str1[i]
       if (map[ch] === undefined){
          map[ch] = i
       } else {
         if (str2[map[ch]] == str2[i]){
            map[ch] = i 
         } else {
            return false
         }
       }
   }
   return true
}

let res = canConvert("ttaa", "ssss")
console.log(res)