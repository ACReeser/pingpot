'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
//  'ngRoute'
])
.controller('MainCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $scope.pot = {
        cupsLeft: 12,
        fillLevel: 75,
        burnerClass: ""
    };

    $scope.supplies = {};

    $scope.signalClass = {};
    
    var signalCounter = 0,
        signalling = false;

    function setSignal(isOn) {
        if (isOn)
            signalCounter++;
        else
            signalCounter--;

        var newSignalling = (signalCounter > 0);

        if (!signalling && newSignalling)
            startSignalling();

        signalling = newSignalling;
    }

    function startSignalling() {
        $scope.signalClass = { one: true };
        $timeout(signalOne, 250);
    }

    function signalOne() {
        $scope.signalClass.two = true;
        $timeout(signalTwo, 250);
    }

    function signalTwo() {
        $scope.signalClass.three = true;
        $timeout(function () {
            if (!signalling) {
                $scope.signalClass = {};
            } else {
                $scope.signalClass = { one: true };
                $timeout(signalOne, 250);
            }
        }, 250);
    }


    function get(url) {
        setSignal(true);
        return $http.get(url).then(function (data) {
            setSignal(false);
            return data;
        }, function () {
            setSignal(false);
        });
    }

    var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1V8BhXncxTu0gHfmRFlvSGZnjo-QORDpEDSjjVWRMXYc/pubhtml';
    var previousPollSupply = null;
    function pollSupplies() {
        if (previousPollSupply)
            $timeout.cancel(previousPollSupply);

        Tabletop.init({
            key: public_spreadsheet_url,
            callback: function (data, tabletop) {
                $scope.supplies.coffee = data.Coffee.elements.reverse();
                $scope.supplies.creamer = data.Creamer.elements.reverse();
                $scope.supplies.sugar = data.Sugar.elements.reverse();
                $scope.$apply();
            }
        });
        previousPollSupply = $timeout(pollSupplies, 120000); //every 2 minutes
    }
    pollSupplies();

    var previousPollPot;
    function pollPot() {
        if (previousPollPot)
            $timeout.cancel(previousPollPot);

        get("/api/pot").then(function (data) {
            if (data) {
                var newPot = angular.fromJson(data.data);
                $scope.pot = newPot;
                $timeout(updateBurner, 0);
                updateFillLevel();
            }
        });
        previousPollPot = $timeout(pollPot, 30000); //every 30s
    }
    pollPot();

    function updateFillLevel() {
        //ceiling is 75;
        $scope.pot.fillLevel = 7 + Math.floor(($scope.pot.cupsLeft * (69 / 12)));
    }

    $scope.dropLevel = function () {
        if ($scope.pot.cupsLeft == 0)
            $scope.pot.cupsLeft = 12;
        else
            $scope.pot.cupsLeft -= 1;
        updateFillLevel();
        $http.post("api/pot/"+$scope.pot.Id, $scope.pot);
    }

    var burnerStates = ["", "hot", "warm"];
    var burnerColors = { "": "black", "hot": "red", "warm": "orange" }
    var currentBurnerState = 0;
    function updateBurner() {
        $scope.burnerClass = $scope.pot.heatLevel;
        $("#svgBurner").css("stroke", burnerColors[$scope.burnerClass]);
    }

    $scope.cycleBurner = function () {
        var oldIndex = burnerStates.indexOf($scope.pot.heatLevel || "");
        var newIndex = oldIndex + 1;
        if (newIndex > burnerStates.length - 1)
            newIndex = 0;

        $scope.pot.heatLevel = burnerStates[newIndex];

        updateBurner();
        $http.post("api/pot/"+$scope.pot.Id, $scope.pot);
    };

    //not implemented yet
    $scope.cycleSupply = function (person, type) {
        if (confirm(person + " brought in more " + type + "?")) {
            $http.post('/api/supplies?supplyType=' + type, { 'person': person }).success(pollSupplies);
        }
    };


    var muggySayings = [
        "coffee is brain juice!",
        "arabica = awesome!",
        "how 'bout a cuppa joe?",
        "where's the creamer at?",
        "i'm a talking mug!",
        "mooooooore coffeeeee",
        "nectar of the gods!",
        "empty mugs = sad mugs"
    ];

    $scope.showMuggySaying = function () {
        $("#muggText").text(muggySayings[Math.floor(Math.random() * (muggySayings.length))]);
        $timeout($scope.showMuggySaying, 5000);
    }

    $timeout($scope.showMuggySaying, 3000);

}])