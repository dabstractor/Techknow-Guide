(function (){
	'use strict';

	console.log("first");

	console.log(guides); 

	var port = chrome.runtime.connect({name: "knockknock"});
	port.postMessage({joke: "Knock knock"});
	port.onMessage.addListener(function(msg) {
		if (msg.question == "Who's there?"){
			port.postMessage({answer: "Madame"});
		}
		else if (msg.question == "Madame who?"){
			port.postMessage({answer: "Madame... Bovary"});
		}
		else if (msg.question == "I don't get it."){
			var tourGuider = [];
			console.log(tourGuider);
			guides.properlyCloseGuides();
			
			var guidesPassed = JSONfn.parse(msg.guides); 

			console.log(guidesPassed);

			for (var i = 0; i <= guidesPassed.length - 1; i++) {	
				tourGuider.push(guidesPassed[i]);
			};

			console.log(tourGuider);
			guides.createCookie("guides.startGuide(0,1);");
			guides.init(tourGuider);
		}
		else if (msg.question == "MUHAHAHAHAHA!"){
		}

	});

	if(typeof(guides) !== 'undefined'){
		chrome.runtime.sendMessage({

			myStatus: "success"

		}); 
	} else {
		chrome.runtime.sendMessage({

			myStatus: "No Go"

		}); 
	}

	// Connect to Channel (Choose "Controller"/"Action")
	// var port = chrome.runtime.connect({name: "operations"});

	// console.log("Hey Tyler!")

	// port.postMessage({question: "Knock knock"});
	
	// port.onMessage.addListener(function(msg) {

	// 	switch(msg.question){
			
	// 		case "Who's there?":
	// 			port.postMessage({answer: "Madame"});
	// 			console.log("Step 1 : Success");
	// 			break;

	// 		case "Madame who?": 
	// 			port.postMessage({answer: "Madame... Bovary"});
	// 			console.log("Step 2 : Success");
	// 			break;

	// 		case "I don't get it.": 
	// 			port.postMessage({answer: "thats cause you're stupid"});
	// 			console.log("Final Step Complete");
	// 			break;

	// 		default:
	// 			port.postMessage({answer: "thats cause you're stupid"});
	// 			console.log("Something Went Wrong");
	// 			break;
	// 	}
		
	// });


	




}());
