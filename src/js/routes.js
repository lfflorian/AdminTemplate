var app = angular.module('App', [require('angular-route')]);

var ubicacionPaginas = './views/';

app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'HomeController',
        templateUrl: ubicacionPaginas + 'home.html'
    })
})

module.exports = app