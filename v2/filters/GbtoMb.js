app.filter('GbtoMb', function() {
  return function(input, uppercase) {
    return (input * 1000) + ' M'
  }
});
