app.factory('Sequence', function() {

  // Simple class to manage the calculator.
  var Sequencing = function(data, parameters) {
    this.data = data;
    this.ref = {};

    // This function will convert a given value to Gb.
    this.convertToGb = function(val) {
      var t = val.split(' ');
      if (t.length === 1) return parseFloat(t[0]);
      if (t.length === 2) {
        var u = t[1];
        if (t[1].toLowerCase().trim() === 'gb') return parseFloat(t[0]);
        if (t[1].toLowerCase().trim() === 'm') return parseFloat(t[0]) / 1000;
      }
    };

    this.init = function(data) {
      // This will read all the data and convert to
      this.ref.reads = this.convertToGb(data.reads);
      this.ref.output = this.convertToGb(data.output);
    };

    this.process = function() {
      var self = this;
      var output = {}
      var size = parameters.genomeSize;
      var nl = parameters.numOfLibraries;
      var out = this.ref.output;
      var reads = this.ref.reads;
      var corr = parameters.labReadAdjustment;
      var dup = parameters.dupTolerance;

      output.readDebug = { reads: reads, corr: corr, nl: nl };

      // 1. Determine the reads per library
      output.readPerLibrary = (reads * corr) / nl;

      // 2. Calculate the effective coverage.
      var cpl = (( out / size ) - (( out / size ) * dup )) / nl;

      // Debug
      output.coverageDebug = {
        out: out,
        size: size,
        dup: dup,
        nl: nl,
        ideal: out / size,
        dupTol: (out / size) * dup,
        uniqReads: ( out / size ) - (( out / size ) * dup),
        cpl: cpl
      };

      output.coverage = cpl;

      // Provies a T/F for the current coverae.
      this.valid = false;

      if (parameters.applicationData) {
        var applicationReads = self.convertToGb(parameters.applicationData.requiredReads);
        // Provies a T/F for the current coverae.
        this.valid = output.readPerLibrary >= applicationReads;
      }

      this.output = output;
    };

    // Init the data in the class.
    this.init(data);

    // For the process to run.
    this.process();
  }

  return Sequencing;
});
