app.filter('instrumentName', function() {
  return function(input, uppercase) {
    var out = input.toLowerCase();
    switch (out) {
      case 'nextseq-500':
        out = 'NextSeq 500'
        break;
      case 'nextseq-550':
        out = 'NextSeq 550';
        break;
      case 'hiseq-2000':
        out = 'HiSeq 2000';
        break;
      case 'hiseq-4000':
        out = "HiSeq 4000";
        break;
      case 'hiseq-1500':
        out = 'HiSeq 1500';
        break;
      case 'hiseq-1000':
        out = 'HiSeq 1000';
        break;
      case 'hiseq-3000':
        out = 'HiSeq 3000';
        break;
      case 'miseq':
        out = 'MiSeq';
        break;
      case 'novaseq-5000':
        out = 'NoveSeq 5000';
        break;
      case 'hiseq-2500':
        out = 'HiSeq 2500';
      default:
        //
    }
    return out;
  }
});
