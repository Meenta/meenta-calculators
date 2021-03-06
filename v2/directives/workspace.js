app.directive('calculatorWorkspace', function() {
  return {
    scope: false,
    controller: [ '$rootScope', '$scope', '$stateParams', '$utils', 'material', 'applications', 'instruments', 'Sequence', '$timeout', 'angularKeenClient', function( $rootScope, $scope, $stateParams, $utils, materials, applications, instrumentList, Sequence, $timeout, angularKeenClient) {

      // Set the parameters.
      $scope.parameters = {
        type: $stateParams.type || 'rna',
        material: $stateParams.material || 'mouse',
        application: $stateParams.application || 'whole-genome',
        numOfLibraries: parseInt($stateParams.libraries || 40),
        genomeSize: 0,
        labReadAdjustment: 1,
        dupTolerance: 0.2,
        summary: null
      }

      var getMaterial = function(material, type) {
        var sel = _.find(materials, { key: material });
        if (sel) {
          $scope.parameters.genomeSize = $utils.toGb(sel[type]);
        }
      }

      var getApplication = function(application, type) {
        var appData = _.find(applications, { key: application });
        if (appData) {
          $scope.parameters.applicationData = appData;
        } else {
          $scope.parameters.application = type === 'rna' ? 'mRNA-Seq': 'whole-genome';
          $scope.parameters.applicationData =  _.find(applications, { key: application });
        }

        return $scope.parameters.applicationData;
      }

      getMaterial($scope.parameters.material, $scope.parameters.type);
      getApplication($scope.parameters.application, $scope.parameters.type);

      // --------------------------------------------

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

        // var parameters.genome =
		    // Loop and update.
		    _.each(results, function(item, idx) {
		        results[idx] = new Sequence(item, parameters);
		    });

        $scope.parameters.summary = {
          outputNeeded: (parameters.genomeSize * parameters.numOfLibraries * parameters.coverage)
        }

        // Filter for those that meet the experitnal requirements.
        results = _.where(results, { valid: true });

        // setup the summary.
        $scope.parameters.summary.numOfAvlSolutions = results.length;

        // log the results to keen.s
        // -----------------------
        // angularKeenClient.addEvent('calculation', {
        //   ip_address: '${keen.id}',
        //   parameters:  $scope.parameters
        // });

        $timeout(function() {
          $scope.$emit('newResults', results)
        }, 500);
		  }

      // If the Parameters change, update the parameters and trigger
      // the function to run.
		  $scope.$watch('parameters', function(newVal, oldVal) {
		    if (newVal !== oldVal) {
          newVal.applicationData = getApplication(newVal.application, newVal.type) ;

          var d = _.find(material, { key: newVal.material });
          var type = newVal.type;
          if (d) newVal.genomeSize = $utils.toGb(d[type]);

		      $scope.calculate(newVal);
		    }
		  }, true);

      // Start the calculator.
      $scope.calculate($scope.parameters);

    }],
    template: `
      <h2 class="mt-4 d-none d-md-block">
        Library Coverage Calculator
      </h2>

      <p class="lead mt-2">
        Calculate the number of libraries you can multiplex for a given application at a desired coverage.
      </p>

      <calculator-form parameters="parameters"></calculator-form>

      <br>
      <div class="row" kng-if="recommendations">
        <div class="col-md-12">
          <h5>Summary</h5>
          <summary></summary>
          <results></results>
      </div>
    `
  }
})
