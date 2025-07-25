function ListNode(val, next) {
      this.val = (val===undefined ? 0 : val)
      this.next = (next===undefined ? null : next)
}

var reverseList = function(head) {
    var newhead = null
    while(head != null){
      var next = head.next
      if (!newhead){
         newhead = head
         newhead.next = null
      } else {
         head.next = newhead
      }
      newhead = head
      head = next
    }
    return newhead
};

