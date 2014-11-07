/**
 * Order module
 */
(function (window, angular) {
    // Global namespace
    var iStock = window.iStock;
    // Main Order module
    var Order = angular.module('Order', ['ngRoute']);

    // Controller
    Order.controller('MainController', function ($scope) {

    });
    // Service and Factory
    Order.factory('DataFactory', function ($http, $q) {

        var dataFactory = {};
        // Get order list
        dataFactory.getOrder = function (start, limit) {};
        // Search order
        dataFactory.searchOrder = function (query) {};

        return dataFactory;

    });

})(window, window.angular);
