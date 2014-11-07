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
        $scope.url = config.dc.url;
        $scope.private_key = config.private_key;

        $scope.saveConnection = function () {
            var data = {
                db: {
                    host: $scope.host,
                    port: $scope.port,
                    database: $scope.dbname,
                    user: $scope.username,
                    password: $scope.password
                },
                dc: {
                    url: $scope.url,
                    private_key: $scope.private_key
                }
            };

            jf.writeFileSync(eHIS.configFile, data);
            alert('Success');
        };

    });

})(window, window.angular);