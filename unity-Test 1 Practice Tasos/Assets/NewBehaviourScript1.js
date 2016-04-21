#pragma strict
import UnityEngine.UI;

var DisplayText:Text;

function Start () {

DisplayText=GetComponent(UI.Text);

}

function Update () {

}

function SayHello(){

DisplayText.text="hello";

}