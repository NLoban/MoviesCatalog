'use strict';

moviesApp.controller('MainCtrl', ['translationService', function (translationService){
  var self = this;
  this.translate = function(language){
      translationService.getTranslation(self, language === undefined ? self.selectedLanguage : language);
      self.selectedLanguage = language === undefined ? self.selectedLanguage : language;
  };

  this.selectedLanguage = 'en';
  this.translate();  
}]);

moviesApp.controller('MoviesCtrl', ['$http', function($http) {
	var self = this;
  // var url = 'https://api.themoviedb.org/3/movie/popular?api_key=8ca72ae90f15b5d823a990ab310a5160';
  // var url = 'https://api.themoviedb.org/3/discover/movie?api_key=8ca72ae90f15b5d823a990ab310a5160';
  var url = 'https://api.themoviedb.org/4/list/1?api_key=8ca72ae90f15b5d823a990ab310a5160'
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

    // https://api.themoviedb.org/3/discover/movie?api_key=8ca72ae90f15b5d823a990ab310a5160
		// url: 'https://api.themoviedb.org/4/list/1?api_key=8ca72ae90f15b5d823a990ab310a5160'
    // 'https://api.themoviedb.org/3/movie/:movieId?api_key=8ca72ae90f15b5d823a990ab310a5160&language=en-US'