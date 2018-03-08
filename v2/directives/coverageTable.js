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
