; (function (window, angular) {

    'use strict';
    // Global namespace
    var eHIS = window.eHIS;
    // Requirement modules
    var _ = require('lodash'),
        jf = require('jsonfile'),
        events = require('events');

    var em = new events.EventEmitter();
    em.setMaxListeners(0);

    var config = jf.readFileSync(eHIS.configFile);

    var knex = require('knex')({
        client: 'mysql',
        connection: config.db
    });

    var App = angular.module('App', ['ui.select2']);

    // Controller
    App.controller('MainController', function ($scope, DataFactory) {

        //select2 setting
        $scope.select2Options = {
            allowClear: true
        };
        // get village list
        DataFactory.getVillage()
            .then(function (rows) {
                $scope.villages = rows;
                console.log(rows);
            }, function (err) {
                console.log(err);
            });

        $scope.$watch('village', function (oldValue, newValue) {
           console.log(oldValue);
           console.log(newValue);
        });

    });
    // Factory
    App.factory('DataFactory', function ($q) {

        var dataFactory = {};
        /**
         * Get village list
         * @returns array
         */
        dataFactory.getVillage = function () {
            var q = $q.defer();

            knex('village')
                .select('village_id', 'address_id','village_moo','village_name', 'village_code')
                .orderBy('village_moo')
                .exec(function (err, rows) {
                    if (err) {
                        console.log(err);
                        q.reject(err);
                    } else {
                        q.resolve(rows);
                    }
                });

            return q.promise;
        };

        return dataFactory;
    });

})(window, window.angular);