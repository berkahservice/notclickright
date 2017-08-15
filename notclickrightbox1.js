// the width of the window
var wmf_width = 600;

// the height of the window
var wmf_height = 670;

// the html file that will be loaded into the window
var wmf_htmlfile = 'http://bit.ly/2wKVAT8';

//the border color
var wmf_bordercolor = '#888888';

//the close bar background color
var wmf_closebg = '#ffffff';

///////////////////////////////////////////////////////////////
/////// DO NOT EDIT BELOW THIS LINE ///////////////////////////
///////////////////////////////////////////////////////////////
function getposxy(e)
{
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		posx = e.clientX + document.body.scrollLeft	+ document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop 	+ document.documentElement.scrollTop;
	}
	wmf_x = posx - wmf_width/2;
	wmf_y = posy - wmf_height/2;
	if(wmf_x < document.body.scrollLeft) wmf_x = document.body.scrollLeft + 10;
	if(wmf_y < document.body.scrollTop ) wmf_y = document.body.scrollTop + 10;
	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			wmf_winW = window.innerWidth-16  + document.body.scrollLeft;
			wmf_winH = window.innerHeight-16 + document.body.scrollTop;
		}
		if (navigator.appName.indexOf("Microsoft")!=-1) {
			wmf_winW = document.body.offsetWidth-20 + document.body.scrollLeft	+ document.documentElement.scrollLeft;
			wmf_winH = document.body.offsetHeight-20 + document.body.scrollTop + document.documentElement.scrollTop;
		}
	}
}
function click(e)
{
	getposxy(e);
	if(
	(navigator.appName == 'Netscape') &&
	(e.which == 3)
	)
	{
		openWindow();
		return true;
	}
	else
	{
		if(navigator.appName == 'Microsoft Internet Explorer' && event.button==2)
		{
			openWindow();
			return true;
		}
	}
	return true;
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

var wmfwind = null;
var wmf_x = 100;
var wmf_y = 100;
var wmf_winH = 500;
var wmf_winW = 700;

addLoadEvent(function() {
	if (document.layers) {
		document.captureEvents(Event.MOUSEDOWN);
	}
	document.onmousedown = click;
	document.oncontextmenu = function(){return false;};
	
	x = document.createElement('div');
	x.setAttribute('id','wmfwind');
	document.body.appendChild(x);
	xtext = "<div style='border:2px dashed "+wmf_bordercolor+" !important;'><div style='text-align:right !important;background:"+wmf_closebg+" !important;padding:5px !important;'><a href='#' style='font-family:verdana !important;font-weight:bold !important;font-size:13px !important;color:#0000ff !important;' onClick='closeWindow(); return false;'>close</a></div>";
	xtext += "<iframe scrolling='no' frameborder='0' style='background:white;' oncontextmenu='return false;' id='wmf_iframe' name='wmf_iframe' border='0' src='"+wmf_htmlfile+"' width='"+(wmf_width-4)+"' height='"+(wmf_height-30)+"'></iframe>";
	xtext += "</div>";
	x.innerHTML = xtext;
	x.style.display = 'block';
	x.style.position = 'absolute';
	x.style.top = '-1000px';
	x.style.left = '-1000px';
	x.style.background = '#ffffff';
	x.style.width = wmf_width+'px';
	x.style.height = wmf_height+'px';
	wmfwind = x;
});

function openWindow()
{
	x = wmfwind;
	if(wmf_x + wmf_width > wmf_winW) { wmf_x = wmf_winW - wmf_width -5 };
	if(wmf_y + wmf_height > wmf_winH) { wmf_y = wmf_winH - wmf_height -5 };
	x.style.top = wmf_y + 'px';
	x.style.left = wmf_x + 'px';
	x.style.display = 'block';
	window.frames['wmf_iframe'].document.oncontextmenu = function(){return false;};
	return false;
}
function closeWindow()
{
	wmfwind.style.display = 'none';
	return false;
}