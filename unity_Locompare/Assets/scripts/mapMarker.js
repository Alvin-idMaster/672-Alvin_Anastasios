#pragma strict
import UnityEngine.UI;
import System.Collections.Generic;

var mapScale : RectTransform;

var markerButtons : List.<GameObject>;

var markerPrefab : GameObject;
var markerParent : GameObject;

var offset1 : float;
var offset2 : float;

var markerScale : List.<RectTransform>;

var minScale : float;
var maxScale : float;

var zoomSpeed : float;

//Pinch-related private variables
private var minPinchSpeed:float = 5.0F;
private var minDistance:float = 5.0F;
private var touchDelta:float;
private var previousDistance:Vector2;
private var currentDistance:Vector2;
private var speedTouch0:float;
private var speedTouch1:float;

function Start () {

	mapScale = GetComponent(RectTransform);

	//if(markerScale[0] == null) Debug.Log("It's missing!");

}

function Update () {

	//For PC simulation of zooming in and out using scroll wheel.
	if(Input.GetAxis("Mouse ScrollWheel") < 0 && mapScale.localScale.x > minScale) {

		mapScale.localScale.x -= zoomSpeed;
		mapScale.localScale.y -= zoomSpeed;
		//markerScale.localScale.x = 1 / mapScale.localScale.x;
		//markerScale.localScale.y = 1 / mapScale.localScale.y;
	
	} else if(Input.GetAxis("Mouse ScrollWheel") > 0 && mapScale.localScale.x < maxScale){

		mapScale.localScale.x += zoomSpeed;
		mapScale.localScale.y += zoomSpeed;
		//markerScale.localScale.x = 1 / mapScale.localScale.x;
		//markerScale.localScale.y = 1 / mapScale.localScale.y;
	}

	// this part of the script is for touch enabled devices (mobile phone / tablet).
	if (Input.touchCount == 2 && Input.GetTouch(0).phase == TouchPhase.Moved && Input.GetTouch(1).phase == TouchPhase.Moved) 
	{
		currentDistance = Input.GetTouch(0).position - Input.GetTouch(1).position;
		previousDistance = ((Input.GetTouch(0).position - Input.GetTouch(0).deltaPosition) - (Input.GetTouch(1).position - Input.GetTouch(1).deltaPosition));
		touchDelta = currentDistance.magnitude - previousDistance.magnitude;
		speedTouch0 = Input.GetTouch(0).deltaPosition.magnitude / Input.GetTouch(0).deltaTime;
		speedTouch1 = Input.GetTouch(1).deltaPosition.magnitude / Input.GetTouch(1).deltaTime;
		
		if ((touchDelta + minDistance <= 5) && (speedTouch0 > minPinchSpeed) && (speedTouch1 > minPinchSpeed))
		{
			mapScale.localScale.x -= zoomSpeed;
			mapScale.localScale.y -= zoomSpeed;
		}

		if ((touchDelta + minDistance > 5) && (speedTouch0 > minPinchSpeed) && (speedTouch1 > minPinchSpeed))
		{
			mapScale.localScale.x += zoomSpeed;
			mapScale.localScale.y += zoomSpeed;
		}
	}

}

//Function to add marker on the map.
function PinMarker (){

	//Clone a marker from prefab.
	var markerClone : GameObject;
	markerClone = Instantiate(markerPrefab, transform.position, transform.rotation);

	//Set the cloned marker as a child of the map, so that it will be panned and zoomed together.
	markerClone.transform.SetParent(markerParent.transform, false);


	//After tested on the editor, it is set that the size of the RectTransform is 46(width) and 30(height).
	var markerCloneRect : RectTransform;
	markerCloneRect = markerClone.GetComponent(RectTransform);

	//Add the RectTransform to an array list so that it can be zoomed in and out.
	markerScale.Add(markerCloneRect);

	//Setting the location of the marker. Right now it is random because it is just a proof-of-concept that the marker can be placed anywhere within the map.
	offset1 = Random.Range(0.0, 365.0);
	offset2 = Random.Range(0.0, 195.0);
	markerCloneRect.offsetMin.x = offset1;
	markerCloneRect.offsetMax.y = offset2 * -1;
	markerCloneRect.offsetMax.x = (408 - 46 - markerCloneRect.offsetMin.x) * -1;
	markerCloneRect.offsetMin.y = 195 + markerCloneRect.offsetMax.y;

	//Add the newly instantiated button to the array so that it is saved and can be deleted later on.
	markerButtons.Add(markerClone);
}

function UpdatePinNumber (){

	for(var i : int = 0 ; i < markerButtons.Count; i++)
    {
        var markerButtonText : Text;
        markerButtonText = markerButtons[i].GetComponentInChildren(UI.Text);
        markerButtonText.text = (i+1).ToString();
    }

}