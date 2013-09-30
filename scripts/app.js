(function(){
	'use strict';
	angular.module("mainModule", []).
		controller("mainController", ["$scope", function($scope){
			$scope.data = ["one", "two", "three"];
			$scope.selectedItem;

			$scope.alertMe = function(){
				console.log("alertMe")
			};

			$scope.$watch('selectedItem', function(){
			   console.log("555555")
			})
		}])
})();


