var alarms = angular.module ('alarms', ['ngVis']);

alarms.controller('mainController', ['$scope', '$http', '$window', function($scope, $http, $window, VisDataSet) {	
    
	$http.get('/items').success(function(response){
			$scope.items = response;
            
            $http.get('/edges').success(function(response){
			    $scope.connections = response;		
            
                        
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
                    color: EdgesColor
                },
                nodes: {
                    color: NormalStatusColor,
                    shape: "database",
                    labelHighlightBold: true
                },
                groups: {
                    normalGroup: {
                        color: NormalStatusColor,
                        labelHighlightBold: true
                    },
                    attentionGroup: {
                        color: AttentionStatusColor,
                        labelHighlightBold: true
                    },
                    warningGroup: {
                        color: WarningStatusColor,
                        labelHighlightBold: true
                    },
                    dangerGroup: {
                        color: DangerStatusColor,
                        labelHighlightBold: true
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
        
            $scope.edges.add($scope.connections);

	    $scope.normalItemsCount = function() {
            var count = 0;
            angular.forEach($scope.items, function(item) {
		        if(item.status == Normal) {
			        count += 1;
		        }
            });
            return count; 
	     };
			
	     $scope.attentionItemsCount = function() {
		     var count = 0;
             angular.forEach($scope.items, function(item) {
		         if(item.status == Attention) {
			          count += 1;
		         }
             });
             return count; 
	      };			
			
	      $scope.warningItemsCount = function() {
		      var count = 0;
              angular.forEach($scope.items, function(item) {
			      if(item.status == Warning) {
				      count += 1;
				  }
              });
              return count; 
		   };
			
		   $scope.dangerItemsCount = function() {
			   var count = 0;
               angular.forEach($scope.items, function(item) {
				   if(item.status == Danger) {
					   count += 1;
				   }
               });
                return count; 
			};
        });
	});
}]);