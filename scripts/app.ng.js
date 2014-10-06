'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
//  'ngRoute'
])
.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.pot = {
		fillLevel:100
	};
	$http.get("/api/infos").then(function(data){
		$scope.info = angular.fromJson(data.data)[0];
	});
	
	$scope.dropLevel = function(){
		if ($scope.pot.fillLevel == 0)
			$scope.pot.fillLevel = 100;
		else
			$scope.pot.fillLevel = Math.max(0, $scope.pot.fillLevel - 10);
	}
	
	var potModal = '<div id="pot-modal"><button class="btn-success" ng-click="hide()"></button></div>';
	
	$scope.potModal = function(){
		//do things
	};
}]);
//.config(['$routeProvider', function($routeProvider) {
//  $routeProvider.otherwise({redirectTo: '/view1'});
//}]);