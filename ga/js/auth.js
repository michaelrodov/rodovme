      var clientId = '331390481649-7c33q2tflt39r9asunr1j12775tcorvb.apps.googleusercontent.com';
    //  var apiKey = 'AIzaSyCIoKf8foACQSD-7-BN94VcKGGYmVIqWWU';
      var scopes = 'https://www.googleapis.com/auth/analytics';
	  var maGaId = 'ga:81002014';
	  var sawGaId = 'ga:85904512';
	  var srlGaId = 'ga:87422827';
	  var apmGaId = 'ga:93588054';
     
     
//[MR] it would be better to create a function that returns a value
// you don't use this function more then once 
var apiKey = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("?"); //[MR] why you split by "?", it splits the parameters part and server part, but query only has params
								//[MR]if anything you should be splitting by "&" i.e. some.com/test?v1=444&v2=555 
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
	//[MR] I wouldnt do a loop: just take the query var and run something like query.match(/key=[^&]*/), which means search for "key=" and subsequent char after it except "&" 
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1])); //[MR] just return the value, don't save it in 
    }
  } 
  for(Key in query_string) {
    if(query_string.hasOwnProperty(Key)) {
        var query_string_value = query_string[Key];
    }
}
    return query_string_value;
}();

	 
	 function handleClientLoad() {
        gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth,100);
        window.setInterval(checkAuth,2700000)
      }
	  
      function checkAuth() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
      }
	  
      function handleAuthResult(authResult) {
        var authorizeButton = document.getElementById('authorize-button');
        if (authResult && !authResult.error) {
          authorizeButton.style.visibility = 'hidden';
		  //authentication finished
        } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
      }
	  
      function handleAuthClick(event) {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
      }
 
