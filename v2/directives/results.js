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
    <div ng-if="results">
      <div class="alert alert-danger" ng-if="results.length == 0">
        Sorry, there are no instruments that will provide the
        coverage you require for this application.
      </div>
      <div class="table-responsive-sm" ng-if="results.length > 0">
        <table class="table table-striped table-responsive">
          <tr>
            <th width="15%" align="center">Instrument</th>
            <th width="15%" align="center">Mode</th>
            <th width="15%" style="text-align: center" align="center">Total Clusters Possible</th>
            <th width="15%" style="text-align: center" align="center">Predicted Clusters per Library</th>
            <th width="15%" style="text-align: center" align="center">
              Effective Coverage
            </th>
            <th>
              &nbsp;
            </th>
          </tr>
          <tr ng-if="$index < allowedResults" ng-repeat="i in results | orderBy: '-output.coverage'">
            <td>
              {{ i.data.instrument | instrumentName }}
            </td>
            <td>
              {{ i.data.mode | modeName }}
            </td>
            <td align="center" title="Reads: {{ i.data.reads }}">
              {{ i.data.reads  }}
            </td>
            <td align="center">
              {{ i.output.readPerLibrary * 1000 | number: 3 }} M
            </td>
            <td align="center">
              {{ i.output.coverage | number: 2 }}x
            </td>
            <td align="center">
              <button class="btn btn-outline-secondary" ng-click="resultDetail(i)">
                <i class="fa fa-info-circle"></i>
              </button>

              <button class="btn btn-outline-secondary" ng-click="json(i)">
                <i class="fa fa-info-circle"></i>
              </button>
            </td>
          </tr>
        </table>
      </div>

      <div ng-if="isLoggedIn == true" class="alert alert-success">
         <b>Welcome Back, {{ userInfo.displayName}}</b>
         Hope you are find what you need.
      </div>

      <div ng-if="results.length > 3" isLoggedIn !== true" class="alert alert-success">
         <h4>Need to See More?</h4>
         To see full list of sequencing options, enter you email, or if you
         already have an account with Meenta, sign-in.
         <br>
         <br>
         <h4 class="text-center">
         <a ng-click="login()"><u>Sign-in to your account</u></a>
         <!--or
         <a ng-click="login()"><u>Join our Newsletter</u></a> -->
         </h4>
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
