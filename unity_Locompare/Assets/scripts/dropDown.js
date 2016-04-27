#pragma strict
//This is a line to include Unity UI library like buttons, images, scrolling rectangle as well as the main dropdown list.
import UnityEngine.UI;

//This is to add Microsoft List. It is a more powerful tool to deal with arrays.
import System.Collections.Generic;

//Declaring variables.
var LocationPickerLabel : GameObject; 			//To manipulate the texts inside the drop down list.
private var SelectedLocation : Text;			//Private variable to store the name of a selected location. This needs to be declared as Unity Text and String are two different variable types.
var LocName : String;							//This will be where the string of a selected location is stored.

//These two are related to the markers.
//var markerButton : Button;
//var markerNum : String;

var CurrentlySelected : List.< String >;		//The array variable to store all locations that have been selected throughout.


//These two will be to display all selected locations on game screen.
var displayResults : GameObject;
private var displayText : Text;

//Compare button that will lead to the table view.
var compareButton : GameObject;

var mapMarker : mapMarker;

function Start () {

	//The next 3 lines are to set the drop down list to say "Select a location ..."
	//or else it will be showing the default selected option.
	SelectedLocation = LocationPickerLabel.GetComponent(UI.Text);
	LocName = SelectedLocation.text;
	SelectedLocation.text = "Select a location ...";

	displayText = displayResults.GetComponent(Text);	//Assigning variable to the Text component.

	displayText.text = "";								//Empty the text when there is no location selected.

	compareButton.SetActive(false);						//Set the compare button to false to be activated when there are 2 or more locations selected.
}

function Update () {


}

//The function that will add a location into the array. This is called via the event system manager in the Unity editor.
function PushLocation (){

	LocName = SelectedLocation.text;			//So that the last selected location will be the one added to the array.

	if (!CurrentlySelected.Contains(LocName)){ 	//So that when same location is selected, it will not be added again into the array.
		CurrentlySelected.Add(LocName);
		mapMarker.PinMarker();
		mapMarker.UpdatePinNumber();
    }

    //After pushing to the array, the results will be displayed.
    if (CurrentlySelected.Count == 1) displayText.text = "Going to compare:\n1.) " + CurrentlySelected [0] + "\n(Select more locations from the drop down list above to compare.)";

    if (CurrentlySelected.Count > 1){
		displayText.text = "Going to compare:\n";

		for (var i : int = 0; i < CurrentlySelected.Count; i ++){

			displayText.text = displayText.text + (i+1) + ".) " + CurrentlySelected[i] + "\n";

		}

		displayText.text = displayText.text + "(Tap the 'Compare' button below or select more locations from the drop down list.)";

		compareButton.SetActive(true);
    }
}

