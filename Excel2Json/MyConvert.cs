using System;  
using System.Collections.Generic;  
using System.Text;  
using System.Data;  
using System.Reflection;  
using System.Collections;  
using System.Data.Common;  

namespace MyTool  
{  
	//JSON转换类  
	public class MyConvert  
	{  
		#region 私有方法  
		/// <summary>  
		/// 过滤特殊字符  
		/// </summary>  
		private static string String2Json(String s)  
		{  
			StringBuilder sb = new StringBuilder();  
			for (int i = 0; i < s.Length; i++)  
			{  
				char c = s.ToCharArray()[i];  
				switch (c)  
				{  
				case '\"':  
					sb.Append("\\\""); break;  
				case '\\':  
					sb.Append("\\\\"); break;  
				case '/':  
					sb.Append("\\/"); break;  
				case '\b':  
					sb.Append("\\b"); break;  
				case '\f':  
					sb.Append("\\f"); break;  
				case '\n':  
					sb.Append("\\n"); break;  
				case '\r':  
					sb.Append("\\r"); break;  
				case '\t':  
					sb.Append("\\t"); break;  
				default:  
					sb.Append(c); break;  
				}  
			}  
			return sb.ToString();  
		}  
		
		/// <summary>  
		/// 格式化字符型、日期型、布尔型  
		/// </summary>  
		private static string StringFormat(string str, Type type)  
		{  
			if (type == typeof(string))  
			{  
				str = String2Json(str);  
				str = "\"" + str + "\"";  
			}  
			else if (type == typeof(DateTime))  
			{  
				str = "\"" + str + "\"";  
			}  
			else if (type == typeof(bool))  
			{  
				str = str.ToLower();  
			}  
			else if (type != typeof(string) && string.IsNullOrEmpty(str))  
			{  
				str = "\"" + str + "\"";  
			}  
			return str;  
		}  
		#endregion  
		
		#region List转换成Json  
		/// <summary>  
		/// List转换成Json  
		/// </summary>  
		public static string ListToJson<T>(IList<T> list)  
		{  
			object obj = list[0];  
			return ListToJson<T>(list, obj.GetType().Name);  
		}  
		
		/// <summary>  
		/// List转换成Json   
		/// </summary>  
		public static string ListToJson<T>(IList<T> list, string __jn) {return ListToJson<T>(list, __jn, "", "");}  
		public static string ListToJson<T>(IList<T> list, string __jn, string sep, string div)  
		{  
			StringBuilder Json = new StringBuilder();  
			if (string.IsNullOrEmpty(__jn)) __jn = list[0].GetType().Name;  
			Json.Append("{\"" + __jn + "\":[");  
			if (list.Count > 0)  
			{  
				for (int i = 0; i < list.Count; i++)  
				{  
					T obj = Activator.CreateInstance<T>();  
					PropertyInfo[] pi = obj.GetType().GetProperties();  
					Json.Append("{");  
					for (int j = 0; j < pi.Length; j++)  
					{  
						Type type = pi[j].GetValue(list[i], null).GetType();  
						Json.Append("\"" + pi[j].Name.ToString() + "\":" + StringFormat(pi[j].GetValue(list[i], null).ToString(), type));  
						
						if (j < pi.Length - 1)  
						{  
							Json.Append("," + sep);  
						}  
					}  
					Json.Append("}");  
					if (i < list.Count - 1)  
					{  
						Json.Append("," + div);  
					}  
				}  
			}  
			Json.Append("]}");  
			return Json.ToString();  
		}  
		#endregion  
		
		#region 对象转换为Json  
		/// <summary>   
		/// 对象转换为Json   
		/// </summary>   
		/// <param name="jsonObject">对象</param>   
		/// <returns>Json字符串</returns>   
		public static string ToJson(object jsonObject) {return ToJson (jsonObject, "");}
		public static string ToJson(object jsonObject, string sep)  
		{  
			string __js = "{";  
			PropertyInfo[] propertyInfo = jsonObject.GetType().GetProperties();  
			for (int i = 0; i < propertyInfo.Length; i++)  
			{  
				object objectValue = propertyInfo[i].GetGetMethod().Invoke(jsonObject, null);  
				string value = string.Empty;  
				if (objectValue is DateTime || objectValue is Guid || objectValue is TimeSpan)  
				{  
					value = "'" + objectValue.ToString() + "'";  
				}  
				else if (objectValue is string)  
				{  
					value = "'" + ToJson(objectValue.ToString()) + "'";  
				}  
				else if (objectValue is IEnumerable)  
				{  
					value = ToJson((IEnumerable)objectValue);  
				}  
				else  
				{  
					value = ToJson(objectValue.ToString());  
				}  
				__js += "\"" + ToJson(propertyInfo[i].Name) + "\":" + value + "," + sep;  
			}  
			__js.Remove(__js.Length - sep.Length - 1, sep.Length + 1);   
			return __js + "}";  
		}  
		#endregion  
		
		#region 对象集合转换Json  
		/// <summary>   
		/// 对象集合转换Json   
		/// </summary>   
		/// <param name="array">集合对象</param>   
		/// <returns>Json字符串</returns>   
		public static string ToJson(IEnumerable array) {return ToJson (array, "", "");} 
		public static string ToJson(IEnumerable array, string sep, string div)  
		{  
			string __js = "[";  
			foreach (object item in array)  
			{  
				__js += ToJson(item, sep) + ",";  
			}  
			__js.Remove(__js.Length - div.Length - 1, div.Length + 1);   
			return __js + "]";  
		}  
		#endregion  
		
		#region 普通集合转换Json  
		/// <summary>   
		/// 普通集合转换Json   
		/// </summary>   
		/// <param name="array">集合对象</param>   
		/// <returns>Json字符串</returns>   
		public static string ToArrayString(IEnumerable array) {return ToArrayString(array, "", "");}  
		public static string ToArrayString(IEnumerable array, string sep, string div)  
		{  
			string __js = "[";  
			foreach (object item in array)  
			{  
				__js = ToJson(item.ToString(), sep, div) + "," + div;  
			}  
			__js.Remove(__js.Length - div.Length - 1, div.Length + 1);    
			return __js + "]";  
		}  
		#endregion  
		
		#region  DataSet转换为Json  
		/// <summary>   
		/// DataSet转换为Json   
		/// </summary>   
		/// <param name="__ds">DataSet对象</param>   
		/// <returns>Json字符串</returns>   
		public static string ToJson(DataSet __ds) {return ToJson (__ds, "", "", 1);} 
		public static string ToJson(DataSet __ds, string sep, string div, int header)  
		{  
			string __js = "{";  
			foreach (DataTable table in __ds.Tables)  
			{  
				__js += "\"" + table.TableName + "\":" + ToJson(table, sep, div, header) + "," + div + div;  
			}  
			__js = __js.TrimEnd(',');  
			return __js + "}";  
		}  
		#endregion  
		
		#region Datatable转换为Json  
		/// <summary>   
		/// Datatable转换为Json   
		/// </summary>   
		/// <param name="table">Datatable对象</param>   
		/// <returns>Json字符串</returns>   
		public static string ToJson(DataTable __dt) {return ToJson(__dt, "", "", 1);}
		public static string ToJson(DataTable __dt, string sep, string div, int header)  
		{  
			StringBuilder __js = new StringBuilder();  
			__js.Append("{" + div);  
			DataRowCollection __drc = __dt.Rows;  
			for (int i = header - 1; i < __drc.Count; i++)  
			{  	
				if (__drc[i][0].ToString() != "") 
				{
					__js.Append("\"");  
					__js.Append(__drc[i][0].ToString());  
					__js.Append("\":{" + sep);  
					for (int j = 1; j < __dt.Columns.Count; j++)  
					{  
						string strKey = __dt.Columns[j].ColumnName;  
						string strValue = __drc[i][j].ToString();
						Type type = __dt.Columns[j].DataType;  
						__js.Append("\"" + strKey + "\":");  
						strValue = StringFormat(strValue, type);  
						if (j < __dt.Columns.Count - 1)  
						{  
							__js.Append(strValue + "," + sep);  
						}  
						else  
						{  
							__js.Append(strValue);  
						} 
					}  
					__js.Append("}," + div);	
				}  
			}  
			__js.Remove(__js.Length - div.Length - 1, div.Length + 1);  
			__js.Append(div + "}");  
			return __js.ToString();  
		}  
		
		/// <summary>  
		/// DataTable转换为Json   
		/// </summary>  
		public static string ToJson(DataTable __dt, string __jn) {return ToJson(__dt, __jn, "", "", 1);}  
		public static string ToJson(DataTable __dt, string __jn, string sep, string div, int header)  
		{  
			StringBuilder Json = new StringBuilder();  
			if (string.IsNullOrEmpty(__jn)) __jn = __dt.TableName;  
			Json.Append("{\"" + __jn + "\":[");  
			if (__dt.Rows.Count > 0)  
			{  
				for (int i = header - 1; i < __dt.Rows.Count; i++)  
				{  
					Json.Append("{");  
					for (int j = 0; j < __dt.Columns.Count; j++)  
					{  
						Type type = __dt.Rows[i][j].GetType();  
						Json.Append("\"" + __dt.Columns[j].ColumnName.ToString() + "\":" + StringFormat(__dt.Rows[i][j].ToString(), type));  
						if (j < __dt.Columns.Count - 1)  
						{  
							Json.Append("," + sep);  
						}  
					}  
					Json.Append("}");  
					if (i < __dt.Rows.Count - 1)  
					{  
						Json.Append("," + div);  
					}  
				}  
			}  
			Json.Append("]}");  
			return Json.ToString();  
		}  
		#endregion  
		
		#region DataReader转换为Json  
		/// <summary>   
		/// DataReader转换为Json   
		/// </summary>   
		/// <param name="dataReader">DataReader对象</param>   
		/// <returns>Json字符串</returns>   
		public static string ToJson(DbDataReader __dr) {return ToJson(__dr, "", "");} 
		public static string ToJson(DbDataReader dataReader, string sep, string div)  
		{  
			StringBuilder __js = new StringBuilder();  
			__js.Append("[");  
			while (dataReader.Read())  
			{  
				__js.Append("{");  
				for (int i = 0; i < dataReader.FieldCount; i++)  
				{  
					Type type = dataReader.GetFieldType(i);  
					string strKey = dataReader.GetName(i);  
					string strValue = dataReader[i].ToString();  
					__js.Append("\"" + strKey + "\":");  
					strValue = StringFormat(strValue, type);  
					if (i < dataReader.FieldCount - 1)  
					{  
						__js.Append(strValue + "," + sep);  
					}  
					else  
					{  
						__js.Append(strValue);  
					}  
				}  
				__js.Append("}," + div);  
			}  
			dataReader.Close();  
			__js.Remove(__js.Length - 1, 1);  
			__js.Append("]");  
			return __js.ToString();  
		}  
		#endregion  
				
		#region DataTable转换为Csharp字段
		/// <summary>   
		/// DataTable转换为Csharp字段   
		/// </summary>   
		/// <param name="__dt">DataTable对象</param>   
		/// <param name="haveCommit">是否有注释</param>   
		/// <returns>Csharp字符串</returns>   
		public static string ToCsharp(DataTable __dt, bool haveCommit) {
			if (__dt.Rows.Count < 2) return "";
			DataRowCollection __drc = __dt.Rows;
			StringBuilder __sb = new StringBuilder();
			__sb.AppendFormat("public class {0} {{\n", __dt.TableName);
			for (int j = 0; j < __dt.Columns.Count; j++) {
				if (haveCommit) {
					__sb.AppendFormat("\tpublic {0} {1};", __drc[0][j], __dt.Columns[j].ColumnName);
					__sb.AppendFormat(" //{0}\n", __drc[1][j]);
				} else {
					__sb.AppendFormat("\tpublic {0} {1};\n", __drc[0][j], __dt.Columns[j].ColumnName);
				}
			}
			__sb.Append("}");
			return __sb.ToString();
		}
		#endregion  
	}  
}  
