app.directive('results', function() {
  return {
    scope: false,
		controller: ['$scope', '$rootScope', 'Auth', function($scope, $rootScope, auth) {

      $scope.allowedResults = 3;

      $scope.$on('newResults', function(noop, results) {
        $scope.results = results;
      });

      if ($rootScope.userInfo) {
        $scope.allowedResults = 100;
      }

      auth.onAuthStateChanged(function(user) {
        if (user) {
          $scope.allowedResults = 100;
        } else {
          $scope.allowedResults = 3;
        }
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
          <th width="15%" style="text-align: center" align="center">Clusters</th>
          <th width="15%" style="text-align: center" align="center">Output</th>
          <th width="15%" style="text-align: center" align="center">Clusters per Library</th>
          <th width="15%" style="text-align: center" align="center">
            Effective Coverage
          </th>
        </tr>
        <tr ng-if="$index < allowedResults" ng-repeat="i in results | orderBy: '+output.coveragePerGenome'">
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
          <td align="center">
            {{ i.output.actualReads * 1000 | number: 2 }} M
          </td>
          <td align="center">
            {{ i.output.actualOutput | number: 2 }} Gb
          </td>
          <td align="center">
            {{ i.output.predReads * 1000 | number: 2 }} M
          </td>
          <td align="center">
            {{ i.output.coveragePerGenome | number: 0 }}x
          </td>
        </tr>
      </table>

      <div ng-if="isLoggedIn == true" class="alert alert-success">
         <b>Welcome Back, {{ userInfo.displayName}}</b>
         Hope you are find what you need.
      </div>

      <div ng-if="isLoggedIn !== true" class="alert alert-success">
         <h4>Need to See More?</h4>
         To see full list of sequencing options, enter you email, or if you
         already have an account with Meenta, sign-in.
         <br>
         <a ng-click="login()">Sign-in</a>
      </div>

      <i ng-if="parameters.labReadAdjustment === 1">
        Notes: Reads and Output using Illumina specifications.
      </i>

      <i ng-if="parameters.labReadAdjustment !== 1">
        Notes: Reads and Output are {{ parameters.labReadAdjustment }}% of Illumina specifications.
        This assumes a duplicate tolerance of {{ parameters.dupTolerance }}%.
      </i>

    </div>
    `
	};
});
