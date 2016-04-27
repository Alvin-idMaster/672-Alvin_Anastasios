#pragma strict
import UnityEngine.UI;

private var myRect : RectTransform;

function Start () {

	myRect = GetComponent(RectTransform);

}

function Update () {

}

function DeleteMarker (){
	if(Input.GetMouseButton(0)) Debug.Log("I'm going to be deleted!");
}