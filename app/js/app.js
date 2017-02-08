
var moviesApp = angular.module("moviesApp", ['ngRoute', 'ngResource', 'pascalprecht.translate', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

moviesApp.component("movies", {
    templateUrl: 'template/movies.html',
    controller: 'MoviesCtrl'
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
            });

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

}]);

moviesApp.factory('UrlInitializer', ['$routeParams', '$translate', function ($routeParams, $translate) {
    function getUrls() {
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

        return {
            info : url,
            images : urlImages,
            videos : urlVideos
        };
    }

    return {
        getUrls: getUrls
    }
}]);

moviesApp.filter('youtubeEmbedUrl', function ($sce) {
    return function (videoId) {
        return $sce.trustAsResourceUrl('https://www.youtube.com/v/' + videoId);
    };
});