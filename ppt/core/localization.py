import sys
from configuration import Config
import json  
import readWriteExcel
import readwriteStrings
import readwriteXML
import tools
  
class Localization:

    version = "1.0.0"

    def doLocalization(self):
        if len(sys.argv) == 1:
           self.command("--help", None)
        else:
           self.command(sys.argv[1], sys.argv[2:] if len(sys.argv) >= 2 else None)

    def import1(self, argv): 
        config = self.options(Config, argv)
        if config:
           readWriteExcel.doImport()
  
    def remove(self, argv):
        config = self.options(Config, argv)
        if config and config.platform.upper() == "IOS":
           readwriteStrings.removeRecords()
        elif config and config.platform.upper() == "ANDROID": 
           readwriteXML.removeRecords()
        else:
            print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️3 ★★★★★★★★★★★★★"))
            print(tools.ANSI.red("平台参数指定有误，请选择'iOS'或'Android'")) 
  
    def export(self, argv):
        config = self.options(Config, argv)
        if config:  
           readWriteExcel.writeContent2Execl()
        
    def version(self, argv):  
        print(tools.ANSI.green(Localization.version))
    
    def help(self, argv):
        print(tools.ANSI.yellow(Localization.helpInfo))
    
    def default(self, argv):
        print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️4 ★★★★★★★★★★★★★"))
        print(tools.ANSI.red("第{}个位置 {} 有错误".format(3, sys.argv[1])))
        self.help(argv)
    
    def command(self, action, argv):  
        actions = {  
            "i": self.import1,  
            "import": self.import1,
            "rm": self.remove, 
            "remove": self.remove,  
            "o": self.export, 
            "export": self.export, 
            "version": self.version, 
            "--version": self.version,
            "-v": self.version,  
            "help": self.help, 
            "--help": self.help,
            "-h": self.help,
            "default":self.default
        }  
        actions.get(action, self.default)(argv) 
    
    def options(self, config, argv):
        scucess = self.loadDefaultConfiguration(config)
        if not scucess:
            return None
        index = 0
        while index < len(argv):
            if index + 1 == len(argv):
               print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️5 ★★★★★★★★★★★★★"))
               print(tools.ANSI.red("第{}个位置 {} 有错误".format(index + 2 + 2, argv[index])))
               self.help(None)
               return None
            optionKey = str(argv[index]).strip()
            optionValue = str(argv[index + 1]).strip()
            configRes = self.dealWithOption(config, optionKey, optionValue, argv, index)
            if configRes:
               pass
            else:
               return None
            index = index + 2
        return config
    
    def loadDefaultConfiguration(self, config):
       return config.loadConfigWithJsonFile(config.defaultConfigurationPath)
        
    def dealWithOption(self, config:Config, optionKey, optionValue, argv, index):
        if optionKey == "-excel":
            config.excelPath = optionValue
        elif optionKey == "-folder":
            config.stringsFolderPath = optionValue
        elif optionKey == "-excel-key-pattern":
            config.excelKeyPattern = optionValue
        elif optionKey == "-rmkeys":
            try:
                data = json.loads(optionValue)
                if isinstance(data, list):  
                    config.removeKeys = data  
                else:  
                    self.printErrorInfo(index + 1, argv[index + 1])
                    return None
            except Exception as e: 
                 print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️6 ★★★★★★★★★★★★★"))
                 print(tools.ANSI.red("{}中发生json解析错误 {}".format(__file__,e)))
                 return None
        
        elif optionKey == "-rmkeys-file":
            try:
                 with open(optionValue, 'r', encoding='utf-8') as file:  
                  # 读取文件内容并转换成JSON对象（在Python中是字典或列表）  
                    data = json.load(file)
                    if isinstance(data, list):  
                        config.removeKeys = data  
                    else:  
                        self.printErrorInfo(index + 1, argv[index + 1])
                        return None
            except Exception as e: 
                 print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️7 123 ★★★★★★★★★★★★★"))
                 print(tools.ANSI.red("{}中发生json解析错误 {}".format(__file__,e)))
                 return None
        elif optionKey == "-oexcel":
            config.exportExcelPath = optionValue
        elif optionKey == "-oexcel-key-format":
            config.exportExcelKeyFormat = optionValue
        elif optionKey == "-platform":
            config.platform = optionValue 
        else:
            self.printErrorInfo(index, argv[index])
            return None
        return config
    
    def printErrorInfo(self, index, string):
        print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️8 ★★★★★★★★★★★★★"))
        print(tools.ANSI.red("第{}个位置 {} 有错误".format(index + 4, string)))
        self.help(None)
    
    helpInfo = (
r'''
   /********************************** usage **********************************/
command: action + options
eg. python3 localization.py import -excelPath ../importExcel.xlsx
eg. python3 localization.py rm -rmkeys '["th_lable_password", "th_lable_username"]'
eg. python3 localization.py export -oexcel ../exportExcel.xlsx

action:
    import,
    i,
    remove,
    rm,
    o,
    export,
    version,
    --version,
    -v,
    help,
    --help,
    -h,
    default

options:
    -excel path: path of import execl 
    -folder path: path of .strings file folder
    -rmkeys content: the content of remove keys eg. '["th_lable_password", "th_lable_username"]'
    -rmkeys-file path: the file path of remove keys eg. '["th_lable_password", "th_lable_username"]'
    -excel-key-pattern pattern: regular expression excel string key and group("key") is the rusult. eg. r'^\\s*S\\s*:\\s*ubt\\s*:\\s*(?P<key>.*?)$' default value is r'^\\s*(?P<key>.*?)\\s*$' strip between spaces
    -oexcel path: path of export execl
    -oexcel-key-format format: string format of export excel key {} replace the key eg. 'S:ubt:{}'
    -platform platform: which platform iOS or Andriod

other: 
    You can change configuration.json and configuration.py file to achieve the goal!!!

/********************************** usage **********************************/
'''
)
    
Localization().doLocalization()


