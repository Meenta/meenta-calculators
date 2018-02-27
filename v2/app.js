
var app = angular.module('calculators', []);
app.controller('advanced', function($scope) {

  var keenClient = null;

  window.keenWebAutoCollector.onload(function(){
    keenClient = window.keenWebAutoCollector.tracker;
  });

  $scope.Instruments = {
    'NextSeq': {
      name: 'NextSeq',
      modes: {
        mid: {
          150: { illNumClusters: 65, illNumGb: 19.5, kitCyles: 150 },
          300: { illNumClusters: 130, illNumGb: 39, kitCyles: 300 }
        },
        high: {
          75: { illNumClusters: 100, illNumGb: 30, kitCyles: 75},
          150: { illNumClusters: 200, illNumGb: 60, kitCyles: 150 },
          300: { illNumClusters: 400, illNumGb: 120, kitCyles: 300 }
        }
      }
    }
  };

  $scope.parameters = {
    genome: 61.4,
    coverage: '30',
    numberOfSamples: null,
    numOfSamples: 40,
    labReadAdjustment: 1,
    dupTolerance: 0.2
  }

  $scope.coverageData = [];

  $scope.calculateCoverage = function() {
    $scope.coverageData = [];

    var lengths = [ 15, 20, 25, 30, 50, 100 ];
    _.each(lengths, function(length) {
      var requiredMb = length * $scope.parameters.genome;
      var requiredGb = requiredMb / 1000;
      var totalGbRequired = requiredGb * $scope.parameters.numOfSamples;
      var totalFbRequiredWithDup = totalGbRequired + (totalGbRequired * $scope.parameters.dupTolerance);

      $scope.coverageData.push({
        coverage: length,
        requiredMb: requiredMb,
        requiredGb: requiredGb,
        totalGbRequired: totalGbRequired,
        totalFbRequiredWithDup: totalFbRequiredWithDup
      });
    })
  }

  $scope.calculate = function() {

    _.each($scope.Instruments, function(InstrumentData, Instrument) {
      _.each(InstrumentData.modes, function(ModeData, Mode) {
        _.each(ModeData, function(readLengthData, readLength) {
          readLengthData.illPredCustersPerLibrary = readLengthData.illNumClusters / $scope.parameters.numOfSamples;

          // Calc the adjustement to the illumina Total Max Reads.
          readLengthData.actualNumClusters = readLengthData.illNumClusters * $scope.parameters.labReadAdjustment;

          // Calc the adjustment to the illumina Gigs.
          readLengthData.actualGb = readLengthData.illNumGb * $scope.parameters.labReadAdjustment;

          // Now we calc the predicts for the adjusted values.
          readLengthData.actualPredClustersPerLibrary = readLengthData.actualNumClusters / $scope.parameters.numOfSamples;

          // ------------------------------------------------------------

          var idealCoveragePerGenome = readLengthData.actualGb / ( $scope.parameters.genome / 1000 )
          var idealCoveragePerGenomeDuplicateTol = idealCoveragePerGenome * $scope.parameters.dupTolerance;

          readLengthData.idealCoveragePerGenome = idealCoveragePerGenome;
          readLengthData.idealCoveragePerGenomeDuplicateTol = idealCoveragePerGenomeDuplicateTol;
          var uniqueNumberOfReads = idealCoveragePerGenome - idealCoveragePerGenomeDuplicateTol;
          readLengthData.uniqueNumberOfReads = uniqueNumberOfReads;

          readLengthData.actualCoveragePerLibrary = uniqueNumberOfReads / $scope.parameters.numOfSamples;
        });
      });
    });
  }

  $scope.$watch('parameters', function(newVal, oldVal) {
    if (newVal !== oldVal) {

      $scope.calculate();
      $scope.calculateCoverage();

      keenClient.recordEvent('calculation', {
        ip_address: '${keen.id}',
        parameters:  $scope.parameters
      });

    }
  }, true);

  $scope.calculateCoverage();
  $scope.calculate();
});
