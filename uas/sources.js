export const coreSources = [
  { id: 'mathworks-cfar', title: 'Constant False Alarm Rate (CFAR) Detection', publisher: 'MathWorks documentation', url: 'https://www.mathworks.com/help/phased/ug/constant-false-alarm-rate-cfar-detection.html', date: 'Living documentation', scope: 'Background on cell-averaging CFAR and its assumptions. The mathematical model in this course is also derived and tested locally.', accessNote: 'External page could not be retrieved from the build environment; link and current wording were not revalidated.' },
  { id: 'nist-ot', title: 'Guide to Operational Technology (OT) Security, SP 800-82 Rev. 3', publisher: 'National Institute of Standards and Technology', url: 'https://doi.org/10.6028/NIST.SP.800-82r3', date: '2023', scope: 'Background for network integrity, access control, monitoring, and system responsibility. This is not a reference for the toy Bayesian model or any installation network.', accessNote: 'Bibliographic reading lead; external content was not retrieved in this build.' },
  { id: 'faa-cuas', title: 'UAS security information', publisher: 'Federal Aviation Administration', url: 'https://www.faa.gov/uas/security', date: 'Living guidance', scope: 'U.S. aviation-security context and the importance of authorized response. It does not establish legal authority in Kuwait or prescribe installation procedures.', accessNote: 'External page could not be retrieved from the build environment; link and current guidance were not revalidated.' },
  { id: 'cisa-uas', title: 'Unmanned Aircraft Systems', publisher: 'Cybersecurity and Infrastructure Security Agency', url: 'https://www.cisa.gov/topics/physical-security/unmanned-aircraft-systems', date: 'Living guidance', scope: 'Public educational context for UAS awareness and protective planning. Use approved local procedures for actual incidents.', accessNote: 'External page could not be retrieved from the build environment; link and current guidance were not revalidated.' },
];

export const glossary = [
  ['UAV / UA', 'Unmanned aerial vehicle / unmanned aircraft: the airborne vehicle.'],
  ['UAS', 'Unmanned aircraft system: the aircraft plus associated control, communications, support, and people.'],
  ['Family / variant / alias', 'A family groups related designs; a variant is a particular version; an alias is another name. Public sources do not always use these consistently.'],
  ['Detection', 'A measurement meets a rule for further attention. Detection does not identify its cause.'],
  ['Track', 'An estimate linking observations over time. Association errors can split one object into several tracks or combine different objects.'],
  ['Classification / identification', 'Classification assigns a broad category. Identification makes a more specific claim requiring supporting evidence. Neither alone establishes intent.'],
  ['CFAR', 'Constant False Alarm Rate: a family of adaptive detection methods intended to control noise false alarms under stated assumptions.'],
  ['CUT', 'Cell under test: the measurement being compared with a local threshold.'],
  ['Guard / reference cells', 'Guard cells separate the test sample from reference cells, which are used to estimate background power.'],
  ['False alarm probability', 'The probability that a tested noise-only sample exceeds the threshold under the assumed noise model. It is not the probability that a reported object is harmless.'],
  ['EO / IR', 'Electro-optical / infrared sensing: image or thermal-pattern measurements interpreted with their conditions and limitations.'],
  ['RF', 'Radio frequency: signals whose presence may provide observations; silence is not proof that no aircraft exists.'],
  ['Provenance', 'Where a measurement or claim came from, including whether it is firsthand or repeated.'],
  ['Conditional independence', 'Two observations are conditionally independent when knowing one adds no information about the other after a specified hypothesis is fixed. The toy fusion rule requires this under both hypotheses.'],
  ['Likelihood ratio', 'P(observation given H) divided by P(observation given not-H). It measures how an observation changes odds, not a probability by itself.'],
  ['Deconfliction', 'Coordination to prevent incompatible activities or misinterpretation. Use the applicable authorized procedures.'],
];
