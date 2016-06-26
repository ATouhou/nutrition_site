var app = angular.module('arabicSite', ['ui.router', 'ngMaterial']);

app.run(function ($rootScope, $state) {
    $rootScope._ = window._;

    $rootScope.$state = $state;
});

app.config(function($urlRouterProvider) {
    $urlRouterProvider.when('', '/about');
})

