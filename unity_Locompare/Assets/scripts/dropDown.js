#pragma strict
import UnityEngine.UI;

import System.Collections.Generic;

var LocationPicker : GameObject;
var LocationPickerLabel : GameObject;
private var SelectedLocation : Text;
var LocName : String;

var CurrentlySelected : List.< String >;

function Start () {

	//CurrentlySelected = new Array ();

	SelectedLocation = LocationPickerLabel.GetComponent(UI.Text);
	LocName = SelectedLocation.text;
	SelectedLocation.text = "Select a location ...";

	//CurrentlySelected.length = 0;
}

function Update () {

	//Debug.Log(LocName);
	//Debug.Log(LocationPicker.GetComponent.<UI.Dropdown>().OptionData().text);
	//Debug.Log(LocationPicker.GetComponent.<UI.Dropdown>().value);

}

function PushLocation (){
	LocName = SelectedLocation.text;
	Debug.Log("Country " + LocName + " will be listed.");

	CurrentlySelected.Add (LocName);

	Debug.Log(CurrentlySelected.Count);

	/*
	if (CurrentlySelected.Length == 0){
		CurrentlySelected = new String [1];
		CurrentlySelected[0] = LocName;
	}

	for (var i = 0; i < CurrentlySelected.Count; i++) {
         GUI.Label(Rect(0, 0+(i*30), 200, 30), names[i]);
     }*/
}