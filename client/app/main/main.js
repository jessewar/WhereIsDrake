'use strict';

angular.module('whereisdrakeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });