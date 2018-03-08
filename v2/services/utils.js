app.service('$utils', [ function() {

  // Funciton to convert a string to GB.
  var toGb = function(val) {
    var t = val.trim().split(' ');
    if (t.length === 0) return 0;

    if (t.length === 1) {
      return parseFloat(t[0]) / 1000;
    }

    if (t.length === 2) {
      if (t[1].toLowerCase() === 'm') {
        return parseFloat(t[0]) / 1000;
      } else {
        return parseFloat(t[0]);
      }
    }
  }

  return {
    toGb: toGb
  }

}]);
