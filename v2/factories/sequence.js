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
      var output = {}

      // Calc the reads per library & the reads with adjusmtn
      var readsPerLibary = this.ref.reads / parameters.numOfLibraries;
      var readsPerLibraryAct = readsPerLibary * parameters.labReadAdjustment;

      // Stage 1: Calc the actual out with the adjustment off of Illumina.
      var actualReads = this.ref.reads * parameters.labReadAdjustment;
      var actualOutput = this.ref.output * parameters.labReadAdjustment;

      // Stage 2:
      var predReads = actualReads / parameters.numOfLibraries;

      var outputPerGenome = actualOutput / parameters.genome;
      var outputPerGenomeWithDedup = outputPerGenome * parameters.dupTolerance;

      var outputPerGenomeWithDedup = outputPerGenome - outputPerGenomeWithDedup;

      var coveragePerGenome = outputPerGenomeWithDedup / parameters.numOfLibraries;
      // var readsPerLib = uniqueNumberOfReads / $scope.parameters.numOfLibraries;

      output.readsPerLibary = readsPerLibary;
      output.actualReads = actualReads;
      output.readsPerLibraryAct = readsPerLibraryAct;
      output.actualOutput = actualOutput;

      output.predReads = predReads;
      output.outputPerGenome = outputPerGenome;
      output.outputPerGenomeWithDedup = outputPerGenomeWithDedup;

      output.coveragePerGenome = coveragePerGenome;
      output.outputPerGenomeWithDedup = outputPerGenomeWithDedup

      // Provies a T/F for the current coverae.
      this.valid = output.coveragePerGenome >= parameters.coverage;

      this.output = output;
    };

    // Init the data in the class.
    this.init(data);

    // For the process to run.
    this.process();
  }

  return Sequencing;
});
