app
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.html5Mode({ enabled: false, requireBase: true });
	$locationProvider.hashPrefix('!');

	// Set the default path.
	$urlRouterProvider.otherwise('/calculator/dna/human/whole-genome/10');

	$stateProvider
		.state('calculator', {
			url: '/calculator/:type/:material/:application/:libraries',
			controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {

				// When the parameters change, we need to update the route.
				$scope.$on('updatedParameters', function(noop, parameters) {

					$state.go('calculator', {
						type: parameters.type || 'dna',
						material: parameters.material || 'human',
						application: parameters.application || 'whole-genome',
						libraries: parseInt(parameters.numOfLibraries || 10)
					}, { notify: true });

				});

			}],
	    template: `<calculator-workspace></calculator-workspace>`
		});

}]);
