#pragma strict
import UnityEngine.UI;

var output : GameObject;
var counterText : Text;
var counterValue : float;

function Start () {

}

function Update () {

    counterText.text = counterValue.ToString("F0");

    if (counterValue <= 1) output.SetActive (false);

    else output.SetActive (true);
    
    counterValue -= Time.deltaTime;
}



function ResetCounter() {
    counterValue = 10;
}

function WaitAndReduce() {

    //yield WaitForSeconds(1);
    //counterValue -= 1 * Time.deltaTime;
}