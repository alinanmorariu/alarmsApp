var items = angular.module ('items', []);

items.controller('itemsController', ['$scope', '$http', '$window', function($scope, $http, $window) {	
	$scope.isCollapsed = true;
	
	$http.get('/items').success(function(response){
			$scope.items = response;
			 $scope.set_color = function (item) {
                if (item.status == normal) {
                    return {
                        color: normalStatusColor
                    }
                }
				else if (item.status == attention) {
                    return {
                        color: attentionStatusColor
                    }
                }
				else if (item.status == warning) {
                    return {
                        color: warningStatusColor
                    }
                }
				else {
                    return {
                        color: dangerStatusColor
                    }
                }				
            }
	});
	
	$scope.add = function(){	
		$http.post('/items', $scope.newItem).success(function(response){
			alert('The item has been added!');
		    $window.location.reload();	
		})
	}
	
	$scope.edit = function(id){
		$http.get('/items/' + id).success(function(response){
			$scope.item = response;	
		})
	};
	
	$scope.save = function(){
		var confirmUpdate = confirm ('Are you sure you want to make changes to this item?');
		if (confirmUpdate == true){				
				$http.put('/items/' + $scope.item._id, $scope.item).success(function(response){
					alert('Changes have been saved!');
					$window.location.reload();			
			})
			return true;
		}
		else {
			return false;
		}
	};
	
	$scope.delete = function(id){
			var confirmDeletion = confirm('Are you sure you want to delete this item?');
			if (confirmDeletion == true) {
					$http.delete('/items/' + id).success(function(response){
						alert('The item has been deleted!');
						$window.location.reload();
				})
				return true;
			}
			else {
				return false;
			}	
	};
}]);