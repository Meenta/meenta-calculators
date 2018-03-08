var app = angular.module('calculators', [ 'angular.filter', 'ui.router' ]);

app.config(function() {

  var config = {
    apiKey: "AIzaSyBFeEzLC7tH2fyEhSXEjA6LxEkfVlFtvXY",
    authDomain: "samplehub-25c4d.firebaseapp.com",
    databaseURL: "https://samplehub-25c4d.firebaseio.com",
    projectId: "samplehub-25c4d",
    storageBucket: "samplehub-25c4d.appspot.com",
    messagingSenderId: "529323641154"
  };

  firebase.initializeApp(config);
});

app.constant('applications', [
  // RNA
  // illumina Examples.
  { key: 'mRNA-Seq', type: 'rna', requiredReads: '25 M', title: 'mRNA Seq' },
  { key: 'total-rna-qeq', type: 'rna', requiredReads: '50 M', title: 'Total RNA Seq' },
  { key: 'pan-cancer', type: 'rna', requiredReads: '3 M', title: 'Pan Cancer' },
  { key: 'ran-access', type: 'rna', requiredReads: '25 M', title: 'RNA Access' },
  { key: 'small-RNA', type: 'rna', requiredReads: '2.2 M', title: 'Small RNA' },

  // extras
  { key: 'gene-expression', type: 'rna', requiredReads: '10 M',  title: 'Gene Expression Profiling' },
  { key: 'enriched-RNA-Seq', type: 'rna', requiredReads: '25 M', title: 'Enriched RNA Seq' },

  // DNA
  { key: 'whole-genome', type: 'dna', requiredReads: '3.3 Gb', title: 'Whole Genome Sequencing' },
  { key: 'nextera-rapid-capture-exome', type: 'dna', requiredReads: '45 M', title: 'Nextera Rapid Capture Exome' },
  { key: 'nextera-rapid-capture-expanded-exome', type: 'dna', requiredReads: '62 M', title: 'Nextera Rapid Capture Expanded Exome' },
  { key: 'truseq-amplicon-cancel-panel', type: 'dna', requiredReads: '0.035 M', title: 'TruSeq Amplicon Cancer Panel' },
  { key: 'truseq-exome', type: 'dna', requiredReads: '45 M', title: 'TruSeq Exome' },
  { key: 'truseq-cancer', type: 'dna', requiredReads: '0.3 M', title: 'TruSeq Cancer' },
  { key: 'truseq-cardio', type: 'dna', requiredReads: '0.572 M', title: 'TruSeq Cardio' },
  { key: 'truseq-inherited-disease', type: 'dna', requiredReads: '2.25 M', title: 'TruSeq Inherited Disease' },
  { key: 'truseq-myeliod', type: 'dna', requiredReads: '0.141 M', title: 'TruSeq Myeliod' },
  { key: 'truseq-one', type: 'dna', requiredReads: '12 M', title: 'TruSeq One' },
  { key: 'truseq-tumor-15', type: 'dna', requiredReads: '0.044 M', title: 'TruSeq Tumor 15' },
  { key: 'truseq-tumor-26', type: 'dna', requiredReads: '0.021 M', title: 'TruSeq Tumor 15' }
]);

app.constant('instruments', {
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

app.constant('instruments4Development', {
  "nextSeq-500": [
    { "mode": "midOutput", "reads": "65 M", "output": "19.5 Gb" },
    { "mode": "midOutput", "reads": "130 M", "output": "39 Gb" }
  ],
  "nextSeq-550": [
    { "mode": "highoutput", "reads": "100 M", "output": "30 Gb" },
    { "mode": "highoutput", "reads": "200 M", "output": "60 Gb" },
    { "mode": "highoutput", "reads": "400 M", "output": "120 Gb" }
  ]
});

app.directive('coverageTable', function() {
  return {
		scope: false,
		controller: ['$scope', function($scope) {
      //
		}],
    template: `
      <table class="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th width="10%" style="vertical-align: middle; text-align: center;" align="center">Coverage</th>
            <th width="15%" style="vertical-align: middle; text-align: center;" align="center">Required Mb</th>
            <th width="15%" style="vertical-align: middle; text-align: center;" align="center">Required Gb</th>
            <th width="15%" style="vertical-align: middle; text-align: center;" align="center">Total Gb Required</th>
            <th width="15%" style="vertical-align: middle; text-align: center;" align="center">Total Gb Required with Duplication</th>
          </tr>
        </thead>
        <tr ng-repeat="rec in coverageData" ng-class="{ 'table-success': parameters.coverage == rec.coverage }">
          <td align="center">
            {{ rec.coverage }}X
          </td>
          <td align="center">
            {{ rec.requiredMb | number: 0 }} Mb
          </td>
          <td align="center">
            {{ rec.requiredGb | number: 2 }} Gb
          </td>
          <td align="center">
            <b>{{ rec.totalGbRequired | number: 1 }} Gb</b>
          </td>
          <td align="center">
            <b>{{ rec.totalFbRequiredWithDup | number: 1 }} Gb</b>
          </td>
        </tr>
      </table>
    `
	};
});

app.directive('calculatorForm', function() {
  return {
    scope: false,
    controller: [ '$rootScope', '$scope', 'applications', function( $rootScope, $scope, applications ) {

      $scope.applications = applications;

      $scope.$watch('parameters', function(newVal, oldVal) {
        if (newVal !== oldVal)
          $scope.$emit('updatedParameters', $scope.parameters);
      }, true);

    }],
    template: `
      <form name="form" novalidate>
        <div class="row">
          <div class="col-md-5 mb-3">
            What material are you sequencing?
          </div>
          <div class="col-md-3 mb-3">
            <select class="form-control" id="material" required name="material" aria-label="Material" ng-model="parameters.material" aria-describedby="Material">
              <option value="">Select Spec</option>
              <option value="human">Human</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-5 mb-3">
            What application are you performing?
          </div>
          <div class="col-md-6 mb-3">
            <select class="form-control custom-select" required id="application" name="application" ng-model="parameters.application" aria-label="Genome Size (Gb)" aria-describedby="genome">
              <option value="">Select Material and Application</option>
              <optgroup label="{{ key | uppercase }}" ng-repeat="(key, item) in applications | groupBy:'type'">
                <option value="{{ rec.key }}" ng-repeat="rec in item">
                  {{ rec.title }} (min reads: {{ rec.requiredReads }}{{ rec.units }})
                </option>
              </optgroup>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-5 mb-3">
            How many libraries do you have?
          </div>
          <div class="col-md-3 mb-3">
            <div class="input-group mb-2">
              <input type="number" class="form-control" ng-min="1" name="numOfLibraries" required ng-model="parameters.numOfLibraries" placeholder="Number Of Libraries" aria-label="Number Of Libraries" aria-describedby="# of Libraries">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-5 mb-3">
            What coverage do you need?
          </div>
          <div class="col-md-3 mb-3">
            <div class="input-group mb-2">
              <select class="form-control" name="coverage" ng-model="parameters.coverage" required aria-label="Coverage" aria-describedby="coverage">
                <option value="10">10x</option>
                <option value="15">15x</option>
                <option value="20">20x</option>
                <option value="30">30x</option>
                <option value="40">40x</option>
                <option value="50">50x</option>
                <option value="75">75x</option>
                <option value="100">100x</option>
                <option value="150">150x</option>
                <option value="200">200x</option>
              </select>
            </div>
          </div>
        </div>

        <p ng-if="form.$invalid" class="text-danger">
          Hint: You are missing some parameters to run this calculator.
        </p>

        <div class="row" style="display: none">
          <div class="col-md-4 mb-4">
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text" id="genome">Gb</span>
              </div>
              <input type="number" class="form-control" ng-model="parameters.genome" placeholder="Genome Size (Gb)" aria-label="Genome Size (Gb)" aria-describedby="genome">
            </div>
            <div class="input-group mb-2 d-none d-md-block">
              <small class="text-muted"><i>Hint: Human Whole Genome ranges from 2.7 to 3.3 Gb.</i></small>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon2">Duplication Tolerance</span>
              </div>
              <input type="number" class="form-control" ng-model="parameters.dupTolerance" placeholder="2" aria-label="Duplication Tolerance" aria-describedby="dupTolerance">
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">%</span>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon2">Lab Read Adj.</span>
              </div>
              <input type="number" class="form-control" id="labReadAdjustment" name="labReadAdjustment" ng-model="parameters.labReadAdjustment" placeholder="%" aria-label="Lab Read Adjustment" aria-describedby="Lab Read Adjustment">
              <div class="input-group-append">
                <span class="input-group-text" id="labReadAdjustment">%</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    `
  }
})

app.directive('results', function() {
  return {
    scope: false,
		controller: ['$scope', '$timeout', function($scope, $timeout) {

      $scope.$on('newResults', function(noop, results) {
        $scope.results = results;
      });

		}],
    template: `
    <div ng-if="results && results.length > 0">
      <table class="table table-striped">
        <tr>
          <th width="15%" align="center">Instrument</th>
          <th width="15%" align="center">Mode</th>
          <th width="15%" align="center" ng-if="parameters.settings.showIlluminaSpecifications">Ill Reads</th>
          <th width="15%" align="center" ng-if="parameters.settings.showIlluminaSpecifications">Ill. Output</th>
          <th width="15%" align="center" ng-if="parameters.settings.showIlluminaSpecifications">Predicted clusters per library (M)</th>
          <th width="15%" align="center">Clusters</th>
          <th width="15%" align="center">Output</th>
          <th width="15%" align="center">Clusters per Library</th>
          <th width="15%" align="center">
            Effective Coverage
          </th>
        </tr>
        <tr ng-if="$index < 2" ng-repeat="i in results | orderBy: '+output.coveragePerGenome'">
          <td>
            {{ i.data.instrument | instrumentName }}
          </td>
          <td>
            {{ i.data.mode | modeName }}
          </td>
          <td align="center" ng-if="parameters.settings.showIlluminaSpecifications">
            {{ i.data.reads }}
          </td>
          <td align="center" ng-if="parameters.settings.showIlluminaSpecifications">
            {{ i.data.output | number: 1 }}
          </td>
          <td align="center" ng-if="parameters.settings.showIlluminaSpecifications">
            {{ i.output.readsPerLibary * 1000 | number:2 }} M
          </td>
          <td>
            {{ i.output.actualReads * 1000 | number: 2 }} M
          </td>
          <td>
            {{ i.output.actualOutput | number: 2 }} Gb
          </td>
          <td>
            {{ i.output.predReads * 1000 | number: 2 }} M
          </td>
          <td align="center">
            {{ i.output.coveragePerGenome | number: 0 }}x
          </td>
        </tr>
      </table>

      <div class="alert alert-success">
         To see full list of sequencing options, enter you email, or if you
         already have an account with Meenta, sign-in.
      </div>

      <i ng-if="parameters.labReadAdjustment === 1">
        Notes: Reads and Output using Illumina specifications.
      </i>
      <i ng-if="parameters.labReadAdjustment !== 1">
        Notes: Reads and Output are {{ parameters.labReadAdjustment }}% of Illumina specifications.
      </i>

    </div>
    `
	};
});

app.directive('summary', function() {
  return {
		scope: false,
		controller: ['$scope', function($scope) {
      // here
		}],
    template: `
      <p ng-if="parameters.summary" class="alert alert-secondary">
        A pool of <b>{{ parameters.numOfLibraries }}</b> libraries for <b>{{ parameters.applicationData.title }}</b>
        application with a minimum desired coverage of <b>{{ parameters.coverage }}x/library</b>,
        needs approx. <b>{{ parameters.summary.outputNeeded | number: 3 }} Gb</b> of data.
        (Note: this application typically needs {{ parameters.applicationData.requiredReads }} per library.)
        <br>
        <br>
        <span ng-if="parameters.summary.numOfAvlSolutions > 0">
          There are <b>{{ parameters.summary.numOfAvlSolutions }}</b> possible sequencing solutions
          which may meet you experimental needs.
        </span>

        <span ng-if="parameters.summary.numOfAvlSolutions == 0">
          There are <b>no</b> sequencing solutions. You need to either adjust the
          number of samples in the pool or the coverage you need per library.
        </span>
      </p>
    `
  }
});

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

app.factory('Sequence', function() {

  // Simple class to manage the calculator.
  var Sequencing = function(data, parameters) {
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
      var readsPerLibary = this.ref.reads / parameters.numOfLibraries;
      var readsPerLibraryAct = readsPerLibary * parameters.labReadAdjustment;

      // Stage 1: Calc the actual out with the adjustment off of Illumina.
      var actualReads = this.ref.reads * parameters.labReadAdjustment;
      var actualOutput = this.ref.output * parameters.labReadAdjustment;

      // Stage 2:
      var predReads = actualReads / parameters.numOfLibraries;

      var outputPerGenome = actualOutput / ( parameters.genome / 1000 );
      var outputPerGenomeWithDedup = outputPerGenome * parameters.dupTolerance;

      var outputPerGenomeWithDedup = outputPerGenome - outputPerGenomeWithDedup;

      var coveragePerGenome = outputPerGenomeWithDedup / parameters.numOfLibraries;
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
      this.valid = output.coveragePerGenome >= parameters.coverage;

      this.output = output;
    };

    // Init the data in the class.
    this.init(data);

    // For the process to run.
    this.process();
  }

  return Sequencing;
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
      case 'hiseq-2500':
        out = 'HiSeq 2500';
      default:
        //
    }
    return out;
  }
});

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
      case 's1':
      case 's2':
      case 's3':
        out = out.toUpperCase()
        break;
      default:
        out = out;
    }
    return out;
  }
});

app
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.html5Mode({ enabled: false, requireBase: true });
	$locationProvider.hashPrefix('!');

	// Set the default path.
	$urlRouterProvider.otherwise('/calculator/human/whole-genome');

	$stateProvider
		.state('calculator', {
			url: '/calculator/:material/:application',
			controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {

				// When the parameters change, we need to update the route.
				$scope.$on('updatedParameters', function(noop, parameters) {

					$state.go('calculator', {
						material: parameters.material || 'human',
						application: parameters.application || ''
					}, { notify: true });

				});

			}],
	    template: `<calculator-workspace></calculator-workspace>`
		});

}]);

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


app.service('$utils', [ function() {

  // Funciton to convert a string to GB.
  var toGb = function(val) {
    var t = val.trim().split(' ');
    if (t.length === 0) return 0;

    if (t.length === 1) {
      return parseFloat(t[0]) / 1000;
    }

    if (t.length === 2) {
      if (t[1].toLowerCase() === 'm') {
        return parseFloat(t[0]) / 1000;
      } else {
        return parseFloat(t[0]);
      }
    }
  }

  return {
    toGb: toGb
  }

}]);
