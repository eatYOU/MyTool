using System;
using System.IO;
using System.Data;
using System.Text;
using System.Collections.Generic;  
using Excel;

/// <summary>
/// Excel转换为Json, Sql, Csharp定义字段
/// </summary>
sealed public class Excel2Json {
	
	private static string configPath = @"Config.ini";
	private static string excelPath = "";
	private static string excelName = "";
	private static string savePath = "";
	private static string splitSep = "";
	private static string splitDiv = "";
	private static bool saveJson = true;
	private static bool saveSql = false;
	private static bool saveCsharp = false;
	private static bool haveCommit = false;
	private static bool readBook = false;
	private static bool lowcase = false;
	private static int headerLine = 3;
	private static int index = 0;
	private static List<string> theList;
	
	/// <summary>
	/// 应用程序入口
	/// </summary>
	/// <param name="args">命令行参数</param>
	static void Main(string[] args) {
		Config();
	}
	
	/// <summary>
	/// 读取本地配置
	/// </summary>
	static void Config() {
		StreamReader __sr = new StreamReader(configPath, Encoding.Default);
		string line, key, value;
		theList = new List<string>();
		while ((line = __sr.ReadLine()) != null) {
			string[] split = line.ToString().Split(new char[] {'=', '/'});
			key = CheckString(split[0]);
			value = CheckString(split[1]);
			bool isTrue = value == "true";
			switch (key) {
			case "string" + "excelPath" :
				theList.Add (value);			
				break;
			case "string" + "savePath" :
				savePath = value;
				if (!Directory.Exists(savePath)) {Directory.CreateDirectory(savePath);}
				break;
			case "bool" + "splitSep" :
				splitSep = isTrue ? "\n" : "";
				break;
			case "bool" + "splitDiv" :
				splitDiv = isTrue ? "\n" : "";
				break;
			case "bool" + "saveJson" :
				saveJson = isTrue;
				break;
			case "bool" + "saveSql" :
				saveSql = isTrue;
				break;
			case "bool" + "saveCsharp" :
				saveCsharp = isTrue;
				break;
			case "bool" + "haveCommit" :
				haveCommit = isTrue;
				break;
			case "bool" + "readBook" :
				readBook = isTrue;
				break;
			case "bool" + "lowcase" :
				lowcase = isTrue;
				break;
			case "int" + "headerLine" :
				headerLine = Convert.ToInt16(value);
				break;
			}
		}
		Load (index);
	}
	
	static string CheckString(string txt) {
		txt = txt.Replace(" ", "").Replace(";", "").Replace("\"", "").Replace("\t", "");
		txt = txt.Replace(" ", "").Replace(";", "").Replace("\"", "").Replace("\t", "");
		txt = txt.Replace(" ", "").Replace(";", "").Replace("\"", "").Replace("\t", "");
		return txt;
	}
	
	/// <summary>
	/// 载入Excel文件
	/// </summary>
	/// <param name="idx">Excel文件路径索引</param>
	static void Load(int idx) {
		Console.WriteLine(string.Format("listCount: {0} | index: {1}", theList.Count, index));
		if (theList.Count > index) {
			excelPath = theList[index];
			excelName = Path.GetFileName(excelPath);
			using (FileStream excelFile = File.Open(excelPath, FileMode.Open, FileAccess.Read)) {
				IExcelDataReader __er = ExcelReaderFactory.CreateOpenXmlReader(excelFile);
				__er.IsFirstRowAsColumnNames = true;
				DataSet __ds = __er.AsDataSet();
				__er.Close(); 
				
				// 数据检测
				if (__ds.Tables.Count < 1) {
					Console.WriteLine("工作表为空!\t" + excelPath);
				} else {
					Export(__ds);
				}
			}
		}
	}
	
	/// <summary>
	/// 导出文件
	/// </summary>
	static void Export(DataSet __ds) {
		if (!string.IsNullOrEmpty(savePath)) {
			DateTime startTime = System.DateTime.Now;
			foreach (DataTable __dt in __ds.Tables) {
				string fileName = __dt.TableName;
				
				//-- 导出JSON文件
				if (saveJson) {
					string json = MyTool.MyConvert.ToJson(__dt, splitSep, splitDiv, headerLine);
					SaveToFile(json, fileName, ".json");
				}
				
				//-- 导出SQL文件
				if (saveSql) {
					
				}
				
				//-- 生成C#定义文件
				if (saveCsharp) {
					string csharp = MyTool.MyConvert.ToCsharp(__dt, haveCommit);
					SaveToFile(csharp, fileName, ".cs");
				}
				
				Console.WriteLine(string.Format("正在转换:{0} >> {1}", excelName, fileName));
				if (!readBook) break;
			}
			
			//-- 程序计时
			DateTime endTime = System.DateTime.Now;
			TimeSpan dur = endTime - startTime;
			Console.WriteLine(string.Format("转换完成:{0} -- 计时:{1}毫秒.\n", excelName, dur.Milliseconds));
		}
		Load (index++);
	}

	static void SaveToFile(string bytes, string fileName, string fileType) {
		string filePath = savePath + fileName + fileType;
		using (FileStream file = new FileStream(filePath, FileMode.Create, FileAccess.Write)) {
			using (TextWriter writer = new StreamWriter(file, Encoding.Default))
				writer.Write(bytes);
		}
	}
}
