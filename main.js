var app = angular.module('arabicSite', ['ui.router', 'ngAnimate', 'verbApp']);

app.run(function ($rootScope) {
    $rootScope._ = window._;
});

app.config(function($urlRouterProvider) {
    // This redirects to the conjugator app when the base url is entered
    $urlRouterProvider.when('', '/conjugation_practice');
})

// Check if a new cache is available on page load.
// This is needed because when I do git push origin master and user accesses page, the old cached page is served and the new update is not
// reflected.
window.addEventListener('load', function(e) {

    window.applicationCache.addEventListener('updateready', function(e) {
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
            // Browser downloaded a new app cache.
            // Swap it in and reload the page to get the new hotness.
            window.applicationCache.swapCache();
            if (confirm('A new version of this site is available. Load it?')) {
                window.location.reload();
            }
        } else {
            // Manifest didn't changed. Nothing new to server.
        }
    }, false);

}, false);
