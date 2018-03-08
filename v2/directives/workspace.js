app.directive('calculatorWorkspace', function() {
  return {
    scope: false,
    controller: [ '$rootScope', '$scope', '$stateParams', '$utils', 'applications', 'instruments', 'Sequence', '$timeout', function( $rootScope, $scope, $stateParams, $utils, applications, instrumentList, Sequence, $timeout ) {

      // Set the parameters.
      $scope.parameters = {
        material: $stateParams.material || 'human',
        genome: 61.4,
        application: $stateParams.application || 'k-genome',
        coverage: '30',
        numOfLibraries: 40,
        labReadAdjustment: 1,
        dupTolerance: 0.2,
        summary: null
      }

      // Check if we have an application. If not defined, then lets
      // force them back to whole genome
      var appData = _.find(applications, { key: $scope.parameters.application });

      if (appData) {
        $scope.parameters.applicationData = appData;
      } else {
        $scope.parameters.application = 'whole-genome';
        $scope.parameters.applicationData =  _.find(applications, { key: 'whole-genome' });
      }

      $scope.parameters.genome = $utils.toGb($scope.parameters.applicationData.requiredReads);

		  var instruments = [];
		  _.each(instrumentList, function(instrument, key) {
		    instrument = _.map(instrument, function(i) {
		      i.instrument = key;
		      return i;
		    });
		    instruments = instruments.concat(instrument)
		  });

      // Click event to trigger the search.
			$scope.calculate = function(parameters) {

		    // Make a copy.
        var results = angular.copy(instruments);

		    // Loop and update.
		    _.each(results, function(item, idx) {
		        results[idx] = new Sequence(item, parameters);
		    });

        // Filter for those that meet the experitnal requirements.
        results = _.where(results, { valid: true });

        var requiredReadsGb = $utils.toGb(parameters.applicationData.requiredReads);

        $scope.parameters.summary = {
          outputNeeded: requiredReadsGb * parameters.numOfLibraries,
          numOfAvlSolutions: results.length
        };

        $timeout(function() {
          $scope.$emit('newResults', results)
        }, 500)
		  }

      // If the Parameters change, update the parameters and trigger
      // the function to run.
		  $scope.$watch('parameters', function(newVal, oldVal) {
		    if (newVal !== oldVal) {
		      newVal.applicationData = _.find(applications, { key: newVal.application })
		      newVal.genome = $utils.toGb(newVal.applicationData.requiredReads);

		      $scope.calculate(newVal);
		      // keenClient.recordEvent('calculation', {
		      //   ip_address: '${keen.id}',
		      //   parameters:  $scope.parameters
		      // });
		    }
		  }, true);

      console.log('ddd', $scope.parameters);
      $scope.calculate($scope.parameters);

    }],
    template: `
      <h2 class="mt-4 d-none d-md-block">
        NGS Coverage Calculator
      </h2>

      <p class="lead mt-2">
        This provides the ability to evaluate the coverage needed
        for pool libraries for different applications. It provides
        a summary and a list of instruments and cycles capible of
        providing the require per library reads.
      </p>

      <calculator-form parameters="parameters"></calculator-form>

      <br>
      <div class="row" kng-if="recommendations">
        <div class="col-md-12">
          <h4>Summary:</h4>
          <summary></summary>
          <results></results>
      </div>
    `
  }
})
