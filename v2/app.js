var app = angular.module('calculators', [
  'ngAnimate',
  'angular.filter',
  'ui.router',
  'angular-keenio',
  'ui.bootstrap'
]);

app.run([ 'Auth', '$rootScope', function(auth, $rootScope) {

  $rootScope.isLoggedIn = false;

  auth.onAuthStateChanged(function(user) {
    if (user) {
      $rootScope.userInfo = user;
      $rootScope.isLoggedIn = true;
      console.log("Welcome UID v2:" + user.uid);
    } else {
      $rootScope.isLoggedIn = false;
    }
  });

}])
