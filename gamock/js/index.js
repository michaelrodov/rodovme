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
	$scope.determinateValue = 0;
	$scope.maxValue = REFRESH_RATE_SEC;
    //init
    $scope.data = [];
    $scope.data.push({name:"agm", users: "0", title: "Agile Manager", logo: "img/agm.png",gaid: "ga:59215255", mn:40, mx:60});
    $scope.data.push({name:"saw", users: "0", title: "Service Anywhere", logo: "img/saw.png",gaid: "ga:85914404", mn:250, mx:270});
    $scope.data.push({name:"srl", users: "0", title: "StormRunner Load", logo: "img/srl.png",gaid: "ga:87422827", mn:0, mx:3});
    $scope.data.push({name:"appm", users: "0", title: "AppPulse Mobile", logo: "img/appm.png",gaid: "ga:71897204", mn:3, mx:9});
    $scope.data.push({name:"ma", users: "0", title: "MyAccount", logo: "img/grey-HP-logo.png",gaid: "ga:81002014", mn:60, mx:80});
	 

    $scope.refresh = function() {
        for (var i = 0, len = $scope.data.length; i < len; i++) {
            $scope.data[i].users = getRTUsers($scope.data[i]);
        }
    }
	
	/*refresh every second*/
    $interval(function(){

		if($scope.determinateValue>99){
			$scope.determinateValue=0; 
			$scope.refresh();
		}
		$scope.determinateValue += Math.round(100/REFRESH_RATE_SEC);
		
	}, 1000);

	function getRTUsers(item) {
			return item.mn + Math.round((item.mx-item.mn)*Math.random());
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
	




});