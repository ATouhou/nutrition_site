var verbApp = angular.module('verbApp');

// Handles all data related to question objects
verbApp.factory('questionData', function() {
    var data = {};

    // Object to represent user input
    data.input = {};

    // List of initial unfiltered conjugations
    data.conjugations = [];

    return data;
})
