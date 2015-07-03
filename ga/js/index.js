/**
 * Created by Carlos on 29/06/2015.
 */
var dashApp = angular.module('dashApp', ['ngMaterial']);
dashApp.controller('dashCtrl', function($scope, $http) {
    $scope.data = [];
    $scope.data.push("agm");
    $scope.data.push("saw");
    $scope.data.push("srl");
    $scope.data.push("ma");
    $scope.data.push("appm");


    $scope.data["agm"] = {users:43, title:"Agile Manager"};
    $scope.data["saw"] = {users:214, title:"Service Anywhere"};
    $scope.data["srl"] = {users:2, title:"StormRunner Load"};
    $scope.data["ma"] = {users:70, title:"MyAccount"};
    $scope.data["appm"] = {users:32, title:"AppPulse Mobile"};

/*
    $http.get("rest/mock/all_customers_aggregated")
        .success(function(response) {

            var data = new google.visualization.DataTable(response);
            createChart(document.getElementById('gvizPie'), "PieChart", data);
        });
*/


});