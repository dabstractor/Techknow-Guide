function URL(){}

var debounce = function(fn, delay, context) {
    var timer = null;
    return function (context) {
    	if (typeof context === "undefined") {
	        context = this;
    	}
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
};

String.prototype.visualLength = function(styles) {
	var rSelector = "#word-ruler";
	var $body = $("body");
    var $ruler = $("#word-ruler").length ?
					$("#word-ruler") :
					$("<div></div>").attr("id","word-ruler").css({
					    	"visibility":"hidden",
					    	"position":"absolute"
			    	}).appendTo($body);
    if (styles) {
		$ruler.css(styles);	
    }
    $ruler.text(this);
    width = $ruler[0].offsetWidth;
    $body.remove("#ruler");
    return width;
};

$.fn.findByListener = function(listener,scope) {
	// console.log( "listener: " + listener );
	var searchStr = "[data-active-listener*=\"" + listener + "\"]";
	var $this = $(this);
	var searchResults = null;

	var scopeType = typeof scope;
	// if (scopeType != "undefined") {
		if (scopeType == "string") {
			switch(scope) {
				case "event":
					scope = 1;
					break;
				case "local":
					scope = 2;
					break;
				case "global":
					scope = 3;
					break;
			}
		}

	if( listener.match(/(^\.)|(\.$)/) ) { //dot notation
		// console.log("has dot notation");
		if( listener.match(/^\./) ) { //has preceding dot
			// console.log("has preceding dot, so scope may = 3");
			scope = 3;
			listener = listener.replace(/^\./,"");
			if ( listener.match(/\.$/) ) {
				// console.log("has preceding and trailing dot, so scope = 2");
				scope = 2;
				listener = listener.replace(/\.$/,"");
			}
		} else {
			// console.log("only has trailing dot, so scope = 1")
			scope = 1;
			listener = listener.replace(/\.$/,"");
		}
	}

	if ( scope == 1 ) { //searching for event
		searchStr = '[data-active-listener*=" ' + listener + '."], [data-active-listener*=" ' + listener + ' "]';
	} else if ( scope == 2 ) {
		searchStr = '[data-active-listener*=".' + listener + '."], [data-active-listener*=".' + listener + ' "]';
	} else if ( scope == 3 ) {

		searchStr = '[data-active-listener*=".' + listener + ' "]';
		searchResults = $this.find(searchStr);

		for( var i = 0; i < searchResults.length; i++ ) {
			var attrValue = $(searchResults[i]).attr("data-active-listener");
			var searchStr = "\\.[^\\s]+\\" + listener;
			if(!attrValue.match(searchStr)) {
				searchResults.splice(i,1);
				i--;
			}
		}
	}

	if(!searchResults) {
		searchResults = $this.find(searchStr);
	}

	return searchResults;
}

$.fn.listen = function() { // takes same paramaters as $.on()
	var $this = $(this);
	var att = "data-active-listener";
	var event = arguments[0]; //first argument passed will be event name
	var attrValue = $this.attr(att) || "";

	if (attrValue.match(event)) {
		// console.log("has event and/or namespace, so removing");
		$this.neglect(event);
	}

	$this.on.apply(this, arguments);
	$this.attr(att,attrValue.replace(event,"") + " " + event + " ");

	return this;
};

$.fn.neglect = function() { // turns off custom event listener
	var att = "data-active-listener";
	var $this = $(this);
	var all, ev, newVal;
	if(arguments.length > 0) { // if arguments are passed
		all = false;
		ev = arguments[0]; // it means they want to specify an event
	} else {
		all = true; // if nothing was passed in
		ev = ""; // it means they want to remove all events
	}
	newVal = $this.attr(att).replace(ev, "");

	if ( all || newVal.match(/^\s*$/) ) { // either they want to remove all events or there are no events left
		$this.off(ev);
		$this.removeAttr(att); // we remove the entire attribute completely
	} else { // if there are other events left, only remove the targeted event
		$this.off(ev);
		$this.attr(att,newVal);
	}
	return this;
};