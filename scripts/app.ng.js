'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
//  'ngRoute'
])
.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.hello = 'hello';
	$http.get("/api/infos").then(function(data){
		$scope.info = angular.fromJson(data.data)[0];
	});
	
	$scope.flip = function(){
		$http.post("/api/infos/1", {elevenses: $scope.elevenses});
	};
}]);
//.config(['$routeProvider', function($routeProvider) {
//  $routeProvider.otherwise({redirectTo: '/view1'});
//}]);