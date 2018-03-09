app.directive('summary', function() {
  return {
		scope: false,
		controller: ['$scope', function($scope) {
      // here
		}],
    template: `
      <p ng-if="parameters.summary" class="alert alert-secondary">
        A pool of <b>{{ parameters.numOfLibraries }}</b> libraries for <b>{{ parameters.applicationData.title }}</b>
        with a desired coverage of <b>{{ parameters.coverage }}x/library</b>,
        needs approx. <b>{{ parameters.summary.outputNeeded | number: 3 }} Gb</b> of data.
        (Note: this application typically needs {{ parameters.applicationData.requiredReads }} per library.)
        <br>
        <br>
        <span ng-if="parameters.summary.numOfAvlSolutions > 0">
          There are <b>{{ parameters.summary.numOfAvlSolutions }}</b> possible sequencing solutions
          which may meet you experimental needs. These options are sort by the 'effective coverage'
          to best help you find the minimum required.
        </span>

        <span ng-if="parameters.summary.numOfAvlSolutions == 0">
          There are <b>no</b> sequencing solutions. You need to either adjust the
          number of samples in the pool or the coverage you need per library.
        </span>
      </p>
    `
  }
});
