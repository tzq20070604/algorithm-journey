/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function(s) {
    cnt = {}
    enter = {}
    stack = []
    for(var i = 0; i < s.length; i++){
       cnt[s[i]] = (cnt[s[i]] ?? 0) + 1
       enter[s[i]] = false
    }
    for(var i = 0; i < s.length; i++){
      var ch = s[i]
    //   console.log(ch)
      if (!enter[ch]){
        //  console.log("1",ch)
         while(stack.length > 0 && s[stack[stack.length - 1]] > ch &&  cnt[s[stack[stack.length - 1]]] >= 1){
            enter[s[stack[stack.length - 1]]] = false
            stack.pop()
         }
         enter[ch] = true
         stack.push(i)
      }
       cnt[ch]--
    }
    return stack.map(index=>{return s[index]}).join("")
};

var stack = []
var cnt = {}