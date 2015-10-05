var app = angular.module('arabicSite', ['ui.router', 'ngAnimate', 'verbApp']);

app.run(function ($rootScope) {
    $rootScope._ = window._;
});

app.config(function($urlRouterProvider) {
    // This redirects to the conjugator app when the base url is entered
    $urlRouterProvider.when('', '/conjugation_practice');
})

;var verbApp = angular.module('verbApp', [])

;var app = angular.module('arabicSite');

app.controller('rootCtrl', function($scope) {
    $scope._ = _;

    $scope.globals = {};
    $scope.globals.count = 0;
})

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

;var verbApp = angular.module('verbApp');

verbApp.controller('typingTutorCtrl', function($scope, $document) {
    $scope.letterGroups = ["ا - ل", "ت - ب", "ن - ي", "م - س", "ط - ك - ش", "غ - ف", "ع - ق", "ه - ث", "خ - ص", "ح - ض",
        "د - ج", "ى - ذ", "ة - ر", "و - ؤ", "ز - ء", "ظ - ئ", "أ - إ - آ", "-َ -ِ -ُ"]

    $scope.range1 = _.range(1, 10);
    $scope.range2 = _.range(10, 18);

    angular.element($document).ready(function () {
        if ($("#gameCanvas").length === 1)
        {

            //$('span').tooltip();
            var startButton = $("#startButton");
            var stopButton = $("#stopButton");
            var showKeyboardButton = $("#show-keyboard");
            var hideKeyboardButton = $("#hide-keyboard");

            var canvas = $("#gameCanvas");
            var context = canvas.get(0).getContext("2d");
            // have to use monospace font for Arabic to work correctly
            context.font = "bold 30px 'courier new'"

            // Canvas dimensions
            var canvasWidth = canvas.width();
            var canvasHeight = canvas.height();
            var paused = true;
            // so that levels are selectable when game is paused but not when there is an alert box present
            // thus, create second boolean variable
            var clickableLevels = false;
            var sentenceY = 100;
            var sentenceClearBoundary = 110;

            // create a game object which keeps track of sentences, sentenceNumber, correctCount, etc
            var Game = function() {

                this.pauseGame = function()
                {
                    paused = true;
                    $(window).unbind("keypress");
                }

                this.getSentences = function(level) {
                    // lines is an array of sentences
                    var result = false;
                    var textFile = "/static/typing_tutor/level" + level + ".html";
                    $.ajax({
                        url: textFile,
                        success: function(text) { result = text; },
                        async: false
                    });
                    var sentences = result.split("\n");
                    // subtract 1 because it seems include an empty string
                    this.totalSentences = sentences.length - 1;
                    this.remainingSentences = this.totalSentences;
                    return sentences;
                }

                this.sentenceNumber = 0;
                this.currentLevel = 1;
                this.sentences = this.getSentences(1);
                this.correctSentences = 0;
                this.points = 0;
                this.totalSentences;
                this.remainingSentences;
                this.totalLevels = 16;

                this.getAllLevels = function() {
                    var levelList = [];
                    for (var j = 1; j <= this.totalLevels; j++)
                    {
                        levelList.push(j);
                    }
                    return levelList;
                }

                this.allLevels = this.getAllLevels();
                // no level have been completed upon starting the game
                this.completedLevels = [];

                // add points and update remaining sentences
                this.addPoints = function() {
                    this.correctSentences += 1;
                    this.points += 5
                    this.remainingSentences -= 1;
                    gameElements.gameDisplay.updateScore(this.points);
                    gameElements.gameDisplay.updateRemainingSentences();
                }

                this.getUserLetter = function(e) {
                    var charCode = e.which; // charCode will contain the code of the character inputted
                    var letter = String.fromCharCode(charCode); // theChar will contain the actual character
                    return letter;
                }

                this.clearCanvas = function() {
                    context.clearRect(0, 0, canvasWidth, sentenceClearBoundary);
                }

                this.showNextSentence = function(newLevel) {

                    if (newLevel === true) { this.sentenceNumber = 0; }
                    else
                    {
                        this.sentenceNumber += 1;
                    }

                    if (this.checkIfLastSentence() === true)
                    {
                        this.handleLastSentence();
                    }
                    else
                    {
                        if (paused !== true || clickableLevels === true)
                        {
                            gameElements.sentence = new Sentence(gameElements.game.sentences[gameElements.game.sentenceNumber]);
                            this.clearCanvas();
                            gameElements.cover.restartCover();
                            gameElements.sentence.redraw();
                        }
                    }
                }

                this.checkIfLastSentence = function() {
                    if (this.sentenceNumber > this.totalSentences - 1) { return true; }
                    else { return false; }
                }

                this.handleLastSentence = function() {
                    // if the user got everything correct, then move to the next incomplete level (if there are any more)
                    if (this.totalSentences === this.correctSentences)
                    {
                        var nextLevel = this.getNextLevel();
                        if (nextLevel === 0)
                        {
                            gameElements.gameDisplay.gameCompletionAlert();
                            newGame();
                        }
                        else
                        {
                            this.markLevelAsCompleted(this.currentLevel);
                            gameElements.gameDisplay.levelCompletionAlert(this.currentLevel);
                            this.newLevel(nextLevel)
                        }
                    }
                    else
                    {
                        // repeat the same level
                        gameElements.gameDisplay.levelRestartAlert(this.currentLevel);
                        this.newLevel(this.currentLevel);
                    }
                }

                this.markLevelAsCompleted = function() {
                    // if the completedLevel array doesn't already have the currentLevel in it, then and only then you can add it.
                    if ($.inArray(this.currentLevel, this.completedLevels) === -1)
                    {
                        this.completedLevels.push(this.currentLevel);
                        gameElements.gameDisplay.colorCompletedLevelBox();
                    }
                }

                this.newLevel = function(level) {
                    this.currentLevel = level;
                    gameElements.gameDisplay.updateLevel();
                    this.correctSentences = 0;
                    this.sentences = this.getSentences(level);
                    gameElements.gameDisplay.updateRemainingSentences();
                    this.showNextSentence(true);
                }

                this.getNextLevel = function() {
                    // including the current level, which this.completedLevels does not yet include
                    var allCompletedLevels = (this.completedLevels.concat(this.currentLevel)).sort(sortFunction);
                    if (this.allLevels.sort(sortFunction).join(",") === allCompletedLevels.join(","))
                    {
                        return 0;
                    }
                    else
                    {
                        // make a shallow copy of the the allLevels array
                        var incompleteLevels = this.allLevels.slice();
                        for (var i = 0; i < allCompletedLevels.length; i++)
                        {
                            var level = allCompletedLevels[i];
                            var indexToRemove = incompleteLevels.indexOf(level);
                            incompleteLevels.splice(indexToRemove, 1);
                        }
                        // go to the next possible level
                        var nextLevelIndex = incompleteLevels.indexOf(this.currentLevel + 1)
                        var nextLevel = incompleteLevels[nextLevelIndex]
                        // if there is no larger level, loop back to the beginning of the array
                        if (nextLevel === undefined)
                        {
                            nextLevel = incompleteLevels[0];
                        }
                        return nextLevel;
                    }
                }
            }

            /// for numerical sorting
            function sortFunction(a, b){
                return (a - b) //causes an array to be sorted numerically and ascending
            }

            var GameDisplay = function() {
                this.alertDiv = $("#game-start");
                this.keyboardImage = $("#arabic-keyboard")
                this.alertDelay = 2000;
                this.score = $("#score");
                var _this = this;
                this.updateScore = function(points) {
                    // update the UI to display the new score
                    this.score.html(points);
                }

                this.initializeScore = function() {
                    this.score.html(0);
                }

                this.updateRemainingSentences = function() {
                    $("#lines-remaining").html(gameElements.game.remainingSentences);
                }

                this.updateLevel = function() {
                    // make all other level boxes inactive
                    $(".levelBox").removeClass("currentLevel");
                    // make the new level box active
                    $("#levelBox_" + gameElements.game.currentLevel).addClass("currentLevel");
                }


                this.colorCompletedLevelBox = function() {
                    $("#levelBox_" + gameElements.game.currentLevel).addClass("completedLevel");
                }

                this.initializeCurrentLevel = function() {
                    $("#levelBox_1").addClass("currentLevel");
                }

                this.initializeRemainingSentences = function() {
                    $("#lines-remaining").html(gameElements.game.remainingSentences);
                }

                this.initializeDifficultyLevel = function() {
                    var difficultyOptions = '<a class="btn dropdown-toggle current-option" data-toggle="dropdown" href="#" id="Beginner">' +
                        'Beginner<span class="caret"></span></a><ul class="dropdown-menu" id="difficulty-option">' +
                        '<li><a href="#" id="Intermediate">Intermediate</a></li>' +
                        '<li><a href="#" id="Advanced">Advanced</a></li></ul>'
                    $("#difficulty-level-div").html(difficultyOptions);
                }

                this.levelCompletionAlert = function(level) {
                    var message = "Good job! You completed level " + level + ".";
                    this.displayMessage(message, "Okay");
                }

                // where user reaches the end of a level but didn't get all the sentences correct
                this.levelRestartAlert = function() {
                    var message = "Good try but you didn't pass the level. Try again!";
                    this.displayMessage(message, "Okay");
                }

                this.gameCompletionAlert = function() {
                    var message = "Congratulations! You have completed all of the levels!";
                    this.displayMessage(message, "Start New Game");
                }

                this.displayMessage = function(message, buttonMessage) {
                    var _this = this;
                    startButton.hide();
                    stopButton.hide();
                    var message = message + '<br /><br /><button class="btn btn-default" type="button" id="okay">' + buttonMessage + '</button>'
                    $('#message-div').show();
                    $('#message-div').html(message);
                    this.alertDiv.css("z-index", 10);
                    gameElements.game.pauseGame();
                    clickableLevels = false;
                    $("#okay").on("mouseup", function() {
                        // why is this being triggered in chrome? That's basically the issue here!!!
                        _this.moveAlertBack();
                    })
                }

                this.moveAlertBack = function() {
                    $('#message-div').hide();
                    this.alertDiv.css("z-index", -2);
                    paused = false;
                    clickableLevelLevels = true;
                    stopButton.show();
                    gameElements.game.showNextSentence(true);
                    runGame();
                }

                this.reinitializeUi = function() {
                    $(".levelBox").removeClass("currentLevel");
                    $(".levelBox").removeClass("completedLevel");
                    this.initializeCurrentLevel();
                    this.initializeRemainingSentences();
                    this.initializeScore();
                    this.initializeDifficultyLevel();
                }

                this.showKeyboard = function() {
                    showKeyboardButton.hide();
                    hideKeyboardButton.show();
                    this.keyboardImage.css("z-index", 1);
                }

                this.hideKeyboard = function() {
                    hideKeyboardButton.hide();
                    showKeyboardButton.show();
                    this.keyboardImage.css("z-index", -10);
                }

                this.initializeCurrentLevel();
            }


            var Cover = function() {
                this.x = 0;
                this.initialY = canvasHeight;
                this.y = this.initialY;
                this.boundary = sentenceClearBoundary;
                this.levelToSpeed = {"Beginner": 0.1, "Intermediate": 0.3, "Advanced": 0.6}
                this.speed = this.levelToSpeed["Beginner"];

                this.setState = function() {
                    //context.fillStyle = "rgba(0, 195, 209, 1)";
                    context.fillStyle = "rgba(192, 192, 192, 1)";
                }

                this.update = function() {
                    this.setState();
                    context.clearRect(0, this.boundary, canvasWidth, canvasHeight);
                    context.fillRect(this.x, this.y, 940, 500);
                    this.y = this.y - this.speed;
                    if (this.y < (gameElements.sentence.y - 20))
                    {
                        gameElements.game.showNextSentence();
                        this.restartCover();
                    }
                }

                this.restartCover = function() {
                    this.y = this.initialY;
                }

                this.changeSpeed = function(difficultyLevel) {
                    this.speed = this.levelToSpeed[difficultyLevel]
                }
            }

            var Sentence = function(sentenceString) {
                this.sentenceString = sentenceString;
                this.correctCount = 0;
                this.y = 100;
                this.x = canvasWidth - 30;

                this.getLetters = function() {
                    var letters = sentenceString.split("");
                    return letters;
                }

                this.letters = this.getLetters();

                this.setState = function() {
                    context.fillStyle = "rgba(45, 39, 97, 1)";
                }

                this.redraw = function() {
                    this.setState();
                    context.fillText (sentenceString, this.x, this.y);
                }

                this.getCurrentSnippet = function() {
                    return this.letters.slice(0, this.correctCount).join("");
                }
            }

            var Highlighter = function() {
                this.width = 0;

                this.setState = function() {
                    context.fillStyle = "rgba(255, 204, 0, 0.5)";
                }

                this.highlight = function(currentSnippet) {
                    this.width = -(context.measureText(currentSnippet).width);
                    this.setState();
                    context.fillRect(gameElements.sentence.x, 75, this.width, 30);
                }
            }

            var InputHandler = function() {
                this.handleCorrectInput = function() {
                    gameElements.game.clearCanvas();
                    gameElements.sentence.redraw();
                    gameElements.sentence.correctCount += 1;
                    currentSnippet = gameElements.sentence.getCurrentSnippet();
                    gameElements.highlighter.highlight(currentSnippet);
                }

                // check if user has completed the sentence such that a new sentence is necessary
                this.checkForNextSentence = function() {
                    if (gameElements.sentence.correctCount === gameElements.sentence.letters.length)
                    {
                        gameElements.game.addPoints();
                        gameElements.game.showNextSentence();
                    }
                    return gameElements.sentence;
                }

                this.handleIncorrectInput = function() {
                }


                $(".levelBox").click(function() {
                    if (paused !== true || clickableLevels === true)
                    {
                        var level = parseInt(this.id.split("_")[1]);
                        gameElements.game.newLevel(level);
                        gameElements.gameDisplay.updateLevel(level);
                    }
                });

                $("#difficulty-option a").click(function(e) {
                    e.preventDefault();
                    var newOptionElement = $(this);
                    var newOption = this.id;

                    // grab selected-option, change it's id and html to newOption
                    var currentOptionElement = $(".current-option")
                    var currentOption = currentOptionElement.attr("id");

                    currentOptionElement.html(newOption + ' <span class="caret"></span>');
                    currentOptionElement.attr("id", newOption);

                    newOptionElement.attr("id", currentOption);
                    newOptionElement.html(currentOption);

                    // change speed of cover
                    gameElements.cover.changeSpeed(newOption);
                });

                showKeyboardButton.click(function() {
                    gameElements.gameDisplay.showKeyboard();
                })

                hideKeyboardButton.click(function() {
                    gameElements.gameDisplay.hideKeyboard();
                })

            }

            Elements = function() {
                this.game = new Game();
                this.sentence = new Sentence(this.game.sentences[this.game.sentenceNumber]);
                this.inputHandler = new InputHandler();
                this.highlighter = new Highlighter();
                this.cover = new Cover();
                this.gameDisplay = new GameDisplay();
            }
            // global object which contains all of the game elements
            gameElements = new Elements();

            function newGame() {
                gameElements.game.pauseGame();
                gameElements.game.clearCanvas();
                // clear all the UI stuff -- score, lines remaining, difficulty level
                // foobar
                gameElements.gameDisplay.reinitializeUi();
                gameElements = new Elements();
                runGame();
            }

            function runGame() {
                function moveCover() {
                    gameElements.cover.update();
                    if (paused !== true) { setTimeout(moveCover, 33); }
                };

                moveCover();
                gameElements.gameDisplay.initializeRemainingSentences();

                if (!paused)
                {
                    gameElements.sentence.redraw();
                    $(window).keypress(function(e) {
                        var letter = gameElements.game.getUserLetter(e);

                        // prevent scrolling when space bar is hit
                        if (letter === " ")
                            e.preventDefault();
                        if (letter === gameElements.sentence.letters[gameElements.sentence.correctCount])
                        {
                            gameElements.inputHandler.handleCorrectInput();
                            gameElements.inputHandler.checkForNextSentence();
                        }
                        // if the wrong letter in input
                        else
                        {
                            gameElements.inputHandler.handleIncorrectInput();
                        }
                    });
                }
            }

            function init(){
                setUpUi();
                runGame();
            }

            function setUpUi(){
                var delay = 200

                startButton.hide();
                stopButton.hide();
                showKeyboardButton.hide();
                hideKeyboardButton.hide();
                $(window).unbind("keypress");

                // set paused to false
                $("#game-start").css("z-index", -1);
                $('#message-div').hide();
                //$("#game-start").hide();
                paused = false;
                clickableLevels = true;
                stopButton.show();
                showKeyboardButton.show();

                startButton.click(function(){
                    $(this).hide();
                    stopButton.show();
                    paused = false;
                    runGame();
                });

                stopButton.click(function(){
                    $(this).hide();
                    startButton.show();
                    paused = true;
                    // unbind the keydown listener
                    $(window).unbind("keypress");
                });
            }

            init();

        }

    });
})



;var verbApp = angular.module('verbApp');

verbApp.controller('conjugatorCtrl', function($scope, conjugator, hamzatedWord, helperData) {
    // hamzated example
    var verb = {
        letter1: 'ق',
        letter2: 'ر',
        letter3: 'ء',
        type: {
            name: 'sound'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ'
    }

    var options = {
        form: 1,
        person: 'thirdPerson',
        gender: 'feminine',
        number: 'plural',
        tense: 'perfect'
    }

    $scope.conjugator = conjugator;
    $scope.conjugator.initialize(verb, options);

    $scope.helperData = helperData;

    // selections made by the user
    $scope.userInput = {};

    $scope.generateVerbs = function(userInput) {
        if (userInput.letter1 && userInput.letter2 && userInput.letter3 && userInput.perfectVowel && userInput.type) {
            $scope.conjugator.setVerb(userInput);
        }
    }
})
;var app = angular.module('verbApp');

app.controller('exercisesCtrl', function($scope, questionsService, thackstonExercises) {

    $scope.questionsService = questionsService;

    $scope.chapterData = {}
    $scope.chapterData.chapters = thackstonExercises.chapters;
    $scope.chapterData.selectedChapter = $scope.chapterData.chapters[0];

    questionsService.questions = thackstonExercises.exercises;

    // Create a shallow copy so that changes to filteredQuestions do not affect the original conjugation list
    // filteredQuestions will be the deck used to display the questions
    questionsService.filteredQuestions = questionsService.questions;

    // Set the current question
    questionsService.questionIndex = 0;
    questionsService.currentQuestion = questionsService.filteredQuestions[questionsService.questionIndex];

    $scope.setFilter = function() {
        questionsService.filteredQuestions = _.filter(questionsService.questions, {'chapter': $scope.chapterData.selectedChapter.name});
        questionsService.updateQuestions();
    }

    $scope.setFilter();
})

;var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData, filterOptions, verbs, questionsService, alertService, verbAppConstants) {
    $scope.questions = questionsService;

    $scope.alert = alertService;

    $scope.helperData = helperData;

    $scope.filterOptions = filterOptions;
    filterOptions.reset();

    $scope.verbs = verbs;

    $scope.conjugator = conjugator;

    $scope.templateDirectory = verbAppConstants.templateDirectory;

    _.forEach($scope.verbs, function(verb) {
        var conjugationSet = conjugator.getConjugations(verb);
        // Add the verb object to it's conjugation set
        _.forEach(conjugationSet, function(cSet) {
            cSet.verb = verb;
        })
        $scope.questions.questions = $scope.questions.questions.concat(conjugationSet);
    })

    // Create a shallow copy so that changes to filteredQuestions do not affect the original conjugation list
    // filteredQuestions will be the deck used to display the questions
    $scope.questions.filteredQuestions = $scope.questions.questions;

    // Set the current question
    $scope.questions.questionIndex = 0;
    $scope.questions.currentQuestion = $scope.questions.filteredQuestions[$scope.questions.questionIndex];

    // This is run if there is any change to any of the filters
    $scope.$watch('filterOptions', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            filterQuestions();
        }
    }, true)

    // This is the function that basically filters the question set
    function filterQuestions() {
        var pronounIds = _.pluck(_.filter($scope.filterOptions.pronouns, {selected: true}), 'id');
        var types = _.pluck(_.filter($scope.filterOptions.types, {selected: true}), 'name');

        var filteredQuestions = _.filter($scope.questions.questions, function(conjugation) {
            if (_.contains(pronounIds, conjugation.id) && _.contains(types, conjugation.verb.type.name)) {
                return true;
            }
        })

        if (filteredQuestions.length === 0) {
            alertService.set('noMatches', 'There are no questions that match your selected filters. Modify your filters to see more questions.');
        }
        else {
            alertService.clear();
            $scope.questions.filteredQuestions = filteredQuestions;
            $scope.questions.updateQuestions();
        }
    }

})

//$scope.textToSpeech = function(text) {
//    var audio = $("#my-audio");
//    audio.attr('src', 'http://translate.google.com/translate_tts?tl=en&q=great&client=t');
//    audio.trigger('pause');
//    audio.trigger('load');
//    audio.trigger('play');
//}

;var verbApp = angular.module('verbApp');

// For checking user input against the correct answer. It compares every key the user enters with the correct answer
verbApp.directive('answerProgress', function($timeout) {
    return {
        restrict: 'A',
        //templateUrl: '',
        scope: {
            answer: '=',
            questionObj: '='
        },
        link: function(scope, elem, attrs) {
            elem.bind('keyup', function(event) {
                // Compare the number of chars input by the user with that many chars in the answer
                var userLetters = scope.questionObj.userAnswer.split('');
                var letters = scope.answer.split('').slice(0, userLetters.length);
                $timeout(function() {
                    if (_.isEqual(userLetters, letters)) {
                        scope.questionObj.userError = false;
                    }
                    else {
                        scope.questionObj.userError = true;
                    }
                })
            })
        }
    }
})
;var verbApp = angular.module('verbApp');

// For checking user input against the correct answer. It compares every key the user enters with the correct answer
verbApp.directive('filterSection', function($timeout, verbAppConstants, filterOptions, questionsService) {
    return {
        restrict: 'E',
        templateUrl: verbAppConstants.templateDirectory + '/filter_section.html' ,
        scope: {
            options: '=',
            title: '@',
            disabled: '='
        },
        link: function(scope, elem, attr) {
            scope.filterOptions = filterOptions;
            scope.questions = questionsService;
        }
    }
})

;var app = angular.module('verbApp');

verbApp.directive('prevNext', function(verbAppConstants, questionsService) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: verbAppConstants.templateDirectory + '/prev_next.html',
        link: function(scope, elem, attrs) {
            scope.questionsService = questionsService;

        }
    }
});var verbApp = angular.module('verbApp');

verbApp.factory('conjugator', function(helperData, hamzatedWord) {
    //c stands for conjugator
    var c = {};

    var tenses = ['perfect', 'imperfect', 'imperative', 'jussive', 'subjunctive'];
    var forms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var persons = ['firstPerson', 'secondPerson', 'thirdPerson'];
    var types = ['sound', 'hollow', 'geminate', 'weakLam', 'assimilated'];
    var genders = ['masculine', 'feminine'];
    var numbers = ['singular', 'dual', 'plural'];

    c.verb;
    c.options;
    c.list;

    c.initialize = function(verb, options) {
        c.verb = verb;
        c.list = getList();
    }

    c.setVerb = function(verb) {
        c.verb = verb;
        c.list = getList();
    }

    // get the complete name of the conjugation e.g. "first person masculine singular perfect" based on the options already specified
    c.getName = function(item) {
        var name = _.startCase(item.person);
        // first person does not have gender so account for that
        if (item.gender) {
            name += ' ' + item.gender;
        }
        name += ' ' + item.number
        return name.toLowerCase();
    }

    c.getConjugations = function(verb) {
        c.verb = verb;
        return getList();
    }

    // Just get a single verb
    c.getVerb = function(verb, id) {
        c.verb = verb;
        var conjugatedVerb;
        switch (c.verb.type.name) {
            case 'sound': conjugatedVerb = getSoundVerb(id); break;
            case 'geminate': conjugatedVerb = getGeminateVerb(id); break;
            case 'hollow': conjugatedVerb = getHollowVerb(id); break;
            case 'defective': conjugatedVerb = getDefectiveVerb(id); break;
            case 'hamzated': conjugatedVerb = getSoundVerb(id); break;
            case 'assimilated': conjugatedVerb = getSoundVerb(id); break;
        }
        if (anyHamzas()) {
            conjugatedVerb = hamzatedWord.getWord(conjugatedVerb);
        }
        return conjugatedVerb;
    }

    //*******************************************
    // Private methods
    //*******************************************
    function getList() {
        var list = angular.copy(helperData.pronounList);
        _.forEach(list, function(pronoun, index) {
            switch (c.verb.type.name) {
                case 'sound': pronoun.perfect = getSoundVerb(pronoun.id); break;
                case 'geminate': pronoun.perfect = getGeminateVerb(pronoun.id); break;
                case 'hollow': pronoun.perfect = getHollowVerb(pronoun.id); break;
                case 'defective': pronoun.perfect = getDefectiveVerb(pronoun.id); break;
                case 'hamzated': pronoun.perfect = getSoundVerb(pronoun.id); break;
                case 'assimilated': pronoun.perfect = getSoundVerb(pronoun.id); break;
            }
            if (anyHamzas()) {
                pronoun.perfect = hamzatedWord.getWord(pronoun.perfect);
            }
        })
        return list
    }

    function anyHamzas() {
        if (c.verb.letter1 === 'ء' || c.verb.letter2 === 'ء' || c.verb.letter3 === 'ء') {
            return true;
        }
        else {
            return false;
        }
    }

    function getDefectiveVerb(id) {
        var verb;
        var soundVerb = getSoundVerb(id);

        if (hasConsonantEnding(id)) {
            verb = soundVerb;
        }
        else if (c.verb.type.type === 'yaa (ya-aa)') {
            verb = getDefectiveType3(id, soundVerb);
        }
        else {
            verb = getDefectiveType1(id, soundVerb);
        }
        return verb;
    }

    function getDefectiveType3(id, soundVerb) {
        // nasiya type verbs are conjugated like sound verbs except for number 12
        var verb;
        if (id === 12) {
            verb = c.verb.letter1 + 'َ' + c.verb.letter2 + 'ُوْا';
        }
        else {
            verb = soundVerb;
        }
        return verb;
    }

    function getDefectiveType1(id, soundVerb) {
        var verb;
        switch (id) {
            case 5:
                var lastLetter = getDefectiveLastLetter();
                verb = c.verb.letter1 + 'َ' + c.verb.letter2 + c.verb.perfectVowel + lastLetter;
                break;
            case 7: verb = soundVerb; break;

            // Note, for 6, 8, 12 the waaw fathah/yaa fathah part of the root simply disappear so get the sound verb and just remove the waaw fathah using regex
            // But yaa fathah (ya-aa) acts like a sound verb here
            case 8:
            case 6:
            case 12:
                // Group 1: first 4 chars, group 2: the chars that need to be removed, group 3: the rest of verb which we'll keep
                var regex = new RegExp('(.{4})' + '(' + c.verb.letter3 + '.)' + '(.*)');
                // Remove the middle group which disappears
                verb = soundVerb.replace(regex, '$1$3');
        }
        return verb;
    }

    function getDefectiveLastLetter() {
        switch (c.verb.type.type) {
            case 'waaw': return 'ا'; break;
            case 'yaa (aa-ii)': return 'ى'; break;
            case 'yaa (ya-aa)': return 'يَ'; break;
        }
    }

    function getHollowVerb(id) {
        // These pronouns keep the alif
        var verb;
        if (hasConsonantEnding(id)) {
            var shortVowel1;
            // This is for نام and خاف type verbs
            if (c.verb.type.type === 'alif') {
                shortVowel1 = 'ِ';
            }
            // This is for hollow waaw or hollow yaa verbs where the short vowel is based on the second root letter
            else {
                shortVowel1 = helperData.longToShort[c.verb.letter2];
            }
            verb = c.verb.letter1 + shortVowel1 + c.verb.letter3 + helperData.endings[id - 1];
        }
        else {
            verb = c.verb.letter1 + 'َا' + c.verb.letter3 + helperData.endings[id - 1];
        }
        return verb;
    }

    function getSoundVerb(id) {
        return c.verb.letter1 + 'َ'+ c.verb.letter2 + c.verb.perfectVowel + c.verb.letter3 + helperData.endings[id - 1];
    }

    function getGeminateVerb(id) {
        if (hasConsonantEnding(id)) {
            return getSoundVerb(id);
        }
        else {
            return c.verb.letter1 + 'َ' + c.verb.letter2 + 'ّ' + helperData.endings[id - 1];
        }
    }

    // 1 - 4, 9, 10, 11, 13 have consonant endings
    function hasConsonantEnding(id) {
        if (_.includes([5,6,7,8,12], id)) {
            return false;
        }
        else {
            return true;
        }
    }

    return c;
})

;var verbApp = angular.module('verbApp');

verbApp.factory('filterOptions', function(helperData) {
    var filterOptions = {};

    filterOptions.types = [{name: 'assimilated'}, {name: 'geminate'}, {name: 'hamzated'}, {name: 'hollow'}, {name: 'defective'}, {name: 'sound'}]
    filterOptions.pronouns = angular.copy(helperData.pronounList);
    filterOptions.forms = [{name: '1', selected: true}, {name: '2'}, {name: '3'}, {name: '4'}, {name: '5'}, {name: '6'}, {name: '7'}, {name: '8'}, {name: '9'}, {name: '10'}]
    filterOptions.tenses = [{name: 'perfect', selected: true}, {name: 'imperfect'}];
    filterOptions.voices = [{name: 'active', selected: true}, {name: 'passive'}];
    filterOptions.moods = [{name: 'indicative', selected: true}, {name: 'subjunctive'}, {name: 'jussive'}, {name: 'imperative'}];

    filterOptions.allTypes = true;
    filterOptions.allPronouns = true;

    // Select or deselect all options of a particular filter
    filterOptions.toggleAll = function(type, value) {
        _.forEach(this[type], function(item) {
            item.selected = value;
        })
    }

    filterOptions.reset = function() {
        _.forEach(filterOptions.pronouns, function(pronoun) {
            pronoun.selected = true;
        })
        _.forEach(filterOptions.types, function(type) {
            type.selected = true;
        })
        filterOptions.allTypes = true;
        filterOptions.allPronouns = true;
    }

    return filterOptions;
})

;var verbApp = angular.module('verbApp');

// Take any word with hamza and put it on the its correct seat
verbApp.factory('hamzatedWord', function() {
    var factory = {};

    // Make wordArray and indexes available to all functions
    var wordArray;
    var indexes;

    factory.getWord = function(word) {
        // Get an array of indexes where hamza is present [0,3] for example
        wordArray = word.split('');
        indexes = getCharIndexes('ء', wordArray);

        checkFirstLetter();

        // Check if there hamzas beyond the first letter
        var moreHamzas = _.some(indexes, function(index) {
            return index > 0;
        })

        if (moreHamzas) {
            _.forEach(indexes, function(index) {
                // This represents the penultimate letter where the case ending is present (or last letter of you think of the case ending as a vowel)
                if (wordArray[wordArray.length - 2] === 'ء') {
                   checkFinalHamza(index);
                }

                else if (isMedialAloof(index)) {}

                else if (wordArray[index + 2] === 'ا') {
                    checkMadd(index);
                }
                else {
                    checkMedialRegular(index);
                }
            })
        }

        return wordArray.join('');
    }

    function checkMadd(index) {
        wordArray[index] = 'آ';
        _.pullAt(wordArray, (index + 1), (index + 2));
    }

    function checkFinalHamza(index) {
       // aloof
        var previousLetter1 = wordArray[index - 1];
        var previousLetter2 = wordArray[index - 2];

        if (previousLetter1 === 'ا' || previousLetter1 === 'ْْْ') {}
        else {
            switch (previousLetter1) {
                case 'َ': wordArray[index] = 'أ'; break;
                case 'ُ': wordArray[index] = 'ؤ'; break;
                case 'ِ': wordArray[index] = 'ئ'; break;
            }
        }
    }

    function checkFirstLetter() {
        // Check if first letter is hamza
        if (_.contains(indexes, 0)) {
            // Fathah or dammah means hamza on top of alif
            if (wordArray[1] === 'َ' || wordArray[1] === 'ُ') {
                wordArray[0] = 'أ';
            }
            // Kasrah means hamza on bottom of alif
            else {
                wordArray[0] = 'إ';
            }
        }
    }

    // Check regular medial rules
    function checkMedialRegular(index) {
        var previousLetter = wordArray[index - 1];
        var nextLetter = wordArray[index + 1];

        // if it's a sukoon, then look at the next one
        if (previousLetter ===  'ْ') {
            previousLetter = wordArray[index - 2];
        }
        // yaa seat
        if ( (previousLetter === 'ي' || previousLetter === 'ِ') || (nextLetter === 'ي' || nextLetter === 'ِ') ) {
            wordArray[index] = 'ئ';
        }
        // waaw seat
        else if ( (previousLetter === 'ُ' || previousLetter === 'و') || (nextLetter === 'ُ' || nextLetter === 'و') ) {
            wordArray[index] = 'ؤ';
        }
        // alif seat
        else {
            wordArray[index] = 'أ';
        }
    }

    function isMedialAloof(index) {
        var previousLetter1 = wordArray[index - 1];
        var previousLetter2 = wordArray[index - 2];
        var previousLetter3 = wordArray[index - 3];
        var nextLetter = wordArray[index + 1];

        // First case: previous, you have sukoon, waaw, then dammah
        // Second case: alif previous, and fathah next
        // If either case is true, then it's medial aloof
        if ( (previousLetter1 === 'ْ'&& previousLetter2 === 'و' && previousLetter3 === 'ُ') || (previousLetter1 === 'ا' && nextLetter === 'َ') ) {
            return true;
        }
        else {
            return false;
        }
    }

    function getCharIndexes(char, list) {
        var indexList = [];
        for(var i=0; i < list.length;i++) {
            if (list[i] === char) {
                indexList.push(i)
            };
        }
        return indexList;
    }
    return factory;
})

;var verbApp = angular.module('verbApp');

// General verb related helper data
verbApp.value('helperData', {
        pronounList: [
                { id: 1, pronoun: 'أنا', person: 'first person', number: 'singular', perfect: ''},
                { id: 2, pronoun: 'أنْتَ', person: 'second person', gender: 'masculine', number: 'singular', perfect: ''},
                { id: 3, pronoun: 'أنْتِ', person: 'second person', gender: 'feminine', number: 'singular', perfect: ''},
                { id: 4, pronoun: 'أنْتُما', person: 'second person', number: 'dual', perfect: ''},
                { id: 5, pronoun: 'هُوَ', person: 'third person', gender: 'masculine', number: 'singular', perfect: ''},
                { id: 6, pronoun: 'هِيَ', person: 'third person', gender: 'feminine', number: 'singular', perfect: ''},
                { id: 7, pronoun: 'هُما', person: 'third person', gender: 'masculine', number: 'dual', perfect: ''},
                { id: 8, pronoun: 'هُما', person: 'third person', gender: 'feminine', number: 'dual', perfect: '' },
                { id: 9, pronoun: 'نَحْنُ', person: 'first person', number: 'plural', perfect: '' },
                { id: 10, pronoun: 'أَنْتُم', person: 'second person', gender: 'masculine', number: 'plural', perfect: '' },
                { id: 11, pronoun: 'أَنْتُنَّ', person: 'second person', gender: 'feminine', number: 'plural', perfect: '' },
                { id: 12, pronoun: 'هُم', person: 'third person', gender: 'masculine', number: 'plural', perfect: '' },
                { id: 13, pronoun: 'هُنَّ', person: 'third person', gender: 'feminine', number: 'plural', perfect: '' }
        ],
        letters: ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ء'],

        endings: ['ْتُ', 'ْتَ', 'ْتِ', 'ْتُمَا', 'َ', 'َتْ', 'َا', 'َتَا', 'ْنَا', 'ْتُمْ', 'ْتُنَّ', 'ُوْا', 'ْنَ'],

        shortVowels: [{vowel: 'َ', name: 'fatha'}, {vowel: 'ُ', name: 'dammah'}, {vowel: 'ِ', name: 'kasrah'}],

        // hash for going from waaw to kasrah, alif to fatha, etc
        longToShort: {'و': 'ُ', 'ي': 'ِ', 'ا': 'َ'},

        verbTypes: [{name: 'assimilated'},
                {name: 'geminate'},
                {name: 'hamzated'},
                {name: 'hollow', type: 'waaw'}, {name: 'hollow', type: 'yaa'}, {name: 'hollow', type: 'alif'},
                {name: 'defective', type: 'waaw'}, {name: 'defective', type: 'yaa (aa-ii)'}, {name: 'defective', type: 'yaa (ya-aa)'},
                {name: 'sound'}]

    }
);var verbApp = angular.module('verbApp');

// The primary service which deals with handling questions, checking answers, etc
verbApp.factory('questionsService', function(alertService, filterOptions) {
    var service = {};

    // Index of current question
    service.questionIndex;

    // List of initial unfiltered questions
    service.questions = [];

    service.filteredQuestions = [];

    service.resetQuestions = function() {
        alertService.clear();
        filterOptions.reset();
        this.questionIndex = 0;

        this.questions = _.map(this.questions, function(item) {
            // This gets rid the of those two properties which need to be cleared when user resets the questions
            return _.omit(item, ['isCorrect', 'userAnswer']);
        })

        this.filteredQuestions = this.questions;
        this.currentQuestion = this.filteredQuestions[this.questionIndex];
    }

    service.nextQuestion = function() {
        this.questionIndex += 1;
        if (this.questionIndex >= this.filteredQuestions.length) {
            this.questionIndex = 0;
        }
        this.currentQuestion = this.filteredQuestions[this.questionIndex];
    }

    service.previousQuestion = function() {
        this.questionIndex -= 1;
        if (this.questionIndex < 0) {
            this.questionIndex = this.filteredQuestions.length - 1;
        }
        this.currentQuestion = this.filteredQuestions[this.questionIndex];
    }

    // Reset question set to first question
    service.updateQuestions = function() {
        this.questionIndex = 0;
        this.currentQuestion = this.filteredQuestions[this.questionIndex];
    }

    service.showAnswer = function(question, answer) {
        question.userAnswer = answer;
    }

    service.checkAnswer = function(userAnswer, answer) {
        if (userAnswer === answer) {
            this.currentQuestion.isCorrect = true;
            this.currentQuestion.userError = false;
            // check if all are correct, if so, then show the alert!
            if (_.every(this.filteredQuestions, {isCorrect: true})) {
                alertService.set('setCompleted', 'You have completed all the questions in the set!');
            }
        }
        else {
            this.currentQuestion.isCorrect = false;
        }
    }

    return service;
})
;var app = angular.module('verbApp');

// General verb related helper data
app.factory('thackstonExercises', function() {

    var data = {};

    data.exercises =   [
        {
            question: 'قال له إني آتيك بما أمرتني به قبل أن تقوم من مقامك',
            answer: 'قالَ لَهُ إِنِّي آتِيكَ بِما أَمَرْتَنِي بِهِ قَبْلَ أَنْ تُقُومَ مِنْ مَقامِكَ',
            chapter: 18
        },
        {
            question: 'ما كان لنفس أن تموت إلا بإذن الله',
            answer: 'ما كانَ لِنفسٍ أَنْ تَمُوتَ إِلَّا بِإِذْنِ اللهِ',
            chapter: 18
        },
        {
            question: 'فقال الملك لمريم أنا رسول ربك لأهب لك ولداً',
            answer: 'فَقالَ المَلَكُ لِمَرْيَمَ أَنا رَسُولُ رَبِّكِ لِأَهِبَ لَكِ وَلَداً',
            chapter: 18
        },
        {
            question: 'أيودّ أحدكم أن تكون له جنة من نخيل وأعناب',
            answer: 'أَيَوَدُّ أَحَدُكُمْ أَنْ تَكُونَ لَهُ جَنَّةٌ مِنْ نَخِيلٍ وَأَعْنابٍ',
            chapter: 18
        },
        {
            question: 'أعبد ربي حتى يأتيني اليقين',
            answer: 'أَعْبُدُ رَبِّي حَتَّى يَأْتِيَنِي اليَقِينُ',
            chapter: 18
        },
        {
            question: 'يا ربنا وسعت كل شيء رحمة وعلما',
            answer: 'يا رَبَّنا وَسِعْتَ كَلَّ شَيْءٍ رَحْمَةً وَعِلْماً',
            chapter: 18
        },
        {
            question: 'ما يكون لنا أن نعدكم بذلك',
            answer: 'ما يَكُونُ لَنا أَنْ نَعِدَكُمْ بِذلِكَ',
            chapter: 18
        },
        {
            question: 'فإن الأخوين جاءا ليرثا أباهما',
            answer: 'فَإِنَّ الأَخَوَينِ جاءا لِيَرِثا أَباهُما',
            chapter: 18
        },
        {
            question: 'أمرني الشيطان أن أقرب الكفار',
            answer: 'أَمَرَنِي الشَيطانُ أَنْ أقْرَبَ الكُفّارَ',
            chapter: 18
        },
        {
            question: 'قالت بنو إسرائيل يا موسى لن نصبر على طعام واحد',
            answer: 'قالَتْ بَنُو إِسْرائِيل يا مُوسى لَنْ نَصْبِرَ عَلى طَعامٍ واحِدٍ',
            chapter: 18
        },
        {
            question: 'أمرني أن أكون من المؤمنين',
            answer: 'أَمَرَنِي أَنْ أَكُونَ مِنْ المُؤْمِنِينَ',
            chapter: 18
        },
        {
            question: 'أتنهانا أن نعبد ما يعبد آباؤنا',
            answer: 'أَتَنْهانا أَنْ نَعْبُدَ ما يَعْبُدُ آباؤُنا',
            chapter: 18
        },
        {
            question: 'قال الله لإبليس ما منعك ألا تسجد لما خلقت بيدي',
            answer: 'قالَ اللهُ لِإِبْلِيسَ ما مَنَعَكَ أَلَّا تَسْجُدَ لِما خَلَقْتُ بِيَدِي',
            chapter: 18
        },
        {
            question: 'نهونا أن نأكل من فواكه أشجار حدائقهم فنكون من الظالمين',
            answer: 'نَهَونا أَنْ نَأْكُلَ مِنْ فَواكِهِ أَشْجارِ حَدائِقِهِمْ فَنَكُونَ مِنْ الظالِمِينَ',
            chapter: 18
        },
        {
            question: 'وقلنا لهم اسكنوا هذه القرية وكلوا منها حيث شئتم',
            answer: 'وَقُلْنَا لَهُمْ اُسْكُنُوا هَذِهِ القَرْيَةَ وَكُلُوا مِنْهَا حَيْثُ شِئْتُمْ',
            chapter: 19
        },
        {
            question: 'ففروا إلى الله إني لكم منه نذير مبين',
            answer: 'فَفِرُّوا إِلى اللهِ إِنِّي لَكُمْ مِنْهُ نَذِيرٌ مُبِينٌ',
            chapter: 19
        },
        {
            question: 'ما تسقط من ورق إلا يعلمها',
            answer: 'ما تَسْقُطُ مِنْ وَرَقٍ إِلّا يَعْلَمُها',
            chapter: 19
        },
        {
            question: 'لا تبعث مالك إليهم حتى تعلم أهم أتقياء أم لا',
            answer: 'لا تَبْعَثْ مالَكَ إِلَيهِمْ حَتّى تَعْلَمَ أَهُمْ أَتْقِياءُ أَمْ لا',
            chapter: 19
        },
        {
            question: 'فقالت نساء مصر إنا لنرى زليخا في ضلال مبين فلما سمعت بقولهن دعتهن وقالت ليوسف اخرج عليهن فلما رأينه قلن ليس هذا بشراً إن هذا إلا ملك كريم',
            answer: 'فَقالَتْ نِساءُ مِصْرَ إِنّا لَنَرَى زُلَيخا فِي ضَلالٍ مُبِينٍ فَلَمّا سَمِعَتْ بِقَوْلِهِنَّ دَعَتْهُنَّ وَقالَتْ لِيُوسُفَ اُخْرُجْ عَلَيهِنَّ فَلَمّا رَأَينَهُ قُلْنَ لَيسَ هذا بَشَراً إِنْ هذا إِلّا مَلَكٌ كَرِيمٌ',
            chapter: 19
        },
        {
            question: 'سوف يعلمون, حين يرون العذاب, من أضل',
            answer: 'سَوفَ يَعْلَمُونَ, حِينَ يَرَونَ العَذابَ, مَنْ أَضَلُّ',
            chapter: 19
        },
        {
            question: 'يا ربنا اغفر لنا وارحمنا وأنت أرحم الراحمين',
            answer: 'يا رَبَّنا اِغْفِرْ لَنا وَاِرْحَمْنا وَأَنْتَ أَرْحَمُ الراحِمِينَ',
            chapter: 19
        },
        {
            question: 'يا أيها الناس اذكروا الله ذكرا كثيرا',
            answer: 'يا أَيُّها الناسُ اُذْكُرُوا اللهَ ذِكْرَاً كَثِيراً',
            chapter: 19
        },
        {
            question: 'هو الله أحد لم يلد',
            answer: 'هُوَ اللهُ أحَدٌ لَمْ يَلِدْ',
            chapter: 19
        },
        {
            question: 'فعلمنا منه ما لم نعلم',
            answer: 'فَعَلِمْنا مِنْهُ ما لَمْ نَعْلَمْ',
            chapter: 19
        },
        {
            question: 'فخذها بالقوة وأمر قومك أن يأخذوا أموال الناس',
            answer: 'فَخُذْها بِالقُوَّةِ وَأْمُرْ قَومَكَ أَنْ يَأخُذُوا أَمْوالَ الناسِ',
            chapter: 19
        },
        {
            question: 'أولم تنصحنا ألا نقرب الذين هم أشد منا وهم مارّون على مدينتنا',
            answer: 'أَوَلَمْ تَنْصَحْنا أَلّا نَقْرَبَ الذِينَ هُمْ أَشَدُّ مِنّا وَهُمْ مارُّونَ عَلى مَدِينَتِنا',
            chapter: 19
        }
    ]

    // Will result in [{name: 1}, {name: 2}...]
    data.chapters = getChapters();

    function getChapters() {
        var nums = _.range(18,41);
        return _.map(nums, function(num) {
            return {name: num};
        })
    }

    return data;
})
;var verbApp = angular.module('verbApp');

verbApp.constant('verbAppConstants', {
        templateDirectory: '/components/verb_app/templates'
    }
)
;// sound example
var verb = {
    letter1: 'ك',
    letter2: 'ت',
    letter3: 'ب',
    type: {
        name: 'sound'
    },
    perfectVowel: 'َ',
    imperfectVowel: 'ُ'
}


//hollow waaw example
var verb = {
    letter1: 'ق',
    letter2: 'و',
    letter3: 'ل',
    type: {
        name: 'hollow',
        type: 'waaw'
    },
    perfectVowel: 'َ',
    imperfectVowel: 'ُ'
}

//geminate example
var verb = {
    letter1: 'د',
    letter2: 'ل',
    letter3: 'ل',
    type: {
        name: 'geminate'
    },
    perfectVowel: 'َ',
    imperfectVowel: 'ُ'
}


//defective waaw example
var verb = {
    letter1: 'د',
    letter2: 'ع',
    letter3: 'و',
    type: {
        name: 'defective',
        type: 'waaw'
    },
    perfectVowel: 'َ',
    imperfectVowel: 'ُ'
}

//defective yaa example
var verb = {
    letter1: 'م',
    letter2: 'ش',
    letter3: 'ي',
    type: {
        name: 'defective',
        type: 'yaa (aa-ii)'
    },
    perfectVowel: 'َ',
    imperfectVowel: 'ُ'
}


//defective yaa example 2
var verb = {
    letter1: 'ن',
    letter2: 'س',
    letter3: 'ي',
    type: {
        name: 'defective',
        type: 'yaa (ya-aa)'
    },
    perfectVowel: 'ِ',
    imperfectVowel: 'ُ'
}

// hamzated example
var verb = {
    letter1: 'ء',
    letter2: 'ك',
    letter3: 'ل',
    type: {
        name: 'hamzated'
    },
    perfectVowel: 'َ',
    imperfectVowel: 'ُ'
}

// hamzated example
var verb = {
    letter1: 'ق',
    letter2: 'ر',
    letter3: 'ء',
    type: {
        name: 'hamzated'
    },
    perfectVowel: 'َ',
    imperfectVowel: 'ُ'
}

// hamazated word examples

//var myWord = 'هَيْءَة';
//var myWord = 'سَءَلَتْ';
//var myWord = 'مُءَدِّب';
//var myWord = 'ءِسْلَام';
//var myWord = 'مُرُوْءَة';
//var myWord = 'رَءْس'
var myWord = 'مَءَاذِن';
;var verbApp = angular.module('verbApp');

// General verb related helper data
verbApp.constant('verbs', [

    // Sound
    {
        letter1: 'ك',
        letter2: 'ت',
        letter3: 'ب',
        type: {
            name: 'sound'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to write'
    },
    {
        letter1: 'ص',
        letter2: 'ع',
        letter3: 'ب',
        type: {
            name: 'sound'
        },
        perfectVowel: 'ُ',
        imperfectVowel: 'ُ',
        definition: 'to be difficult'
    },
    {
        letter1: 'ش',
        letter2: 'ر',
        letter3: 'ب',
        type: {
            name: 'sound'
        },
        perfectVowel: 'ِ',
        imperfectVowel: 'َ',
        definition: 'to drink'
    },
    {
        letter1: 'ع',
        letter2: 'م',
        letter3: 'ل',
        type: {
            name: 'sound'
        },
        perfectVowel: 'ِ',
        imperfectVowel: 'َ',
        definition: 'to work'
    },
    {
        letter1: 'د',
        letter2: 'ر',
        letter3: 'س',
        type: {
            name: 'sound'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to study'
    },

    // Geminate
    {
        letter1: 'د',
        letter2: 'ل',
        letter3: 'ل',
        type: {
            name: 'geminate'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to indicate'
    },
    {
        letter1: 'ظ',
        letter2: 'ن',
        letter3: 'ن',
        type: {
            name: 'geminate'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to think, believe'
    },
    {
        letter1: 'ت',
        letter2: 'م',
        letter3: 'م',
        type: {
            name: 'geminate'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ِ',
        definition: 'to be complete'
    },
    {
        letter1: 'و',
        letter2: 'د',
        letter3: 'د',
        type: {
            name: 'geminate'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'َ',
        definition: 'to want, to like'
    },
    {
        letter1: 'ظ',
        letter2: 'ل',
        letter3: 'ل',
        type: {
            name: 'geminate'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'َ',
        definition: 'to continue, remain'
    },


    // Defective waaw
    {
        letter1: 'د',
        letter2: 'ع',
        letter3: 'و',
        type: {
            name: 'defective',
            type: 'waaw'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to call'
    },
    {
        letter1: 'ن',
        letter2: 'ج',
        letter3: 'و',
        type: {
            name: 'defective',
            type: 'waaw'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to survive'
    },
    {
        letter1: 'م',
        letter2: 'ش',
        letter3: 'ي',
        type: {
            name: 'defective',
            type: 'yaa (aa-ii)'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to walk'
    },
    {
        letter1: 'ر',
        letter2: 'م',
        letter3: 'ي',
        type: {
            name: 'defective',
            type: 'yaa (aa-ii)'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to throw'
    },
    {
        letter1: 'ر',
        letter2: 'و',
        letter3: 'ي',
        type: {
            name: 'defective',
            type: 'yaa (aa-ii)'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to narrate, relate'
    },
    {
        letter1: 'ن',
        letter2: 'س',
        letter3: 'ي',
        type: {
            name: 'defective',
            type: 'yaa (ya-aa)'
        },
        perfectVowel: 'ِ',
        imperfectVowel: 'ُ',
        definition: 'to forget'
    },
    {
        letter1: 'ب',
        letter2: 'ق',
        letter3: 'ي',
        type: {
            name: 'defective',
            type: 'yaa (ya-aa)'
        },
        perfectVowel: 'ِ',
        imperfectVowel: 'ُ',
        definition: 'to stay, remain'
    },
    {
        letter1: 'ق',
        letter2: 'و',
        letter3: 'ل',
        type: {
            name: 'hollow',
            type: 'waaw'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to say'
    },
    {
        letter1: 'ز',
        letter2: 'و',
        letter3: 'ر',
        type: {
            name: 'hollow',
            type: 'waaw'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to visit'
    },
    {
        letter1: 'ل',
        letter2: 'و',
        letter3: 'م',
        type: {
            name: 'hollow',
            type: 'waaw'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to blame'
    },
    {
        letter1: 'ع',
        letter2: 'ي',
        letter3: 'ش',
        type: {
            name: 'hollow',
            type: 'yaa'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ِ',
        definition: 'to live'
    },
    {
        letter1: 'ب',
        letter2: 'ي',
        letter3: 'ع',
        type: {
            name: 'hollow',
            type: 'yaa'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ِ',
        definition: 'to sell'
    },
    {
        letter1: 'خ',
        letter2: 'و',
        letter3: 'ف',
        type: {
            name: 'hollow',
            type: 'alif'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'َ',
        definition: 'to fear'
    },
    {
        letter1: 'ن',
        letter2: 'و',
        letter3: 'م',
        type: {
            name: 'hollow',
            type: 'alif'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'َ',
        definition: 'to sleep'
    },
    // Assimilated
    {
        letter1: 'و',
        letter2: 'ص',
        letter3: 'ل',
        type: {
            name: 'assimilated'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ِ',
        definition: 'to arrive'
    },
    {
        letter1: 'و',
        letter2: 'ض',
        letter3: 'ع',
        type: {
            name: 'assimilated'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'َ',
        definition: 'to put, place'
    },
    {
        letter1: 'ي',
        letter2: 'س',
        letter3: 'ر',
        type: {
            name: 'assimilated'
        },
        perfectVowel: 'ِ',
        imperfectVowel: 'ِ',
        definition: 'to be easy'
    },
    {
        letter1: 'و',
        letter2: 'س',
        letter3: 'ع',
        type: {
            name: 'assimilated'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to be wide'
    },
    // Hamzated
    {
        letter1: 'ق',
        letter2: 'ر',
        letter3: 'ء',
        type: {
            name: 'hamzated'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'َ',
        definition: 'to read'
    },
    {
        letter1: 'س',
        letter2: 'ء',
        letter3: 'ل',
        type: {
            name: 'hamzated'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'َ',
        definition: 'to ask'
    },
    {
        letter1: 'أ',
        letter2: 'ك',
        letter3: 'ل',
        type: {
            name: 'hamzated'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to eat'
    },
    {
        letter1: 'ب',
        letter2: 'د',
        letter3: 'ء',
        type: {
            name: 'hamzated'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to begin'
    },




])
;var app = angular.module('arabicSite');

app.config(function($stateProvider) {
    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/home");

    // Now set up the states
    $stateProvider
        // This is the root state. Every other state is a child of this state (directly or indirectly).
        .state('main', {
            url: '/',
            templateUrl: '/components/root/templates/index.html',
            controller: 'rootCtrl'
        })

        .state('main.conjugationPractice', {
            url: '^/conjugation_practice',
            templateUrl: '/components/verb_app/templates/index.html',
            controller: 'verbAppCtrl'
        })

        .state('main.typingTutor', {
            url: '^/typing_tutor',
            templateUrl: '/components/typing_tutor/typing_tutor.html',
            controller: 'typingTutorCtrl'
        })

        .state('main.exercises', {
            url: '^/exercises',
            templateUrl: '/components/verb_app/templates/exercises.html',
            controller: 'exercisesCtrl'
        })

        .state('main.about', {
            url: '^/about',
            templateUrl: '/static/about.html'
        })

        .state('main.conjugation', {
            url: '^/conjugation',
            templateUrl: '/components/verb_app/templates/conjugation.html',
            controller: 'conjugatorCtrl'
        })





})
;var arabicSite = angular.module('arabicSite');

arabicSite.directive('appAlert', function(alertService) {
    return {
        restrict: 'E',
        templateUrl: '/shared/directives_alert_alert.html',
        scope: {},
        link: function (scope, elem, attrs) {
            scope.alertService = alertService;

            scope.hideModal = function() {
                //scope.alertObj.visible = false;
                scope.alertService.visible = false;
            }
        }

    }
});var arabicSite = angular.module('arabicSite');

arabicSite.factory('alertService', function() {
    var service = {};

    // The message to be displayed
    service.message;

    // The alert type, e.g. noMatches, setComplete
    service.type

    service.visible = false;

    service.set = function(type, message) {
        service.message = message;
        service.type = type;
        service.visible = true;
    }

    service.clear = function() {
        service.message = null;
        service.alertType = null;
        service.visible = false;
    }

    return service;
})