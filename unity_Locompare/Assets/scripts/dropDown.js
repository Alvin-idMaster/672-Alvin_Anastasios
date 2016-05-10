#pragma strict
//This is a line to include Unity UI library like buttons, images, scrolling rectangle as well as the main dropdown list.
import UnityEngine.UI;

//This is to add Microsoft List. It is a more powerful tool to deal with arrays.
import System.Collections.Generic;

//Declaring variables.
var LocationPickerLabel : GameObject; 			//To manipulate the texts inside the drop down list.
private var SelectedLocation : Text;			//Private variable to store the name of a selected location. This needs to be declared as Unity Text and String are two different variable types.
var LocName : String;							//This will be where the string of a selected location is stored.

var CurrentlySelected : List.< String >;		//The array variable to store all locations that have been selected throughout.

//These two will be to display all selected locations on game screen.
var displayResults : GameObject;
private var displayRect : RectTransform;
private var displayText : Text;

var mapMarker : mapMarker;

function Start () {

	//The next 3 lines are to set the drop down list to say "Select a location ..."
	//or else it will be showing the default selected option.
	SelectedLocation = LocationPickerLabel.GetComponent(UI.Text);
	LocName = SelectedLocation.text;
	SelectedLocation.text = "Select a location ...";

	displayText = displayResults.GetComponent(Text);	//Assigning variable to the Text component.

	displayText.text = "Welcome to LOCOMPARE!\nPlease select at least two locations from the drop down list above.";

	displayRect = displayResults.GetComponent(RectTransform);
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

   	SelectedLocation.text = "Select more location ...";

    //After pushing to the array, the results will be displayed.
    DisplayComparisons();

}

function RemoveLocation (markerId : int){

	CurrentlySelected.RemoveAt(markerId);

	if (CurrentlySelected.Count == 0) SelectedLocation.text = "Select a location ...";

	DisplayComparisons();

	//if (CurrentlySelected.Count <= 8) displayRect.offsetMin.y = -3;

}

function DisplayComparisons (){

    if (CurrentlySelected.Count == 1) displayText.text = "Going to compare:\n1.) " + CurrentlySelected [0] + "\n\n(Select more locations from the drop down list above to start comparing.)";

    if (CurrentlySelected.Count > 1){
		displayText.text = "Comparing:\n";

		for (var i : int = 0; i < CurrentlySelected.Count; i ++){

			displayText.text = displayText.text + (i+1) + ".| " + CurrentlySelected[i] + "\n----------------------------------------------------------------------------\n";

		}

		displayText.text = displayText.text + "\nYou can still select more locations from the drop down list.";
    }

    //if (CurrentlySelected.Count > 8) displayRect.offsetMin.y -= 40;

}
