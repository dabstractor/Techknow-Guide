//////////////////////////////////
/////// Google Chrome
//////////////////////////////////


Required Files: 

	- Manifest.JSON
	- Browser action or page action (One or the Other)
	- content scripts - where the magic from the guides will be stored
	- background page - the more complex the more necessary it is
	- utility web files - images, javascript libraries, flash movies, etc..
	
	
Chrome Extention API (Light Weight)
	- 40 objects, 40 methods.
	- chrome top level object, exposed to all extensions.
	- API split into 6 Modules - represented by objects inside of the chrome object.
				1) extension.* - has properties and methods that allow you to send messages that allow you to communicate  between extension components.
				2) browserAction.* - lets you set the appearance of browserActions and their badges.
				3) pageAction.* - lets you enable and disable page action
				4) windows.* (requires tabs permission in manifest) - lets you open, close, lookup, and update browser windows.
				5) tabs.* (requires tabs permission ) - perform same actions on tabs.
				6) bookmarks.* (requires bookmarks permission) - allows you to modify users bookmarks
				
				