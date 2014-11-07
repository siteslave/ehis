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
        $scope.host = config.db.host;
        $scope.port = config.db.port;
        $scope.dbname = config.db.database;
        $scope.username = config.db.user;
        $scope.password = config.db.password;

        $scope.saveConnection = function () {

        };

    });

})(window, window.angular);