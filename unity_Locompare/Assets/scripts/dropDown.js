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

var displayFood : GameObject;
private var foodText : Text;
var foodData : List.<String>;

var displayCost : GameObject;
private var costText : Text;
var costData : List.<int>;

var displayWeather : GameObject;
private var weatText : Text;
var weatDataMin : List.<int>;
var weatDataMax : List.<int>;

var mapMarker : mapMarker;

function Start () {

	//The next 3 lines are to set the drop down list to say "Select a location ..."
	//or else it will be showing the default selected option.
	SelectedLocation = LocationPickerLabel.GetComponent(UI.Text);
	LocName = SelectedLocation.text;
	SelectedLocation.text = "Select a location ...";

	displayText = displayResults.GetComponent(Text);	//Assigning variable to the Text component.

	displayText.text = "Welcome to LOCOMPARE!\nPlease select at least two locations from the drop down list above.\n\nRotate your device landscape, to compare a country with the rest of the world.";

	foodText = displayFood.GetComponent(Text);

	foodText.text = " ";

	costText = displayCost.GetComponent(Text);

	costText.text = " ";

	weatText = displayWeather.GetComponent(Text);

	weatText.text = " ";

	for (var cost : int = 0; cost < costData.Count; cost ++){

		costData[cost] = Random.Range(300, 1500);
		weatDataMin[cost] = Random.Range(-20, 10);
		weatDataMax[cost] = Random.Range(11, 40);

	}

	displayRect = displayResults.GetComponent(RectTransform);
}

function Update () {
	Debug.Log(displayRect.offsetMax);
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
    DisplayFood();
    DisplayCost();
    DisplayWeather();
}

function RemoveLocation (markerId : int){

	CurrentlySelected.RemoveAt(markerId);

	if (CurrentlySelected.Count == 0){

		SelectedLocation.text = "Select a location ...";

		displayRect.offsetMax.x = 10;
    	displayRect.offsetMin.x = 10;

    	displayText.text = "Welcome to LOCOMPARE!\nPlease select at least two locations from the drop down list above.\n\nRotate your device landscape, to compare a country with the rest of the world.";
    	foodText.text = " ";
		costText.text = " ";
		weatText.text = " ";
	}

	if (CurrentlySelected.Count > 0){
		DisplayComparisons();
		DisplayFood();
		DisplayCost();
		DisplayWeather();
	}
}

function DisplayComparisons (){

    if (CurrentlySelected.Count == 1) displayText.text = "Going to compare:\n1.) " + CurrentlySelected [0] + "\n\nSelect more locations from the drop down list above to start comparing.\n\nDouble tap the pin on the map to delete selected location.\nRotate your device landscape to compare a country with the rest of the world.";

    if (CurrentlySelected.Count > 1){
		displayText.text = "Comparing:\n";

		for (var i : int = 0; i < CurrentlySelected.Count; i ++){

			displayText.text = displayText.text + (i+1) + ".| " + CurrentlySelected[i] + "\n----------------------------------------------------------------------------------------------------------------\n";

		}

		displayText.text = displayText.text + "\nYou can still select more locations from the drop down list.\n\nDouble tap a pin on the map to delete a selected location.\nRotate your device landscape to compare a country with the rest of the world.\n\n";
    }

    if (CurrentlySelected.Count == 0){
    	displayRect.offsetMax.x = 10;
    	displayRect.offsetMin.x = 10;
    }

    if (CurrentlySelected.Count > 0) {
    	displayRect.offsetMax.x = 210;
    	displayRect.offsetMin.x = 10;
    }
}

function DisplayFood (){

	foodText.text = "Food\n";

	for (var fplus : int = 1; fplus < CurrentlySelected.Count + 1; fplus ++){

			foodText.text = foodText.text + foodData[fplus%10] + "\n\n";

		}
}

function DisplayCost (){

	costText.text = "Avg. Cost (US$)\n";

	for (var c : int = 1; c < CurrentlySelected.Count + 1; c ++){

		costText.text = costText.text + costData[c%10] + " /mth\n\n";

	}
}

function DisplayWeather (){

	weatText.text = "Weather (°C)\n";

	for (var w : int = 1; w < CurrentlySelected.Count + 1; w ++){

		weatText.text = weatText.text + weatDataMin[w%10] + " to " + weatDataMax[w%10] + "\n\n";

	}
}