var mergeTwoLists = function(list1, list2) {
    var head = null
    var cur = head
    while(list1 != null && list2 != null){
      if (list1.val > list2.val){
          if (head == null){
             head = list2
             cur = head
          } else {
             cur.next = list2
             cur = list2
          }
          list2 = list2.next
      } else {
          if (head == null){
             head = list1
             cur = head
          }else {
             cur.next = list1
             cur = list1
          }
          list1 = list1.next
      }
    }
    if (list1 != null){
       if (head){
         cur.next = list1
       } else {
         head = list1
       }
    }
    if (list2 != null){
       if (head){
         cur.next = list2
       } else {
         head = list2
       }
    }
    return head
};