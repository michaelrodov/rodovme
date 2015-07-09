/**
 * Created by Carlos on 29/06/2015.
 */
var dashApp = angular.module('dashApp', ['ngMaterial']);
dashApp.controller('dashCtrl', function($scope, $http, $interval) {

    //init
    $scope.data = [];
    $scope.data.push({name:"agm", users: "0", title: "Agile Manager", logo: "img/agm.svg",gaid: "ga:81002014"});
    $scope.data.push({name:"saw", users: "0", title: "Service Anywhere", logo: "img/saw.svg",gaid: "ga:85904512"});
    $scope.data.push({name:"srl", users: "0", title: "StormRunner Load", logo: "img/srl.svg",gaid: "ga:87422827"});
    $scope.data.push({name:"ma", users: "0", title: "MyAccount", logo: "img/hp.black.png",gaid: "ga:81002014"});
    $scope.data.push({name:"appm", users: "0", title: "AppPulse Mobile", logo: "img/appm.svg",gaid: "ga:71897204"});
	 

 /*   function getRTUsers(){
        return Math.floor(Math.random() * 100);
    }*/
	
    function refreshProduct(item){
        item.users = getRTUsers(item.gaid);
    }
	
    $scope.refresh = function() {
        for (var i = 0, len = $scope.data.length; i < len; i++) {
            refreshProduct($scope.data[i]);
        }
        console.info("runner");
    }


    $interval(function(){$scope.refresh()}, 10*1000);

	function getRTUsers(gaid) {
			 gapi.client.analytics.data.realtime.get ({
				'ids': gaid,
				'metrics': 'rt:activeUsers'
			  }).then(function(handleAuthResult) {
				var maFormattedJson = JSON.stringify(handleAuthResult.result, null, 2);
				var maJsonParse = JSON.parse(maFormattedJson);
		  //document.getElementById('ma-query').innerHTML = maJsonParse.rows;
			    return (maJsonParse.rows==null) ? 0 : maJsonParse.rows[0][0];
			  });
		  }
/*
    $http.get("rest/mock/all_customers_aggregated")
        .success(function(response) {

            var data = new google.visualization.DataTable(response);
            createChart(document.getElementById('gvizPie'), "PieChart", data);
        });
*/


});