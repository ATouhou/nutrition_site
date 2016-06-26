var app = angular.module('arabicSite');

app.controller('rootCtrl', function($scope) {
    $scope._ = _;


    $scope.submitForm = function() {
        alert('form submitted!');
    }

})

