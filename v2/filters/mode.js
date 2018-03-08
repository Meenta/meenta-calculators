app.filter('modeName', function() {
  return function(input, uppercase) {
    var out = input.toLowerCase();
    switch (out) {
      case 'midoutput':
        out = 'Mid Output'
        break;
      case 'highoutput':
        out = 'High Output';
        break;
      case 'rapid':
        out = 'Rapid Mode';
        break;
      case 'rapidv2':
        out = 'Rapid v2 Mode';
        break;
      case 'microv2':
        out = 'Micro v2 Mode';
        break;
      case 'v2':
        out = 'v2 Mode';
        break;
      case 'v3':
        out = 'v3 Mode';
        break;
      case 'v4':
        out = 'v4 Mode';
        break;
      case 'microv2':
        out = 'Micro v2 Mode'
        break;
      case 'nanov2':
        out = 'Nano v2 Mode'
        break;
      case 's1':
      case 's2':
      case 's3':
        out = out.toUpperCase()
        break;
      default:
        out = out;
    }
    return out;
  }
});
