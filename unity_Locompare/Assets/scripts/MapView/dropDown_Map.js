#pragma strict
//This is a line to include Unity UI library like buttons, images, scrolling rectangle as well as the main dropdown list.
import UnityEngine.UI;

//This is to add Microsoft List. It is a more powerful tool to deal with arrays.
import System.Collections.Generic;

//Declaring variables.
var mapImages : List.<Sprite>;
var mapImage : Image;

var dropDownDisplay : GameObject;
private var dropDownText : Text;

var LastSelectedName : String;

private var lastIndex : int;
private var nextIndex : int;

function Start () {

	dropDownText = dropDownDisplay.GetComponent(Text);

	dropDownText.text = "Select a country from this dropdown list to compare it to the world.";

	nextIndex = Random.Range(1, 4);

}

function Update () {

	if (nextIndex == lastIndex) nextIndex = Random.Range(0, 4);

}

function DisplayingInformation (){

	LastSelectedName = dropDownText.text;

	dropDownText.text = "Currently comparing " + LastSelectedName + " with the whole world. You can select other location from this list.";

	mapImage.sprite = mapImages[nextIndex];

	lastIndex = nextIndex;
}