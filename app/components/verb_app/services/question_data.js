var verbApp = angular.module('verbApp');

// Handles all data related to question objects
verbApp.factory('questionData', function() {
    var data = {};

    // Object to represent user input
    data.input = {};

    // List of initial unfiltered conjugations
    data.conjugations = [];

    // Message mode is true, when the questions should not be displayed and, instead, a message should be displayed
    data.alert = { visible: false, message: null };


    return data;
})
