app.run(['$uibModal', '$rootScope', function($uibModal, $rootScope) {

	$rootScope.resultDetail = function(data) {

		var modal = $uibModal.open({
			animation: false,
			size: '',
			backdrop: true,
			keyboard: true,
			controller: ['$scope', 'Auth', '$timeout', '$state', '$rootScope', function($scope, Auth, $timeout, $state, $rootScope) {

				$scope.data = data;
				var ref = firebase.database().ref().child('equipment').child(data.data.id);

				$scope.equipment = {};

				ref.once('value', function(snap) {
					$scope.equipment = snap.val();
					$timeout(function() {
						$scope.$apply();
					}, 100);

				}).catch(function(err) {
					console.log('Unable to access', err);
				})

				// Close if logged in.
				if ($rootScope.userInfo) {
					modal.close();;
				}

				// Click event close the modal.
				$scope.close = function() {
					modal.close();
				};

			}],
			template: `<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">
						{{ equipment.maker }} - {{ equipment.name }}
					</h4>
				</div>
				<div class="modal-body">

					<div class="row">
						<div class="col-md-4">
							<img ng-src="{{ equipment.photoUrl }}" width="100">
						</div>
						<div class="col-md-8">

							<b>
								Instrument Details
							</b>

							<table class="table">
								<tr>
									<td>
										Mode:
									</td>
									<td>
										{{ data.data.mode | modeName }}
									</td>
								</tr>
								<tr>
									<td>
										Output:
									</td>
									<td>
										{{ data.data.output }}
									</td>
								</tr>
								<tr>
									<td>
										Reads:
									</td>
									<td>
										{{ data.data.reads }}
									</td>
								</tr>
							</table>

							<p>
								There are <b>11</b> Service providers accept libraries
								for sequencing on this instrument. Currently
								there are 5 that accept libraries on Meeta.
							</p>

							<a class="btn btn-success" target="_blank" href="https://meenta.io/search/#!/?q={{ equipment.name }}&utm-source=calculator">
								Find Provider
							</a>

						</div>
					</div>

				</div>
				<div class="modal-footer">
					<button class="btn btn-link" ng-click="close()">
						Close
					</button>
				</div>
			</div>
			`,
		});
	};

}]);
