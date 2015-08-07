var items = angular.module ('items', []);

items.controller('itemsController', ['$scope', '$http', '$window', function($scope, $http, $window) {	
	$scope.isCollapsed = true;
	
	$scope.statuses = StatusList;

	$http.get('/items').success(function(response){
			$scope.items = response;		 
			$scope.add = function(){
				
		        $scope.newItem.id = $scope.items.length + 1;
				
				if($scope.newItem.status === Normal) {
					$scope.newItem.group = NormalGroup;
				}
				else if ($scope.newItem.status === Attention) {
					$scope.newItem.group = AttentionGroup;
				}
				else if ($scope.newItem.status === Warning) {
					$scope.newItem.group = WarningGroup;
				}
				else {
					$scope.newItem.group = DangerGroup;
				}
				
		        $http.post('/items', $scope.newItem).success(function(response){
			         alert('The item has been added!');
		             $window.location.reload();	
		        })
	        }
	});
	
	$scope.set_color = function (item) {
                if (item.status == Normal) {
                    return {
                        color: NormalStatusColor
                    }
                }
				else if (item.status == Attention) {
                    return {
                        color: AttentionStatusColor
                    }
                }
				else if (item.status == Warning) {
                    return {
                        color: WarningStatusColor
                    }
                }
				else {
                    return {
                        color: DangerStatusColor
                    }
                }				
            }
			
	
	
	$scope.edit = function(id){
		$http.get('/items/' + id).success(function(response){
			$scope.item = response;	
		})
	};
	
	$scope.save = function(){
		if($scope.item.status === Normal) {
					$scope.item.group = NormalGroup;
				}
				else if ($scope.item.status === Attention) {
					$scope.item.group = AttentionGroup;
				}
				else if ($scope.item.status === Warning) {
					$scope.item.group = WarningGroup;
				}
				else {
					$scope.item.group = DangerGroup;
				}
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
	
	$http.get('/edges').success(function(response){
		
		$scope.connections = response;		 
			$scope.link = function(){
				
		        $scope.connection.id = $scope.connections.length + 1;
				
		        $http.post('/edges', $scope.connection).success(function(response){
			         alert('The connection has been added!');
		             $window.location.reload();	
		        })
	        }
	});
	
	$scope.delete = function(id){
			var confirmDeletion = confirm('Are you sure you want to delete this connection?');
			if (confirmDeletion == true) {
					$http.delete('/edges/' + id).success(function(response){
						alert('The connection has been deleted!');
						$window.location.reload();
				})
				return true;
			}
			else {
				return false;
			}	
	};
}]);