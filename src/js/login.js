;(function (window, angular) {

    var eHIS = window.eHIS;

    // Modules requirement
    var jf = require('jsonfile');

    // Get configuration
    var config = jf.readFileSync(eHIS.configFile);
    // Main application module
    var App = angular.module('App', []);
    // Main controller
    App.controller('MainController', function ($scope) {

        $scope.doLogin = function () {

        };
        // Exit program
        $scope.doExit = function () {
          if (confirm('Are you sure?')) eHIS.doExit();
        };

    });

})(window, window.angular);