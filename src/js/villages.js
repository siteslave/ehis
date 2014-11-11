; (function (window, angular, jQuery) {

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

    var App = angular.module('App', ['ui.select2', 'ehis.Filters']);

    // Controller
    App.controller('MainController', function ($scope, DataFactory) {

        $scope.village = null;
        $scope.house = null;
        $scope.houses = [];
        $scope.villages = [];
        $scope.person = [];
        //select2 setting
        $scope.select2Options = {
            allowClear: true
        };
        // get village list
        DataFactory.getVillages()
            .then(function (rows) {
                $scope.villages = rows;
            }, function (err) {
                console.log(err);
            });

        $scope.getHouse = function () {
            //console.log($scope.village);
            DataFactory.getHouses($scope.village)
                .then(function (rows) {
                   $scope.houses = rows;
                }, function (err) {
                    console.log(err);
                });
        };

        $scope.getPersonList = function () {
            if ($scope.house) {
                // get person
                $scope.person = [];
                DataFactory.getPersonList($scope.house)
                    .then(function (rows) {
                        $scope.person = rows;
                    }, function (err) {
                        console.log(err);
                    });
            }
        };
    });
    // Factory
    App.factory('DataFactory', function ($q) {

        var dataFactory = {};
        /**
         * Get village list
         * @returns array
         */
        dataFactory.getVillages = function () {
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
        /**
         * Get house list
         *
         * @param village_id
         * @returns {*}
         */
        dataFactory.getHouses = function (village_id) {
            var q = $q.defer();

            knex('house')
                .select('house_id', 'address')
                .where('village_id', village_id)
                .orderBy('address')
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
        /**
         * Get person list
         *
         * @param house_id
         * @returns {*}
         */
        dataFactory.getPersonList = function (house_id) {
            var q = $q.defer();

            /*
             select p.person_id, p.cid, p.patient_hn, rp.name as pname, p.fname, p.lname,
             p.birthdate, p.sex, rh.name as house_position_name
             from person as p
             left join ref_pname rp on rp.id=p.pname_id
             left join ref_house_position as rh on rh.id=p.house_position_id

             where house_id=2
             */
            knex('person as p')
                .select('p.person_id', 'p.cid', 'p.patient_hn', 'rp.name as pname',
                    'p.fname', 'p.lname', 'p.birthdate', 'p.sex', 'rh.name as house_position_name',
                    'ra.export_code as typearea', 'rd.name as discharge_name')
                .where('p.house_id', house_id)
                .leftJoin('ref_pname as rp', 'rp.id', 'p.pname_id')
                .leftJoin('ref_house_position as rh', 'rh.id', 'p.house_position_id')
                .leftJoin('ref_typearea as ra', 'ra.id', 'p.typearea_id')
                .leftJoin('ref_person_discharge as rd', 'rd.id', 'p.person_discharge_id')
                .orderByRaw('p.fname, p.lname')
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

})(window, window.angular, jQuery);