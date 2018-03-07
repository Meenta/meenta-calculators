
var app = angular.module('calculators', [ 'angular.filter' ]);

app.controller('advanced', [ '$scope', 'instruments', 'applications', function($scope, instruments, applications) {

  var keenClient = null;

  // window.keenWebAutoCollector.onload(function(){
  //   keenClient = window.keenWebAutoCollector.tracker;
  // });

  $scope.applications = applications;
  $scope.instruments = instruments;
  $scope.tmpInstruments = null;

  $scope.parameters = {
    material: 'human',
    genome: 61.4,
    coverage: '30',
    numberOfSamples: null,
    numOfLibraries: 40,
    labReadAdjustment: 1,
    dupTolerance: 0.2,
    settings: {
      showCoverageTable: false,
      showInstruments: true,
      showAllResults: false
    }
  }

  // Click event to trigger the calculation.
  $scope.execute = function() {
    $scope.recommendations = true;
    $scope.calculate();
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

  var parseVal = function(val) {
    var t = val.split(' ');


    if (t.length === 2) {
      var u = t[1]
      if (u.lowercase().trim() === 'm') {

      }
    }
  }

  // Simple class to manage the calculator.
  var Sequencing = function(data) {
    this.data = data;
    this.ref = {};

    // This function will convert a given value to Gb.
    this.convertToGb = function(val) {
      var t = val.split(' ');
      if (t.length === 1) return parseFloat(t[0]);
      if (t.length === 2) {
        var u = t[1];
        if (t[1].toLowerCase().trim() === 'gb') return parseFloat(t[0]);
        if (t[1].toLowerCase().trim() === 'm') return parseFloat(t[0]) / 1000;
      }
    };

    this.init = function(data) {
      // This will read all the data and convert to
      this.ref.reads = this.convertToGb(data.reads)
      this.ref.output = this.convertToGb(data.output)
    };

    this.process = function() {
      var output = {}
      // Calc the reads per library & the reads with adjusmtn
      var readsPerLibary = this.ref.reads / $scope.parameters.numOfLibraries;
      var readsPerLibraryAct = readsPerLibary * $scope.parameters.labReadAdjustment;

      // Stage 1: Calc the actual out with the adjustment off of Illumina.
      var actualReads = this.ref.reads * $scope.parameters.labReadAdjustment;
      var actualOutput = this.ref.output * $scope.parameters.labReadAdjustment;

      // Stage 2:
      var predReads = actualReads / $scope.parameters.numOfLibraries;

      var outputPerGenome = actualOutput / ( $scope.parameters.genome / 1000 );
      var outputPerGenomeWithDedup = outputPerGenome * $scope.parameters.dupTolerance;

      var outputPerGenomeWithDedup = outputPerGenome - outputPerGenomeWithDedup;

      var coveragePerGenome = outputPerGenomeWithDedup / $scope.parameters.numOfLibraries;
      // var readsPerLib = uniqueNumberOfReads / $scope.parameters.numOfLibraries;

      output.readsPerLibary = readsPerLibary;
      output.actualReads = actualReads;
      output.readsPerLibraryAct = readsPerLibraryAct;
      output.actualOutput = actualOutput;

      output.predReads = predReads;
      output.outputPerGenome = outputPerGenome;
      output.outputPerGenomeWithDedup = outputPerGenomeWithDedup;

      output.coveragePerGenome = coveragePerGenome;
      output.outputPerGenomeWithDedup = outputPerGenomeWithDedup

      // Provies a T/F for the current coverae.
      output.isViable = output.coveragePerGenome >= $scope.parameters.coverage;

      this.output = output;
    };

    // Init the data in the class.
    this.init(data);

    // For the process to run.
    this.process();
  }

  $scope.calculate = function() {
    // Make a copy.
    $scope.tmpInstruments = tmpInstruments = angular.copy(instruments);

    // Loop and update.
    _.each(tmpInstruments, function(modes, instrumentKey) {
      _.each(modes, function(sequence, idx) {
        modes[idx] = new Sequencing(sequence);
      });
    });
  }

  $scope.$watch('parameters', function(newVal, oldVal) {
    if (newVal !== oldVal) {

      newVal.applicationData = _.find($scope.applications, { key: newVal.application })
      newVal.genome = newVal.applicationData.requiredReads;

      console.log('ss', $scope.form.$valid);
      $scope.recommendations = $scope.form.$valid;


      $scope.calculate();
      $scope.calculateCoverage();

      // keenClient.recordEvent('calculation', {
      //   ip_address: '${keen.id}',
      //   parameters:  $scope.parameters
      // });
    }
  }, true);

  $scope.calculateCoverage();
  $scope.calculate();
}]);

app.constant('applications', [
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
]);

app.filter('modeName', function() {
  return function(input, uppercase) {
    var out = input.toLowerCase();
    switch (out) {
      case 'midoutput':
        out = 'Mid Output'
        break;
      case 'highoutput':
        out = 'High Output';
        break;
      case 'rapid':
        out = 'Rapid Mode';
        break;
      case 'rapidv2':
        out = 'Rapid v2 Mode';
        break;
      case 'microv2':
        out = 'Micro v2 Mode';
        break;
      case 'v2':
        out = 'v2 Mode';
        break;
      case 'v3':
        out = 'v3 Mode';
        break;
      case 'v4':
        out = 'v4 Mode';
        break;
      case 'microv2':
        out = 'Micro v2 Mode'
        break;
      case 'nanov2':
        out = 'Nano v2 Mode'
        break;
      default:
        out = out;
    }
    return out;
  }
});

app.filter('instrumentName', function() {
  return function(input, uppercase) {
    var out = input.toLowerCase();
    switch (out) {
      case 'nextseq-500':
        out = 'NextSeq 500'
        break;
      case 'nextseq-550':
        out = 'NextSeq 550';
        break;
      case 'hiseq-2000':
        out = 'HiSeq 2000';
        break;
      case 'hiseq-1500':
        out = 'HiSeq 1500';
        break;
      case 'hiseq-1000':
        out = 'HiSeq 1000';
        break;
      case 'hiseq-3000':
        out = 'HiSeq 3000';
        break;
      case 'miseq':
        out = 'MiSeq';
        break;
      case 'novaseq-5000':
        out = 'NoveSeq 5000';
        break;
      default:
        //
    }
    return out;
  }
});

app.constant('instruments', {
  // "nextSeq-500": [
  //   { "mode": "midOutput", "reads": "65 M", "output": "19.5 Gb" },
  //   { "mode": "midOutput", "reads": "130 M", "output": "39 Gb" }
  // ],
  // "nextSeq-550": [
  //   { "mode": "highoutput", "reads": "100 M", "output": "30 Gb" },
  //   { "mode": "highoutput", "reads": "200 M", "output": "60 Gb" },
  //   { "mode": "highoutput", "reads": "400 M", "output": "120 Gb" }
  // ],
  "hiSeq-1000": [
    { "mode": "v4", "reads": "249.9336 M", "output": "37.490 Gb" },
    { "mode": "v3", "reads": "186.048 M", "output": "27.907 Gb" }
  ],
  "hiSeq-2000": [
    { "mode": "v4", "reads": "249.9336 M", "output": "37.490 Gb" },
    { "mode": "v3", "reads": "186.048 M", "output": "27.907 Gb" }
  ],
  "hiSeq-1500": [
    { "mode": "rapid", "reads": "150.696 M", "output": "22.6044 Gb" },
    { "mode": "rapid", "reads": "300 M", "output": "45 Gb" },
    { "mode": "rapidv2", "reads": "150.696 M", "output": "22.6044 Gb" },
    { "mode": "rapidv2", "reads": "300 M", "output": "45 Gb" }
  ],
  "hiSeq-2500": [
    { "mode": "rapid", "reads": "150.696 M", "output": "22.6044 Gb" },
    { "mode": "rapid", "reads": "300 M", "output": "45 Gb" },
    { "mode": "rapidv2", "reads": "150.696 M", "output": "22.6044 Gb" },
    { "mode": "rapidv2", "reads": "300 M", "output": "45 Gb" }
  ],
  "hiSeq-3000": [
    { "mode": "na", "reads": "3.125 M", "output": "46.875 Gb" },
  ],
  "hiSeq-4000": [
    { "mode": "na", "reads": "3.125 M", "output": "46.875 Gb" },
  ],
  "miSeq": [
    { "mode": "v2", "reads": "15 M", "output": "2.25 Gb" },
    { "mode": "v3", "reads": "25 M", "output": "2.75 Gb" },
    { "mode": "microv2", "reads": "4 M", "output": "600 M" },
    { "mode": "nanov2", "reads": "1 M", "output": "150 M" }
  ],
  "nextSeq-500": [
    { "mode": "highOutput", "reads": "400 M", "output": "60 Gb" },
    { "mode": "midOutput", "reads": "130 M", "output": "19.5 Gb" }
  ],
  "nextSeq-550": [
    { "mode": "highOutput", "reads": "400 M", "output": "60 Gb" },
    { "mode": "midOutput", "reads": "130 M", "output": "19.5 Gb" }
  ],
  "novaSeq-5000": [
    { "mode": "s1", "reads": "3.3 G", "output": "495 Gb" },
    { "mode": "s2", "reads": "3.3 G", "output": "495 Gb" },
    { "mode": "s3", "reads": "3.3 G", "output": "495 Gb" }
  ]
});

// $scope.Instruments = {
//   'NextSeq': {
//     name: 'NextSeq',
//     modes: {
//       mid: {
//         150: { illNumClusters: 65, illNumGb: 19.5, kitCyles: 150 },
//         300: { illNumClusters: 130, illNumGb: 39, kitCyles: 300 }
//       },
//       high: {
//         75: { illNumClusters: 100, illNumGb: 30, kitCyles: 75},
//         150: { illNumClusters: 200, illNumGb: 60, kitCyles: 150 },
//         300: { illNumClusters: 400, illNumGb: 120, kitCyles: 300 }
//       }
//     }
//   }
// };
