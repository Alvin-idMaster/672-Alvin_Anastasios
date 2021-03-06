﻿#pragma strict

import UnityEngine.SceneManagement;

var loaderTimer : float;

var currentScene : String;

function Start () {

	loaderTimer = 0;

	currentScene = SceneManager.GetActiveScene().name;
}

function Update () {

	if (Input.deviceOrientation == DeviceOrientation.Portrait || Input.deviceOrientation == DeviceOrientation.PortraitUpsideDown){

		//if(currentScene == "tableView_portrait") loaderTimer = 0;

		if(currentScene == "mapView_landscape") SceneManager.LoadScene("tableView_portrait"); //loaderTimer += Time.deltaTime * 1;

	}

	if (Input.deviceOrientation == DeviceOrientation.LandscapeRight || Input.deviceOrientation == DeviceOrientation.LandscapeLeft){

		if(currentScene == "tableView_portrait") SceneManager.LoadScene("mapView_landscape"); //loaderTimer += Time.deltaTime * 1;

		//if(currentScene == "mapView_landscape") loaderTimer = 0;

	}

	if (loaderTimer >= 3){

		if(currentScene == "tableView_portrait") SceneManager.LoadScene("mapView_landscape");

		if(currentScene == "mapView_landscape") SceneManager.LoadScene("tableView_portrait");

	}

	//Debug.Log(loaderTimer);
}