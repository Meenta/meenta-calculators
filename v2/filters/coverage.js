app.filter('coverage', [ '$filter', function($filter) {
  return function(input) {
    if (input < 1) {
      return 'approx. ' + input;
    } else {
      return 'approx. ' + $filter('number')(input, 0);
    }
  }
}]);
