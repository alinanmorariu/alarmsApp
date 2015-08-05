var alarms = angular.module ('alarms', []);

alarms.controller('mainController', ['$scope', '$http', '$window', function($scope, $http, $window) {	
	
	$http.get('/items').success(function(response){
			$scope.items = response;
			var count = 0;
			$scope.normalItemsCount = function() {
				var count = 0;
                angular.forEach($scope.items, function(item){
					if(item.status == normal){
						count += 1;
					}
                });
                return count; 
			};
			
			$scope.attentionItemsCount = function() {
				var count = 0;
                angular.forEach($scope.items, function(item){
					if(item.status == attention){
						count += 1;
					}
                });
                return count; 
			};			
			
			$scope.warningItemsCount = function() {
				var count = 0;
                angular.forEach($scope.items, function(item){
					if(item.status == warning){
						count += 1;
					}
                });
                return count; 
			};
			
		     $scope.dangerItemsCount = function() {
				var count = 0;
                angular.forEach($scope.items, function(item){
					if(item.status == danger){
						count += 1;
					}
                });
                return count; 
			};
	});
}]);