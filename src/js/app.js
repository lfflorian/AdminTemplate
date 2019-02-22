import '../css/main.scss';
import 'jquery';
import 'bootstrap';
import './Dashboard';
import 'angular';

var app = require('./routes');

var Home = require('./Controllers/HomeController');
app.controller('HomeController', Home);

