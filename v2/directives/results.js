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
