app.run(['$uibModal', '$rootScope', function($uibModal, $rootScope) {

	$rootScope.login = function(toState) {

		var modal = $uibModal.open({
			animation: false,
			size: '',
			backdrop: true,
			keyboard: true,
			controller: ['$scope', 'Auth', '$timeout', '$state', '$rootScope', function($scope, Auth, $timeout, $state, $rootScope) {

				// Close if logged in.
				if ($rootScope.userInfo) {
					modal.close();;
				}

				// Setup the $scope bindings.
				$scope.email = null;
				$scope.pass = null;
				$scope.showFormSpinner = false;
				$scope.showSuccessMessage = false;
				$scope.showErrorMessage = false;
				$scope.email = localStorage.getItem('meenta-email') || '';

				// Click event to cleanup the scope variables.
				$scope.cleanup = function() {
					$scope.showFormSpinner = false;
					$scope.showSuccessMessage = false;
					$scope.showErrorMessage = false;
				};

				// Click event close the modal.
				$scope.close = function() {
					$scope.cleanup();
					modal.close();
				};

				// Click event to change to the password modal.
				$scope.switchToPasswordReset = function() {
					$scope.cleanup();
					modal.close();

					$timeout(function() {
						$rootScope.forgotPassword2();
					}, 500);
				};

				// Click event to change to the regstration modal.
				$scope.switchToRegistration = function() {
					$scope.cleanup();
					$rootScope.register();
					modal.close();
				};

				// Click event to login.
				$scope.ok = function() {
					$scope.showSuccessMessage = false;
					$scope.showErrorMessage = false;
					$scope.showFormSpinner = true;
					$scope.message = 'Checking your creds....';

					Auth.signInWithEmailAndPassword($scope.email, $scope.pass)
					.then(function() {
						$scope.showSuccessMessage = true;
						$scope.message = 'Ok, gotcha. Setting our you stuff...';

						// Store the email for later use.
						localStorage.setItem('meenta-email', $scope.email);

						$timeout(function() {
							$scope.cleanup();

							// if (toState) $state.go(toState);

							modal.close();
						}, 1500);
					})
					.catch(function(error) {
						$scope.showFormSpinner = false;
						$scope.showErrorMessage = true;
						$scope.message = error.message;
					});
				};
			}],
			template: `<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Already have an account?</h4>
				</div>
				<div class="modal-body">
					<form name="form" id="loginForm" novalidate>
						<div class="fg-line m-b-10">
							<input type="text" ng-model="email" required name="email" class="form-control" placeholder="Enter your Email Address">
						</div>
						<br>
						<div class="fg-line">
							<input type="password" ng-model="pass" required name="pass" class="form-control" placeholder="Enter a Password">
						</div>
						<br>
						<a href="#" class="pull-right c-black m-t-5" ng-click="switchToPasswordReset();">Forgot your password?</a>
						<button type="button" id="submitBtn" class="btn btn-success btn-lg btn-block" ng-disabled="form.$invalid" ng-click="ok();">Log in</button>
					</form>
					<div class="row" ng-show="showFormSpinner">
						<div class="col-md-9">
							{{ message }}
						</div>
					</div>
					<div class="row" ng-show="showErrorMessage" >
						<div class="col-md-11 text-center text-danger">
							{{ message }}
						</div>
					</div>
					<hr>
					<div class="row">
						<div class="md-7">
							Don't have an account?
						</div>
						<div class="md-2 pull-right">
							<button type="button" class="btn btn-default pull-right" ng-click="switchToRegistration();">Sign up</button>
						</div>
					</div>
					<br>
				</div>
			</div>
			`,
		});
	};

}]);
