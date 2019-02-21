import '../css/main.scss';
import 'jquery';
import 'bootstrap';
import './Dashboard';
import 'angular';

var app = angular.module('App', []);

var myCtrl = require('./Controllers/myCtrl');
app.controller('myCtrl', myCtrl);

