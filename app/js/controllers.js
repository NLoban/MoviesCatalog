'use strict';

var moviesApp = angular.module("moviesApp", []);

moviesApp.controller('mainCtrl', ['$http', function($http) {
	var self = this;
	$http({
		method: 'GET', 
		// url: 'https://api.themoviedb.org/4/list/1?api_key=8ca72ae90f15b5d823a990ab310a5160'
		url: 'https://api.themoviedb.org/3/movie/popular?api_key=8ca72ae90f15b5d823a990ab310a5160'
	}).then(function(response) {
          self.status = response.status;
          self.cinemas  = response.data.results;
        }, function(response) {
          self.cinemas = response.data.result || 'Request failed';
          self.status = response.status;
      });
        console.log(this.cinemas);
        // 'https://image.tmdb.org/t/p/w500/'
}]);