#pragma strict
import UnityEngine.UI;

private var DrawerHeight : RectTransform;

function Start () {

	DrawerHeight = GetComponent(RectTransform);

	DrawerHeight.sizeDelta = Vector2 (0, Screen.height);


}

function Update () {

}