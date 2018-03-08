app.constant('instruments', {
  "hiSeq-1000": [
    { "mode": "v4", "reads": "249.9336 M", "output": "37.490 Gb" },
    { "mode": "v3", "reads": "186.048 M", "output": "27.907 Gb" }
  ],
  "hiSeq-2000": [
    { "mode": "v4", "reads": "249.9336 M", "output": "37.490 Gb" },
    { "mode": "v3", "reads": "186.048 M", "output": "27.907 Gb" }
  ],
  "hiSeq-1500": [
    { "mode": "rapid", "reads": "150.696 M", "output": "22.6044 Gb" },
    { "mode": "rapid", "reads": "300 M", "output": "45 Gb" },
    { "mode": "rapidv2", "reads": "150.696 M", "output": "22.6044 Gb" },
    { "mode": "rapidv2", "reads": "300 M", "output": "45 Gb" }
  ],
  "hiSeq-2500": [
    { "mode": "rapid", "reads": "150.696 M", "output": "22.6044 Gb" },
    { "mode": "rapid", "reads": "300 M", "output": "45 Gb" },
    { "mode": "rapidv2", "reads": "150.696 M", "output": "22.6044 Gb" },
    { "mode": "rapidv2", "reads": "300 M", "output": "45 Gb" }
  ],
  "hiSeq-3000": [
    { "mode": "na", "reads": "3.125 M", "output": "46.875 Gb" },
  ],
  "hiSeq-4000": [
    { "mode": "na", "reads": "3.125 M", "output": "46.875 Gb" },
  ],
  "miSeq": [
    { "mode": "v2", "reads": "15 M", "output": "2.25 Gb" },
    { "mode": "v3", "reads": "25 M", "output": "2.75 Gb" },
    { "mode": "microv2", "reads": "4 M", "output": "600 M" },
    { "mode": "nanov2", "reads": "1 M", "output": "150 M" }
  ],
  "nextSeq-500": [
    { "mode": "highOutput", "reads": "400 M", "output": "60 Gb" },
    { "mode": "midOutput", "reads": "130 M", "output": "19.5 Gb" }
  ],
  "nextSeq-550": [
    { "mode": "highOutput", "reads": "400 M", "output": "60 Gb" },
    { "mode": "midOutput", "reads": "130 M", "output": "19.5 Gb" }
  ],
  "novaSeq-5000": [
    { "mode": "s1", "reads": "3.3 G", "output": "495 Gb" },
    { "mode": "s2", "reads": "3.3 G", "output": "495 Gb" },
    { "mode": "s3", "reads": "3.3 G", "output": "495 Gb" }
  ]
});

app.constant('instruments4Development', {
  "nextSeq-500": [
    { "mode": "midOutput", "reads": "65 M", "output": "19.5 Gb" },
    { "mode": "midOutput", "reads": "130 M", "output": "39 Gb" }
  ],
  "nextSeq-550": [
    { "mode": "highoutput", "reads": "100 M", "output": "30 Gb" },
    { "mode": "highoutput", "reads": "200 M", "output": "60 Gb" },
    { "mode": "highoutput", "reads": "400 M", "output": "120 Gb" }
  ]
});
