#pragma strict

import UnityEngine.UI;

import System.Collections.Generic;

var activeColor : Color;
var passiveColor : Color;

private var lastIndex : int;
private var nextIndex : int;

var mapImages : List.<Sprite>;
var mapImage : Image;

var otherButtons : GameObject[];

function Start () {

	nextIndex = Random.Range(1, 4);

}

function Update () {

	if (nextIndex == lastIndex) nextIndex = Random.Range(0, 4);

}

function SelectFactor (){

	otherButtons = GameObject.FindGameObjectsWithTag("FactorButton");

	for (var otherButton : GameObject in otherButtons){

		otherButton.GetComponent(Button).colors.normalColor = passiveColor;
		otherButton.GetComponent(Button).colors.highlightedColor = passiveColor;

	}

	GetComponent(Button).colors.normalColor = activeColor;
	GetComponent(Button).colors.highlightedColor = activeColor;

	mapImage.sprite = mapImages[nextIndex];

	lastIndex = nextIndex;
}