'use strict';

// Declare app level module which depends on views, and components
angular.module('My_Contacts', [
  'ngRoute',
  'firebase',
  'My_Contacts.contacts'
  
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
