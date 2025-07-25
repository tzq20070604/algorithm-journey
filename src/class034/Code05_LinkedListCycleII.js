var isPalindrome = function(head) {
    var fast = head
    var slow = head
    while(fast != null && slow != null){
        if (fast && fast.next && fast.next.next){
            fast = fast.next.next
        } else {
            return null
        }
        if (slow && slow.next){
            slow = slow.next
        } else {
            return null
        }
        if (fast == slow){
            break;
        }
    }
    slow = head
    while(slow != fast){
       slow = slow.next;
       fast = fast.next;
    }
    return slow
};