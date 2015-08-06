var alarmsDemo = angular.module('alarmsDemo', ['statusMessages', 'colors', 'groups', 'ui.bootstrap', 'ngRoute', 'items', 'alarms']);

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
