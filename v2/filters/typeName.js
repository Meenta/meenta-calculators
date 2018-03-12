app.filter('typeName', function() {
  return function(input, uppercase) {
    var out = input.toLowerCase();
    switch (out) {
      case 'rna':
        out = 'transcriptome'
        break;
      case 'dna':
        out = 'genome';
        break;
      default:
        //
    }
    return out;
  }
});
