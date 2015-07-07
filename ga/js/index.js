/**
 * Created by Carlos on 29/06/2015.
 */
var dashApp = angular.module('dashApp', ['ngMaterial']);
dashApp.controller('dashCtrl', function($scope, $http, $interval) {

	handleClientLoad();
	checkAuth();
    //init
    $scope.data = [];
    $scope.data.push({name:"agm", users: getRTUsers(), title: "Agile Manager", logo: "img/agm.svg"});
    $scope.data.push({name:"saw", users: getRTUsers(), title: "Service Anywhere", logo: "img/saw.svg"});
    $scope.data.push({name:"srl", users: getRTUsers(), title: "StormRunner Load", logo: "img/srl.svg"});
    $scope.data.push({name:"ma", users: getRTUsers(), title: "MyAccount", logo: "img/hp.black.png"});
    $scope.data.push({name:"appm", users: getRTUsers(), title: "AppPulse Mobile", logo: "img/appm.svg"});

    function getRTUsers(){
        return Math.floor(Math.random() * 100);
    }
	
    function refreshProduct(item){
        item.users = getRTUsers();
    }
	
    $scope.refresh = function() {
        for (var i = 0, len = $scope.data.length; i < len; i++) {
            refreshProduct($scope.data[i]);
        }
        console.info("runner");
    }


    $interval(function(){$scope.refresh()}, 60*1000);


/*
    $http.get("rest/mock/all_customers_aggregated")
        .success(function(response) {

            var data = new google.visualization.DataTable(response);
            createChart(document.getElementById('gvizPie'), "PieChart", data);
        });
*/


});