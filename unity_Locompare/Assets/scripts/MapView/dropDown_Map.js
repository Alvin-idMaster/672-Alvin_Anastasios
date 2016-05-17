#pragma strict
//This is a line to include Unity UI library like buttons, images, scrolling rectangle as well as the main dropdown list.
import UnityEngine.UI;

//This is to add Microsoft List. It is a more powerful tool to deal with arrays.
import System.Collections.Generic;

//Declaring variables.
var mapImages : List.<Sprite>;

var dropDownDisplay : GameObject;
private var dropDownText : Text;

var LastSelectedName : String;

var LastIndex : int;
var NextIndex : int;

function Start () {

	dropDownText = dropDownDisplay.GetComponent(Text);

	dropDownText.text = "Select a country from this dropdown list to compare it to the world.";

}

function Update () {

}

function DisplayingInformation (){

	LastSelectedName = dropDownText.text;

	dropDownText.text = "Currently comparing " + LastSelectedName + " with the whole world. You can select other location from this list.";
}