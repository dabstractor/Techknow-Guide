(function (){
	'use strict';

	console.log("first");

	var activeGuides = [];
	var port = chrome.runtime.connect({name: "techknow_onLoad"});
	console.log("Port Set");
	port.postMessage({request: "injected_guide_class"});
	console.log("Message: request Set");
	

	port.onMessage.addListener(function(msg) {
		console.log("Port On Message Happening");
		console.log("msg.response: ");
		console.log(msg.response);

		switch(msg.response){
			case "guides_injected_properly": 
				console.log("Congrats Guys!");
			break;

			case "start_guide" :

				if(typeof Guide == 'undefined'){
					// load guides.		
				}
				
				// try{
					activeGuides.push(new Guide());
					var newGuideIndex = activeGuides.length - 1;
					activeGuides[newGuideIndex].activeIndex = newGuideIndex;
					var selectedTour = JSONfn.parse(msg.guides);
					activeGuides[newGuideIndex].buildTour(selectedTour); // array of objects
					console.log(activeGuides[newGuideIndex]);
					activeGuides[newGuideIndex].getReadyToSee(0,0);
					// activeGuides[newGuideIndex].init();
				// } catch(e){
				// 	console.error(e);
				// }

				break;

			case "extension_clicked" : 
				
			default : 
				break;
		}

		if (msg.response == "guides_injected_properly"){


			// var tourGuider = []; // Empty Guide Stack
			// console.log(tourGuider);
			// guides.properlyCloseGuides();
			
			// var guidesPassed = JSONfn.parse(msg.guides); 

			// console.log(guidesPassed);

			// for (var i = 0; i <= guidesPassed.length - 1; i++) {	
			// 	tourGuider.push(guidesPassed[i]);
			// };

			// console.log(tourGuider);
			// guides.createCookie("guides.startGuide(0,1);");
			// guides.init(tourGuider);
		}


	});

	chrome.runtime.sendMessage({

		myStatus: "success"

	}); 

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
