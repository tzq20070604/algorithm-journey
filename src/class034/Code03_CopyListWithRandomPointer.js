 function Node(val, next, random) {
     this.val = val;
     this.next = next;
     this.random = random;
  };

/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function(head) {
    var cur = head
    while(cur){
        // console.log(cur.val)
        var next = cur.next
        var newNode = new _Node(cur.val)
        cur.next = newNode
        newNode.next = next
        cur = next
    }
    // printLinkedList(head)
    //根据老指针指路
    cur = head
    while(cur){
        var newNode = cur.next
        var oldNext = cur.next.next
        var oldRandom = cur.random
        if (oldRandom){
          newNode.random = oldRandom.next
        }
        cur = oldNext
    }
    cur = head
    var newHead = null
    var tail = null
    while(cur){
    //    console.log(cur.val)
       newNode = cur.next
       oldNext = cur.next.next
       cur.next = oldNext
       if (!newHead){
          newHead = newNode
          tail = newHead
       } else{
         tail.next = newNode
         tail = newNode
       }
       cur = oldNext
    }
    // printLinkedList(newHead)
    return newHead
};

function printLinkedList(head){
    while(head){
        console.log(head.val)
        head = head.next
    }
}