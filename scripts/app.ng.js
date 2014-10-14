'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
//  'ngRoute'
])
.controller('MainCtrl', ['$scope', '$http', '$timeout',function($scope, $http, $timeout) {
	$scope.pot = {
		cupsLeft: 12,
		fillLevel: 75,
		burnerClass: ""
	};

	$scope.signalClass = {};

	function signalOne() {
	    $scope.signalClass.one = true;
	    $timeout(signalTwo, 250);
	}

	function signalTwo() {
	    $scope.signalClass.two = true;
	    $timeout(function () {
	        if ($scope.stopSignal) {
	            $scope.stopSignal = false;
	            $scope.signalClass = {};
	        } else {
	            $scope.signalClass = { active: true };
	            $timeout(signalOne, 250);
	        }
	    }, 250);
	}

	function get(url) {
	    $scope.signalClass = { active: true };
	    $timeout(signalOne, 250);
	    return $http.get(url).then(function (data) {
	        $scope.stopSignal = true;
	        return data;
	    }, function () {
	        $scope.stopSignal = true;
	    });
	}


	get("/api/infos/creamer").then(function (data) {
        if (data)
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