'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
//  'ngRoute'
])
.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.pot = {
		cupsLeft: 12,
		fillLevel: 75,
		burnerClass: ""
	};
	
	$http.get("/api/infos/creamer").then(function(data){
		$scope.creamer = angular.fromJson(data.data);
	});
	
	function updateFillLevel(){
		//ceiling is 75;
		$scope.pot.fillLevel = 7+Math.floor(($scope.pot.cupsLeft*(69/12)));
	}
	
	$scope.dropLevel = function(){
		if ($scope.pot.cupsLeft == 0)
			$scope.pot.cupsLeft = 12;
		else
			$scope.pot.cupsLeft -= 1;
		updateFillLevel();
	}
	
	var burnerStates = ["", "hot", "warm"];
	var currentBurnerState = 0;
	$scope.cycleBurner = function(){
		currentBurnerState++;
		if (currentBurnerState > burnerStates.length -1)
			currentBurnerState = 0;
			
		$scope.burnerClass = burnerStates[currentBurnerState];
	}
	
	var potModal = '<div id="pot-modal"><button class="btn-success" ng-click="hide()"></button></div>';
	
	$scope.potModal = function(){
		//do things
	};
}]);
//.config(['$routeProvider', function($routeProvider) {
//  $routeProvider.otherwise({redirectTo: '/view1'});
//}]);