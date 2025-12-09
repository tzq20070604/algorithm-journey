/**
 * @param {string[]} req_skills
 * @param {string[][]} people
 * @return {number[]}
 */
var smallestSufficientTeam = function(req_skills, people) {
    let len = req_skills.length;
    let persons = []
    for(let i = 0; i < people.length;i++){
       let one = 0
       let skills = people[i]
       for(let j = 0; j < skills.length;j++){
           let index = req_skills.indexOf(skills[j])
           if (index != -1){
              one = (one | (1 << index))
           }
       }
       persons.push(one)
    }
    // 左移动位数一定要注意 
    // [0,111...111] 共1 << len 位
    let dp = Array(persons.length + 1).fill(0).map(()=>{
        return Array(1 << len).fill(-1)
    })
    endState = (1 << len) -1
    let ans = f(0,0,dp,persons)
    return getPath(ans,dp,persons)
};

//当前来到index人,当前的状态是state，index到最后最少要几人才能凑出endState状态
let endState = 0
function f(index, state, dp, persons){
    if (index == persons.length){
        let ans = (state == endState ? 0 : Infinity)
        dp[index][state] = ans
        return ans
    }
    if (state == endState){
        dp[index][state] = 0
        return 0
    }
    if (dp[index][state] != -1){
        return dp[index][state]
    }
    // index选择和不选择
    let ans = f(index + 1, state | persons[index],dp,persons)
    if (ans != Infinity){
        ans = ans + 1
    }
    let ans1 =  f(index + 1, state,dp,persons)
    ans = Math.min(ans,ans1)
    dp[index][state] = ans
    return ans
}

function getPath(ans,dp,persons){
    let arr = Array(ans).fill(0)
    if (dp[persons.length - 1][endState] == Infinity){
        return []
    }
    for(let index = 0, state = 0, k = 0;k < ans, index < persons.length;index++){
        // 根据index - 1 判断 index是否选择
        let item = persons[index]
        let a1 = dp[index + 1][state]
        let a2 = dp[index + 1][state | item]
        if (a2 != Infinity){ // 可以选择
           if ( a2 + 1 <= a1){ //选择
              // 不选择
              arr[k++] = index
              state = (state|item)
           }
        }
    }
   return arr
}