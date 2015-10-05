var app = angular.module('arabicSite');

app.controller('rootCtrl', function($scope) {
    $scope._ = _;

    $scope.globals = {};
    $scope.globals.count = 0;
})

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

