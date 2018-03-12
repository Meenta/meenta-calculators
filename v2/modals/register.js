app.run(['$uibModal', '$rootScope', function($uibModal, $rootScope) {

	$rootScope.register = function() {

		var modal = $uibModal.open({
			animation: false,
			size: 'lg',
			backdrop: 'static',
			keyboard: 'static',
			controller: ['$scope', 'Auth', '$timeout', '$state', '$rootScope', '$stateParams', function($scope, Auth, $timeout, $state, $rootScope, $stateParams) {

				// Setup the $scope bindings.
				$scope.showFormSpinner = false;
				$scope.showSuccessMessage = false;
				$scope.showErrorMessage = false;
				$scope.user = {
					email: localStorage.getItem('meenta-email') || ''
				};

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
						$rootScope.forgotPassword();
					}, 500);
				};

				// Setup the user.
				$scope.user = { type: 'user' };
				$scope.passwordStrength = {};

				// Form submit function that triggers when the user
				// clicks the button or hits return on the initial form.
				$scope.createAccount = function() {

          if ($scope.form.$invalid) {
            $scope.showErrorMessage = true;
            $scope.message = 'Missing fields';
            return;
          }

					// Clear the error state.
					$scope.showErrorMessage = false;

					// Call the Firebase Auth and create an account.
					Auth.createUserWithEmailAndPassword($scope.user.email, $scope.user.passcode)
					.then(function(user) {

						user.updateProfile({
							displayName: $scope.user.displayName || 'NA'
						}).then(function() {
							console.log('Updated the profile.');
						}, function(error) {
							console.log('Error updating displayName');
						});

						return user;
					})
					.then(function(user) {

						var obj = {
							email: user.email,
							uid: user.uid,
							displayName: $scope.user.displayName,
							phone: $scope.user.phone,
							jobTitle: $scope.user.jobTitle || '',
							organization: $scope.user.organization || '',
							notifications: { email: true, sms: false },
							type: 'host'
						};

            firebase.database().child('users').child(obj.uid).set(obj).then(function(d) {
							console.log('Successfully setup a new users');
						}, function(error) {
							console.log('Unable to add the user record.');
						});

						return user;
					})
					// All Done, so close the modal and change the state.
					.catch(function(err) {
						// Handle the error variables.
						$scope.error = err;
						$scope.showErrorMessage = true;
						$scope.message = err.message;

            $timeout(function() {
              $scope.$apply()
            }, 400);

						console.log('Error on $createUserWithEmailAndPassword', err);
					});
				};
			}],
			template: `
			<div class="modal-content">
				<div class="modal-body">
				<form name="form" id="registrationForm" novalidate ng-submit="createAccount();" autocomplete="nope">

						<div class="row">
							<div class="col-md-12 col-sm-12">
									<h3 class="c-blue" ng-if="user.type === 'user'">
										Are you a Researcher?
									</h3>
									<h3 class="c-blue" ng-if="user.type === 'host'">
										Are you a Service Provider?
									</h3>
									<p class="m-b-10" ng-if="user.type === 'user'">
										Ready to sign-up? Please complete the following
										and you will be on your way. Once you have an account
										you can setup your profile and will have access to our
										full search and research tools.
									</p>
									<p class="m-b-15" ng-if="user.type === 'host'">
										Ready to sign-up? Please complete the following
										and you will be on your way. Once you have an account
										you can setup your lab, or claim an existing instrument
										on our platform.
									</p>
									<p class="m-b-15" ng-if="user.type === 'user'">
										or <a href="" ng-click="user.type = 'host'">are you a service provider?</a>
									</p>
									<p class="m-b-15" ng-if="user.type === 'host'">
										or <a href="" ng-click="user.type = 'user'">are you a researcher?</a>
									</p>
						</div>
          </div>

					<div class="row">
						<div class="col-md-6 col-sm-6">
              <div class="form-group">
                <label for="displayName">Enter Full Name</label>
								<input type="text" ng-model="user.displayName" required name="name" class="form-control" placeholder="Enter your Full Name">

								<i ng-if="(showErrorMessage || form.name.$touched ) && form.name.$invalid" class="text-danger">
									Please enter your full name.
								</i>
              </div>
            </div>
						<div class="col-md-6 col-sm-6">
              <div class="form-group">
                <label for="phone">Phone Number</label>
							  <input type="tel" ng-model="user.phone" phone-input required name="phone" class="form-control" placeholder="Enter your Mobile Number">
								<i ng-if="(showErrorMessage || form.phone.$touched) && form.phone.$invalid" class="text-danger">
									Please enter a valid US phone number.
								</i>
              </div>
            </div>
          </div>

          <div class="row">
						<div class="col-md-6 col-sm-6">
              <div class="form-group">
                <label for="organization">Organization</label>
								<span class="input-group-addon"><i class="zmdi zmdi-balance"></i></span>
								<div class="fg-line">
									<input type="text" ng-model="user.organization" required name="organization" class="form-control" placeholder="Enter your Organization">
								</div>
								<i ng-if="(showErrorMessage || form.organization.$touched ) && form.organization.$invalid" class="text-danger">
									Please enter your current company or organization.
								</i>
              </div>
            </div>
						<div class="col-md-6 col-sm-6">
              <div class="form-group">
                <label for="jobTitle">Job Title</label>
  							<input type="text" ng-model="user.jobTitle" required name="jobTitle" class="form-control" placeholder="Enter your Job Title">
  							<i ng-if="(showErrorMessage || form.jobTitle.$touched) && form.jobTitle.$invalid" class="text-danger">
  								Please enter your current job title.
  							</i>
              </div>
            </div>
          </div>

          <div class="row">
						<div class="col-md-6 col-sm-6">
              <div class="form-group">
                <label for="email">Email</label>
  							<input type="text" ng-model="user.email" required name="email" class="form-control" placeholder="Enter your Email Address">
  							<i ng-if="(showErrorMessage || form.email.$touched) && form.email.$invalid" class="text-danger">
  								Please enter your email address.
  							</i>
              </div>
						</div>
            <div class="col-md-6 col-sm-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Enter a Password</label>
  								<input
  									type="password"
  									ng-model="user.passcode"
  									required
  									name="passcode"
  									zx-min-score="3"
  									zxcvbn="passwordStrength"
  									zx-extras="form"
  									class="form-control"
  									placeholder="Enter a Password">
                </div>
						</div>
          </div>

          <!--
          <div class="row">
            <div class="col-md-12 col-sm-12 mb-3">

								<zx-password-meter ng-if="passwordStrength.score > 0" class="m-t-10" value="{{ passwordStrength.score }}" max="3"></zx-password-meter>

                <i ng-if="passwordStrength.score === 0" class="c-gray f-12">
									Hint: Enter a password with characters (upper and lowercase) and numbers. Special characters help.
									Password must contains at numbers and characters. Minimum of of 10 characters in length.
								</i>
								<i ng-if="passwordStrength.score === 1" class="c-gray f-12">
									Hint: <b>Too Weak</b> a Password.
									Password must contains at numbers and characters. Minimum of of 10 characters in length.
								</i>
								<i ng-if="passwordStrength.score === 2" class="c-gray f-12">
									Hint: <b>Moderately</b> Secure Password, keep going.
									Password must contains at numbers and characters. Minimum of of 10 characters in length.
								</i>
								<i ng-if="passwordStrength.score === 3" class="c-gray f-12">
									Hint: <b>Strong</b> Password, almost done.
									Password must contains at numbers and characters. Minimum of of 10 characters in length.
								</i>
								<i ng-if="passwordStrength.score === 4" class="c-black f-12">
									Hint: Very Good Password! All Set.
								</i>
            </div>
          </div>
          -->

          <div class="row" ng-show="showErrorMessage">
						<div class="col-md-12 col-sm-12">
							<div id="formErrorMessage" class="col-md-12 f-16 alert alert-danger">
								Note: {{ message }}
							</div>
            </div>
					</div>

          <div class="row">
						<div class="col-md-12 col-sm-12 text-right">
							<a href="#" prevent-default class="btn btn-link" ng-click="close()">Cancel</a>
							<button type="submit" name="submitBtn" id="submitBtn" class="btn btn-primary">
								Continue
							</button>
						</div>
					</div>

				</form>
				</div>
			</div>
			`
		});
	};

}]);
