[![Build Status](https://travis-ci.org/theborakompanioni/angular-keenio.svg?branch=master)](https://travis-ci.org/theborakompanioni/angular-keenio)

# angular-keenio

[Keen.io](https://keen.io/docs/data-visualization/) wrapper and directives for Angular.js.

## Demo

See some examples on the [demo page](https://theborakompanioni.github.io/angular-keenio/).

## Installation

### Configuration

```javascript
.config(['tbkKeenConfigProvider', function(tbkKeenConfigProvider) {
  var config = {
    projectId: "<MY_PROJECT_ID>",
    readKey:   "<MY_READ_KEY>",     // if you want to get values from Keen.io
    writeKey:  "<MY_WRITE_KEY>",    // if you want to save data to Keen.io
    masterKey: "<MY_MASTER_KEY>"    // if you want to get data from your collections from Keen.io
  };

  tbkKeenConfigProvider
    .projectId(config.projectId)
    .readKey(config.readKey)
    .writeKey(config.writeKey)
    .masterKey(config.masterKey);
}])
```

### Manually bootstrap application

`Keen` must be ready for the directives to work properly. Bootstrap your angular application manually e.g.

```javascript
<script>
  angular.element(document).ready(function () {
    Keen.ready(function () {
      angular.bootstrap(document, ['myApp']);
    });
  });
</script>
```

## Record one event

```javascript
.controller('MyController', ['$scope', 'tbkKeenClient', function($scope, KeenClient) {
  // Create a data object with the properties you want to send
  var purchaseEvent = {
    item: "golden gadget",  
    price: 2550, // track dollars as cents
    referrer: document.referrer,
    keen: {
      timestamp: new Date().toISOString()
    }
  };

  KeenClient.addEvent('purchases', purchaseEvent)
    .then(function(res) {
      console.log(res);
    })
    .catch(function (err) {
      console.error(err);
    });
}]);
```

## Record multiple events

```javascript
.controller('MyController', ['$scope', 'tbkKeenClient', function($scope, KeenClient) {
  var multipleEvents = {
    "purchases": [
      { item: "golden gadget", price: 2550, transaction_id: "f029342" },
      { item: "a different gadget", price: 1775, transaction_id: "f029342" }
    ],
    "transactions": [
      {
        id: "f029342",
        items: 2,
        total: 4325
      }
    ]
  };
  KeenClient.addEvents(multipleEvents)
    .then(function(res) {
      console.log(res);
    })
    .catch(function (err) {
      console.error(err);
    });
}]);
```

## Querying events

```javascript
.controller('MyController', ['$scope', 'tbkKeen', 'tbkKeenClient', function($scope, Keen, KeenClient) {
  // Create a query instance
  var count = new Keen.Query("count", {
    eventCollection: "pageviews",
    groupBy: "property",
    timeframe: "this_7_days"
  });
  KeenClient.run(count)
    .then(function(res) {
      console.log(res);
    })
    .catch(function (err) {
      console.error(err);
    });
}]);
```
## Saved queries
// TODO



## Visualization

### Area Chart

![Area chart](img/Keen-demo-areachart.png)

```html
<div data-tbk-keen-piechart 
  query="query" 
  height="250" 
  width="auto" 
  chart-options="chartOptions">
</div>
```

```javascript
.controller('AreaChartCtrl', ['$scope', 'tbkKeen', function($scope, Keen) {
  $scope.query = new Keen.Query("count", {
    eventCollection: "pageviews",
    groupBy: "user.device_info.browser.family",
    timeframe: {
      start: "2014-05-01T00:00:00.000Z",
      end: "2014-05-05T00:00:00.000Z"
    }
  });

  $scope.chartOptions = {
    chartArea: {
      height: "85%",
      left: "5%",
      top: "5%",
      width: "100%"
    },
    pieHole: 0.4
  };
}]);
```

### Bar Chart

![Bar chart](img/Keen-demo-barchart.png)

```html
<div data-tbk-keen-barchart 
  query="query" 
  height="250" 
  width="auto" 
  chart-options="chartOptions">
</div>
```

```javascript
.controller('BarChartCtrl', ['$scope', 'tbkKeen', function($scope, Keen) {
  $scope.query = new Keen.Query("count", {
    eventCollection: "pageviews",
    groupBy: "user.device_info.browser.family",
    timeframe: {
      start: "2014-05-01T00:00:00.000Z",
      end: "2014-05-05T00:00:00.000Z"
    }
  });

  $scope.chartOptions = {
    chartArea: {
      height: "85%",
      left: "5%",
      top: "5%",
      width: "100%"
    },
    pieHole: 0.4
  };
}]);
```

### Column Chart

![Column chart](img/Keen-demo-columnchart.png)

```html
<div data-tbk-keen-columnchart 
  query="query" 
  height="250" 
  width="auto" 
  chart-options="chartOptions">
</div>
```

```javascript
.controller('ColumnChartCtrl', ['$scope', 'tbkKeen', function($scope, Keen) {
  $scope.query = new Keen.Query("count", {
    eventCollection: "pageviews",
    groupBy: "user.device_info.browser.family",
    timeframe: {
      start: "2014-05-01T00:00:00.000Z",
      end: "2014-05-05T00:00:00.000Z"
    }
  });

  $scope.chartOptions = {
    chartArea: {
      height: "85%",
      left: "5%",
      top: "5%",
      width: "100%"
    },
    pieHole: 0.4
  };
}]);
```

### Line Chart

![Line chart](img/Keen-demo-linechart.png)

```html
<div data-tbk-keen-linechart 
  query="query" 
  height="250" 
  width="auto" 
  chart-options="chartOptions">
</div>
```

```javascript
.controller('LineChartCtrl', ['$scope', 'tbkKeen', function($scope, Keen) {
  $scope.query = new Keen.Query("count", {
    eventCollection: "pageviews",
    groupBy: "user.device_info.browser.family",
    timeframe: {
      start: "2014-05-01T00:00:00.000Z",
      end: "2014-05-05T00:00:00.000Z"
    }
  });

  $scope.chartOptions = {
    chartArea: {
      height: "85%",
      left: "5%",
      top: "5%",
      width: "100%"
    },
    pieHole: 0.4
  };
}]);
```

### Pie Chart

![Pie chart](img/Keen-demo-piechart.png)

```html
<div data-tbk-keen-piechart 
  query="query" 
  height="250" 
  width="auto" 
  chart-options="chartOptions">
</div>
```

```javascript
.controller('PieChartCtrl', ['$scope', 'tbkKeen', function($scope, Keen) {
  $scope.query = new Keen.Query("count", {
    eventCollection: "pageviews",
    groupBy: "user.device_info.browser.family",
    timeframe: {
      start: "2014-05-01T00:00:00.000Z",
      end: "2014-05-05T00:00:00.000Z"
    }
  });

  $scope.chartOptions = {
    chartArea: {
      height: "85%",
      left: "5%",
      top: "5%",
      width: "100%"
    },
    pieHole: 0.4
  };
}]);
```


 Contribute
---

- Issue Tracker: https://github.com/theborakompanioni/angular-keenio/issues
- Source Code: https://github.com/theborakompanioni/angular-keenio

Clone Repository
---
`git clone https://github.com/theborakompanioni/angular-keenio.git`


License
---

The project is licensed under the MIT license. See
[LICENSE](https://github.com/theborakompanioni/angular-keenio/blob/master/LICENSE) for details.
