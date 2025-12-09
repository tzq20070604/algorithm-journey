const maxMeeting = function(meettings){
    meettings.sort((a,b)=>{return a[1] - b[1]})
    let ans = 0, lastEnd = -1
    for(let i = 0; i < meettings.length;i++){
        let [st,end] = meettings[i]
        if (st >= lastEnd){
            ans++
            lastEnd = end
        }
    }
    return ans
}