using System;
using System.IO;
using System.Data;
using System.Text;
using System.Drawing;
using System.Collections.Generic;  

/// <summary>
/// 图片去底变透明
/// </summary>
sealed public class RemoveBG {
	private static string configPath = @"Config.md";
	private static string bgColor = "";
	private static string imgPath = "";
	private static string savePath = "";

	/// <summary>
	/// 应用程序入口
	/// </summary>
	static void Main(string[] args) {
		Config();
		Save();
	}

	/// <summary>
	/// 读取本地配置
	/// </summary>
	static void Config () {

		StreamReader __sr = new StreamReader(configPath, Encoding.Default);
		string line, key, value;
		while ((line = __sr.ReadLine()) != null) {
			string[] split = line.ToString().Split(new char[] {'=', '/'});
			if (split.Length == 1) continue;
			key = Check(split[0]);
			value = Check(split[1]);
			if (value.Length == 0) continue;
			switch (key) {
			case "string" + "bgColor" :
				bgColor = value;
				break;
			case "string" + "imgPath" :
				imgPath = value;
				if (!Directory.Exists(imgPath)) {Console.WriteLine("路径:{0}不存在!!!", imgPath);}
				break;
			case "string" + "savePath" :
				savePath = value;
				if (!Directory.Exists(savePath)) {Directory.CreateDirectory(savePath);}
				break;
			}
		}
	}	

	/// <summary>
	/// 保存图像文件
	/// </summary>
	static void Save() {
		if (Directory.Exists(imgPath)) {
			DirectoryInfo directory = new DirectoryInfo(imgPath);
			FileInfo[] files = directory.GetFiles("*", SearchOption.AllDirectories);
			Console.WriteLine("待处理文件:{0}个", files.Length);
			for (int i = 0; i < files.Length; i++) {
				// if (!files[i].Name.EndsWith(".jpg")) && (!files[i].Name.EndsWith(".png")) 
				// 	continue;
				Console.WriteLine("正在处理:{0}", files[i].Name);
				string orgPath = imgPath + files[i].Name;
				string tgtPath = savePath + files[i].Name.Replace(".gif", ".png").Replace(".jpg", ".png");
				Image image = Image.FromFile (orgPath);
				Bitmap bitmap = new Bitmap (image);
				bitmap.MakeTransparent (System.Drawing.Color.White);
				bitmap.Save (tgtPath);
			}
		}
	}

	static string Check(string txt) {
		txt = txt.Replace(" ", "").Replace(";", "").Replace("\"", "").Replace("\t", "");
		txt = txt.Replace(" ", "").Replace(";", "").Replace("\"", "").Replace("\t", "");
		txt = txt.Replace(" ", "").Replace(";", "").Replace("\"", "").Replace("\t", "");
		return txt;
	}
}
