#pragma strict
import UnityEngine.UI;

var mapScale : RectTransform;
//var markerScale : RectTransform;

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

	//markerScale.localScale.x = 1;
	//markerScale.localScale.y = 1;

	//For PC simulation of zooming in and out using scroll wheel.
	if(Input.GetAxis("Mouse ScrollWheel") < 0 && mapScale.localScale.x > minScale) {

		mapScale.localScale.x -= zoomSpeed;
		mapScale.localScale.y -= zoomSpeed;
		
	} else if(Input.GetAxis("Mouse ScrollWheel") > 0 && mapScale.localScale.x < maxScale){

		mapScale.localScale.x += zoomSpeed;
		mapScale.localScale.y += zoomSpeed;
		
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