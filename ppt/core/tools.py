import os
from pathlib import Path 
# 获取当前文件的完整路径  
currentFilePath = __file__  
# 如果你需要获取目录路径（即去掉文件名）  
dirPath = os.path.dirname(currentFilePath)

#有颜色打印输出的类
class ANSI:  
    @staticmethod  
    def red(s):  
        return f"\033[91m{s}\033[0m"  
    @staticmethod  
    def green(s):  
        return f"\033[92m{s}\033[0m" 
    @staticmethod  
    def yellow(s):  
        return f"\033[93m{s}\033[0m" 

# 判断文件是否存在，及创建
def creatFileIfNotExist(filePath):
    directory = os.path.dirname(filePath)  
    if not os.path.exists(directory):  
        os.makedirs(directory) 
    if not os.path.exists(filePath):
        #调用系统命令行来创建文件
        os.system(r"touch {}".format(filePath))

def isFileExist(filePath):
    return os.path.exists(filePath)

# 判断路径格式是否是正确的
def isValidPathFormat(path_str):  
    try:  
        # 尝试将字符串转换为Path对象，这会自动处理路径分隔符  
        Path(path_str)  
        # 这里可以添加更多的检查，比如检查路径中的字符是否都是有效的  
        # 但对于大多数情况，仅仅能够转换为Path对象就足够了  
        return True  
    except ValueError as e:  
        # 如果Path对象无法创建（比如因为包含了非法字符），会抛出ValueError  
        ANSI.red("Invalid path format: {}",format(e))  
        return False  

