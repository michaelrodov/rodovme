//Constants initialization
var config = function(){}
config.ContentArrayId = "#contentArray";
config.ContentArrayControlClass = "HeaderTopic";
config.jQueryLibPath = "lib/jquery.js";
config.scriptLoadTimeout = 5000; //in milliseconds
config.scriptLoadPollTime = 200; //in milliseconds
config.isJqueryLoaded = 0; //if jquery lib loaded successfuly set to 1, if timedout set -1, if code failed 0
config.browserListDiv = "browserLine";

var control = function(){}
control.activeControlId="";

/*Constructor of loadJQuery Object*/
function loadJQuery(){
	loadJQuery.loadLib(config.jQueryLibPath); //loading script
	loadJQuery.isReady(0); //waiting until the script is loaded
}
loadJQuery.loadLib = function(libPath){
	var script = document.createElement('script');
	script.setAttribute("type","text/javascript");
	script.setAttribute("src", libPath);
	if (typeof script!="undefined")
		document.getElementsByTagName("head")[0].appendChild(script);
	else
		console.error("Creating of JQuery placeholder script failed!. tag 'script' undefined");
}
loadJQuery.isReady = function(timeElapsed, animationId){
 // Continually polls to see if jQuery is loaded.
  if (typeof $ == "undefined") { // if jQuery isn't loaded yet...
    if (timeElapsed <= config.scriptLoadTimeout) { // and we havn't given up trying...
      setTimeout("loadJQuery.isReady(" + (timeElapsed + config.scriptLoadPollTime) + ")", config.scriptLoadPollTime); // set a timer to check again in 200 ms.
    } else {
      console.error("jQuery was not loaded, loading timed-out.")
    }
  } else {
    // Any code to run after jQuery loads goes here!
    // for example:
	if((animObj = $("#"+animationId)) != "undefined"){
		animObj.visible = false;	
	}
	jQueryLoaded(); //continue to loading the page
  }	
}

/**
*Function is called when the page finished loading its HTML, JS and CSS 
*/
function pageLoaded(){	
	console.log("Page loaded.");
	console.log("Loading jQuery...");	
	loadJQuery();	
}

/***************************************Script Continuation After JQuery Loaded*****************************************************************/
/**
	Function is called by loadJQuery.isReady function, once the jQuery file loading was completed
	The loading of the page will continue from this point, since all other actions require usage of jQuery
*/
function jQueryLoaded(){
	console.log("jQuery was loaded");
	$(".controls").bind("mouseover",controlsOnMouseOver);
	$(".controls").bind("mouseout",controlsOnMouseOut);
	$(".controls").bind("click",controlsOnClick);
	
	$("#michaelrodov").bind("mouseover",controlsOnMouseOver);
	$("#michaelrodov").bind("mouseout",controlsOnMouseOut);
	setBrowserIcon();
}
function setBrowserIcon(){
	try{
		if($.browser.mozilla)
			$("#"+config.browserListDiv+" #ff").addClass("activeBrowser");
		else if($.browser.webkit)
			$("#"+config.browserListDiv+" #ch").addClass("activeBrowser");
		else if($.browser.safari)
			$("#"+config.browserListDiv+" #sf").addClass("activeBrowser");
		else if($.browser.opera)
			$("#"+config.browserListDiv+" #op").addClass("activeBrowser");
		else if($.browser.msie)
			$("#"+config.browserListDiv+" #ie").addClass("activeBrowser");
	}
	catch(e){
		console.log("Exception while setting browser icon.", e);
	}
}
function controlsOnMouseOut(event){
	if(control.activeControlId==""){
		$("#wordCloudObject span:not(."+event.target.id+", .doNotFade)").removeClass("idleWords");
		$("#wordCloudObject span:not(."+event.target.id+", .doNotFade)").addClass("activeWords");
	}
}
function controlsOnMouseOver(event){
	if(control.activeControlId==""){
		$("#wordCloudObject span:not(."+event.target.id+", .doNotFade)").removeClass("activeWords");
		$("#wordCloudObject span:not(."+event.target.id+", .doNotFade)").addClass("idleWords");
	}
}
function controlsOnClick(event){
		(control.activeControlId=="")?control.activeControlId=event.target.id:control.activeControlId="";
}

/**
	Function that contains the logic of clicking header button
	*/
function HeaderTopicOnClick(event){
	console.log("clicked by " + event.target.id);
	switch(event.target.id){
		case config.ContentArrayControlClass+"1":
			$(config.ContentArrayId).animate({left:'10%'}, 500);	
			break;
		case config.ContentArrayControlClass+"2":
			$(config.ContentArrayId).animate({left:'-81%'}, 500);	
			break;
		case config.ContentArrayControlClass+"3":
			$(config.ContentArrayId).animate({left:'-174%'}, 500);	
			break;
	}
	
}
