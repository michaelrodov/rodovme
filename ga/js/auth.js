      var clientId = '331390481649-7c33q2tflt39r9asunr1j12775tcorvb.apps.googleusercontent.com';
    //  var apiKey = 'AIzaSyCIoKf8foACQSD-7-BN94VcKGGYmVIqWWU';
      var scopes = 'https://www.googleapis.com/auth/analytics';
	  var maGaId = 'ga:81002014';
	  var sawGaId = 'ga:85904512';
	  var srlGaId = 'ga:87422827';
	  var apmGaId = 'ga:93588054';
     
var apiKey = location.search
apiKey = apiKey.substring(apiKey.indexOf("=") + 1);

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
 
