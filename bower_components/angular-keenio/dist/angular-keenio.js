(function (angular) {

  angular.module('angular-keenio.config', [])
    .value('angular-keenio.config', {
      debug: true
    });

  angular.module('angular-keenio.directives', []);
  angular.module('angular-keenio.services', []);
  angular.module('angular-keenio', [
    'angular-keenio.config',
    'angular-keenio.directives',
    'angular-keenio.services'
  ]);

})(angular);

(function (angular) {

  angular.module('angular-keenio.directives')

    .directive('tbkKeenRawMetric', [
      '$injector', '$filter', 'tbkKeenClient', function ($injector, $filter, tbkKeenClient) {
        var prepareClasses = function (scope) {
          var containerClass = scope.containerClass || 'tbk-keen-metric';
          return {
            container: containerClass,
            loading: scope.loadingClass || containerClass + '-loading',
            error: scope.errorClass || containerClass + '-error',
            success: scope.successClass || containerClass + '-success'
          };
        };
        var prepareTexts = function (scope) {
          return {
            prefix: scope.prefix || '',
            postfix: scope.postfix || '',
            loading: scope.loadingText || 'Loading...',
            error: scope.errorText || 'An error occured!'
          };
        };
        var prepareOptions = function (scope) {
          var hasFilter = scope.filter && $injector.has(scope.filter + 'Filter');
          return {
            scale: parseInt(scope.scale, 10) || 0,
            factor: parseFloat(scope.factor) || 1,
            filter: hasFilter ? scope.filter : null,
            useFilter: hasFilter
          };
        };

        var d = {
          scope: {
            query: '=',
            prefix: '@',
            postfix: '@',
            scale: '@',
            factor: '@',
            filter: '@',
            loadingText: '@',
            errorText: '@',
            containerClass: '@',
            loadingClass: '@',
            successClass: '@',
            errorClass: '@'
          },
          controller: ['$scope', function ($scope) {
            $scope.texts = prepareTexts($scope);
            $scope.classes = prepareClasses($scope);
            $scope.options = prepareOptions($scope);

            $scope.flags = {
              loading: false,
              error: false
            };

            $scope.response = null;
          }],
          link: function ($scope, $element) {
            $element.addClass($scope.classes.container);

            var resetState = function () {
              $scope.result = null;
              $scope.response = null;
              $scope.error = null;

              $scope.flags.loading = true;
              $scope.flags.error = false;

              $element.addClass($scope.classes.loading);
              $element.removeClass($scope.classes.success);
              $element.removeClass($scope.classes.error);
            };

            (function fetchMetric() {
              resetState();

              tbkKeenClient.run($scope.query, function (error, response) {
                $scope.response = response;
                $scope.error = error;
                $scope.flags.error = !!error;
                $scope.flags.loading = false;

                if (!error) {
                  var result = response.result * $scope.options.factor;
                  if ($scope.options.useFilter) {
                    $scope.result = $filter($scope.options.filter)(result, $scope.options.scale);
                  } else {
                    $scope.result = $filter('number')(result, $scope.options.scale);
                  }
                }

                $element.removeClass($scope.classes.loading);
                $element.addClass(error ? $scope.classes.error : $scope.classes.success);

                $scope.$digest();
              });
            })();
          },
          template: '<span>' +
          '<span data-ng-hide="flags.loading || flags.error">' +
          '{{ texts.prefix }}' +
          '{{ result }}' +
          '{{ texts.postfix }}' +
          '</span>' +
          '<span data-ng-show="flags.loading">' +
          '{{ texts.loading }}' +
          '</span>' +
          '<span data-ng-show="flags.error">' +
          '{{ texts.error }}' +
          '</span>' +
          '</span>'
        };

        return d;
      }])

    .directive('tbkKeenDefaultRawMetric', [
      '$injector', '$filter', 'tbkKeenClient', function ($injector, $filter, tbkKeenClient) {

        var d = {
          scope: {
            analysisType: '@',
            targetProperty: '@',
            eventCollection: '@',
            queryOptions: '=?',
            prefix: '@',
            postfix: '@',
            scale: '@',
            factor: '@',
            filter: '@',
            loadingText: '@',
            errorText: '@',
            containerClass: '@',
            loadingClass: '@',
            successClass: '@',
            errorClass: '@'
          },
          controller: ['$scope', 'tbkKeen', function ($scope, tbkKeen) {
            var queryOptions = $scope.queryOptions || {};
            queryOptions.eventCollection = $scope.eventCollection;
            queryOptions.targetProperty = $scope.targetProperty;

            $scope.query = new tbkKeen.Query($scope.analysisType, queryOptions);
          }],
          template: '<span data-tbk-keen-raw-metric ' +
          ' data-query="query" ' +
          ' data-prefix="{{prefix}}" ' +
          ' data-postfix="{{postfix}}" ' +
          ' data-scale="{{scale}}" ' +
          ' data-factor="{{factor}}" ' +
          ' data-filter="{{filter}}" ' +
          ' data-loading-text="{{loadingText}}" ' +
          ' data-error-text="{{errorText}}" ' +
          ' data-container-class="{{containerClass}}" ' +
          ' data-loading-class="{{loadingClass}}" ' +
          ' data-success-class="{{successClass}}" ' +
          ' data-error-class="{{errorClass}}" ' +
          '></span>'
        };

        return d;
      }])
  ;

})(angular);

(function (angular) {

  angular.module('angular-keenio.directives')

    .directive('tbkKeenAreachart', [function () {
      var d = {
        scope: {
          query: '=',
          title: '@',
          width: '@',
          height: '@',
          isStacked: '@',
          chartOptions: '=?',
          colors: '=?',
          labels: '=?',
          colorMapping: '=?',
          labelMapping: '=?'
        },
        controller: ['$scope', function ($scope) {
          $scope.chartOptions = $scope.chartOptions || {
              chartArea: {
                height: '85%',
                left: '5%',
                top: '5%',
                width: '80%'
              },
              isStacked: !!$scope.isStacked
            };
        }],
        template: '<div data-tbk-keen-chart="areachart" ' +
        ' query="query" ' +
        ' height="{{height}}" ' +
        ' width="{{width}}" ' +
        ' chart-options="chartOptions" ' +
        ' colors="colors" ' +
        ' labels="labels" ' +
        ' color-mapping="colorMapping" ' +
        ' label-Mapping="labelMapping" ' +
        '></div>'
      };

      return d;
    }]);

})(angular);

(function (angular) {

  angular.module('angular-keenio.directives')

    .directive('tbkKeenBarchart', [function () {
      var d = {
        scope: {
          query: '=',
          title: '@',
          width: '@',
          height: '@',
          isStacked: '@',
          groupWidth: '@',
          chartOptions: '=?',
          colors: '=?',
          labels: '=?',
          colorMapping: '=?',
          labelMapping: '=?'
        },
        controller: ['$scope', function ($scope) {
          $scope.chartOptions = $scope.chartOptions || {
              chartArea: {
                height: '85%',
                left: '5%',
                top: '5%',
                width: '100%'
              },
              bar: {
                groupWidth: $scope.groupWidth || '85%'
              },
              isStacked: !!$scope.isStacked
            };
        }],
        template: '<div data-tbk-keen-chart="barchart" ' +
        ' query="query" ' +
        ' height="{{height}}" ' +
        ' width="{{width}}" ' +
        ' chart-options="chartOptions" ' +
        ' colors="colors" ' +
        ' labels="labels" ' +
        ' color-mapping="colorMapping" ' +
        ' label-Mapping="labelMapping" ' +
        '></div>'
      };

      return d;
    }]);

})(angular);

(function (angular) {

  angular.module('angular-keenio.directives')
    .directive('tbkKeenChart', [function () {
      var d = {
        scope: {
          chartType: '@tbkKeenChart',
          query: '=',
          title: '@',
          width: '@',
          height: '@',
          chartOptions: '=?',
          colors: '=?',
          labels: '=?',
          colorMapping: '=?',
          labelMapping: '=?',
        },
        controller: ['$scope', 'tbkKeenClient', function ($scope, tbkKeenClient) {
          $scope.keenClient = tbkKeenClient;

          $scope.height = $scope.height || 250;
          $scope.width = $scope.width || 'auto';
          $scope.title = $scope.title || false;
          $scope.chartOptions = $scope.chartOptions || {
              chartArea: {
                height: '85%',
                left: '5%',
                top: '5%',
                width: '80%'
              }
            };
        }],
        link: function ($scope, $element) {
          $scope.keenClient.draw($scope.query, $element[0], {
            chartType: $scope.chartType,
            title: $scope.title,
            height: $scope.height,
            width: $scope.width,
            chartOptions: $scope.chartOptions,
            colors: $scope.colors,
            labels: $scope.labels,
            colorMapping: $scope.colorMapping,
            labelMapping: $scope.labelMapping
          });
        }
      };
      return d;
    }]);

})(angular);

(function (angular) {

  angular.module('angular-keenio.directives')

    .directive('tbkKeenColumnchart', [function () {
      var d = {
        scope: {
          query: '=',
          title: '@',
          width: '@',
          height: '@',
          isStacked: '@',
          groupWidth: '@',
          chartOptions: '=?',
          colors: '=?',
          labels: '=?',
          colorMapping: '=?',
          labelMapping: '=?'
        },
        controller: ['$scope', function ($scope) {
          $scope.chartOptions = $scope.chartOptions || {
              chartArea: {
                height: '85%',
                left: '5%',
                top: '5%',
                width: '100%'
              },
              bar: {
                groupWidth: $scope.groupWidth || '85%'
              },
              isStacked: !!$scope.isStacked
            };
        }],
        template: '<div data-tbk-keen-chart="columnchart" ' +
        ' query="query" ' +
        ' height="{{height}}" ' +
        ' width="{{width}}" ' +
        ' chart-options="chartOptions" ' +
        ' colors="colors" ' +
        ' labels="labels" ' +
        ' color-mapping="colorMapping" ' +
        ' label-Mapping="labelMapping" ' +
        '></div>'
      };

      return d;
    }]);

})(angular);

(function (angular) {

  angular.module('angular-keenio.directives')

    .directive('tbkKeenLinechart', [function () {
      var d = {
        scope: {
          query: '=',
          title: '@',
          width: '@',
          height: '@',
          isStacked: '@',
          groupWidth: '@',
          chartOptions: '=?',
          colors: '=?',
          labels: '=?',
          colorMapping: '=?',
          labelMapping: '=?'
        },
        controller: ['$scope', function ($scope) {
          $scope.chartOptions = $scope.chartOptions || {
              chartArea: {
                height: '85%',
                left: '5%',
                top: '5%',
                width: '100%'
              },
              bar: {
                groupWidth: $scope.groupWidth || '85%'
              },
              isStacked: !!$scope.isStacked
            };
        }],
        template: '<div data-tbk-keen-chart="linechart" ' +
        ' query="query" ' +
        ' height="{{height}}" ' +
        ' width="{{width}}" ' +
        ' chart-options="chartOptions" ' +
        ' colors="colors" ' +
        ' labels="labels" ' +
        ' color-mapping="colorMapping" ' +
        ' label-Mapping="labelMapping" ' +
        '></div>'
      };

      return d;
    }]);

})(angular);

(function (angular) {

  angular.module('angular-keenio.directives')

    .directive('tbkKeenMetric', [function () {
      var d = {
        scope: {
          query: '=',
          title: '@',
          width: '@',
          height: '@',
          chartOptions: '=?',
          colors: '=?'
        },
        controller: ['$scope', function ($scope) {
          $scope.colors = $scope.colors || [];
        }],
        template: '<div data-tbk-keen-chart="metric" ' +
        ' title="{{title}}" ' +
        ' query="query" ' +
        ' height="{{height}}" ' +
        ' width="{{width}}" ' +
        ' chart-options="chartOptions" ' +
        ' colors="colors" ' +
        '></div>'
      };

      return d;
    }]);
})(angular);

(function (angular) {

  angular.module('angular-keenio.directives')

    .directive('tbkKeenPiechart', [function () {
      var d = {
        scope: {
          query: '=',
          title: '@',
          width: '@',
          height: '@',
          pieHole: '@',
          chartOptions: '=?',
          colors: '=?',
          labels: '=?',
          colorMapping: '=?',
          labelMapping: '=?'
        },
        controller: ['$scope', function ($scope) {
          $scope.chartOptions = $scope.chartOptions || {
              chartArea: {
                height: '85%',
                left: '5%',
                top: '5%',
                width: '100%'
              },
              pieHole: $scope.pieHole || 0.4
            };
        }],
        template: '<div data-tbk-keen-chart="piechart" ' +
        ' query="query" ' +
        ' height="{{height}}" ' +
        ' width="{{width}}" ' +
        ' chart-options="chartOptions" ' +
        ' colors="colors" ' +
        ' labels="labels" ' +
        ' color-mapping="colorMapping" ' +
        ' label-Mapping="labelMapping" ' +
        '></div>'
      };

      return d;
    }])

    .directive('tbkKeenDefaultPiechart', [function () {
      var d = {
        scope: {
          analysisType: '@',
          eventCollection: '@',
          groupBy: '@',
          queryOptions: '=?',
          chartOptions: '=?',
          title: '@',
          width: '@',
          height: '@',
          colors: '=?',
          labels: '=?',
          colorMapping: '=?',
          labelMapping: '=?'
        },
        controller: ['$scope', 'tbkKeen', function ($scope, tbkKeen) {
          $scope.analysisType = $scope.analysisType || 'count';

          $scope.height = $scope.height || '250';
          $scope.width = $scope.width || 'auto';
          $scope.queryOptions = $scope.queryOptions;
          $scope.queryOptions.eventCollection = $scope.eventCollection;
          $scope.queryOptions.groupBy = $scope.groupBy;

          $scope.query = new tbkKeen.Query($scope.analysisType, $scope.queryOptions);

          $scope.chartOptions = $scope.chartOptions || {
              chartArea: {
                height: '85%',
                left: '5%',
                top: '5%',
                width: '100%'
              },
              pieHole: 0.4
            };
        }],
        template: '<div data-tbk-keen-piechart ' +
        ' query="query" ' +
        ' height="{{height}}" ' +
        ' width="{{width}}" ' +
        ' title="{{title}}" ' +
        ' chart-options="chartOptions" ' +
        ' colors="colors" ' +
        ' labels="labels" ' +
        ' color-mapping="colorMapping" ' +
        ' label-Mapping="labelMapping" ' +
        '></div>'
      };

      return d;
    }])
  ;

})(angular);

(function (angular) {

  angular.module('angular-keenio.directives')

    .directive('tbkKeenTable', ['tbkKeenClient', function (tbkKeenClient) {
      var d = {
        scope: {
          query: '=',
          title: '@',
          height: '@'
        },
        controller: ['$scope', function ($scope) {
          $scope.options = {
            title: $scope.title || '',
            height: $scope.height || 340
          };
        }],
        link: function ($scope, $element) {
          tbkKeenClient.draw($scope.query, $element[0], {
            chartType: 'table',
            title: $scope.options.title,
            height: $scope.options.height
          });
        },
        template: '<div></div>'
      };

      return d;
    }])

    .directive('tbkKeenDefaultTable', [function () {
      var d = {
        scope: {
          title: '@',
          analysisType: '@',
          eventCollection: '@',
          queryOptions: '=?'
        },
        controller: ['$scope', 'tbkKeen', function ($scope, tbkKeen) {
          var queryOptions = $scope.queryOptions || {};
          queryOptions.eventCollection = $scope.eventCollection;
          $scope.analysisType = $scope.analysisType || 'extraction';
          $scope.query = new tbkKeen.Query($scope.analysisType, queryOptions);
        }],
        template: '<div tbk-keen-table ' +
        ' data-query="query" ' +
        ' data-title="{{title}}"' +
        '></div>'
      };

      return d;
    }])
  ;

})(angular);


(function (angular) {

  angular.module('angular-keenio.services')

    .value('tbkKeenDefaultConfig', {
      projectId: 'YOUR_PROJECT_ID',   // String (required always)
      writeKey: 'YOUR_WRITE_KEY',    // String (required for sending data)
      readKey: 'YOUR_READ_KEY',     // String (required for querying data)
      masterKey: 'YOUR_MASTER_KEY',   // String (required for getting data of
                                      // collections)
      protocol: 'https',             // String (optional: https | http |
                                     // auto)
      host: 'api.keen.io/3.0',   // String (optional)
      requestType: 'jsonp'              // String (optional: jsonp, xhr, beacon)
    })

    .provider('tbkKeenConfig', [function () {
      var config = {};

      this.projectId = function (projectId) {
        config.projectId = projectId;
        return this;
      };
      this.writeKey = function (writeKey) {
        config.writeKey = writeKey;
        return this;
      };
      this.readKey = function (readKey) {
        config.readKey = readKey;
        return this;
      };
      this.masterKey = function (masterKey) {
        config.masterKey = masterKey;
        return this;
      };
      this.protocol = function (protocol) {
        config.protocol = protocol;
        return this;
      };
      this.host = function (host) {
        config.host = host;
        return this;
      };
      this.requestType = function (requestType) {
        config.requestType = requestType;
        return this;
      };

      this.$get = ['tbkKeenDefaultConfig', function (defaultConfig) {
        return angular.extend(defaultConfig, config);
      }];
    }])

    .factory('tbkKeen', ['$window', function ($window) {
      return $window.Keen;
    }])

    /**
     * Provides the Keen.io client for your Angular application.
     * If you want to work in a more angular way, you should use the `angularKeenClient` factory
     * which will use promises instead of callbacks
     */
    .factory('tbkKeenClient', ['tbkKeen', 'tbkKeenConfig', function (Keen, KeenConfig) {
      return new Keen(KeenConfig);
    }])

    .factory('tbkKeenHttpGet', ['tbkKeenConfig', 'tbkKeenClient', function (keenConfig, keenClient) {
      return function (queryTemplate, params, callback) {
        var query = queryTemplate.replace('<project_id>', keenConfig.projectId);

        var url = keenConfig.protocol + '://' + keenConfig.host + query;

        return keenClient.get(url, params, keenConfig.readKey, callback);
      };
    }])

    /**
     * Fatory providing Keen.io APIs in the Angular way
     */
    .factory('angularKeenClient', ['tbkKeen', 'tbkKeenConfig', '$q', function (Keen, KeenConfig, $q) {
      var client = new Keen(KeenConfig);

      /**
       * Records a single event in Keen.io.
       * @param collection the collection you want to save the event in.
       * @param properties the properties of the event you want to save.
       * @returns {deferred.promise|{then, catch, finally}}
       */
      function addEvent(collection, properties) {
        var deferred = $q.defer();

        client.addEvent(collection, properties, function (err, res) {
          if (err) {
            deferred.reject(err);
          }
          else {
            deferred.resolve(res);
          }
        });
        return deferred.promise;
      }

      /**
       * Records multiple events in Keen.io.
       * @param events the events you want to save. You have to provide the
       *   following format
       *
       * <pre>
       *  var multipleEvents = {
       *    "purchases": [
       *      { item: "golden gadget", price: 2550, transaction_id: "f029342" },
       *      { item: "a different gadget", price: 1775, transaction_id:
       *   "f029342" }
       *    ],
       *    "transactions": [
       *      { id: "f029342", items: 2, total: 4325 }
       *    ]
       *  };
       * </pre>
       * @returns {deferred.promise|{then, catch, finally}}
       */
      function addEvents(events) {
        var deferred = $q.defer();

        client.addEvents(events, function (err, res) {
          if (err) {
            deferred.reject(err);
          }
          else {
            deferred.resolve(res);
          }
        });
        return deferred.promise;
      }

      function Query(analysisType, properties) {
        return client.Query(analysisType, properties);
      }

      /**
       * Run query(ies) from Keen.io
       * @param queries a single query or an array of queries
       * @returns {deferred.promise|{then, catch, finally}}
       */
      function run(queries) {
        var deferred = $q.defer();
        client.run(queries, function (err, res) {
          if (err) {
            deferred.reject(err);
          }
          else {
            deferred.resolve(res);
          }
        });
        return deferred.promise;
      }

      /**
       * Draw the chart
       * @param query the Keen.io Query
       * @param node
       * @param config
       */
      function draw(query, node, config) {
        client.draw(query, node, config);
      }

      function collections() {
        var url = '<protocol>://<host>/projects/<project_id>/events'
          .replace('<protocol>', KeenConfig.protocol)
          .replace('<host>', KeenConfig.host)
          .replace('<project_id>', KeenConfig.projectId);

        return _sendRequest(url);
      }

      function collection(collection) {
        var url = '<protocol>://<host>/projects/<project_id>/events/<collection>'
          .replace('<protocol>', KeenConfig.protocol)
          .replace('<host>', KeenConfig.host)
          .replace('<project_id>', KeenConfig.projectId)
          .replace('<collection>', collection);

        return _sendRequest(url);
      }

      function properties(collection) {
        var url = '<protocol>://<host>/projects/<project_id>/events/<collection>/properties'
          .replace('<protocol>', KeenConfig.protocol)
          .replace('<host>', KeenConfig.host)
          .replace('<project_id>', KeenConfig.projectId)
          .replace('<collection>', collection);

        return _sendRequest(url);
      }

      function property(collection, property) {
        var url = '<protocol>://<host>/projects/<project_id>/events/<collection>/properties/<property>'
          .replace('<protocol>', KeenConfig.protocol)
          .replace('<host>', KeenConfig.host)
          .replace('<project_id>', KeenConfig.projectId)
          .replace('<collection>', collection)
          .replace('<property>', property);

        return _sendRequest(url);
      }

      function _sendRequest(url) {
        var deferred = $q.defer();

        client.get(url, null, client.masterKey(), function (err, res) {
          if (err) {
            deferred.reject(err);
          }
          else {
            deferred.resolve(res);
          }
        });
        return deferred.promise;
      }

      return {
        addEvent: addEvent,
        addEvents: addEvents,
        Query: Query,
        run: run,
        draw: draw,
        collections: collections,
        collection: collection,
        properties: properties,
        property: property
      };
    }]);
})(angular);
