import sys
isFirstLine = True
arr = []

def getBigFish(arr):
    # print(arr)
    if len(arr) <= 1:
        return 0
    parentArr = []
    # 如果我前面的数不大于我，那么我肯定在这一轮不会被吃掉，否则我这一轮会被吃掉
    for index in range(len(arr)-1, 0,-1):
        if int(arr[index]) >= int(arr[index - 1]):
            parentArr.insert(0,arr[index])
    parentArr.insert(0,arr[0])
    # 第一个数不会被吃掉
    if len(parentArr) == len(arr):
        return 0
    else:
        return getBigFish(parentArr) + 1
           
for line in sys.stdin:
    if  isFirstLine:
        isFirstLine = False
        continue
    else:
        arr = line.strip().split(' ')
        count = getBigFish(arr)
        print(count)