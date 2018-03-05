
var app = angular.module('calculators', [ 'angular.filter' ]);
app.controller('advanced', function($scope) {

  var keenClient = null;

  window.keenWebAutoCollector.onload(function(){
    keenClient = window.keenWebAutoCollector.tracker;
  });

  $scope.applications = [
    // RNA
    // illumina Examples.
    { key: 'mRNA-Seq', type: 'rna', requiredReads: 25, units: 'M', title: 'mRNA Seq' },
    { key: 'total-rna-qeq', type: 'rna', requiredReads: 50, units: 'M', title: 'Total RNA Seq' },
    { key: 'pan-cancer', type: 'rna', requiredReads: 3, units: 'M', title: 'Pan Cancer' },
    { key: 'ran-access', type: 'rna', requiredReads: 25, units: 'M', title: 'RNA Access' },
    { key: 'small-RNA', type: 'rna', requiredReads: 2.2, units: 'M', title: 'Small RNA' },

    // extras
    { key: 'gene-expression', type: 'rna', requiredReads: 10, units: 'M', title: 'Gene Expression Profiling' },
    { key: 'enriched-RNA-Seq', type: 'rna', requiredReads: 25, units: 'M', title: 'Enriched RNA Seq' },

    // DNA
    { key: 'whole-genome', type: 'dna', requiredReads: 3300, units: 'M', title: 'Whole Genome Sequencing' },
    { key: 'nextera-rapid-capture-exome', type: 'dna', requiredReads: 45, units: 'M', title: 'Nextera Rapid Capture Exome' },
    { key: 'nextera-rapid-capture-expanded-exome', type: 'dna', requiredReads: 62, units: 'M', title: 'Nextera Rapid Capture Expanded Exome' },
    { key: 'truseq-amplicon-cancel-panel', type: 'dna', requiredReads: 0.035, units: 'M', title: 'TruSeq Amplicon Cancer Panel' },
    { key: 'truseq-exome', type: 'dna', requiredReads: 45, units: 'M', title: 'TruSeq Exome' },
    { key: 'truseq-cancer', type: 'dna', requiredReads: 0.3, units: 'M', title: 'TruSeq Cancer' },
    { key: 'truseq-cardio', type: 'dna', requiredReads: 0.572, units: 'M', title: 'TruSeq Cardio' },
    { key: 'truseq-inherited-disease', type: 'dna', requiredReads: 2.25, units: 'M', title: 'TruSeq Inherited Disease' },
    { key: 'truseq-myeliod', type: 'dna', requiredReads: 0.141, units: 'M', title: 'TruSeq Myeliod' },
    { key: 'truseq-one', type: 'dna', requiredReads: 12, units: 'M', title: 'TruSeq One' },
    { key: 'truseq-tumor-15', type: 'dna', requiredReads: 0.044, units: 'M', title: 'TruSeq Tumor 15' },
    { key: 'truseq-tumor-26', type: 'dna', requiredReads: 0.021, units: 'M', title: 'TruSeq Tumor 15' }
  ]

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
    material: 'human',
    genome: 61.4,
    coverage: '30',
    numberOfSamples: null,
    numOfLibraries: 40,
    labReadAdjustment: 0.8,
    dupTolerance: 0.2,
    settings: {
      showCoverageTable: false,
      showInstruments: false
    }
  }

  $scope.execute = function() {
    $scope.recommendations = true;
  }

  $scope.coverageData = [];

  $scope.calculateCoverage = function() {
    $scope.coverageData = [];

    var lengths = [ 15, 20, 25, 30, 50, 100 ];
    _.each(lengths, function(length) {
      var requiredMb = length * $scope.parameters.genome;
      var requiredGb = requiredMb / 1000;
      var totalGbRequired = requiredGb * $scope.parameters.numOfLibraries;
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
          readLengthData.illPredCustersPerLibrary = readLengthData.illNumClusters / $scope.parameters.numOfLibraries;

          // Calc the adjustement to the illumina Total Max Reads.
          readLengthData.actualNumClusters = readLengthData.illNumClusters * $scope.parameters.labReadAdjustment;

          // Calc the adjustment to the illumina Gigs.
          readLengthData.actualGb = readLengthData.illNumGb * $scope.parameters.labReadAdjustment;

          // Now we calc the predicts for the adjusted values.
          readLengthData.actualPredClustersPerLibrary = readLengthData.actualNumClusters / $scope.parameters.numOfLibraries;

          // ------------------------------------------------------------

          var idealCoveragePerGenome = readLengthData.actualGb / ( $scope.parameters.genome / 1000 )
          var idealCoveragePerGenomeDuplicateTol = idealCoveragePerGenome * $scope.parameters.dupTolerance;

          readLengthData.idealCoveragePerGenome = idealCoveragePerGenome;
          readLengthData.idealCoveragePerGenomeDuplicateTol = idealCoveragePerGenomeDuplicateTol;
          var uniqueNumberOfReads = idealCoveragePerGenome - idealCoveragePerGenomeDuplicateTol;
          readLengthData.uniqueNumberOfReads = uniqueNumberOfReads;

          readLengthData.actualCoveragePerLibrary = uniqueNumberOfReads / $scope.parameters.numOfLibraries;
        });
      });
    });
  }

  $scope.$watch('parameters', function(newVal, oldVal) {
    if (newVal !== oldVal) {

      newVal.applicationData = _.find($scope.applications, { key: newVal.application })
      newVal.genome = newVal.applicationData.requiredReads;

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
