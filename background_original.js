
function explode(delimiter, string, limit) {
  //  discuss at: http://phpjs.org/functions/explode/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: explode(' ', 'Kevin van Zonneveld');
  //   returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}

  if (arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined') return null;
  if (delimiter === '' || delimiter === false || delimiter === null) return false;
  if (typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string ===
    'object') {
    return {
      0: ''
    };
  }
  if (delimiter === true) delimiter = '1';

  // Here we go...
  delimiter += '';
  string += '';

  var s = string.split(delimiter);

  if (typeof limit === 'undefined') return s;

  // Support for limit
  if (limit === 0) limit = 1;

  // Positive limit
  if (limit > 0) {
    if (limit >= s.length) return s;
    return s.slice(0, limit - 1)
      .concat([s.slice(limit - 1)
        .join(delimiter)
      ]);
  }

  // Negative limit
  if (-limit >= s.length) return [];

  s.splice(s.length + limit);
  return s;
};





var GS = true;


/////////////////// GUIDE TO SEND TO PAGE //////////////////

var AmazonIntro = {
      id : 1, 
      title:'Introduction',
      guideType:'tour',
      steps: [], 
};




var facebookIntro = {
      id : 1, 
      title:'Introduction',
      guideType:'wizard',
      steps: [{
/* 0 : facebookIntro */        
            title: "Welcome to Facebook!",
            content: "<p>Facebook is the world's largest social network making it easy for you to connect and share with your family and friends online.</p>",
            refid: "body",
            highlightid: "",
            scrollToElement: "body",
            removeNextButton:true,
            my: "center center",
            at: "center top",
            shiftTop: 200,  
            
            onOpen: function(){
              jQuery(".continue-tour").click(function(){
                guides.createCookie('guides.startGuide(0,1);');
                guides.init(tourGuider);   
              });


            },
            faction: function(){},  
            paction: function(){},
            
          },{
/* 1 : facebookIntro */        
            title: "Status Updates",
            content: "<p><a id='techknow-post-status-updates'>Post a Status Update</a> let those you're connected to know how you're doing.</p>",
            refid: "#pagelet_composer",
            highlightid: "#pagelet_composer",
            scrollToElement: "body",
            my: "center top",
            at: "center bottom",
            shiftTop: 20,
            onOpen:function(){

              console.log("Creating Click Event");

              console.log(jQuery("#techknow-post-status-updates"));

              jQuery("#techknow-post-status-updates").click(function(){
                console.log(guides);
                guides.createCookie("guides.startGuide(1,0);");
                guides.init();
              });
            },
            faction: function(){},            
            paction: function(){},
            
          },{
          /* 16 : News Feed */        
              title: "News Feed",
              content: "<p>This is your news feed, something will show here if you have friends.</p>",
              refid: "#stream_pagelet > div:nth-of-type(4) > div > div:nth-of-type(1) > div > div > div:first-child",
              highlightid: "#stream_pagelet > div:nth-of-type(4) > div > div:nth-of-type(1) > div > div > div:first-child",
              scrollToElement: "body",
              my: "center bottom",
              at: "center top",
              shiftTop: -20,
          
              onOpen:function(){},
              faction: function(){},  
              paction: function(){},   
          },{
/* 2 : facebookIntro */        
            title: "Communicate!",
            content: "<p>This is a list of friends currently logged in to facebook. <a>Say \"Hi\"</a> to one!</p>",
            refid: ".fbChatSidebarBody",
            highlightid: ".fbChatSidebar div[aria-label='Chat with friends']",
            scrollToElement: "body",
            my: "right center",
            at: "left center",
            shiftLeft: -23,
            shiftTop: -35,

            onOpen:function(){},
            faction: function(){},  
            paction: function(){},
            
          },{
/* 3 : facebookIntro */        
            title: "Notifications",
            content: "<p>This list will update you about your involvement in facebook since your last login.</p>",
            refid: "#fbNotificationsJewel",
            highlightid: "#blueBarDOMInspector",
            scrollToElement: "body",
            my: "center top",
            at: "center bottom",
            shiftTop: 20,

            onOpen:function(){},
            faction: function(){},  
            paction: function(){},

            
            
          },{
/* 4 : facebookIntro */        
            title: "Messages",
            content: "<p>This will contain a list of all your recent messages.</p>",
            refid: "a[aria-labelledby='mercurymessagesCountWrapper']",
            highlightid: "#blueBarDOMInspector",
            scrollToElement: "body",
            my: "center top",
            at: "center bottom",
            shiftTop: 20,

            onOpen:function(){},
            faction: function(){},  
            paction: function(){},
            
          },{
/* 5 : facebookIntro */        
            title: "Friend Requests",
            content: "<p>This list will allow you to accept or reject incoming friend requests.</p>",
            refid: "#fbRequestsJewel",
            highlightid: "#blueBarDOMInspector",
            scrollToElement: "body",
            my: "center top",
            at: "center bottom",
            shiftTop: 20,

            onOpen:function(){},
            faction: function(){},  
            paction: function(){},
            
          },{
/* 6 : facebookIntro */        
            title: "Return Home",
            content: "<p>This button will return you to your live news feed.</p>",
            refid: "ul.clearfix > li:nth-of-type(2) > a",
            highlightid: "#blueBarDOMInspector",
            scrollToElement: "body",
            my: "center top",
            at: "center bottom",
            shiftTop: 20,

            onOpen:function(){},
            faction: function(){},  
            paction: function(){},
            
          },{
/* 7 : facebookIntro */        
            title: "View your Profile",
            content: "<p>Facebook made a page just for you. <a>Visit your profile page</a></p>",
            refid: "ul.clearfix > li:first-child > a",
            highlightid: "#blueBarDOMInspector",
            scrollToElement: "body",
            my: "center top",
            at: "center bottom",
            shiftTop: 20,

            onOpen:function(){},
            faction: function(){},  
            paction: function(){},
            
          },{
/* 8 : facebookIntro */        
            title: "Search Facebook",
            content: "<p>Search people, places, businesses, music, movies, and more. <a>Start Searching Now!</a></p>",
            refid: "div[role=\"search\"]",
            highlightid: "#blueBarDOMInspector",
            scrollToElement: "body",
            my: "center top",
            at: "center bottom",
            shiftTop: 20,

            onOpen:function(){},
            faction: function(){},  
            paction: function(){},
            
          },{
/* 9 : facebookIntro */        
            title: "Navigate Facebook",
            content: "<p>Navigate through the unique functionality of Facebook and customize your own experience with this handy column.</p>",
            refid: "#leftCol",
            highlightid: "#leftCol",
            scrollToElement: "body",
            my: "left center",
            at: "right center",
            shiftLeft: 20,

            onOpen:  function(){},
            faction: function(){},  
            paction: function(){},
            
          },{
          /* 10 : Groups Navigation */        
              title: "Groups",
              content: "<p>Groups allow you to separate facebook</p>",
              refid: "#groupsNav",
              highlightid: "#groupsNav",
              scrollToElement: "body",
              my: "left center",
              at: "right center",
              shiftLeft: 20,
          
              onOpen:function(){},
              faction: function(){},  
              paction: function(){},   
          },{
          /* 11 : Apps Navigation */        
              title: "Apps",
              content: "<p>Facebook apps will allow you to further customize your facebook experience</p>",
              refid: "#appsNav",
              highlightid: "#appsNav",
              scrollToElement: "body",
              my: "left center",
              at: "right center",
              shiftLeft: 20,

              onOpen:function(){},
              faction: function(){},  
              paction: function(){},   
          },{
          /* 12 : Friend Lists */        
              title: "Friend Lists",
              content: "<p>Not sure what this does</p>",
              refid: "#listsNav",
              highlightid: "#listsNav",
              scrollToElement: "ul.\_bui.nonDroppableNav > li:nth-of-type(9) > div > div.clearfix > a > div.linkWrap.noCount > span",
              my: "left center",
              at: "right center",
              shiftLeft: 20,

              onOpen:function(){},
              faction: function(){},  
              paction: function(){},   
          },{
          /* 13 : Interests */        
              title: "Interests",
              content: "<p>Not sure what this does</p>",
              refid: "#interestsNav",
              highlightid: "#interestsNav",
              scrollToElement: "#appsNav > ul.\_bui.nonDroppableNav > li:nth-of-type(7) > div > div.clearfix > a > div.linkWrap.noCount > span",
              my: "left center",
              at: "right center",
              shiftLeft: 20,
          
              onOpen:function(){},
              faction: function(){},  
              paction: function(){},   
          },{
          /* 14 : Pages */        
              title: "Pages",
              content: "<p></p>",
              refid: "#pagesNav",
              highlightid: "#pagesNav",
              scrollToElement: "#appsNav > ul.\_bui.nonDroppableNav > li:nth-of-type(7) > div > div.clearfix > a > div.linkWrap.noCount > span",
              my: "left center",
              at: "right center",
              shiftleft: 20,

              onOpen:function(){


              },
              faction: function(){},  
              paction: function(){},   
          },{
          /* 15 : Events */        
              title: "Events", 
              content: "<p>Facebook also has events!</p>",
              refid: "#eventsNav",
              highlightid: "#eventsNav",
              scrollToElement: "ul.\_bui.nonDroppableNav > li:nth-of-type(8) > div > div.clearfix > a > div.linkWrap.hasCount > span",
              my: "left center",
              at: "right center",
              shiftLeft: 20,
                     
              onOpen:function(){},
              faction: function(){},  
              paction: function(){},   
          }], // End of Steps
};


var statusUpdates = {
      id : 1, 
      title:'Introduction',
      guideType:'tour',
      steps: [{
        title: "Words!",
        content: "<p>Type a status update here and let your friends know how your doing, share a quote, or what your eating.</p>",
        refid: "div.uiTypeahead.composerTypeahead.mentionsTypeahead > div.wrap",
        highlightid: "div.uiTypeahead.composerTypeahead.mentionsTypeahead > div.wrap",
        scrollToElement: "body",
        my: "center top",
        at: "center bottom",
        shiftTop:20,

        onOpen:[
          {},
        ],
        faction: function(){},  
        paction: function(){},
      }]
};

var newsUpdates = {
      id : 1, 
      title:'Introduction',
      guideType:'tour',
      steps: [{
        title: "Words!",
        content: "<p>Type a status update here and let your friends know how your doing, share a quote, or what your eating.</p>",
        refid: "div.uiTypeahead.composerTypeahead.mentionsTypeahead > div.wrap",
        highlightid: "div.uiTypeahead.composerTypeahead.mentionsTypeahead > div.wrap",
        scrollToElement: "body",
        my: "center top",
        at: "center bottom",
        shiftTop:20,

        onOpen:[
          {},
        ],
        faction: function(){},  
        paction: function(){},
      }]
};


console.log("this is: ");
console.log(facebookIntro.steps[1]);


var tour = [];
tour.push(facebookIntro)
tour.push(statusUpdates);
tour.push(newsUpdates);

chrome.runtime.onMessage.addListener(function(message){
	
	if(GS){
		console.log("Message is: ");
		console.log(message.myStatus);
	}
	

	chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tabs){
    console.log("tabs:");
    console.log(tabs);

    curUrl = parseUrl(tabs[0].url);
    console.log(curUrl);
    curUrl = curUrl[curUrl.length - 2];
    console.log(curUrl);

    console.log( "curUrl: " + curUrl );

		domain = explode(".", tabs[0].url);
		// curUrl = domain[1];

		if(GS){
			console.log(domain, curUrl);	
		}
		
	});

});

chrome.tabs.onActivated.addListener(function(){
	console.log("Switching tabs");
});

var parseUrl = function(url) {
    var fullUrl = explode("/", url);
    var i = 0;
    while (fullUrl[i].match(/http.+/) || fullUrl[i].length == 0)
      fullUrl.shift();
    var fullDomain = fullUrl[0];
    return explode(".",fullDomain);
}
var constructAssetPath = function(assetDomain, activeTab) {
 return "/" + assetDomain + "/" + activeTab;
}

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {


    if (msg.joke == "Knock knock"){
      console.log("Getting to First Step");
      port.postMessage({question: "Who's there?"});
    }
    else if (msg.answer == "Madame"){
      console.log("Getting to Second Step");
      port.postMessage({question: "Madame who?"});
    }
    else if (msg.answer == "Madame... Bovary"){
      console.log("Getting to Final Step");
      if(curUrl == "facebook"){

        var guidePassed = JSONfn.stringify(tour);

        port.postMessage({
          question: "I don't get it.",
          guides: guidePassed
        });
      } else if (curUrl == "amazon") {
        console.log("we're at amazon");
        // port.postMessage({
        //   question: "I don't get it.",
        //   guides: facebookIntro
        // });
      } else {
        port.postMessage({
          question: "MUHAHAHAHAHA!",
        });
      }
    }

  });
});
