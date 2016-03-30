using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class sliderValue : MonoBehaviour {

	string sliderTextString = "0";
	public Text sliderText;

	void Start (){

		sliderText = gameObject.GetComponent<Text>();

		sliderText.text = sliderTextString + "%";

	}

	public void textUpdate (float textUpdateNumber)
	{
		sliderTextString = textUpdateNumber.ToString();
		sliderText.text = sliderTextString + "%";
	}
}
