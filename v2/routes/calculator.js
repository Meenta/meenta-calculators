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
