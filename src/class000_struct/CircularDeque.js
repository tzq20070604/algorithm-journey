class CircularDeque{
     Type = {
       Left : "Left",
       Right : "Right"
    }
    Derection = {
       Add:"Add",
       Minus:"Minus"
    }
    size = 0
    l = 0
    r = 0
    array = []
    length = 0
    constructor(length){
        this.size = 0
        this.l = this.r = 0
        this.length = length
        this.array = Array(length).fill(0)
    }

    isFull(){
        return this.size == this.length
    }

    isEmpty(){
        return this.size == 0
    }

    push(item){
        if (this.isFull()){
            return false
        } else{
            if (this.isEmpty()){
                this.l = this.r = 0
                this.array[this.r] = item
                this.size = 1
            } else {
               this.oprate(this.Type.Right,this.Derection.Add,item)
               return this.peekLast()
            }
        }
    }

    pop(){
        if (this.isEmpty()){
            return false
        } else{
            let tmp = this.peekLast()
            this.oprate(this.Type.Right,this.Derection.Minus)
            return tmp
        }
    }

    unshift(item){
        if (this.isFull()){
            return false
        } else{
            if (this.isEmpty()){
                this.l = this.r = 0
                this.array[this.r] = item
                this.size = 1
            } else {
                 this.oprate(this.Type.Left,this.Derection.Add,item)
                 return this.peekFirst()
            }
        }
    }

    shift(){
        if (this.isEmpty()){
            return false
        } else{
            let tmp = this.peekFirst()
            this.oprate(this.Type.Left,this.Derection.Minus)
            return tmp
        }
    }

    peekFirst(){
        if (this.isEmpty()){
            return false
        } else {
            return this.array[this.l]
        }
    }

    peekLast(){
        if (this.isEmpty()){
            return false
        } else {
            return this.array[this.r]
        }
    }
    
    oprate(type, derect,item){
        if (derect == this.Derection.Add){
            if (type == this.Type.Left){
               (this.l == 0)? (this.l = this.length - 1): this.l--
               this.array[this.l] = item
            } else {
               (this.r == this.length - 1)? (this.r = 0): this.r++
               this.array[this.r] = item
            }
            this.size++
        } else {
            if (type == this.Type.Left){
                (this.l == this.length - 1)? (this.l = 0): this.l++
            } else {
                (this.r == 0)? (this.r = this.length - 1): this.r--
            }
            this.size--
        }
    }
}