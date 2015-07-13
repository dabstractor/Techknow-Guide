console.log("Guide Class : Starting Load Process");


function Guide(){

	this.guidecontainer = []; // this with as many guides as I want
	this.stepcontainer  = [];
	this.currentguide   = -1;
	this.currentstep    = -1;
	this.playing        = false;
	this.activeIndex;

} // This is the end of the Guides Class


///////////////////////// Management //////////////////////////

/************************ init ************************************
 * Function Type: Method
 * Objective    : Initiates tour process
 *******************************************************************/
 Guide.prototype.init = function(){
 	// A 
 	var cookieValue = this.getCookie();
 
 	// B
 	if(cookieValue != ""){ 
 		try{ 
 			eval(cookieValue); 
 		}catch(e){ }
 		this.deleteCookie();
 	}
 };

/************************ buildTour ***************************
 * Function Type: Method
 * Objective    : Builds the trip the user is about to set out on
 **************************  Parameters  ***************************
 * Retrieved as Arguments because there isnt a defined limit of guides passed
 *******************************************************************/
 Guide.prototype.buildTour = function(arrayOfGuideObjects){
 	// A 
 	var guides = arrayOfGuideObjects;
 	// B 
 	for (var i = 0; i <= guides.length - 1; i++) {
 		this.addGuide(guides[i]);
 	};
 };

/************************ getReadyToSee *************************
 * Function Type: Method
 * Objective    : Preps coordinates for next tour
 **************************  Parameters  ***************************
 * @param guideNum - Which guide index to point to
 * @param stepNum - Which step index to point to.
 *******************************************************************/
 Guide.prototype.getReadyToSee = function(guideNum, stepNum){
 	
 	// A
 	this.setCurrentGuide(guideNum);
 	this.setCurrentStep(stepNum);
 	this.setStepsFromCurrentGuide();
 
 	console.log(this);
 	// B
 	this.play();
 	// C
 
 
 	this.startTour();
 };

/************************ startTour **************************
 * Function Type: Method
 * Objective    : Starts the tour in motion
 *******************************************************************/
 Guide.prototype.startTour = function(){
 	this.render();
 	if(this.getCookie() !== '') this.deleteCookie();
 };

/************************ render ****************************
 * Function Type: Method
 * Objective    : Renders the current step.
 *******************************************************************/
 Guide.prototype.render = function(){
 
 	// // Input
 	var step 				 = this.getCurrentStepObj(); // Here
 
 	console.log(step);
 
 
 	console.log(this);
 
 	var referenceid 		 = step.refid;	
 	var title 				 = step.title;
 	var content 			 = step.content;
 	var DialogPosition 		 = (typeof(step.my)!='undefined') ? step.my : "left top";
 	var DivsLocation 		 = (typeof(step.at)!='undefined') ? step.at : "right bottom"; 
 	var Element2Highlight 	 = (typeof(step.highlightid)!='undefined') ? step.highlightid : referenceid; 
 	var removeNextButton 	 = (typeof(step.removeNextButton)!='undefined') ? step.removeNextButton : false;
 	var removePreviousButton = (typeof(step.removePreviousButton)!='undefined') ? step.removePreviousButton : false;
 	var removeFinishButton   = (typeof(step.removeFinishButton)!='undefined') ? step.removeFinishButton : false;
 	var hideNextButton 		 = (typeof(step.hideNextButton)!='undefined') ? true : false;
 	var hidePreviousButton   = (typeof(step.hidePreviousButton)!='undefined') ? true : false;
 	var hideFinishButton 	 = (typeof(step.hideFinishButton)!='undefined') ? true : false;
 	var setPosition 		 = (typeof(step.setPosition)==='undefined') ? "relative" : step.setPosition;
 	var dialogHeight 		 = (typeof(step.height)!='undefined') ? step.height: "auto";
 	var dialogWidth 		 = (typeof(step.width)!='undefined') ? step.width : 400;
 	var shiftTop 			 = (typeof(step.shiftTop)!='undefined') ? step.shiftTop : 0; 
 	var shiftLeft 			 = (typeof(step.shiftLeft)!='undefined') ? step.shiftLeft : 0;
 	var highlight 			 = (typeof(step.highlight)==='undefined') ? true : step.highlight;
 	var delayPaction 		 = (typeof(step.delayPaction)==='undefined') ? 0 : step.delayPaction;
 	var hasSecondArrow 		 = (typeof(step.secondArrow)!='undefined') ? step.secondArrow : false;
	 
 	// ICI
 	var DOMref 				 = jQuery(referenceid);	
 	var DOMhighlighted 		 = jQuery(Element2Highlight);
 	var scrollToElement 	 = (typeof(step.scrollToElement)==='undefined') ? DOMref : step.scrollToElement;
 	var DOMscroll 			 = jQuery(scrollToElement);
 	var buttons 			 = this.getStepButtons();
 	var elementHeight;
 
 	// Work Stage
 	this.setRenderStage();
 
 	if(highlight){
 		this.highlight(DOMhighlighted, highlight, setPosition);
 	}
 
 	jQuery('<div id="tempstep">' 
 				+ '<div id="close-button"></div>'
 				+ content
 				+ '<div id="guides_response_message"></div>'
 				+ '<div id="buttons"></div>'
 		  +'</div>'
 	).dialog({
 		modal:true,
 		dialogClass: "techknow",
 		autoOpen:true,
 		title: title,
 		draggable: false,
 		resizable: false,
 		width: dialogWidth, 
 		height: dialogHeight, 
 		position: { my: DialogPosition, at: DivsLocation, of: DOMref, collision: "none" },
 		open: function() {
 
 
 			// Loop through buttons and make them do shit.
 			_.each(buttons, function(i, key){
 
 			})
 
 
 
 			try{ 
 
 				var onOpen = this.getCurrentStepObj().onOpen;
 				eval(onOpen()); 
 
 			}catch(e){ }
 
 			jQuery(document).keyup(function(e){
 
 				if(e.keyCode == 27){
 
 					this.properlyCloseGuides(DOMhighlighted);
 				}
 
 			});
 
 			jQuery('#close-button').click(function(){
 
 				this.properlyCloseGuides(DOMhighlighted);
 			});
 
 			jQuery(document).live("onchange",function(e){       
 
 				this.properlyCloseGuides(DOMhighlighted);
 			});
 render
 		},
 		close:function(){	
 			this.deleteCookie(); 
 			jQuery(this).dialog('destroy');
 			jQuery(this).remove();	
 		} 
 
 	});
 
 
 	// jQuery('#tempstep').parent().attr("id","dialogBox");
 	// //jQuery('.button-style').parent().attr("id","techknow_buttonset");	
	 
 	// var positionBelowHighlight = 8999;
	 
 	// jQuery(".ui-widget-overlay").css('z-index', positionBelowHighlight);
 
 
 	// jQuery("#dialogBox").append("<div id='arrow'></div>");
	 
 	// if(hasSecondArrow != false){
 
 	// 	jQuery("#arrow").after('<div id=\"arrow_two\"></div>');
 
 	// 	jQuery("#arrow_two").addClass(hasSecondArrow);
 
 	// }
 
 	// elementHeight = jQuery('#dialogBox').height();	
	 
 	// guides.slideTo(DOMscroll, DialogPosition, elementHeight);
	 
	 
	 
	 
	 
 	// switch(DialogPosition){
 	// 	case "left top": 		jQuery('#arrow').addClass('techknow_lefttop'); break;
 	// 	case "center top": 		jQuery('#arrow').addClass('techknow_centertop'); break;
 	// 	case "right top": 		jQuery('#arrow').addClass('techknow_righttop'); break;
 	// 	case "right center": 	jQuery('#arrow').addClass('techknow_rightcenter'); break;
 	// 	case "left center": 	jQuery('#arrow').addClass('techknow_leftcenter'); break;
 	// 	case "left bottom": 	jQuery('#arrow').addClass('techknow_leftbottom'); break;
 	// 	case "center bottom": 	jQuery('#arrow').addClass('techknow_centerbottom'); break;
 	// 	case "right bottom": 	jQuery('#arrow').addClass('techknow_rightbottom'); break;
 	// }
	 
 	// // E
 	// switch(DivsLocation){
 	// 	case "left top": jQuery('#dialogBox').addClass('topdialog'); break;
 	// 	case "right top": jQuery('#dialogBox').addClass('topdialog'); break;
 	// }
	 
 	// // F		
 	// if(typeof(shiftTop)!== "undefined"){
 	// 	guides.shiftVertical(shiftTop);
 	// }
 
 	// if(typeof(shiftLeft)!== "undefined"){
 	// 	guides.shiftHorizontal(shiftLeft);	
 	// }
 
	 
      
 };


///////////////////////// Process Managers //////////////////////////


/************************ Safety Modules **********************
 *
 *	Type : Functions | Helpers
 *
 *	Objective : Functions for improving product integrity
 * -------------------------------------------------------
 *
 *	
 *
 *
 ************************************************/
 Guide.prototype.resetTour = function(){
	this.guidecontainer  = [];
	this.stepcontainer   = []; 
	this.currentguide    = 0;
	this.currentstep     = 0;
	this.playing         = false;
 }

/************************ Form Interactions *************************  
 *
 *  Function types : Functions that affect user's DOM
 *
 *************** Setters **************
 * 
 * enableEntireForm() 
 *	- Enables the form being highlighted by the guide.
 *
 * disableEntireForm() 			  
 *	- Disables the form being highlighted by the guide.
 *
 * enableFormElement() 
 *	- Enables a single form element.
 *
 * disableFormElement() 
 *	- Disables a single form element.
 *
 ******************************************************************/

 Guide.prototype.enableEntireForm = function( form ){
     jQuery(form).find(":input").each(function(){
 		jQuery(this).removeAttr("disabled");
 	});  
 };
 
 Guide.prototype.disableEntireForm = function( form ){
 	jQuery(form).find(":input").each(function(){
 		jQuery(this).attr("disabled", "disabled");
 	});
 };
 
 Guide.prototype.enableFormElement = function( form ){
     jQuery(element).removeAttr("disabled");
 };
 
 Guide.prototype.disableFormElement = function( form ){
 	jQuery(element).attr("disabled", "disabled");	     
 };

/************************ Precaution Functions *********************  
 *
 *  Function types : Clean up functions that help prevent errors
 *
 ***************************************************************
 * 
 * setRenderStage() 
 *	- Deletes any steps that may still remain in users DOM
 *  - Pause the guides, renders goin down...
 *
 ******************************************************************/

 Guide.prototype.setRenderStage = function(){
    jQuery('#dialogBox, #tempstep').remove();
 	this.pause(); 
 };

/************************ Animations ***************************  
 *
 *  Animations in the users DOM
 *
 ***************************************************************
 * 
 * slideTo() 
 *	- slides the viewport to the top of the selected element.
 * 
 * shiftVertical() 
 *	- shifts the rendered step along the vertical axis
 * 
 * shiftHorizontal() 
 *	- shifts the rendered step along the horizontal axis
 *
 *
 ******************************************************************/

 
 Guide.prototype.slideTo = function(id, dialogPosition, elementHeight){
 	try{
 		jQuery('html,body').animate({ scrollTop: id.offset().top }, 600);	
 	}catch(e){ }
 };
 
 Guide.prototype.shiftVertical = function(distance){
 	var positive = false;
 	var negative = false;
 
 	if(distance > 0){
 		positive = true;
 	} else {
 		negative = true;
 		var distance = distance * (-1);
 	}
 
 	var plusCurrent = "+=";
 	var minusCurrent = "-=";
 	var distance = distance.toString();
 
 
 	if(positive){
 		var combinedInput = plusCurrent + distance;
 
 		jQuery('#dialogBox').animate({top: combinedInput}, 0);
 	} else {
 
 		var combinedInput = minusCurrent + distance;
 
 		jQuery('#dialogBox').animate({top: combinedInput}, 0);	
 	}    
 };
 
 Guide.prototype.shiftHorizontal = function (distance){
 
 	var positive = false;
 	var negative = false;
 
 	if(distance > 0){
 		positive = true;
 	} else {
 		negative = true;
 		var distance = distance * (-1);
 	}
 
 	var plusCurrent = "+=";
 	var minusCurrent = "-=";
 	var distance = distance.toString();
 
 	if(positive){
 		var combinedInput = plusCurrent + distance;
 
 		jQuery('#dialogBox').animate({left: combinedInput}, 0);
 	} else {
 		var combinedInput = minusCurrent + distance;
 
 		jQuery('#dialogBox').animate({left: combinedInput}, 0);
 	}
 };

/************************ Cookies *******************************  
 *
 *  Controls the setup and teardown of cookies created by Techknow Guides
 *
 ****************************************************************
 * 
 * encode() 
 *	- encodes the cookie value into a base64 hash
 * 
 * decode() 
 *	- decodes the base 64 hase to get the cookies value
 *
 ******************************************************************/


 Guide.prototype.setCookie = function(cookie){
 	var name = "techknow";
 	var value = this.encode(cookie);
 	var today = new Date();
 	var expire = new Date();
 	expire.setTime(today.getTime() + 3600000*24*1)
 	var expireDate = expire.toGMTString();
 
 	document.cookie = name + "=" + value + ";expires=" + expireDate;
 };
 
 Guide.prototype.getCookie = function(){
 	var re = new RegExp('[; ]techknow=([^\\s;]*)');
 	var sMatch = (' '+document.cookie).match(re);
 	if (sMatch) return this.decode(sMatch[1]);
 	return '';
 };
 
 Guide.prototype.deleteCookie = function(){
 	document.cookie = 'techknow=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
 };
 
 Guide.prototype.encode = function( str ){
    try{
 		var string = window.btoa(unescape(encodeURIComponent( str )));
 		return string;
 	}catch(e){
 		return '';	
 	} 
 };
 
 Guide.prototype.decode = function( str ){
 	try{
 		var string = decodeURIComponent(escape(window.atob( str )));
 		return string;
 	}catch(e){
 		return '';	
 	}      
 };

/************************ Highlight *******************************  
 *
 *  Controls highlighting operations of the system
 *
 ****************************************************************
 * 
 * highlight() 
 *	- Really? You need this explained?
 * 
 * toggleHighlight() 
 *	- Really? You need this explained?
 * 
 * addHighlight() 
 *	- Really? You need this explained?
 * 
 * removeHighlight() 
 *	- encodes the cookie value into a base64 hash
 *
 ******************************************************************/
 
 Guide.prototype.highlight = function(referenceid, highlight, position){
 	if(typeof(position) != "undefined"){
 		var position = position.toString();
 		referenceid.css("position", position);
 	}
 
 	if(highlight){
 		referenceid.addClass('techknow_highlight');
 	} else {
 		referenceid.css("position", "");
 		referenceid.removeClass('techknow_highlight');
 	}
 };
 
 Guide.prototype.toggleHighlight = function(referenceid, position){
 	var referenceid = referenceid || "j";
 	
 	if(highlight){
 		referenceid.addClass('techknow_highlight');
 	} else {
 		referenceid.css("position", "");
 		referenceid.removeClass('techknow_highlight');
 	}
 };
 
 Guide.prototype.addHighlight = function(ref) {
 	jQuery(ref).addClass("techknow-highlight");
 };
 
 Guide.prototype.removeHighlight = function(ref) {
 	jQuery(ref).removeClass("techknow-highlight");
 };

/************************ getStepButtons *******************************  
 *
 *  Controls highlighting operations of the system
 *
 ****************************************************************
 * 
 * getStepButtons() 
 *	- Logically attaches buttons to the guide steps.

 ******************************************************************/

 Guide.prototype.getStepButtons = function(){
     
 	var buttons = [];

 	if(this.userAction === false) {

 		if(this.stepNeedsContinueButton())
 			button.push(this.renderContinueButton());
 		if(this.stepNeedsNextButton())
 			button.push(this.renderNextButton());
 		if(this.stepNeedsBackButton())
 			button.push(this.renderBackButton());
 		if(this.stepNeedsFinishButton())
 			button.push(this.renderFinishButton());
	} 

	return buttons;

 };

/************************ Highlight *******************************  
 *
 *  Controls highlighting operations of the system
 *
 ****************************************************************
 * 
 * pause() 
 *	- Pauses the guide system
 * 
 * play() 
 *	- Plays the guide system
 * 
 * returnPlaying() 
 *	- Gets the current state of playing for requesting object.
 * 
 ******************************************************************/
 Guide.prototype.pause = function(){
 	this.playing = false;
 };
 
 Guide.prototype.play = function(){
 	this.playing = true;
 };
 
 Guide.prototype.returnPlaying = function(){
 	return this.playing;
 };

/************************ qwe *******************/
	

 Guide.prototype.buildEvent = function(obj){
 
 	var selector 	 = obj.selector 	|| "body";
 	var eventType 	 = obj.eventType 	|| 0;
 	var eventTrigger = obj.eventTrigger || "click";
 	var guideNum 	 = obj.guideNum 	|| 0;
 	var stepNum		 = obj.stepNum		|| 0;
 
 	switch(eventType){
 		case 1: var callback = guides.bindStartGuideEvent(guideNum, stepNum); break;
 		default: break;
 	}
 
 	// jQuery(selector).listen(eventTrigger+".techknow", callback());
 
 };

 Guide.prototype.unbindListenEvent = function(obj){
 
 };
 
 Guide.prototype.bindStartGuideEvent = function(guideNum, stepNum){
 	return function(){
 		guides.createCookie("guides.startGuide(\""+guideNum + "," + stepNum+"\");");
 		guides.init();
 		//here 
 	};
 };


///////////////////////// Workers //////////////////////////


/************************ Setters *************************  
 *
 *  Function types : Setters & Getters
 *
 *************** Setters **************
 * 
 * addGuide() 			  
 *	- Adds a guide to the requesting object's guide stack (guidecontainer)
 * 
 * resetGuidesContainer() 
 *	- Resets the guide stack for the requesting object
 *
 * setCurrentGuide() 
 *	- sets the current guide property of the requesting object to the value passed 
 *
 * resetCurrentGuide() 
 *	- Resets the current guide property of the requesting object
 *
 *************** Getters **************
 *
 * returnGuides() 
 *	- Returns the current contents of guidecontainer for the requesting object
 *
 * returnCurrentGuide() 
 *	- Returns the currentGuide property for the requesting object
 *
 * returnCurrentGuideObj() 
 *	- Returns the current guide object

 ******************************************************************/

  /*************** Setters **************/

 // : COMPARE B
 
 Guide.prototype.addGuide = function(guide){
 	this.guidecontainer.push(guide);
 };

 Guide.prototype.addSteps = function(){
 	var lastElement = this.stepcontainer.length;
 	var numberOfSteps = arguments.length -1;
 	for(var i = 0; i <= numberOfSteps; i++){ 
 		this.stepcontainer[lastElement + i] = arguments[i];
 	}
 };

 Guide.prototype.setStepsFromCurrentGuide = function(){
 	this.stepcontainer = this.guidecontainer[this.currentguide].steps;
 };
 
 Guide.prototype.setCurrentStep = function(stepNum){
 	this.currentstep = (typeof stepNum != "undefined") ? stepNum : -1;
 };
 
 Guide.prototype.incrementCurrentStep = function(){
 	this.currentstep += 1;
 };
 
 Guide.prototype.decrementCurrentStep = function(){
 	this.currentstep -= 1;
 };
 
 Guide.prototype.resetGuidesContainer = function(){
 	this.guidecontainer = [];
 };
 
 Guide.prototype.resetGuidesContainer = function(){
 	this.guidecontainer = [];
 };
 
 Guide.prototype.setCurrentGuide = function(guideNum){
 	this.currentguide = (typeof guideNum != "undefined") ? guideNum : -1;
 };
 
 Guide.prototype.resetCurrentGuide = function(){
 	this.currentguide = -1;
 };

/************************ Getters *************************  
 *
 *  Function types : Setters & Getters
 *
 *************** Setters **************
 * 
 * addSteps() 			  
 *	- Adds the to the requesting object's guide stack (guidecontainer)
 * 
 * resetGuidesContainer() 
 *	- Resets the guide stack for the requesting object
 *
 *************** Getters **************
 *
 * returnGuides() 
 *	- Returns the current guide stack for the requesting object
 *
 * returnCurrentGuideIndex() 
 *	- Returns the current guide stack for the requesting object
 *
 * returnCurrentGuide() 
 *	- Returns the current guide stack for the requesting object

 ******************************************************************/
 Guide.prototype.getGuides = function(){
	return this.guidecontainer;
 };

 Guide.prototype.getSteps = function(){
 	return this.stepcontainer;
 };

 Guide.prototype.getCurrentGuide = function(){
     return this.currentguide;
 };
 
 Guide.prototype.getCurrentStep = function(){
     return this.currentstep;
 };		
 
 Guide.prototype.getCurrentGuideObj = function(){
    return this.guidecontainer[this.currentguide];
 };	

 Guide.prototype.getCurrentStepObj = function(){
     return this.stepcontainer[this.currentstep];
 };

/************************ Comparitives *******************************  
 *
 *  Controls highlighting operations of the system
 *
 ****************************************************************
 * 
 * getStepButtons() 
 *	- Logically attaches buttons to the guide steps.

 ******************************************************************/


 /**************************** Guide Type Check ************************************
 * Type 	 : function | helper
 *
 * Objective : Checks if current guide is a __ ? 
 *
 ***********************************************************************/
 Guide.prototype.currentGuideIsA = function(type) {
 	return (this.getCurrentGuideObj().guideType === type);
 };

 Guide.prototype.currentGuideIsTypeOnStep = function(type,stepNum) {
 	return (this.currentGuideIsA(type) && this.isOnStep(stepNum))
 };

 /**************************** Step Checks ************************************
 * Type 	 : function | helper
 *
 * Objective : compares current step with @param passed
 *
 ***********************************************************************/

 Guide.prototype.isBeforeStep = function(stepNum) {
 	return this.getCurrentStep() < stepNum;
 };

 Guide.prototype.isOnStep = function( stepNum ){
 	return (this.getCurrentStep() === stepNum);
 };

 Guide.prototype.isPastStep = function(stepNum) {
 	return this.getCurrentStep() > stepNum;
 };

 /**************************** Playing Check ************************************
 * Type 	 : function | helper
 *
 * Objective : checks if the current guide is playing or paused
 *
 ***********************************************************************/

 Guide.prototype.isPlaying = Guide.prototype.getPlaying;

 Guide.prototype.guideIsPaused = function() {
 	return this.isPlaying() == "false";
 };


 Guide.prototype.renderFinishButton = function() {
	return {
		text: "Finish", 
		class: 'guide_fin button-style',
		click: function() {

			if (highlight) {
				this.highlight(DOMhighlighted, false);
			}
			
			if(this.guideIsPaused()){	
				try{ 
					var faction = this.getCurrentStepObj().faction;
					eval(faction()); 
				}catch(e){ }
				this.incrementCurrentStep();
			}

			jQuery(this).dialog('destroy').remove();
			this.properlyCloseGuides();  

		},
		open: function() {

			if(hideFinishButton){

				jQuery(this).fadeTo(0,0)
				.attr("disabled","disabled")
				.css("cursor", "default");

			}

		},
		
	}
 };

 Guide.prototype.renderNextButton = function() {

	return {
		text: "Next", 
		id: 'next_button',
		class: 'guide_next button-style',
		click: function() {

			if (highlight) {
				guides.highlight(DOMhighlighted, false);
			}

			if(!guides.playing){	
				try{ 
					var faction = guides.stepcontainer[guides.currentstep].faction;
					eval(faction()); 
				}catch(e){ }
				guides.currentstep = guides.currentstep + 1;
			}

			guides.play();
			guides.next(guides.currentstep);	

		},
		open: function() {


			if(hideNextButton){

				jQuery(this).fadeTo(0,0)
				.attr("disabled","disabled")
				.css("cursor", "default");

			}

		},
	}
 };


 Guide.prototype.renderContinueButton = function() {
 	return {
 		text: "Continue Tour", 
 		id: 'next_button',
 		class: 'guide_prev button-style',
 		click: function() {
 
 			if (highlight) {
 				this.highlight(DOMhighlighted, false);
 			}
 
 			if(!this.isPlaying()){	
 				try{ 
 					var faction = this.getCurrentStepObj().faction;
 					eval(faction()); 
 				}catch(e){ }
 				this.incrementCurrentStep();
 			}
 
 			this.play();
 			this.next(this.getCurrentStepObj());	
 		},
 		open: function() {},
 	}
 };
 
 
 Guide.prototype.renderBackButton = function() {
 	return {
 		text: "Back", 
 		id: 'back_button',
 		class: 'guide_back button-style',
 		click: function() {
 
 
 		if (highlight) {
 			this.highlight(DOMhighlighted, false);
 		}
 
 		if(!this.isPlaying()){	
 			try{ 
 				var paction = this.getCurrentStepObj().paction;
 				eval(paction()); 
 			}catch(e){ }
 
 			this.decrementCurrentStep();
 		}
 
 
 		if(delayPaction != 0){
 
 			jQuery('#dialogBox, #tempstep').remove();
 
 			setTimeout(function() {
 
 				this.play();
 				this.render();
 						// this.previous(this.getCurrentStep());   
 
 				}, delayPaction);
 
 		} else {
 			this.play();
 			this.render();
 					// this.previous(this.getCurrentStep());
 
 			}
 
 		},
 		open: function() {
 
 			if(hidePreviousButton){
 
 				jQuery(this).fadeTo(0,0)
 				.attr("disabled","disabled")
 				.css("cursor", "default");
 			}
 		},
 	}
 };

/************************ Ownerships *******************************  
 *
 *  Controls highlighting operations of the system
 *
 ****************************************************************
 * 
 * getStepButtons() 
 *	- Logically attaches buttons to the guide steps.

 ******************************************************************/

 Guide.prototype.stepNeedsNextButton = function() {
 	return ( this.isPastStep(-1) && this.hasNextStep() && !removeNextButton && !this.currentGuideIsTypeOnStep("tour",0) );
 };

 Guide.prototype.stepNeedsPreviousButton = function() {
 	return (this.isPastStep(0) && this.hasCurrentStep() && !removePreviousButton);
 };
 
 Guide.prototype.stepNeedsFinishButton = function() {
 	return (this.isPastStep(0) && !this.hasNextStep() && !removeFinishButton);
 };

 Guide.prototype.stepNeedsContinueButton = function() {
	return (this.currentGuideIsTypeOnStep("tour",0) && this.hasNextStep()); 
 };


 Guide.prototype.hasStep = function(stepNum) {
 	return (typeof this.stepcontainer[stepNum] !== 'undefined');
 };

 Guide.prototype.hasCurrentStep = function() {
 	return this.hasStep(this.getCurrentStep());
 };

 Guide.prototype.hasNextStep = function() {
 	return this.hasStep(this.getCurrentStep() + 1);
 };

