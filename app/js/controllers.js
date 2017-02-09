'use strict';

moviesApp.controller('MainCtrl', ['$translate', '$route', function ($translate, $route) {
  var self = this;
  this.changeLanguage = function (language) {
    $translate.use(language);
    self.selectedLanguage = language;
    storage.set('language', language);
    $route.reload();
  };

  this.selectedLanguage = storage.get('language', 'en');
}]);

moviesApp.controller('MoviesCtrl', ['$http', '$routeParams', '$q', 'DataInitializer', '$translate',
  function ($http, $routeParams, $q, DataInitializer, $translate) {
    var self = this;
    var selectedLanguage = storage.get('language');
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

moviesApp.controller('MovieDetailsCtrl', ['$http', '$routeParams', '$q', 'DataInitializer', 'UrlInitializer', '$translate',
  function ($http, $routeParams, $q, DataInitializer, UrlInitializer, $translate) {
    var self = this;
    var urls = UrlInitializer.getUrls();

    DataInitializer.getItems(urls.info).then(function (result) {
      self.data = result;
    });

    DataInitializer.getItems(urls.images).then(function (result) {
      self.images = result;
    });

    DataInitializer.getItems(urls.videos).then(function (result) {
      self.videos = result;
    });
  }]);

    // https://api.themoviedb.org/3/discover/movie?api_key=8ca72ae90f15b5d823a990ab310a5160
		// url: 'https://api.themoviedb.org/4/list/1?api_key=8ca72ae90f15b5d823a990ab310a5160'
    // 'https://api.themoviedb.org/3/movie/:movieId?api_key=8ca72ae90f15b5d823a990ab310a5160&language=en-US'