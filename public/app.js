var alarmsDemo = angular.module('alarmsDemo', ['config', 'ui.bootstrap', 'ngRoute', 'items']);

// routes
alarmsDemo.config(function($routeProvider) {

    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'views/alarms/alarms.html',
            controller  : 'mainController'
        })
        
        .when('/alarms', {
            templateUrl : 'views/alarms/alarms.html',
            controller  : 'mainController'
        })

        // route for the items view
        .when('/items', {
            templateUrl : 'views/items/items.html',
            controller  : 'itemsController'
        })

        .otherwise({
            redirectTo: 'views/alarms/alarms.html'
        });
});
