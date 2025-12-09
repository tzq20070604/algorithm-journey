/**
 * @param {number[]} answers
 * @return {number}
 */
var numRabbits = function(answers) {
    answers.sort((a,b)=>{return a - b})
    let count = 1, sum = 0
    for(let i = 1; i <= answers.length; i++){
      if( i == answers.length || answers[i] != answers[i-1]){
         //计算answers[i-1]
         if(answers[i-1] + 1 >= count){
            sum += (answers[i-1] + 1)
         } else {
            let bei = Math.floor((count + answers[i-1]) / (answers[i-1] + 1))
            sum += (answers[i-1] + 1) * bei
         }
         count = 1
      } else {
         count++
      }  
    }
    return sum
};