app.directive('summary', function() {
  return {
		scope: false,
		controller: ['$scope', function($scope) {
      // here
		}],
    template: `
      <p ng-if="parameters.summary" class="alert alert-secondary">
        A pool of <b>{{ parameters.numOfLibraries }}</b> libraries for <b>{{ parameters.applicationData.title }}</b>.
        <span ng-if="parameters.applicationData">
          <i>(Requires <b>{{ parameters.applicationData.requiredReads }} reads</b> per library.)</i>
        </span>

        <span ng-if="parameters.summary.numOfAvlSolutions > 0">
          <br><br>
          There are <b>{{ parameters.summary.numOfAvlSolutions }}</b> possible sequencing solutions
          which may meet you experimental needs.
        </span>
      </p>
    `
  }
});
