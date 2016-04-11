#pragma strict
import UnityEngine.UI;

import System.Collections.Generic;

var LocationPicker : GameObject;
var LocationPickerLabel : GameObject;
private var SelectedLocation : Text;
var LocName : String;

var CurrentlySelected : List.< String >;

var IsArrayChecked : boolean;

function Start () {

	//CurrentlySelected = new Array ();

	SelectedLocation = LocationPickerLabel.GetComponent(UI.Text);
	LocName = SelectedLocation.text;
	SelectedLocation.text = "Select a location ...";

	IsArrayChecked = false;

	//CurrentlySelected.length = 0;
}

function Update () {

	//Debug.Log(LocName);
	//Debug.Log(LocationPicker.GetComponent.<UI.Dropdown>().OptionData().text);
	//Debug.Log(LocationPicker.GetComponent.<UI.Dropdown>().value);

	if(Input.GetMouseButtonDown(1)){
		if (CurrentlySelected.Contains ("Singapore")){
			Debug.Log("Singapore dah ada!");
			CurrentlySelected.Remove ("Singapore");
		}else Debug.Log("Singapore belom ada!");
	}

}

function PushLocation (){

	LocName = SelectedLocation.text;

	Debug.Log("Country " + LocName + " will be listed.");

	if (CurrentlySelected.Count < 2) {

		CurrentlySelected.Add (LocName);

	}

	if (CurrentlySelected.Count >= 2){

		//var LatestLocation : String = SelectedLocation.text;
		CheckLocations();

		if(IsArrayChecked)CurrentlySelected.Add(LocName);
    }
}

	Debug.Log(CurrentlySelected.Count);

	/*
	if (CurrentlySelected.Length == 0){
		CurrentlySelected = new String [1];
		CurrentlySelected[0] = LocName;
	}*/

function CheckLocations(){

	IsArrayChecked = false;

	var i = 0;

	while (i < CurrentlySelected.Count) {

		if (CurrentlySelected[i] == LocName){
			IsArrayChecked = false;
			return;
		}

		if (CurrentlySelected[i] != LocName) {
			i++;
		}
	}

	if (i >= CurrentlySelected.Count){
		IsArrayChecked = true;
	}

	/*
	for (var i = 0; i < CurrentlySelected.Count; i += 0) {

	Debug.Log("Checking if " + CurrentlySelected[i] + " is already listed.");

		if (CurrentlySelected[i] == LocName){
			Debug.Log("Same location detected.");
			IsArrayChecked = true;
			return;
		}

		if (CurrentlySelected[i] != LocName){
			IsArrayChecked = false;
			i++;
		}
	}*/

}