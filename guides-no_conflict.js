console.log("hello");


var guides = {

	playing:false,
	guidecontainer:[],
	currentguide:-1,
	stepcontainer:[],
	currentstep:-1,
	factionCookie:[],


	init:function(guide){

		if(typeof guide != "undefined"){
		guides.guidecontainer = guide;
		}

		var container = guides.guidecontainer;
		var cookieValue = guides.readCookie();

		console.log(cookieValue)

		try{ 
			if(cookieValue != ""){ 

				eval(cookieValue); 
				guides.deleteCookie();

			}
		}catch(e){ }

	},

	startGuide: function(guideNum, stepNum){

		console.log("Firing");

		console.log(guides);
		console.log(guides.guidecontainer);

		if(typeof(guideNum)!='undefined'){
			guides.currentguide = guideNum;
		}
		
		guides.stepcontainer = guides.guidecontainer[guides.currentguide].steps;	
		guides.play();

		if(typeof(stepNum)!='undefined'){
			guides.currentstep = stepNum;
			guides.next(stepNum);
		} else {
			guides.currentstep = 0;
			guides.next(0);
		}

	},

	renderGuideMap: function(){


		jQuery('#startstep').dialog('close');

		var content = guides.guidecontainer;		

		var dialogContent = "<ul id=\"guides_list\" class=\"techknow_guidetitle\">";

		content.forEach(function (element, index, val){

			if(typeof(element.guideType) != "undefined" && element.guideType == "tour"){

				dialogContent += "<li id="+element.title+">" + element.title + "</li>";

			}

		});

		dialogContent += "</ul>";

		dynamicTitle = guides.guidecontainer[0].title;
		
		jQuery ('<div id="startstep"><div id="close-button"></div>' + dialogContent + '</div>').dialog({
			modal:true,
			autoOpen:true,
			dialogClass:'techknow',
			title : dynamicTitle,
			width:400,
			height:'auto',
			draggable: false,
			resizable: false,
			open: function() {
				jQuery('#close-button, #guides_list li').click(function(){ 
					jQuery('#startstep').dialog('destroy');
					jQuery('#startstep').remove();			
				});
			},
			close:function(){
				jQuery(this).dialog('destroy');
				jQuery(this).remove();
			}
		});


		jQuery('#startstep').parent().attr('id', 'dialogBox');
		jQuery("<hr style=\"margin-bottom:0%; margin-top:0%; width:95%;\" />").after("#dialogBox div:nth-of-type(1)");

		var positionBelowHighlight = 8999;
		jQuery(".ui-widget-overlay").css('z-index', positionBelowHighlight);

	},


	createTriggerEvents: function(){

		var func_to_run = function (){

			jQuery("#guides_list li").each(function(){

				var id = jQuery(this).attr('id');

				jQuery(this).one('click', function(){

					jQuery("body").trigger(id);

				});

			});

		}

		guides.onceElementExists("#startstep", func_to_run);

	},



	bindBodyEvent: function(guide, namespace){

		var thisNamespace = namespace;
		var args = func_get_args();

		console.log(thisNamespace);

		jQuery("body").bind(thisNamespace, function(){

			guide = [];
         //guides.properlyCloseGuides();

         args.forEach(function(element, index, val){

         	if(index > 1){

         		console.log("pushing: " + element + " to tourGuider");
         		tourGuider.push(element);

         	}

         });
         

         guides.createCookie("guides.startGuide(0,0);");
         guides.init(guide);

     });

	},


	next:function(){
		guides.render();
		if(guides.readCookie()=='') guides.deleteCookie();

	},

	previous:function(){
		guides.next(guides.currentstep);
	},

	pause:function(){
		guides.playing=false;	
	},

	play:function(){
		guides.playing=true;
	},


	highlight:function(referenceid, highlight, position){

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
	},

	slideTo : function(id, dialogPosition, elementHeight){

		try{
			jQuery('html,body').animate({ scrollTop: id.offset().top }, 600);	
		}catch(e){ }

	},

	shiftVertical: function (distance){

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
	},

	shiftHorizontal : function (distance){

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
	},

	removeHighlight: function(element){
		jQuery(element).removeClass("techknow_highlight");
	},

	removeAllTransOverlay: function(){

		jQuery("*").removeClass("trans-overlay");	

	},

	render:function(){	// CONTINUE LOOKING HERE

		jQuery('#dialogBox, #tempstep').remove();

		guides.pause();
		
		var step = guides.stepcontainer[guides.currentstep];

		console.log(step);
		var referenceid = step.refid;	
		var title = step.title;
		var content = step.content;
		var DialogPosition = (typeof(step.my)!='undefined') ? step.my : "left top";
		var DivsLocation = (typeof(step.at)!='undefined') ? step.at : "right bottom"; 
		var Element2Highlight = (typeof(step.highlightid)!='undefined') ? step.highlightid : referenceid; 
		// Optional Step Attributes
		var removeNextButton = (typeof(step.removeNextButton)!='undefined') ? step.removeNextButton : false;
		var removePreviousButton = (typeof(step.removePreviousButton)!='undefined') ? step.removePreviousButton : false;
		var removeFinishButton = (typeof(step.removeFinishButton)!='undefined') ? step.removeFinishButton : false;
		var hideNextButton = (typeof(step.hideNextButton)!='undefined') ? true : false;
		var hidePreviousButton = (typeof(step.hidePreviousButton)!='undefined') ? true : false;
		var hideFinishButton = (typeof(step.hideFinishButton)!='undefined') ? true : false;
		var setPosition = (typeof(step.setPosition)==='undefined') ? "relative" : step.setPosition;
		var dialogHeight = (typeof(step.height)!='undefined') ? step.height: "auto";
		var dialogWidth = (typeof(step.width)!='undefined') ? step.width : 400;
		var shiftTop = (typeof(step.shiftTop)!='undefined') ? step.shiftTop : 0; 
		var shiftLeft = (typeof(step.shiftLeft)!='undefined') ? step.shiftLeft : 0;
		var highlight = (typeof(step.highlight)==='undefined') ? true : step.highlight;
		var delayPaction = (typeof(step.delayPaction)==='undefined') ? 0 : step.delayPaction;
		var hasSecondArrow = (typeof(step.secondArrow)!='undefined') ? step.secondArrow : false;
		
		var elementHeight;
		var DOMref = jQuery(referenceid);	
		var DOMhighlighted = jQuery(Element2Highlight);
		var scrollToElement = (typeof(step.scrollToElement)==='undefined') ? DOMref : step.scrollToElement;

		var DOMscroll = jQuery(scrollToElement);
		

		var buttons = [];
		
		if (highlight === true) {
			guides.highlight(DOMhighlighted, highlight, setPosition);
		}

		if(guides.currentstep==0 && typeof(guides.stepcontainer[guides.currentstep])!='undefined'){
			buttons.push({
				text: "Continue Tour", 
				id: 'next_button',
				class: 'guide_prev button-style',
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
				open: function() {},
			});
		}
		
		if(guides.currentstep>0 && typeof(guides.stepcontainer[guides.currentstep])!='undefined' && removePreviousButton != true){
			buttons.push({
				text: "Previous", 
				id: 'previous_button',
				class: 'guide_prev button-style',
				click: function() {

					
					if (highlight) {
						guides.highlight(DOMhighlighted, false);
					}

					if(!guides.playing){	
						try{ 
							var paction = guides.stepcontainer[guides.currentstep].paction;
							eval(paction()); 
						}catch(e){ }

						guides.currentstep = guides.currentstep - 1;
					}


					if(delayPaction != 0){

						jQuery('#dialogBox, #tempstep').remove();

						setTimeout(function() {

							guides.play();
							guides.previous(guides.currentstep);   

						}, delayPaction);

					} else {
						guides.play();
						guides.previous(guides.currentstep);

					}

				},
				open: function() {

					if(hidePreviousButton){

						jQuery(this).fadeTo(0,0)
						.attr("disabled","disabled")
						.css("cursor", "default");


					}

				},
			});
		}
		
		if(guides.currentstep>=0 && typeof(guides.stepcontainer[guides.currentstep+1])!='undefined' && removeNextButton != true){
			buttons.push({
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
			});
		}
		
		
		if(guides.currentstep>0 && typeof(guides.stepcontainer[guides.currentstep+1])=='undefined' && removeFinishButton != true){
			buttons.push({
				text: "Finish", 
				class: 'guide_fin button-style',
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

					jQuery(this).dialog('destroy').remove();
					guides.properlyCloseGuides();   

				},
				open: function() {

					if(hideFinishButton){

						jQuery(this).fadeTo(0,0)
						.attr("disabled","disabled")
						.css("cursor", "default");

					}

				},
				
			});
		}
		
		console.log("guides userAction is: " + guides.userAction);
		
		if( guides.userAction === false ){

			console.log("Should be Showing Buttons");

			jQuery ('<div id="tempstep"><div id="close-button"></div>' +content + '<div id="guides_response_message"></div></div>').dialog({
				modal:true,
				dialogClass: "techknow",
				autoOpen:true,
				title:title,
				draggable: false,
				resizable: false,
				buttons : buttons, 
				width: dialogWidth, 
				height: dialogHeight, 
				position: { my: DialogPosition, at: DivsLocation, of: DOMref, collision: "none" },
				open: function() {
					console.log("getting to Open")
					try{ 

						// asd			

						var onOpen = guides.stepcontainer[guides.currentstep].onOpen;
						eval(onOpen()); 
	
						// if(onOpen){
						// 	onOpen.forEach(function(element,index,array){
						// 		guides.buildEvent(element);
						// 	});
						// }

						// console.log(guides.stepcontainer[guides.currentstep]);


						// console.log("Function: ");
						// console.log(onOpen);
						// eval(onOpen()); 

					}catch(e){ 
						console.log(e);
					}



					jQuery(document).keyup(function(e){

						if(e.keyCode == 27){

							guides.properlyCloseGuides(DOMhighlighted);
						}

					});

					jQuery('#close-button').click(function(){

						guides.properlyCloseGuides(DOMhighlighted);
					});

					jQuery(document).live("onchange",function(e){       

						guides.properlyCloseGuides(DOMhighlighted);
					});



				},
				focus: function( event, ui ) {
					//DOMref.focus();
				},
				close:function(){	

					guides.deleteCookie(); 
					jQuery(this).dialog('destroy');
					jQuery(this).remove();	
					
				} 

			}); 

		} else {

			console.log("Should be Hiding Buttons");

			jQuery ('<div id="tempstep"><div id="close-button"></div>' +content + '<div id="guides_response_message"></div></div>').dialog({
				modal:true,
				dialogClass: "techknow",
				autoOpen:true,
				title:title,
				draggable: false,
				resizable: false, 
				width: dialogWidth, 
				height: dialogHeight, 
				position: { my: DialogPosition, at: DivsLocation, of: DOMref, collision: "none" },
				open: function() {

					var onOpen = guides.stepcontainer[guides.currentstep].onOpen;
					eval(onOpen()); 

					jQuery(document).keyup(function(e){

						if(e.keyCode == 27){

							guides.properlyCloseGuides(DOMhighlighted);
						}

					});

					jQuery('#close-button').click(function(){

						guides.properlyCloseGuides(DOMhighlighted);
					});

					jQuery(document).live("onchange",function(e){       

						guides.properlyCloseGuides(DOMhighlighted);
					});



				},
				focus: function( event, ui ) {
					//DOMref.focus();
				},
				close:function(){	

					guides.deleteCookie(); //stops cookie from happening... hmm
					jQuery(this).dialog('destroy');
					jQuery(this).remove();	
					
				} 

			});

		}

		jQuery('#tempstep').parent().attr("id","dialogBox");
		//jQuery('.button-style').parent().attr("id","techknow_buttonset");	
		
		var positionBelowHighlight = 8999;
		
		jQuery(".ui-widget-overlay").css('z-index', positionBelowHighlight);


		jQuery("#dialogBox").append("<div id='arrow'></div>");
		
		if(hasSecondArrow != false){

			jQuery("#arrow").after('<div id=\"arrow_two\"></div>');

			jQuery("#arrow_two").addClass(hasSecondArrow);

		}

		elementHeight = jQuery('#dialogBox').height();	
		
		guides.slideTo(DOMscroll, DialogPosition, elementHeight);
		
		
		
		
		
		switch(DialogPosition){
			case "left top": 		jQuery('#arrow').addClass('techknow_lefttop'); break;
			case "center top": 		jQuery('#arrow').addClass('techknow_centertop'); break;
			case "right top": 		jQuery('#arrow').addClass('techknow_righttop'); break;
			case "right center": 	jQuery('#arrow').addClass('techknow_rightcenter'); break;
			case "left center": 	jQuery('#arrow').addClass('techknow_leftcenter'); break;
			case "left bottom": 	jQuery('#arrow').addClass('techknow_leftbottom'); break;
			case "center bottom": 	jQuery('#arrow').addClass('techknow_centerbottom'); break;
			case "right bottom": 	jQuery('#arrow').addClass('techknow_rightbottom'); break;
		}
		
		// E
		switch(DivsLocation){
			case "left top": jQuery('#dialogBox').addClass('topdialog'); break;
			case "right top": jQuery('#dialogBox').addClass('topdialog'); break;
		}
		
		// F		
		if(typeof(shiftTop)!== "undefined"){
			guides.shiftVertical(shiftTop);
		}

		if(typeof(shiftLeft)!== "undefined"){
			guides.shiftHorizontal(shiftLeft);	
		}

		
	},

	//////////////////////
	/// End Guides
	//////////////////////	

	done:function(end){	

		// Destroy Current Guides
		guides.playing = false;
		guides.guidecontainer = [];
		guides.currentguide = -1;
		guides.stepcontainer = [];
		guides.currentstep = -1;
		
		// Determine if guides should be completely deleted
		var endGuide = (typeof(end) !== 'undefined') ? true : false;
		
		if(endGuide){
			guides.deleteCookie();
		}
		
	},

	properlyCloseGuides: function(highlighted){

		var step = guides.stepcontainer[guides.currentstep];

		try{

			var onClose = step.onClose;
			eval(onClose());

		} catch(e) {}

	    /// Reverse Style Changes
	    guides.removeHighlight("*");
	    guides.removeAllTransOverlay();
	    
	    
	    // Remove Custom Events
	    guides.deleteCookie();
	    guides.unbindAllCustomEvents();
	    guides.userAction = false;
	    
	    // Fail-Safe
	    guides.done(true);
	    jQuery('#tempstep').dialog('destroy');
	    jQuery('#tempstep').remove();
	    
	    
	    var dialogStillOpen = jQuery(".ui-dialog:visible").length;
	    
	    if(dialogStillOpen){

	    	var repositionedZIndex = 999;

	    	jQuery(".ui-widget-overlay").css('z-index', repositionedZIndex);

	    	jQuery(".ui-dialog:visible").css('z-index', 9999);

	    }

	},

	////////////////////	
	/// Encode / Decode 
	///////////////////

	encode: function(str){
		try{
			var string = window.btoa(unescape(encodeURIComponent( str )));
			return string;
		}catch(e){
			return '';	
		}
	},

	decode: function(str){
		try{
			var string = decodeURIComponent(escape(window.atob( str )));
			return string;
		}catch(e){
			return '';	
		}
	},

	////////////////////	
	/// Cookies 
	///////////////////

	createCookie: function(cookieValue) {

		console.log("Getting to the right function");

		var today = new Date();
		var expire = new Date();
		//var nDays=1;
		expire.setTime(today.getTime() + 3600000*24*1)
		expire = expire.toGMTString();
		

		document.cookie = "faction="+guides.encode(cookieValue)
		+ ";expires="+expire;




	},

	readCookie: function () {
		var re = new RegExp('[; ]faction=([^\\s;]*)');
		var sMatch = (' '+document.cookie).match(re);
		if (sMatch) return guides.decode(sMatch[1]);
		return '';

	},

	deleteCookie: function(){
		document.cookie = 'faction=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	},

	////////////////////////	
	/// Bind Custom Events 
	////////////////////////

	bindCustomEvent: function(selector, namespace, eventType){

		console.log("setting event for: " + selector + " whose namspace is: " + namespace);


		jQuery(selector).attr("faction", namespace);

		jQuery(selector).bind(namespace,function(event){

			console.log(guides.currentstep);

			var nextFaction = guides.stepcontainer[guides.currentstep].faction;
			eval(nextFaction());

		});

	  //guides.setUserAction(true);

	  guides.setEventByType(selector, namespace, eventType);

	},

	setEventByType: function(selector, namespace, eventType){

		switch(eventType){

			case "click": 
			guides.bindClickTrigger(selector, namespace);
			break;
			case "select":
			guides.bindSelectTrigger(selector, namespace);
			break;

			default:
			guides.bindClickTrigger(selector, namespace);
			break;

		}

	},

	setUserAction: function(bool){

		guides.userAction = bool;

	},

	/////////////////////////
	/// Custom Event Handlers
	/////////////////////////


	handleCustomEvent: function(obj){

		var guide = (typeof(obj.guide)!='undefined') ?  obj.guide : guides.guidecontainer[guides.currentguide];
		var cookieValue = (typeof(obj.cookieVal)!='undefined') ? obj.cookieVal : "";
		var currently_highlighted_element = (typeof(obj.highlightedEl)!='undefined') ? obj.highlightedEl : "";
		var element_being_targeted = (typeof(obj.targetElement)!='undefined') ? obj.targetElement : "";
		var current_custom_event_element = (typeof(obj.elementToUnbind)!='undefined') ? obj.elementToUnbind : "";
		var current_custom_event = (typeof(obj.eventToUnbind)!='undefined') ? obj.eventToUnbind : "";
		var step_action = (typeof(obj.step_action)!='undefined') ? obj.step_action : "";

		var init_next_step = function(){

			eval(step_action());

			guides.createCookie(cookieValue);

			guides.init(guide);

		}

		guides.removeHighlight(currently_highlighted_element);

		guides.onceElementExists(element_being_targeted, init_next_step);

		guides.unbindCustomEvent(current_custom_event_element, current_custom_event);

	},

	//////////////////////
	/// Unbind Functions
	//////////////////////

	unbindCustomEvent: function(selector, namespace, full){

		var len = jQuery(selector).length; 
		var moreThanOneElement = (len > 1) ? true: false;

		if(moreThanOneElement){     

			console.log("With more than one element!");

			var localNamespace = 'click.'+namespace;

			jQuery(selector).each(function(index, val){

				jQuery(this).unbind(namespace);
	        //jQuery(this).unbind(localNamespace);

	    });   

		} else {

			console.log("One element!");

			var localNamespace = 'click.'+namespace.toString();

			jQuery(selector).unbind(namespace);
			jQuery(selector).unbind(localNamespace);

		}

	},

	unbindEachCustomEvent: function(selector, namespace){


		var localNamespace = 'click.'+namespace.toString();

		selector.unbind(namespace);
		selector.unbind(localNamespace);
		selector.removeAttr("faction");

	},

	unbindAllCustomEvents: function(){

		jQuery(document).find("[faction]").each(function(){

			var element = jQuery(this);
			var faction = element.attr("faction");

			console.log("Unbind all custom events", element, faction, true); 

			guides.unbindEachCustomEvent(element, faction);

		});
	},

	//////////////////
	/// EVENT TYPES
	//////////////////   


	bindClickTrigger: function(selector, namespace){

		var localNamespace = 'click.'+namespace;

		console.log("Local is: " + localNamespace);

		jQuery(selector).bind(localNamespace, function(event){

			jQuery(this).trigger(namespace);

		});

	},

	bindSelectTrigger: function(selector, namespace){

		jQuery(selector).change(function(){

			jQuery(this).trigger(namespace);

		});

	},

	disableAllFormInputs: function(form){

		jQuery(form).find(":input").each(function(){

			jQuery(this).attr("disabled", "disabled");

		});

	},

	enableAllFormInputs: function(form){

		jQuery(form).find(":input").each(function(){

			jQuery(this).removeAttr("disabled");

		});

	},

	disableThisFormInput: function(inputType){

		var inputType = (typeof(inputType) != 'undefined') ? inputType : ":input";

		var current_step_refid = guides.stepcontainer[guides.currentstep].refid;

		jQuery(current_step_refid).find(inputType).attr("disabled", "disabled");

	},

	disableThisFormElement: function(element){

		jQuery(element).attr("disabled", "disabled");

	},

	enableFormInputByElement: function(inputType, element){

		var element = (typeof(element) != 'undefined') ? element : "";
		var inputType = (typeof(inputType) != 'undefined') ? inputType : ":input";

		jQuery(element).removeAttr("disabled");

		if(inputType === ":input"){

			setTimeout(function() {

				jQuery(element).focus();

			}, 20);

		}

	},

	enableFormInput: function(inputType, previous){

		var inputType = (typeof(inputType) != 'undefined') ? inputType : ":input";
		var previous = (typeof(previous) != 'undefined') ? previous : false;

		if(previous){
			var previousStep = guides.currentstep - 1;
			var current_step_refid = guides.stepcontainer[previousStep].refid; 

		} else {
			var nextStep = guides.currentstep + 1;
			var current_step_refid = guides.stepcontainer[nextStep].refid;
		}

		jQuery(current_step_refid).find(inputType).removeAttr("disabled");

	},



	//////////////////
	/// Intervals
	//////////////////  

	onceElementExists: function(element, func){


		var interval = setInterval(function () {
			if (jQuery(element).length) {
				clearInterval(interval);
				eval(func());
			}
		}, 100); 

	},

	onceElementIsVisible: function(element, func){

		var interval = setInterval(function () {
			if (jQuery(element).is(":visible")) {
				clearInterval(interval);
				eval(func());
			}
		}, 100); 

	},


	/////////////////////////
	/// Element Manipulators
	/////////////////////////


	handleNextInput: function(selector, inputType){

		var inputType = (typeof(inputType) != 'undefined') ? inputType : ":input";
		var inputLength = jQuery(selector).val().length;

		var func_to_run = function(){ 

			jQuery(selector).focus();  

			jQuery(selector).keypress(guides.debounce(function(e){

				var inputLength = jQuery(this).val().length;

				if(inputLength > 0){

					jQuery("#next_button").fadeTo("fast", 1)
					.removeAttr("disabled")
					.css("cursor", "pointer");


				} else {

					jQuery("#next_button").fadeTo("fast", 0)
					.attr("disabled","disabled")
					.css("cursor", "default");

				}

			}, 500));

			jQuery(selector).keyup(function(e){

				var inputLength = jQuery(this).val().length;

				if(inputLength == 0){

					jQuery("#next_button").fadeTo("fast", 0)
					.attr("disabled","disabled")
					.css("cursor", "default");



				}

			});

		};

		guides.onceElementExists(selector, func_to_run);

	},


	showUsableNextButton: function(){

		jQuery("#next_button").fadeTo("fast", 1)
		.removeAttr("disabled");

	},

	debounce: function(fn, delay) {
		var timer = null;
		return function () {
			var context = this, args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function () {
				fn.apply(context, args);
			}, delay);
		}
	},


	/********************************* qwe *******************/
	

	buildEvent: function(obj){
	
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

	},

	unbindListenEvent: function(obj){

	},

	bindStartGuideEvent: function(guideNum, stepNum){
		return function(){
			guides.createCookie("guides.startGuide(\""+guideNum + "," + stepNum+"\");");
			guides.init();
			//here 
		};
	},









};


