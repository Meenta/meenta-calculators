app.constant('applications', [
  // RNA
  // illumina Examples.
  { key: 'mRNA-Seq', type: 'rna', requiredReads: '25 M', title: 'mRNA Seq' },
  { key: 'total-rna-qeq', type: 'rna', requiredReads: '50 M', title: 'Total RNA Seq' },
  { key: 'pan-cancer', type: 'rna', requiredReads: '3 M', title: 'Pan Cancer' },
  { key: 'ran-access', type: 'rna', requiredReads: '25 M', title: 'RNA Access' },
  { key: 'small-RNA', type: 'rna', requiredReads: '2.2 M', title: 'Small RNA' },

  // extras
  { key: 'gene-expression', type: 'rna', requiredReads: '10 M',  title: 'Gene Expression Profiling' },
  { key: 'enriched-RNA-Seq', type: 'rna', requiredReads: '25 M', title: 'Enriched RNA Seq' },

  // DNA
  { key: 'whole-genome', type: 'dna', requiredReads: '3.3 Gb', title: 'Whole Genome Sequencing' },
  { key: 'nextera-rapid-capture-exome', type: 'dna', requiredReads: '45 M', title: 'Nextera Rapid Capture Exome' },
  { key: 'nextera-rapid-capture-expanded-exome', type: 'dna', requiredReads: '62 M', title: 'Nextera Rapid Capture Expanded Exome' },
  { key: 'truseq-amplicon-cancel-panel', type: 'dna', requiredReads: '0.035 M', title: 'TruSeq Amplicon Cancer Panel' },
  { key: 'truseq-exome', type: 'dna', requiredReads: '45 M', title: 'TruSeq Exome' },
  { key: 'truseq-cancer', type: 'dna', requiredReads: '0.3 M', title: 'TruSeq Cancer' },
  { key: 'truseq-cardio', type: 'dna', requiredReads: '0.572 M', title: 'TruSeq Cardio' },
  { key: 'truseq-inherited-disease', type: 'dna', requiredReads: '2.25 M', title: 'TruSeq Inherited Disease' },
  { key: 'truseq-myeliod', type: 'dna', requiredReads: '0.141 M', title: 'TruSeq Myeliod' },
  { key: 'truseq-one', type: 'dna', requiredReads: '12 M', title: 'TruSeq One' },
  { key: 'truseq-tumor-15', type: 'dna', requiredReads: '0.044 M', title: 'TruSeq Tumor 15' },
  { key: 'truseq-tumor-26', type: 'dna', requiredReads: '0.021 M', title: 'TruSeq Tumor 15' }
]);
