function  gatherGuideMap(){



}

(function(){

	'use strict';

	var backgroundPage = chrome.extension.getBackgroundPage();

	var doc = document.getElementById("map-holder");

	doc.querySelector("li").addEventListener("click", function(){
		backgroundPage.handleButtonClick();
	});

}());



function applyLiHoverEffect(){

	var node = document.getElementById("map-guides");

	console.log(node);

	//	object.addEventListener("mouseover", myScript);

}




var selector = document.getElementById("map-guides");

console.log(selector.attributes);

var list = selector.getElementsByTagName("ul");
var listItems = list[0].children;

console.log(listItems);

for( var i = 0; i <= listItems.length - 1; i++){

	console.log( listItems[i].style );

}






