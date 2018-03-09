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
