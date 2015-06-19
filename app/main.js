var app = angular.module('arabicSite', ['ui.router', 'verbApp']);

app.run(function ($rootScope) {
    $rootScope._ = window._;
});

