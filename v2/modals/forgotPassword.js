app.run(['$uibModal', '$rootScope', function($uibModal, $rootScope) {

	$rootScope.forgotPassword = function($event) {

		// Check if we have an event we need to stop.
		if ($event) $event.stopPropagation();

		var modal = $uibModal.open({
			animation: false,
			size: 'sm',
			backdrop: true,
			keyboard: true,
			controller: ['$scope', 'Auth', '$timeout', function($scope, Auth, $timeout) {

				// Setup the Scope data.
				$scope.email = localStorage.getItem('meenta-email') || '';
				$scope.pass = null;
				$scope.showFormSpinner = false;
				$scope.showErrorMessage = false;
				$scope.showSuccessMessage = false;

				// Click event to close the modal.
				$scope.close = modal.close();

        $scope.switchToRegistration = function() {
					// Close the spinner.
					$scope.showFormSpinner = false;
					$scope.showErrorMessage = false;

					// Close the modal.
					modal.close();

					$timeout(function() {
						$rootScope.register();
					}, 500);
				};

				$scope.switchToLogin = function() {
					// Close the spinner.
					$scope.showFormSpinner = false;
					$scope.showErrorMessage = false;

					// Close the modal.
					modal.close();

					$timeout(function() {
						$rootScope.login();
					}, 500);
				};

				// Click event to process the modal action.
				$scope.ok = function() {
					// Show the spinner.
					$scope.showFormSpinner = true;
					$scope.showErrorMessage = false;

					// Tell firebase we want to reset the password.
					Auth.$sendPasswordResetEmail($scope.email)
					.then(function(res) {
						// hide the spinner.
						$scope.showFormSpinner = false;
						$scope.showSuccessMessage = true;

						// Store the email for later use.
						localStorage.setItem('meenta-email', $scope.email);

						$scope.status = true;
						$scope.message = 'Expect an email!';

						// Delay the closing of the modal.
						$timeout(function() {
							// modal.close();
						}, 1000);
					})
					.catch(function(error) {
						$scope.showFormSpinner = false;
						$scope.showErrorMessage = true;
						$scope.showSuccessMessage = false;
						$scope.message = 'Oops, there is no user record corresponding to this email. Maybe you entered the wrong email?';
					});
				};
			}],
			template: `
				<div class="modal-content">
			    <div class="modal-header">
			        <h4 class="modal-title">Reset Password</h4>
			    </div>
			    <div class="modal-body">
		        <p>
		            Enter the email address associated with your account,
		            and we’ll email you a link to reset your password.
		        </p>
		        <form name="form" novalidate>
              <div class="row">
                <div class="col-md-12">
	                    <input type="email" ng-model="email" required name="email" class="form-control" placeholder="Enter your Email Address">
                </div>
              </div>
              <br>
	            <div class="row">
                <div class="col-md-12">
                    {{ message }}
                </div>
	            </div>
	            <div class="row m-b-20" ng-show="showErrorMessage" >
	                <div class="col-md-12 text-center c-red">
	                    {{ message }}
	                </div>
	            </div>
	            <div class="row m-b-20" ng-show="showSuccessMessage" >
	                <div class="col-md-12 text-center c-green">
	                    An email with a reset link has been sent! Please
	                    use the link, and the login again.
	                </div>
	            </div>
	            <button ng-show="!showSuccessMessage" type="button" class="btn btn-success btn-lg btn-block" ng-disabled="form.$invalid" ng-click="ok();">Send Reset Link</button>
	            <button ng-show="showSuccessMessage" type="button" class="btn btn-success btn-lg btn-block" ng-click="switchToLogin();">Sign in</button>
		        </form>
						<br>
						<hr>
						<div class="row">
							<div class="col-sm-10">
								Don't have an account?

                <br>
								<button type="button" class="btn btn-primary" ng-click="switchToRegistration();">Register</button>
						</div>
						<br>
			    </div>
				</div>
				`
		});
	};
}]);
