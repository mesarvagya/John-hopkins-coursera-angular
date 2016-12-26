(function () {
	'use strict';
	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);
	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope){
		$scope.dishes = "";
		$scope.msg = "";
		$scope.checkIfTooMuch = function(){
			var split_count = $scope.dishes.split(",").length;
			if($scope.dishes == ""){
				$scope.msg = "Please enter data first!!";

			}
			else if (split_count <=3){
				$scope.msg = "Enjoy!";
			}
			else if(split_count >3){
				$scope.msg = "Too much!";
			}
		};

	};

})();