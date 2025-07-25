// 本质使用链表代替数组
class Bucket {
    index = 0;
    set = new Set(); 
    last = null;
    next = null;

    constructor(index){
        this.index = index
    }
}

var AllOne = function() {
    this.dict = {}
    this.head = new Bucket(-1)
    this.head.set.add("")
    this.tail = new Bucket(Number.MAX_VALUE)
    this.tail.set.add("")
    this.head.next = this.tail
    this.tail.last = this.head
};

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.inc = function(key) {
    var bucket = this.dict[key]
    if (bucket){
        var next = null
        if (bucket.next.index == bucket.index + 1){
            next = bucket.next
            next.set.add(key)
            this.dict[key] = next
        } else {
            //console.log("0000",bucket.index)
            next = new Bucket(bucket.index + 1)
            next.set.add(key)
            this.dict[key] = next
            this.insertAfter(bucket, next)
        }
        bucket.set.delete(key)
        if (bucket.set.size == 0){
            this.remove(bucket)
        }
    } else {
        if (this.head.next.index == 1){
            next = this.head.next
            next.set.add(key)
            this.dict[key] = next
        } else {
            next = new Bucket(1)
            next.set.add(key)
            this.dict[key] = next
            this.insertAfter(this.head, next)
        }
    }
    // //console.log("\n----------------------")
    // //printBucket(this.head,this.tail,this.dict)
};

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.dec = function(key) {
     var bucket = this.dict[key]
     if (!bucket){ return}
     if (bucket.index != 1){
        if (bucket.last.index + 1 == bucket.index){
            bucket.last.set.add(key)
            this.dict[key] = bucket.last
        } else {
            var last = new Bucket(bucket.index - 1)
            last.set.add(key)
            this.insertAfter(bucket.last, last)
            this.dict[key] = last
        }
     } else {
        this.dict[key] = null
     }
      bucket.set.delete(key)
     if(bucket.set.size == 0){
        this.remove(bucket)
     }
};

AllOne.prototype.insertAfter = function(cur, after){
   var next = cur.next
   cur.next = after
   after.next = next
   after.last = cur
   next.last = after
}

AllOne.prototype.remove = function(cur){
   var next = cur.next
   var last = cur.last
   last.next = next
   next.last = last
}

/**
 * @return {string}
 */
AllOne.prototype.getMaxKey = function() {
    //printBucket(this.head,this.tail,this.dict)
    return this.tail.last.set.values().next().value
    
};

/**
 * @return {string}
 */
AllOne.prototype.getMinKey = function() {
    //printBucket(this.head,this.tail,this.dict)
    return this.head.next.set.values().next().value
};

function printBucket(head, tail, dict){
    var cur = head.next;
    while(cur != null && cur != tail){
         console.log("\n")
         console.log(cur.index)
         console.log([...cur.set])
         cur = cur.next
    }
   console.log("++++++++++++")
    for (const key in dict) {
        if (Object.hasOwnProperty.call(dict, key)) {
            console.log(key,dict[key].index,[...dict[key].set]); // a 1, b 2
        }
    }
}