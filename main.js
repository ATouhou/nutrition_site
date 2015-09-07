var app = angular.module('arabicSite', ['ui.router', 'ngAnimate', 'verbApp']);

app.run(function ($rootScope) {
    $rootScope._ = window._;
});

app.config(function($urlRouterProvider) {
    // This redirects to the conjugator app when the base url is entered
    $urlRouterProvider.when('', '/conjugation_practice');
})

