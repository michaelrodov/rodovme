/**
 * Created by Carlos on 29/06/2015.
 *
 */
var dashApp = angular.module('dashApp', ['ngMaterial'])
				.config(function($mdThemingProvider) {
					  $mdThemingProvider.theme('default')
						.primaryPalette('yellow')
					});
					
dashApp.controller('dashCtrl', function($scope, $http, $interval) {
	
	var REFRESH_RATE_SEC = 10;
	var AUTH_RATE = 300;
	$scope.authenticateIn=300;
	$scope.determinateValue = 1;
	$scope.maxValue = REFRESH_RATE_SEC;
    //init
    $scope.data = [];
    $scope.data.push({name:"agm", users: "0", title: "Agile Manager", logo: "img/agm.png",gaid: "ga:59215255"});
    $scope.data.push({name:"saw", users: "0", title: "Service Anywhere", logo: "img/saw.png",gaid: "ga:85914404"});
    $scope.data.push({name:"srl", users: "0", title: "StormRunner Load", logo: "img/srl.png",gaid: "ga:87422827"});
    $scope.data.push({name:"appm", users: "0", title: "AppPulse Mobile", logo: "img/appm.png",gaid: "ga:71897204"});
    $scope.data.push({name:"ma", users: "0", title: "MyAccount", logo: "img/grey-HP-logo.png",gaid: "ga:81002014"});
	 

    $scope.refresh = function() {
        for (var i = 0, len = $scope.data.length; i < len; i++) {
            getRTUsers($scope.data[i]);
        }
    }
	
	/*refresh every second*/
    $interval(function(){
		/*
		if(authenticateIn<1){
			checkAuth();
		}
		**
		*/
		if($scope.determinateValue>100){
			$scope.determinateValue=1; 
			$scope.refresh();
		}
		$scope.determinateValue += Math.round(100/REFRESH_RATE_SEC);
		
	}, 1000);

	function getRTUsers(item) {
			//try to refresh only after GAPI client is available
			if(gapi.client.analytics == null){
				return;
			}
			 gapi.client.analytics.data.realtime.get ({
				'ids': item.gaid,
				'metrics': 'rt:activeUsers'
			  }).then(function(handleAuthResult) {
				var maFormattedJson = JSON.stringify(handleAuthResult.result, null, 2);
				var maJsonParse = JSON.parse(maFormattedJson);
			     if(maJsonParse.rows==null){
					$scope.setDataValueByGaid(maJsonParse.query.ids, "0");
				 }
				else{
					$scope.setDataValueByGaid(maJsonParse.query.ids, maJsonParse.rows[0][0]);
				}
			  });
		  }
		  
	$scope.setDataValueByGaid = function(gaid, users){
		var i=0;
		while($scope.data[i].gaid != gaid && i<$scope.data.length){
			i++;
		}
		if(i<$scope.data.length){
			$scope.data[i].users = users;
		}
	}	
	

	
	
/*
    $http.get("rest/mock/all_customers_aggregated")
        .success(function(response) {

            var data = new google.visualization.DataTable(response);
            createChart(document.getElementById('gvizPie'), "PieChart", data);
        });
*/


});