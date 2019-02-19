import '../css/main.scss';
import 'bootstrap';
import 'jquery';
import 'angular';

var app = angular.module('App', []);

var myCtrl = require('./Controllers/myCtrl');
app.controller('myCtrl', myCtrl);