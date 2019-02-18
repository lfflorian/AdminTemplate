import '../css/main.scss';
import 'bootstrap';
import 'jquery';
import 'angular';

var app = angular.module('App', []);

app.controller('myCtrl', function($scope) {
    $scope.firstName= "Prueba de angujarJS";
  });
