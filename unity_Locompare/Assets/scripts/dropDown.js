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

var markerPrefab : GameObject;
var markerButtons : List. <Button>;
var markerParent : GameObject;

//These two will be to display all selected locations on game screen.
var displayResults : GameObject;
private var displayText : Text;

//Compare button that will lead to the table view.
var compareButton : GameObject;

var offset1 : float;
var offset2 : float;

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
    }

    //After pushing to the array, the results will be displayed.
    if (CurrentlySelected.Count == 1) displayText.text = "Going to compare:\n " + CurrentlySelected [0] + "\n(Select more locations to compare.)";

    if (CurrentlySelected.Count > 1){
		displayText.text = "Going to compare:\n";

		for (var i : int = 0; i < CurrentlySelected.Count; i ++){

			displayText.text = displayText.text + CurrentlySelected[i] + "\n";

		}

		displayText.text = displayText.text + "(Tap the 'Compare' button below or select more locations.)";

		compareButton.SetActive(true);
    }
}

//Function to add marker on the map.
function PinMarker (){

	//Clone a marker from prefab
	var markerClone : GameObject;
	markerClone = Instantiate(markerPrefab, transform.position, transform.rotation);

	//Set the cloned marker as a child of the map, so that it will be panned and zoomed together.
	markerClone.transform.SetParent(markerParent.transform, false);


	//After tested on the editor, it is set that the size of the RectTransform is 46(width) and 30(height)
	var markerCloneRect : RectTransform;
	markerCloneRect = markerClone.GetComponent(RectTransform);
	//markerCloneRect.offsetMin.x = Random.Range(0.0, 365.0);
	markerCloneRect.offsetMin.x = offset1;
	markerCloneRect.offsetMax.y = offset2;
	//markerCloneRect.offsetMin.y = 408 - 46 - markerCloneRect.offsetMin.x;
	//markerCloneRect.offsetMax.y = Random.Range(0.0, 195.0);
	//markerCloneRect.offsetMax.x = 195 - markerCloneRect.offsetMax.y;
	markerCloneRect.offsetMax.x = 408 - 46 - markerCloneRect.offsetMin.x;
	markerCloneRect.offsetMin.y = 195 - markerCloneRect.offsetMax.y;

}