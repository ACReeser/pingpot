'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
//  'ngRoute'
])
.controller('MainCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    var debug = window.location.port != 80 && window.location.port != 443;

    if (debug) {
        $scope.supplies = {
            creamer: ['Alex', 'Landon', 'Ben'],
            sugar: ['Alex', 'Landon', 'Ben'],
            coffee: ['Alex', 'Landon', 'Ben'],
        }
    }

    $scope.pot = {
        cupsLeft: 12,
        fillLevel: 75,
        burnerClass: ""
    };

    $scope.signalClass = {};

    //#region chat

    //$scope.chatting = false;
    //$scope.nickname = "";
    //$scope.allChats = "";

    //var currentPeer;
    //$scope.connectToChat = function () {
    //    currentPeer = new peer($scope.nickname, function (newChat) {
    //        $scope.allChats += newChat;
    //    });
    //    $scope.chatting = true;
    //}

    //$scope.send = function () {
    //    $scope.newChat = "";
    //    currentPeer.send($scope.newChat);
    //}

    //#endregion

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
        $scope.signalClass = { active: true };
        $timeout(signalOne, 250);
    }

    function signalOne() {
        $scope.signalClass.one = true;
        $timeout(signalTwo, 250);
    }

    function signalTwo() {
        $scope.signalClass.two = true;
        $timeout(function () {
            if (!signalling) {
                $scope.signalClass = {};
            } else {
                $scope.signalClass = { active: true };
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
                updateBurner();
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

    $scope.cycleSupply = function (person, type) {
        if (confirm(person + " brought in more " + type + "?")) {
            $http.post('/api/supplies?supplyType=' + type, { 'person': person }).success(pollSupplies);
        }
    };

    var potModal = '<div id="pot-modal"><button class="btn-success" ng-click="hide()"></button></div>';

    $scope.potModal = function () {
        //do things
    };
}])
//.factory('peer', [function () {
//    var service = function (nickname, callback) {
//        this.nickname = nickname;
//        this.callback = callback;
//        this.peer = new Peer('pingpot-chat-'+nickname, { key: 'k031yumxu75h4cxr' });
//        var conn = this.peer.connect('pingpot-chat-alex');
//        this.peer.on('open', function () {
//            conn.send(this.nickname + ' has joined chat');
//        }.bind(this));
//        conn.on('data', function (data) {
//            console.log(data);
//            if (this.callback)
//                this.callback(data);
//        }.bind(this));

//        this.connection = conn;
//    };

//    service.prototype.send = function (newChat) {
//        this.connection.send(this.nickname + ": "+newChat);
//    }

//    return service;
//}]);
//.config(['$routeProvider', function($routeProvider) {
//  $routeProvider.otherwise({redirectTo: '/view1'});
//}]);