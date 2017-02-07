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

moviesApp.controller('MoviesCtrl', ['$http', '$routeParams', '$q', 'DataInitializer', 
function($http, $routeParams, $q, DataInitializer) {
	var self = this;
  var url = 'https://api.themoviedb.org/3/' 
            + $routeParams.type 
            + '/' 
            + $routeParams.category 
            + '?api_key=8ca72ae90f15b5d823a990ab310a5160';

  DataInitializer.getItems(url).then(function (result) {
    self.data = result;
  });
  self.type = $routeParams.type;
}]);

moviesApp.controller('MovieDetailsCtrl', ['$http', '$routeParams', '$q', 'DataInitializer', 
function($http, $routeParams, $q, DataInitializer) {
	var self = this;
  var url = 'https://api.themoviedb.org/3/' 
            + $routeParams.type 
            + '/' 
            + $routeParams.movieId 
            + '?api_key=8ca72ae90f15b5d823a990ab310a5160&language=en-US';
  DataInitializer.getItems(url).then(function (result) {
    self.data = result;
  });
}]);

    // https://api.themoviedb.org/3/discover/movie?api_key=8ca72ae90f15b5d823a990ab310a5160
		// url: 'https://api.themoviedb.org/4/list/1?api_key=8ca72ae90f15b5d823a990ab310a5160'
    // 'https://api.themoviedb.org/3/movie/:movieId?api_key=8ca72ae90f15b5d823a990ab310a5160&language=en-US'