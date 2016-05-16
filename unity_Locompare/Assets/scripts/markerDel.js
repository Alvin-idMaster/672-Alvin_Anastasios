#pragma strict
import UnityEngine.UI;

//Variable to detect if double tap is done fast enough.
var doubleTapDetector : int;

//Variable to access the map marker arrays.
var mapMarker : mapMarker;

//Variable to determine which location name to be deleted from the array of location names.
var dropDown : dropDown;

//Variable to determine which map marker to be removed from the arrays and from display.
var markerId : int;

function Start () {

	//Set to 0 to be detected later.
	doubleTapDetector = 0;

	mapMarker = GetComponentInParent.<mapMarker>();

	dropDown = GameObject.Find("LocDropDown").GetComponent.<dropDown>();

}

function Update () {

	//When this variable is more than 0, it will be deleted when this object is pressed. But if not tapped fast enough, it won't be deleted.
	if(doubleTapDetector > 0) doubleTapDetector --;

}

function DeleteMarker (){

	if(doubleTapDetector <= 0){

		doubleTapDetector = 15;

	} else {

		mapMarker.RemoveMapMarker(markerId);
		dropDown.RemoveLocation(markerId);
		Destroy (gameObject);
		Debug.Log("Delete!");

	}

}