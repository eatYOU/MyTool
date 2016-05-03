# MyTool - 工具类

## 1.Excel2Json

```
把Excel转换为Json文件，Sql脚本文件，C#字段定义文件
可在Config.md里设置具体的导出规则
```
```
string excelPath 	= E:\OneDrive\Excel\TNT\TNT_data.xlsx
string excelPath 	= E:\OneDrive\Excel\TNT\TNT_info.xlsx
string savePath 	= E:\OneDrive\Excel\TNT\JSON\
bool splitSep 		= true		//是否对象内换行
bool splitDiv 		= true		//是否数组内换行
bool saveJson 		= true		//是否保存JSON文件
bool saveSql 		= true		//是否保存SQL文件
bool saveCsharp 	= true		//是否保存C#文件
bool haveCommit		= false		//生成的C#是否具有注释
bool readBook 		= true		//是否读取整个工作薄
bool lowCase 		= false		//是否字段转换为小写
int headLine 	  	= 3			//表头的行数
```

