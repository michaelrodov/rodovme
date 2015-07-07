/*keys


*/
	 function handleClientLoad() {
        gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth,1);
     }
	  
      function checkAuth() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
      }
	  
      function handleAuthResult(authResult) {
        var authorizeButton = document.getElementById('authorize-button');
        if (authResult && !authResult.error) {
          authorizeButton.style.visibility = 'hidden';
          maApiCall();
          srlApiCall();
        } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
      }
      function handleAuthClick(event) {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
      }
    
	// Call GA realtime API 
      function maApiCall() {
		gapi.client.analytics.data.realtime.get ({
            'ids': maGaId,
			'metrics': 'rt:activeUsers'
          }).then(function(handleAuthResult) {
    var maFormattedJson = JSON.stringify(handleAuthResult.result, null, 2);
	var maJsonParse = JSON.parse(maFormattedJson);
		  document.getElementById('ma-query').value = maJsonParse.rows;
		  });
	  }

	  function srlApiCall() {
		gapi.client.analytics.data.realtime.get ({
            'ids': srlGaId,
			'metrics': 'rt:activeUsers'
          }).then(function(handleAuthResult) {
    var srlFormattedJson = JSON.stringify(handleAuthResult.result, null, 2);
	var srlJsonParse = JSON.parse(srlFormattedJson);
		  document.getElementById('srl-query').value = srlJsonParse.rows;
		  });
	  }