var moviesApp = angular.module("moviesApp", ['ngRoute', 'ngResource']);

moviesApp.component("movies", {
  templateUrl: 'template/movies.html',
  controller: 'MoviesCtrl',
  controllerAs: 'MoviesCtrl'
});

moviesApp.component("movieDetails", {
  templateUrl: 'template/movie-details.html',
  controller: 'MovieDetailsCtrl'
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

moviesApp.service('translationService', function($resource) {  
    this.getTranslation = function($scope, language) {
        var languageFilePath = 'resources/translation_' + language + '.json';
        console.log(languageFilePath);
        $resource(languageFilePath).get(function (data) {
            $scope.translation = data;
        });
    };
});