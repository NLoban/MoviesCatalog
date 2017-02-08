
var moviesApp = angular.module("moviesApp", ['ngRoute', 'ngResource', 'pascalprecht.translate']);

moviesApp.component("movies", {
    templateUrl: 'template/movies.html',
    controller: 'MoviesCtrl',
    controllerAs: 'MoviesCtrl'
});

moviesApp.component("movieDetails", {
    templateUrl: 'template/movie-details.html',
    controller: 'MovieDetailsCtrl'
});

moviesApp.config(['$locationProvider', '$routeProvider', '$translateProvider',
    function config($locationProvider, $routeProvider, $translateProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
            when('/:type/:category', {
                template: '<movies></movies>'
            }).
            when('/:type/details/:movieId', {
                template: '<movie-details></movie-details>'
            }).
            otherwise('/');

        $translateProvider.useStaticFilesLoader({
            prefix: '/resources/translation_',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('en');
    }
]);

moviesApp.factory('DataInitializer', ['$http', '$q', function ($http, $q) {

    function getItems(url) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: url
        }).then(function (response) {
            deferred.resolve(response.data.results === undefined ? response.data : response.data.results);
        }, function (response) {
            deferred.reject('Request failed');
        });
        return deferred.promise;
    }

    return {
        getItems: getItems
    }

}])