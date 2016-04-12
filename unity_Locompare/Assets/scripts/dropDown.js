#pragma strict
import UnityEngine.UI;

import System.Collections.Generic;

var LocationPicker : GameObject;
var LocationPickerLabel : GameObject;
private var SelectedLocation : Text;
var LocName : String;

var CurrentlySelected : List.< String >;

function Start () {

	SelectedLocation = LocationPickerLabel.GetComponent(UI.Text);
	LocName = SelectedLocation.text;
	SelectedLocation.text = "Select a location ...";
}

function Update () {

}

function PushLocation (){

	LocName = SelectedLocation.text;

	if (CurrentlySelected.Count < 2){

		CurrentlySelected.Add (LocName);
	}

	if (CurrentlySelected.Count >= 2 && !CurrentlySelected.Contains(LocName)){
		CurrentlySelected.Add(LocName);
    }
}

function PinMarker (){
}