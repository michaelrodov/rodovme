/**
 * Created by Carlos on 29/06/2015.
 */
var dashApp = angular.module('dashApp', ['ngMaterial']);
dashApp.controller('dashCtrl', function($scope, $http, $interval) {
    //init
    $scope.data = [];
    $scope.data.push({name:"agm", users: getRTUsers(), title: "Agile Manager"});
    $scope.data.push({name:"saw", users: getRTUsers(), title: "Service Anywhere"});
    $scope.data.push({name:"srl", users: getRTUsers(), title: "StormRunner Load"});
    $scope.data.push({name:"ma",
                        users: getRTUsers(),
                        title: "MyAccount",
                        logosvg: "M141.015,71.998c-3.824,0-7.111,2.267-8.615,5.524h-19.175c-1.621,0-3.08,0.985-3.684,2.49l-9.561,23.811  l-9.2-62.327c-0.263-1.779-1.689-3.16-3.477-3.364c-1.789-0.204-3.488,0.819-4.146,2.493L69.117,76.388H10.491v7.94h61.333  c1.633,0,3.099-0.999,3.695-2.519L85.102,57.4l9.167,62.103c0.262,1.773,1.681,3.152,3.461,3.363  c0.157,0.018,0.313,0.027,0.468,0.027c1.604,0,3.072-0.973,3.683-2.49l14.028-34.941h16.491c1.504,3.258,4.791,5.523,8.615,5.523  c5.243,0,9.494-4.25,9.494-9.493S146.258,71.998,141.015,71.998z"});
    $scope.data.push({name:"appm", users: getRTUsers(), title: "AppPulse Mobile"});

    function authenticate(){
        var auth = {
                    oauth2: "https://accounts.google.com/o/oauth2/auth",
                    client_id: "331390481649-6knomsun50aqtomegqp9hcv2cn3fnimp.apps.googleusercontent.com",
                    scopes:["https://www.googleapis.com/auth/analytics.readonly"]
                }
        $http.get("https://accounts.google.com/o/oauth2/auth")
            .success(function(response) {

                var data = new google.visualization.DataTable(response);
                createChart(document.getElementById('gvizPie'), "PieChart", data);
            });

    }
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