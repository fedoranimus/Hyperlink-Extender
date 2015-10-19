
chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

	
	var linkTypes = ['new_tab', 'same_page', 'new_window'],
			anchorLinks = document.getElementsByTagName('a'),
			iconPrefix = 'icon_';

	Array.prototype.forEach.call(anchorLinks, function(anchorLink){

		var x, y;
		var linktype = getLinkType(this);
		var icon = document.createElement('div');
		icon.id = iconPrefix + linktype;
		icon.classList.add('icon_indicator');

		anchorLink.onmouseover = function(e) { // For each has the acces to this so that is better
			x = e.clientX;
			y = e.clientY;
			icon.style.left = x + "px";
			icon.style.top = y + "px";
			this.appendChild(icon);
		};

		anchorLink.onmouseout = function(e) {
			this.removeChild(icon);
		};

	});

	// Utility functions

	function hasAttribute(domel, attributeName) {
		if ( domel['attributes'][attributeName] ) return true;
		else return false;
	}

	function getAttributeValue(domel, attributeName) {
		if ( hasAttribute(domel, attributeName) ) 
			return domel['attributes'][attributeName]['value'];
		return '_self'; 
	}

	function getLinkType(anchorDomEl) {
		var attributeValue = anchorDomEl.target;
		switch ( attributeValue ) {
			case '_self' : 
			case '_parent':
				return linkTypes[1];
			break;
			case  '_blank' :
				return linkTypes[0];
			break;
			default : 
				return linkTypes[2];
			break;
		}
	}
	}
	}, 10);
});
