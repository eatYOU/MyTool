## Excel2Json.Config.md
```
//载入的Excel路径,可添加多个
string excelPath = E:\OneDrive\Excel\TNT\TNT_data.xlsx
string excelPath = E:\OneDrive\Excel\TNT\TNT_info.xlsx

//文件保存路径，如果没有会自动创建
string savePath = E:\OneDrive\Excel\TNT\JSON\

//是否{对象}内换行
bool splitSep = true

//是否[数组]内换行
bool splitDiv = true

//是否保存JSON文件
bool saveJson = true

//是否保存SQL文件
bool saveSql = true

//是否保存C#文件
bool saveCsharp = true

//保存的C#是否具有注释
bool haveCommit	= false

//是否读取整个工作薄
bool readBook = true

//是否字段转换为小写
bool lowCase = false

//表头的行数
int headLine = 3
```
