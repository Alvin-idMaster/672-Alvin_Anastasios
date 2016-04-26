#pragma strict
import UnityEngine.UI;

private var myRect : RectTransform;

function Start () {

	myRect = GetComponent(RectTransform);
	/*
	//After tested on the editor, it is set that the size of the RectTransform is 46(width) and 30(height)
	myRect.offsetMin.x = Random.Range(0.0, 365.0);
	myRect.offsetMax.y = Random.Range(0.0, 195.0);
	myRect.offsetMax.x = 408 - 46 - myRect.offsetMin.x;
	myRect.offsetMin.y = 195 - myRect.offsetMax.y;
	*/
}

function Update () {

	//Debug.Log(myRect.offsetMin);	//offsetMin.x = left limit, range 0 until 365
	Debug.Log(myRect.offsetMax);	//offsetMax.y = Top limit, range 0 until -194
	//Debug.Log(myRect.sizeDelta); 	//-365, -195

}