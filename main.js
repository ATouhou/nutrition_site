var app = angular.module('arabicSite', ['ui.router', 'ngAnimate', 'verbApp']);

app.run(function ($rootScope, $state) {
    $rootScope._ = window._;

    $rootScope.$state = $state;
});

app.config(function($urlRouterProvider) {
    // This redirects to the conjugator app when the base url is entered
    $urlRouterProvider.when('', '/conjugation_practice');
})

