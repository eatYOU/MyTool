#if UNITY_EDITOR
using UnityEngine;
using UnityEditor;
using System.Collections;
using System.Collections.Generic;

public class CreatPrefab : MonoBehaviour {
	
	public GameObject targetObject;
	public GameObject orginObject;
	public Object saveFolder;
	public string suffix = "_copy";
	
	private Transform mapTran;
	private Transform orgTran;
	private Transform tgtTran;
	private string mapName;
	private string savePath;
	private int index = 0;
	
	void Start() {
		if (!targetObject) {
			Debug.Log ("Target not exist!");
			return;
		}
		if (!orginObject) {
			Debug.Log ("Orgin not exist!");
			return;
		}
		if (!saveFolder) {
			Debug.Log ("SavePath not exist!");
			return;
		}
		
		tgtTran = targetObject.transform;
		orginObject.SetActive(false);
		savePath = AssetDatabase.GetAssetPath(saveFolder);
		Debug.Log ("savePath : " + savePath);
		Debug.Log ("ORGIN : " + orginObject.name);
		Debug.Log ("TARGET : " + targetObject.name);
		StartCoroutine(Control());
	}

	IEnumerator Control(int idx) {
		mapTran = gameObject.transform.GetChild(index);
		if (!mapTran) {
			Debug.Log ("Can't Find Orgin GameObject!");
			return;
		}
		mapName = mapTran.gameObject.name;
		orgTran = mapTran.Find (orginObject.name);
		StartCoroutine(Implement());
		yield return new WaitForSeconds (1.0f);
		index ++;
		StartCoroutine(Control());
	}

	IEnumerator Implement() {
		Transform orgCopy = Instantiate(orgTran);
		orgCopy.SetParent(orgTran.parent);
		orgCopy.position = tgtTran.position;
		orgCopy.rotation = tgtTran.rotation;
		orgCopy.localScale = tgtTran.localScale;
		orgCopy.gameObject.name = orgTran.gameObject.name;
		foreach (Transform child in orgCopy) {
			Destroy(child.gameObject);
		}
		yield return new WaitForSeconds(0.1f);
		
		foreach (Transform child in orgTran) {
			Transform tgtCopy = Instantiate(tgtTran);
			tgtCopy.SetParent(orgCopy);
			tgtCopy.position = child.position;
			tgtCopy.rotation = child.rotation;
			tgtCopy.localScale = child.localScale;
			tgtCopy.gameObject.name = tgtTran.gameObject.name + suffix;
		}
		Destroy(orgTran.gameObject);
		yield return new WaitForSeconds(0.1f);
		
		mapTran.gameObject.SetActive(true);
		Object prefab =  PrefabUtility.CreateEmptyPrefab(savePath + "/" + mapName + ".prefab");
		PrefabUtility.ReplacePrefab(mapTran.gameObject, prefab);
		mapTran.gameObject.SetActive(false);
		AssetDatabase.Refresh();
		Debug.Log ("Creat Prefab : " + mapName);
	}
}
#endif
