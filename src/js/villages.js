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

    var App = angular.module('App', []);

    // Controller
    App.controller('AppController', function ($scope) {

    });
    // Factory
    App.factory('AppFactory', function ($q) {

        var appFactory = {};
        /**
         * Get village list
         * @returns array
         */
        appFactory.getVillage = function () {
            var q = $q.defer();

            knex('village')
                .select('village_id', 'address_id', 'village_moo', 'village_name', 'village_code')
                .orderBy('village_moo', 'DESC')
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

        return appFactory;
    });

})(window, window.angular);