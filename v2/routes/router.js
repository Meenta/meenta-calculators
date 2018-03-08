app
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

	$stateProvider
  	.state('coverage', {
  		url: '/coverage',
  		controller: ['$scope', function($scope) {
  			//
        $scope.coverageData = [];

        // $scope.calculateCoverage = function() {
        //   $scope.coverageData = [];
				//
        //   var lengths = [ 15, 20, 25, 30, 50, 100 ];
        //   _.each(lengths, function(length) {
        //     var requiredMb = length * $scope.parameters.genome;
        //     var requiredGb = requiredMb / 1000;
        //     var totalGbRequired = requiredGb * $scope.parameters.numOfLibraries;
        //     var totalFbRequiredWithDup = totalGbRequired + (totalGbRequired * $scope.parameters.dupTolerance);
				//
        //     $scope.coverageData.push({
        //       coverage: length,
        //       requiredMb: requiredMb,
        //       requiredGb: requiredGb,
        //       totalGbRequired: totalGbRequired,
        //       totalFbRequiredWithDup: totalFbRequiredWithDup
        //     });
        //   });
        // }
				//
        // $scope.calculateCoverage();
  		}],
      template: `
        <div class="row" kng-if="parameters.settings.showCoverageTable">
          <div class="col-md-12">
            <h4>
              Output Required by Coverage (for {{ parameters.numOfLibraries }} Libraries)
            </h4>
            <small>
              Use this table to determine that Giga based you need for sample.
            </small>
            <coverage-table></coverage-table>
          </div>
        </div>`
  	});

}]);
