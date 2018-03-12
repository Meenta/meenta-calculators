app.run(['$rootScope', '$uibModal', function($rootScope, $uibModal) {

	$rootScope.showJSONModal = function(item, name) {

		var modal = $uibModal.open({
			animation: false,
			size: '',
			backdrop: true,
			keyboard: true,
			template: `
				<div class="modal-content">
				    <div class="modal-header">
				        <h4 class="modal-title">View JSON for '{{ name }}' Path</h4>
				    </div>
				    <div class="modal-body">
				<pre style="height: 450px; overflow: scroll;">{{ item | json }}</pre>
				    </div>
				    <div class="modal-footer">
				        <a ng-if="fbDbUrl" href="{{ fbDbUrl }}" class="btn btn-link" target="_blank">
				            Open Firebase DB
				        </a>
				        <button type="button" class="btn btn-link" ng-click="close();" data-dismiss="modal">
				            Close
				        </button>
				    </div>
				</div>
			`,
			controller: ['$scope', function($scope) {

				if (item.$ref && typeof item.$ref == 'function')
					$scope.fbDbUrl = item.$ref().toString();

				$scope.item = item;
				$scope.name = name || 'Object';

				$scope.close = function() {
					modal.close();
				};
			}]
		});

	};

	$rootScope.json = $rootScope.showJSONModal;
}]);
