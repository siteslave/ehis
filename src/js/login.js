;(function (window, angular) {

    var eHIS = window.eHIS;

    // Modules requirement
    var jf = require('jsonfile'),
        crypto = require('crypto');

    // Get configuration
    var config = jf.readFileSync(eHIS.configFile);
    // MySQL connection setting
    var knex = require('knex')({
        client: 'mysql',
        connection: config.db
    });
    // Main application module
    var App = angular.module('App', []);
    // Main controller
    App.controller('MainController', function ($scope, DataFactory) {
        $scope.isFailed = false;
        $scope.doLogin = function () {
            DataFactory.checkAuth($scope.username, $scope.password)
                .then(function (success) {
                    if (success) {
                        window.location.href = 'index.html';
                    } else {
                        $scope.isFailed = true;
                    }
                }, function (err) {
                    console.log(err);
                   alert('Error: ' + JSON.stringify(err));
                });
        };
        // Exit program
        $scope.doExit = function () {
          if (confirm('คุณต้องการปิดโปรแกรมใช่หรือไม่?')) eHIS.doExit();
        };

    });

    App.factory('DataFactory', function ($q) {

        var dataFactory = {};

        dataFactory.checkAuth = function (username, password) {
            var q = $q.defer();
            // password encryption
            var hash = crypto.createHmac('sha256', eHIS.saltKey).update(password).digest('base64');
            //console.log(hash);
            knex('users')
                .where('username', username)
                .where('password', hash)
                .count('* as total')
                .exec(function (err, rows) {
                    if (err) {
                        console.log(err);
                        q.reject(err);
                    } else {
                        console.log(rows);
                        if (rows[0].total) {
                            return q.resolve(true);
                        } else {
                            return q.resolve(false);
                        }
                    }
                });

            return q.promise;
        };

        return dataFactory;
    });

})(window, window.angular);