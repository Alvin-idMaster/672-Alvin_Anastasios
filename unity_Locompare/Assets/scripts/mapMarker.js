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

}

function Update () {

	//For PC simulation of zooming in and out using scroll wheel.
	if(Input.GetAxis("Mouse ScrollWheel") < 0 && mapScale.localScale.x > minScale) {

		mapScale.localScale.x -= zoomSpeed;
		mapScale.localScale.y -= zoomSpeed;

		RescaleMapMarkers();
	
	} else if(Input.GetAxis("Mouse ScrollWheel") > 0 && mapScale.localScale.x < maxScale){

		mapScale.localScale.x += zoomSpeed;
		mapScale.localScale.y += zoomSpeed;

   		RescaleMapMarkers();
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
			RescaleMapMarkers();
		}

		if ((touchDelta + minDistance > 5) && (speedTouch0 > minPinchSpeed) && (speedTouch1 > minPinchSpeed))
		{
			mapScale.localScale.x += zoomSpeed;
			mapScale.localScale.y += zoomSpeed;
			RescaleMapMarkers();
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

	/*
	//Setting the location of the marker.
	//Right now, it is random because it is just a proof-of-concept that the marker can be placed anywhere within the map.
	offset1 = Random.Range(0.0, 365.0);
	offset2 = Random.Range(0.0, 195.0);
	markerCloneRect.offsetMin.x = offset1;
	markerCloneRect.offsetMax.y = offset2 * -1;
	markerCloneRect.offsetMax.x = (408 - 46 - markerCloneRect.offsetMin.x) * -1;
	markerCloneRect.offsetMin.y = 195 + markerCloneRect.offsetMax.y;
	*/

	//NOTE: offsetMax.x = Right *-1, Max.y = Top *-1, Min.x = left, Min.y = Bottom. 

	offset1 = Random.Range(0.0, 365.0);
	offset2 = Random.Range(0.0, 195.0);
	Debug.Log(offset1 + ", " + offset2);
	markerCloneRect.offsetMin.x = offset1;
	markerCloneRect.offsetMax.y = offset2 * -1;
	markerCloneRect.offsetMax.x = offset1;
	markerCloneRect.offsetMin.y = offset2 * -1;



	//Add the newly instantiated button to the array so that it is saved and can be deleted later on.
	markerButtons.Add(markerClone);

	//Rescale the newly created map marker to suit the current zoom level.
	RescaleMapMarkers();

}

function UpdatePinNumber (){

	for(var i : int = 0 ; i < markerButtons.Count; i++)
    {
        var markerButtonText : Text;											//These 3 lines reorder the texts
        markerButtonText = markerButtons[i].GetComponentInChildren(UI.Text);	//which are displaying the marker
        markerButtonText.text = (i+1).ToString();								//according to the order each location is selected.

        markerButtons[i].GetComponent.<markerDel>().markerId = i;				//This line determines an id, which is stored in each marker, so that it will delete the correct marker.
    }

}

function RescaleMapMarkers (){

	for(var m : int = 0 ; m < markerScale.Count; m++)
	{
    	markerScale[m].localScale.x = 1 / mapScale.localScale.x;
    	markerScale[m].localScale.y = 1 / mapScale.localScale.y;
	}

}

function RemoveMapMarker (markerId : int){

	markerScale.RemoveAt(markerId);
	markerButtons.RemoveAt(markerId);
	UpdatePinNumber();

}