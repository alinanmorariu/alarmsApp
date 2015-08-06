var alarms = angular.module ('alarms', ['ngVis']);

alarms.controller('mainController', ['$scope', '$http', '$window', function($scope, $http, $window, VisDataSet) {	
    
	$http.get('/items').success(function(response){
			$scope.items = response;
                        
            //Network graph	
        	$scope.nodes = new vis.DataSet();
            $scope.edges = new vis.DataSet();
            
            $scope.network_data = {
                nodes: $scope.nodes,
                edges: $scope.edges
            };
            
            $scope.network_options = {
                autoResize: true,
                height: '100%',
                width: '100%',
                clickToUse: false,
                edges: {
                    color: edgesColor
                },
                nodes: {
                    color: normalStatusColor,
                    shape: "database",
                    labelHighlightBold: true
                },
                groups: {
                    normalGroup: {
                        color: normalStatusColor
                    },
                    attentionGroup: {
                        color: attentionStatusColor
                    },
                    warningGroup: {
                        color: warningStatusColor
                    },
                    dangerGroup: {
                        color: dangerStatusColor
                    }
                },
                interaction: {
                    navigationButtons: true,
                    zoomView: true
                }
            };            
        
           $scope.onNodeSelect = function(properties) {
                var selected = $scope.task_nodes.get(properties.nodes[0]);
                console.log(selected);
            };
        
            $scope.nodes.add($scope.items);
        
            $scope.edges.add([
                {id: 1, from: 1, to: 2},
                {id: 2, from: 2, to: 3},
                {id: 3, from: 4, to: 6},
                {id: 4, from: 4, to: 9},
                {id: 5, from: 5, to: 7},
                {id: 6, from: 8, to: 1},
                {id: 7, from: 5, to: 1},
                {id: 8, from: 6, to: 7},
                {id: 9, from: 1, to: 6},
            ]);

	    $scope.normalItemsCount = function() {
            var count = 0;
            angular.forEach($scope.items, function(item) {
		        if(item.status == normal) {
			        count += 1;
		        }
            });
            return count; 
	     };
			
	     $scope.attentionItemsCount = function() {
		     var count = 0;
             angular.forEach($scope.items, function(item) {
		         if(item.status == attention) {
			          count += 1;
		         }
             });
             return count; 
	      };			
			
	      $scope.warningItemsCount = function() {
		      var count = 0;
              angular.forEach($scope.items, function(item) {
			      if(item.status == warning) {
				      count += 1;
				  }
              });
              return count; 
		   };
			
		   $scope.dangerItemsCount = function() {
			   var count = 0;
               angular.forEach($scope.items, function(item) {
				   if(item.status == danger) {
					   count += 1;
				   }
               });
                return count; 
			};
	});
}]);