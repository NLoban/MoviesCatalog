'use strict';

var moviesApp = angular.module("moviesApp", ['ngRoute']);


moviesApp.component("movies", {
  templateUrl: 'template/movies.html',
  controller: 'MoviesCtrl',
  controllerAs: 'MoviesCtrl'
});

moviesApp.component("movieDetails", {
  templateUrl: 'template/movie-details.html',
  controller: 'MovieDetailsCtrl',
  controllerAs: 'MovieDetailsCtrl'
});

moviesApp.config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
      when('/popular', {
        template: '<movies></movies>'
      }).
      when('/movie/:movieId', {
        template: '<movie-details></movie-details>'
      }).
      otherwise('/');
  }
]);

moviesApp.controller('MoviesCtrl', ['$http', function($http) {
	var self = this;
  var url = 'https://api.themoviedb.org/3/movie/popular?api_key=8ca72ae90f15b5d823a990ab310a5160';
  InitializeData($http, self, url);
}]);

moviesApp.controller('MovieDetailsCtrl', ['$http', '$routeParams', function($http, $routeParams) {
	var self = this;
  var url = 'https://api.themoviedb.org/3/movie/' + $routeParams.movieId + '?api_key=8ca72ae90f15b5d823a990ab310a5160&language=en-US';
  InitializeData($http, self, url);
}]);

function InitializeData($http, scopeVariable, url) {
  // var self = scopeVariable;
	$http({
		method: 'GET', 
		url: url
	}).then(function(response) {
      scopeVariable.status = response.status;
      scopeVariable.data  = response.data.results === undefined ? response.data : response.data.results;
    }, function(response) {
      scopeVariable.data = response.data.result || 'Request failed';
      scopeVariable.status = response.status;
  });  
}


		// url: 'https://api.themoviedb.org/4/list/1?api_key=8ca72ae90f15b5d823a990ab310a5160'
    // 'https://api.themoviedb.org/3/movie/:movieId?api_key=8ca72ae90f15b5d823a990ab310a5160&language=en-US'