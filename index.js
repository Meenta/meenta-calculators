#!/usr/bin/env node
var argv = require('yargs')
    .usage('Usage: $0 -genome [num] -coverage [num] ')
    .example('$0 samples -g 3.1 -c 30 -o 90', 'Calculate the # of sample for a given pool setup.')
    .demandOption(['genome','coverage'])
    .alias('r', 'report')
    .describe('r', 'Report type (samples, flow cells)')
    .alias('g', 'genome')
    .describe('g', 'Gb in Reference Genome (Giga Bases)')
    .alias('c', 'coverage')
    .describe('c', 'Coverage (in cycles or passes)')
    .alias('o', 'output')
    .describe('o', 'Output (Per instrument & lane) in Gb')
    .alias('s', 'samples')
    .describe('s', 'Number of Samples (optional)')
    .argv;

if (argv.r === 'samples') {

  // Total length of the genome that needs to be read
  // for a given genome & coverage level.
  var dist = argv.c * argv.g;

  // Calc the number of sample we can fit into a single flow cell.
  var numOfSamples = argv.o / dist;

  var numOfSamplesRd = numOfSamples.toFixed(2)

  console.log('')
  console.log('Sample Calculator:')
  console.log(`You can fit ${numOfSamplesRd} samples in a flow cell that has an output of ${argv.o}Gb and a coverage of ${argv.c} cycles.`)

}
