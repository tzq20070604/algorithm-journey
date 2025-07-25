/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
   var end = getEndNode(head, k)
   if (!end){
      return head
   }
   var start = head
   var head = end
   var preEnd = null
   while(start){
      var end = getEndNode(start, k)
      if (!end){
        preEnd.next = start
        return head
      }
      var nextFirst = end.next
      newStart = rervese(start, end)
      if (!preEnd){
          head = newStart
      } else {
          preEnd.next = newStart
      }
      preEnd = start
      start = nextFirst
   }
   return head
};

//给定一个节点和k 返回 末尾的节点，如果返回null 则说明没有k个节点
function getEndNode(start, k){
    // console.log("start:",start.val)
    while(start && --k > 0){
       start = start.next;
    }
    if (start){
        // console.log("end:",start.val)
    } else {
        // console.log("null")
    }
    return start
}

function rervese(start, end){
   var newHead = null
   var cur = start
   while(cur){
      var next = cur.next
      cur.next = newHead
      newHead = cur
      if (cur == end){
         break;
       }
      cur = next
   }
   return newHead
}