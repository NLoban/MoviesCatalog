'use strict';

moviesApp.controller('MainCtrl', ['$translate', '$route', function ($translate, $route) {
  var self = this;
  this.changeLanguage = function (language) {
    $translate.use(language);
    self.selectedLanguage = language;
    $route.reload();
  };

  this.selectedLanguage = 'en';
}]);

moviesApp.controller('MoviesCtrl', ['$http', '$routeParams', '$q', 'DataInitializer', '$translate',
  function ($http, $routeParams, $q, DataInitializer, $translate) {
    var self = this;
    var selectedLanguage = $translate.use();
    var url = 'https://api.themoviedb.org/3/'
      + $routeParams.type
      + '/'
      + $routeParams.category
      + '?api_key=8ca72ae90f15b5d823a990ab310a5160&language='
      + selectedLanguage;

    DataInitializer.getItems(url).then(function (result) {
      self.data = result;
    });
    self.type = $routeParams.type;
  }]);

moviesApp.controller('MovieDetailsCtrl', ['$http', '$routeParams', '$q', 'DataInitializer', '$translate',
  function ($http, $routeParams, $q, DataInitializer, $translate) {
    var self = this;
    var selectedLanguage = $translate.use();
    var url = 'https://api.themoviedb.org/3/'
      + $routeParams.type
      + '/'
      + $routeParams.movieId
      + '?api_key=8ca72ae90f15b5d823a990ab310a5160&language='
      + selectedLanguage;
      
    var urlImages = 'https://api.themoviedb.org/3/'
      + $routeParams.type
      + '/'
      + $routeParams.movieId
      + '/images?api_key=8ca72ae90f15b5d823a990ab310a5160&language='
      + selectedLanguage;

      
    var urlVideos = 'https://api.themoviedb.org/3/'
      + $routeParams.type
      + '/'
      + $routeParams.movieId
      + '/videos?api_key=8ca72ae90f15b5d823a990ab310a5160&language='
      + selectedLanguage;

      console.log(urlImages);
    DataInitializer.getItems(url).then(function (result) {
      self.data = result;
    });

    DataInitializer.getItems(urlImages).then(function (result) {
      self.images = result;
    });

    DataInitializer.getItems(urlVideos).then(function (result) {
      self.videos = result;
    });
  }]);

    // https://api.themoviedb.org/3/discover/movie?api_key=8ca72ae90f15b5d823a990ab310a5160
		// url: 'https://api.themoviedb.org/4/list/1?api_key=8ca72ae90f15b5d823a990ab310a5160'
    // 'https://api.themoviedb.org/3/movie/:movieId?api_key=8ca72ae90f15b5d823a990ab310a5160&language=en-US'