// Original public-awareness curriculum. Content is plain text for safe rendering.
export const lessons = [
  {
    "id": "foundations",
    "title": "Start with the system, not the name",
    "kicker": "01 · Foundations",
    "duration": "12 min",
    "summary": "Understand what a UAS includes, distinguish purpose from appearance, and read public reporting without turning uncertain labels into facts.",
    "objectives": [
      "Distinguish the air vehicle from the complete UAS.",
      "Separate a family name, a variant name, and an externally assigned name.",
      "Explain why country of design, operator, and observed identity are different claims."
    ],
    "sections": [
      {
        "heading": "Aircraft and system are different ideas",
        "body": [
          "A UAV is an uncrewed aerial vehicle: the aircraft itself. UAS means uncrewed aircraft system and includes the aircraft together with associated control equipment and links. A photograph usually shows only one part of that system. It cannot, by itself, establish who controls the aircraft, whether a control link is active, or what task the aircraft is performing.",
          "A remotely piloted aircraft receives human direction through a link. An aircraft can also execute portions of a flight automatically. These ideas can coexist. “Autonomous” is not a reliable synonym for “uncrewed,” and loss of a visible or detectable radio link does not prove that an aircraft is absent or disabled."
        ]
      },
      {
        "heading": "Use role labels carefully",
        "body": [
          "Public reports use labels such as reconnaissance, surveillance, strike, target drone, and one-way attack aircraft. A role describes a use; it does not uniquely describe a shape. A design may have several variants or may be adapted to different purposes. Some large uncrewed aircraft resemble conventional airplanes; some smaller aircraft resemble hobby products.",
          "This course uses publicly described roles only as background context. It does not infer hostile intent from a configuration, an assumed national origin, or a catalogue match. Recognition is a hypothesis to document and review."
        ],
        "bullets": [
          "Airframe: the physical aircraft and its structure.",
          "Family: a group of related designs; family boundaries can differ between sources.",
          "Variant: a particular version within a family, where evidence supports the distinction.",
          "Alias: another name used for an aircraft or family; aliases are not automatically interchangeable."
        ]
      },
      {
        "heading": "Why Iranian names can be confusing",
        "body": [
          "Transliteration from Persian and Arabic can produce several Latin spellings. Public names can also be reused, changed, or assigned by a different country. Numbers in a name do not guarantee a simple chronological sequence or a common airframe. A familiar name is a starting point for source checking.",
          "For each identification claim, record which source uses the name, when it was published, and whether its evidence is imagery, recovered components, an official announcement, or a secondary description. Distinguish “Iranian-designed,” “reported Iranian-supplied,” and “observed in use by a particular operator.” Those are separate statements that require separate support."
        ]
      },
      {
        "heading": "A catalogue is a bounded reference",
        "body": [
          "No public course can guarantee a list of every Iranian asset, prototype, modification, locally assembled derivative, or undisclosed system. A broad catalogue can still be useful if it explains its scope and uncertainty. Official announcements establish that a claim was made; they do not independently establish every advertised capability.",
          "Begin each exercise by asking what can actually be observed and what evidence is missing. The purpose of the course is to improve technical literacy and careful reporting. Course completion does not provide an identification qualification, an operational authorization, or authority to act against an aircraft."
        ]
      }
    ],
    "takeaways": [
      "UAS describes a system; a sighting usually reveals only a small part of it.",
      "A name, an operator, a role, and an identity are separate claims.",
      "Record the source and its uncertainty before adopting its label."
    ],
    "sourceIds": [
      "dia-2019",
      "faa-cuas"
    ]
  },
  {
    "id": "recognition",
    "title": "Describe shape without overclaiming identity",
    "kicker": "02 · Visual reasoning",
    "duration": "14 min",
    "summary": "Build an organized description from visible features and recognize the limits of silhouettes, photographs, and look-alike designs.",
    "objectives": [
      "Describe observable airframe features in consistent language.",
      "Explain how viewpoint and image quality change an apparent shape.",
      "Use multiple cues and a plausible alternative instead of naming an aircraft from one feature."
    ],
    "sections": [
      {
        "heading": "Describe what is visible first",
        "body": [
          "Begin with the image, not the catalogue. Write a short literal description: “fixed-wing object, swept main surfaces, no clearly visible separate tail, viewed from below.” That is stronger evidence than “definitely a particular model” when the image does not support that certainty.",
          "Useful categories include overall configuration, wing shape, visible tail arrangement, relative proportions, and visible propulsion placement. Keep “not visible” separate from “not present.” A tail hidden by perspective is not a tailless aircraft. A propeller blurred by motion is not proof of jet propulsion."
        ],
        "bullets": [
          "Configuration: fixed wing, rotary wing, or unresolved.",
          "Wing planform: approximately straight, swept, delta-like, or unresolved.",
          "Tail arrangement: conventional tail, V-tail, twin booms, no separate tail visible, or unresolved.",
          "Propulsion placement: observed location if visible; otherwise leave unknown.",
          "Image conditions: viewing angle, blur, occlusion, compression, and scale uncertainty."
        ]
      },
      {
        "heading": "One feature rarely identifies a family",
        "body": [
          "Different designers often arrive at similar shapes because they face similar engineering constraints. Delta-like wings, twin booms, and pusher propellers occur in many unrelated aircraft. A silhouette can support a broad configuration category; it seldom proves a national origin or a precise variant.",
          "Use at least two genuinely observable features when explaining a candidate match, and state at least one alternative explanation. This is a learning discipline rather than an operational identification rule. If the evidence remains weak, “unresolved fixed-wing object” is a useful and honest result."
        ]
      },
      {
        "heading": "Perspective and scale can mislead",
        "body": [
          "A wing viewed edge-on can appear narrower than it is. An oblique view can make two unequal spans appear similar. A close small object can occupy as many image pixels as a distant large object. Without independently established geometry, apparent image size alone does not determine physical size or distance.",
          "Consumer cameras can sharpen edges or combine frames. Social-media images may be cropped, mirrored, compressed, or mislabeled. Preserve the original when available and keep edits separate. A diagram in this course illustrates a concept; it is not a dimensionally accurate recognition template."
        ]
      },
      {
        "heading": "Write a useful confidence statement",
        "body": [
          "A helpful confidence statement gives a claim, its supporting observations, the limitations, and a plausible alternative. For example: “The image is consistent with a broad tailless delta configuration because a triangular main outline is visible. Model identity remains unresolved because the view is blurred and propulsion details are hidden.”",
          "Avoid assigning numerical confidence without a defined, validated method. “90% sure” can sound precise while simply reflecting familiarity. Report uncertainty in words that explain its cause. New evidence should be able to change the conclusion."
        ]
      }
    ],
    "takeaways": [
      "An observable description should precede a family name.",
      "Not visible is different from absent.",
      "A recognition candidate should include reasons, limitations, and alternatives."
    ],
    "sourceIds": [
      "dia-2019"
    ]
  },
  {
    "id": "families",
    "title": "Navigate the Iranian public reference catalogue",
    "kicker": "03 · Families and evidence",
    "duration": "16 min",
    "summary": "Use a family-level reference without confusing historical designs, derivatives, reported prototypes, or aliases.",
    "objectives": [
      "Explain what a family-level catalogue can and cannot establish.",
      "Separate documented examples from reported announcements.",
      "Trace a catalogue statement to a source rather than relying on repetition."
    ],
    "sections": [
      {
        "heading": "Read the catalogue in layers",
        "body": [
          "Begin with a broad form category and then compare the descriptive cues supplied for a family. Next read the confusion notes and evidence label. Finally open the cited source and check what it actually supports. A family card can be useful even when the correct answer for an image is “insufficient evidence.”",
          "The catalogue organizes publicly discussed names such as Ababil, Mohajer, and Shahed, together with other reported families. These labels are organizational aids. They are not promises that every aircraft carrying a related name has the same appearance, construction, role, or history."
        ]
      },
      {
        "heading": "Families can contain very different aircraft",
        "body": [
          "A long-running programme can include substantial redesigns. Conversely, an aircraft can acquire a new name without becoming a wholly different design. A version number should not replace comparison of the actual evidence. Catalogue aliases should be read with their qualifications.",
          "“Related to,” “derived from,” and “identical to” are different claims. Public reporting may support a resemblance without proving component-level equivalence. An aircraft observed with a different operator may also have modifications that a family-level source does not describe."
        ]
      },
      {
        "heading": "Use evidence labels as a reading guide",
        "body": [
          "The “documented” category identifies an established public-reference family name. It is a reading aid, not a fresh claim-level verification: this build could not retrieve the linked reference material and does not establish current status. “Reported” names depend more heavily on attributed announcements or reporting. “Uncertain” highlights unresolved naming, identity, or evidence issues. All categories require source checking before a claim is relied upon.",
          "Two articles may repeat the same original announcement. Their agreement is then one information chain, not two independent confirmations. Prefer a traceable original source, identify later analysis as analysis, and note where a source lacks images or clear provenance."
        ],
        "bullets": [
          "Check whether the source shows the airframe or merely repeats a name.",
          "Check whether an image caption actually identifies the pictured variant.",
          "Check whether the date describes publication, an announcement, or an observation.",
          "Keep a reported prototype separate from evidence of widespread use."
        ]
      },
      {
        "heading": "Work an example without guessing",
        "body": [
          "Suppose a photograph shows an unmanned aircraft with twin booms and an unclear propulsion arrangement. Several catalogue entries might share those broad features. The correct first output is a description and a list of unresolved distinctions, not a forced selection of one model.",
          "If an accompanying caption supplies a name, treat that caption as an additional source claim. Check its provenance. When the image and caption disagree, record the discrepancy. Do not silently change the observed description to fit the label."
        ]
      },
      {
        "heading": "Keep the reference current and bounded",
        "body": [
          "A public reference ages. New reporting may clarify an alias, challenge a previous attribution, or document an additional variant. A useful update records the source, publication date, changed claim, and reason for the change. It preserves a distinction between a newly published claim and a newly verified fact.",
          "This course covers a broad public reference set, not all possible Iranian assets. It intentionally does not provide engagement ranges, weapons recommendations, deployment locations, or an inventory of equipment at any installation."
        ]
      }
    ],
    "takeaways": [
      "A family card is a source-guided reference, not an identity verdict.",
      "Repeated reporting may have a single underlying source.",
      "Completeness and certainty must be stated as limits, not assumed."
    ],
    "sourceIds": [
      "dia-2019"
    ]
  },
  {
    "id": "observation",
    "title": "Turn an observation into a clear report",
    "kicker": "04 · Evidence and uncertainty",
    "duration": "12 min",
    "summary": "Separate raw observations from interpretation, preserve provenance, and communicate uncertainty in a form another person can evaluate.",
    "objectives": [
      "Distinguish a measurement, a track, an interpretation, and an assessment.",
      "Create a concise report that preserves what is known and unknown.",
      "Avoid circular confirmation when several reports share one source."
    ],
    "sections": [
      {
        "heading": "Four layers of information",
        "body": [
          "A measurement is a sensor output or a direct observation at a particular time. A track is an estimate that links measurements across time. A classification is a hypothesis about what produced those measurements. A threat assessment considers context and authorized criteria beyond physical appearance.",
          "These layers should remain distinguishable. A stable track does not establish a model name. A catalogue match does not establish intent. A precise-looking display can show an uncertain estimate; the number of displayed digits does not determine the quality of the evidence."
        ]
      },
      {
        "heading": "A simple report structure",
        "body": [
          "Use the reporting channel and format established by the responsible organization. For learning purposes, a clear report records when the observation occurred, where the observer was, what was directly seen or heard, which source produced the information, and what remains uncertain. Record times with their time zone when permitted by local procedures.",
          "Describe visible features in ordinary language. Do not fill an unknown field with a guess. Keep an interpretation in its own sentence: “Possible fixed-wing aircraft; exact type unknown.” Report a change or correction explicitly rather than overwriting the original account without explanation."
        ],
        "bullets": [
          "Observation: what the source directly supports.",
          "Context: time, permitted location information, and viewing conditions.",
          "Provenance: direct observation, original recording, sensor report, or forwarded message.",
          "Assessment: a clearly labeled, limited interpretation.",
          "Uncertainty: missing information, conflicting reports, and plausible alternatives."
        ]
      },
      {
        "heading": "Preserve the evidence chain",
        "body": [
          "If recording is safe and permitted, retain the original file and its available metadata. Document any crop, brightness adjustment, or annotation as a separate derivative. Do not circulate restricted imagery or installation details outside authorized channels. Never delay a protective action to obtain a better photograph.",
          "A forwarded clip without its original time and location can be relevant background but cannot establish a current local event. A screenshot of a screen is also a new representation of evidence, with additional opportunities for lost context."
        ]
      },
      {
        "heading": "Avoid confirmation loops",
        "body": [
          "Imagine one observer posts a blurry clip, a second person labels it, and a third repeats the label. A later summary cites all three. That is not three independent identifications; the reports may all derive from the same image and initial guess.",
          "Trace each claim back to the underlying observation. Independent evidence should add a genuinely separate measurement or a new, justified analysis. When sources conflict, preserve the disagreement and route it for review instead of selecting the most confident-sounding account."
        ]
      }
    ],
    "takeaways": [
      "Keep observation, tracking, identity, and intent separate.",
      "A useful report includes provenance and uncertainty.",
      "Corrections improve evidence quality when they remain traceable."
    ],
    "sourceIds": [
      "cisa-uas"
    ]
  },
  {
    "id": "cfar",
    "title": "CFAR: how an adaptive detector sets a threshold",
    "kicker": "05 · Signal processing lab",
    "duration": "22 min",
    "summary": "Derive cell-averaging CFAR step by step, explore a synthetic power profile, and understand exactly which assumptions support its false-alarm calculation.",
    "objectives": [
      "Locate the cell under test, guard cells, and training cells.",
      "Compute a CA-CFAR threshold from linear-power samples.",
      "Explain why a threshold crossing is a detection event rather than an aircraft identity.",
      "Describe how correlated or nonuniform backgrounds weaken the textbook guarantee."
    ],
    "sections": [
      {
        "heading": "The question a detector answers",
        "body": [
          "A sensor processor often produces a sequence of measurements arranged into cells. Depending on the application, a cell might represent a time interval, an image location, or a location in a processed measurement grid. The detector asks whether the value in a particular cell is unusually large relative to a background model.",
          "A fixed threshold can generate many false alarms when the background rises, or miss weak signals when it is set too high for a quieter background. CFAR means constant false alarm rate. It describes a family of methods that adapt the threshold using an estimate of the local background. It does not promise a constant real-world rate under every condition."
        ]
      },
      {
        "heading": "Step 1: separate three kinds of cells",
        "body": [
          "The cell under test, or CUT, contains the value being tested. Training cells, also called reference cells, provide samples used to estimate the background. Guard cells lie between the CUT and the training region and are excluded from the estimate so that a signal extending into adjacent cells is less likely to contaminate it.",
          "In a symmetric one-dimensional illustration, training and guard cells appear on both sides. N means the total number of training cells, counting both sides, unless a particular implementation explicitly defines it differently. The CUT and all guard cells are excluded from N and from the background average. Near an array boundary, a method needs an explicit edge policy."
        ]
      },
      {
        "heading": "Step 2: estimate average background power",
        "body": [
          "For cell-averaging CFAR, write the N training-cell powers as X₁, X₂, …, Xₙ. Compute Z = (X₁ + X₂ + … + Xₙ)/N. The decision threshold is T = αZ, where α is a multiplier selected from a probability model. Declare a threshold crossing when the CUT power X exceeds T.",
          "This calculation uses linear power. Decibel values are logarithms, so averaging dB values and treating the result as the arithmetic mean of power is generally wrong. Convert power levels from dB to linear units before applying this formula; a display may convert the resulting values back to dB afterward. The course lab uses normalized synthetic power, not real sensor measurements."
        ]
      },
      {
        "heading": "Step 3: state the model before using the formula",
        "body": [
          "For the usual single-cell CA-CFAR expression here, assume that the background-only CUT and all N reference powers are mutually independent and exponentially distributed with the same unknown mean μ. This is a simplified power-domain noise model. It is not a universal model of radar data, clutter, weather, or processed sensor outputs.",
          "Choose a desired false-alarm probability p for one tested cell under that model. The result is α = N(p^(−1/N) − 1). For a teaching example with N = 16 and p = 0.01, α is approximately 5.336. If the reference mean is Z = 2 normalized power units, the threshold is approximately 10.673. These values are illustrative mathematics, not recommended detector settings."
        ]
      },
      {
        "heading": "Step 4: see why that multiplier works",
        "body": [
          "Under the background-only model, an exponential CUT satisfies P(X > t) = exp(−t/μ). If the reference estimate happens to equal Z, the conditional probability of a false threshold crossing is therefore exp(−αZ/μ). But Z is random: it changes from one group of reference cells to the next. We must average this conditional probability over all possible reference samples.",
          "Because Z = (X₁ + … + Xₙ)/N and the samples are independent, that average factors into N identical terms. For one exponential reference power, the relevant average is E[exp(−αXᵢ/(Nμ))] = 1/(1 + α/N). Thus P(false alarm) = (1 + α/N)^(−N).",
          "Set this probability equal to p. Taking the power −1/N gives 1 + α/N = p^(−1/N). Subtract 1 and multiply by N to obtain α = N(p^(−1/N) − 1). The unknown mean μ cancels. That cancellation is the reason the false-alarm probability can remain constant as the common background level changes within this model."
        ]
      },
      {
        "heading": "Step 5: interpret false alarms correctly",
        "body": [
          "A false alarm is a background-only cell that crosses the threshold. The probability p is not the probability that a reported object is hostile, and it is not the probability that a detection is false given that a detection occurred. Those are different conditional probabilities and require additional information.",
          "If M background-only cells each have false-alarm probability p, the expected number of crossings is Mp, even when the cell decisions are dependent. If the decisions were independent, the probability of at least one false alarm would be 1 − (1 − p)^M. Overlapping reference windows and processing can make decisions dependent, so that latter formula should not be used automatically.",
          "A lower chosen p increases the threshold multiplier in this model. The detector then demands stronger evidence from a cell before declaring a crossing. That may also reduce detection of weak signals. Detection probability depends on the signal and background models; CFAR alone does not determine it."
        ]
      },
      {
        "heading": "Where the simple model breaks",
        "body": [
          "A change in background across the reference window violates the common-mean assumption. Strong signals inside reference cells can raise the average and mask a weaker nearby signal. Correlation between cells reduces the validity of the independence assumption. Integration, filtering, or a different data statistic may change the background distribution.",
          "Other CFAR families use different reference estimates: greatest-of, smallest-of, and ordered-statistic methods are examples. Each has different assumptions and tradeoffs. Their threshold multipliers cannot be obtained by blindly reusing the CA-CFAR expression. Real systems require validated models, representative testing, and authorized engineering processes.",
          "In the lab, compare homogeneous synthetic noise with a background transition or a contaminated reference region. Explain the change in the estimate before interpreting the threshold crossings. The lesson is model awareness, not selection of parameters for a deployed sensor."
        ]
      }
    ],
    "takeaways": [
      "CA-CFAR compares CUT power with a multiplier times a local linear-power average.",
      "The textbook multiplier depends on a specific independent exponential model.",
      "Pfa is a per-cell background probability, not a probability of aircraft identity or intent.",
      "A threshold crossing starts an interpretation process; it does not finish one."
    ],
    "sourceIds": [
      "mathworks-cfar"
    ]
  },
  {
    "id": "networks",
    "title": "How a generic sensor network combines evidence",
    "kicker": "06 · Sensing and fusion",
    "duration": "18 min",
    "summary": "Understand complementary sensor types, time alignment, association, uncertainty, and why several displays can still represent only one underlying observation.",
    "objectives": [
      "Explain the different kinds of evidence radar, EO/IR, passive RF, and acoustic sensors can provide.",
      "Distinguish data association from classification.",
      "Explain correlated evidence and why confidence cannot simply be added.",
      "Describe a generic architecture without asserting an installation inventory."
    ],
    "sections": [
      {
        "heading": "A generic architecture, not a site inventory",
        "body": [
          "A conceptual network can be drawn as sensors → time-tagged measurements → association and tracking → human review and reporting. It may also include health monitoring, storage, access control, and interfaces to other authorized systems. This is an educational architecture, not a description of equipment at Camp Arifjan.",
          "The course does not infer which sensors, networks, operators, or systems exist at that installation, where they are located, their coverage, or their readiness. Public descriptions of a technology do not establish its presence at a particular site. Confirmed local procedures and authorized documentation govern actual operations."
        ]
      },
      {
        "heading": "Different sensors answer different questions",
        "body": [
          "Radar measures properties of reflected radio energy and can support estimates such as position or motion, depending on the system and processing. A radar detection by itself does not determine an exact airframe identity. A tracked object and a visual label are different kinds of information.",
          "Electro-optical cameras provide visible-light imagery; infrared sensors measure radiation in selected infrared bands. Their outputs can support visual interpretation under suitable conditions. A passive RF receiver observes radio emissions within its designed capabilities. Silence in one RF observation is not proof that no aircraft exists. Acoustic systems observe sound and may contribute evidence in appropriate conditions."
        ],
        "bullets": [
          "Radar: measurements from reflected radio signals; interpretation requires a model and context.",
          "EO/IR: imagery and radiometric information; visibility and viewing conditions matter.",
          "Passive RF: observations of emissions; emitter identity and airframe identity need separate support.",
          "Acoustic: observations of sound; ambient sources and propagation affect interpretation.",
          "Human reports: contextual observations with their own timing, perspective, and uncertainty."
        ]
      },
      {
        "heading": "Time alignment comes before fusion",
        "body": [
          "Suppose one display shows a measurement from now while another shows a delayed image. Placing both on the same screen does not make them simultaneous. Each observation should preserve its measurement time and, where relevant, receipt time, timing uncertainty, and processing delay.",
          "Coordinate systems also need explicit definitions. A measurement in one sensor’s local frame must not be treated as if it already uses another system’s frame. Calibration, synchronization, and unit checks are basic engineering requirements. A convincing visualization cannot repair incorrect time or coordinate assumptions."
        ]
      },
      {
        "heading": "Association asks which observations belong together",
        "body": [
          "Data association asks whether different observations plausibly refer to the same object or event. Tracking estimates how a hypothesized object changes over time. Classification asks what category may explain the evidence. These tasks interact, but their uncertainties should remain visible.",
          "For a classroom example, imagine two sources report a moving light and one reports a radio emitter. The reports may describe one event, several unrelated events, or a mistaken association. A responsible system should preserve alternative hypotheses and provenance rather than forcing all observations into one apparently certain track."
        ]
      },
      {
        "heading": "Correlated reports are not independent votes",
        "body": [
          "A fused track forwarded to two workstations does not become two independent tracks. Two algorithms operating on the same image may also share the same errors. Combining their outputs as independent evidence can produce unjustified confidence.",
          "In a simplified Bayesian explanation, posterior odds equal prior odds multiplied by a likelihood ratio. Multiplying separate likelihood ratios requires the appropriate conditional-independence assumptions. Without them, apparent agreement can be double counting. The practical lesson is to retain source provenance and understand dependence, not to assign arbitrary confidence percentages."
        ]
      },
      {
        "heading": "Network quality includes data quality",
        "body": [
          "A missing update, an unhealthy sensor, or an uncertain timestamp should be visible to the user. Display the age of information, uncertainty, source, and status alongside an estimate where appropriate. Preserve original observations so that later review can examine how a conclusion was reached.",
          "Cybersecurity, access control, configuration control, audit logs, and tested recovery procedures are part of trustworthy sensing. A network can have many sensors and still produce poor conclusions if its data are stale, misassociated, or misunderstood. This course discusses those principles without mapping any installation’s systems."
        ]
      }
    ],
    "takeaways": [
      "Different sensors provide different evidence, not interchangeable identity votes.",
      "Time, coordinate frames, uncertainty, and provenance are prerequisites for useful fusion.",
      "A generic architecture provides no evidence about equipment at Arifjan."
    ],
    "sourceIds": [
      "nist-ot",
      "cisa-uas"
    ]
  },
  {
    "id": "procedures",
    "title": "Protect people and report through authorized channels",
    "kicker": "07 · Defensive procedures",
    "duration": "12 min",
    "summary": "Practice a calm, safety-first sequence for an unexplained aircraft observation while respecting local instructions and evidence quality.",
    "objectives": [
      "Put protective instructions ahead of identification curiosity.",
      "Use a concise report with clearly labeled uncertainty.",
      "Explain why unapproved independent actions can create additional hazards."
    ],
    "sections": [
      {
        "heading": "Follow the responsible authority’s instructions",
        "body": [
          "If an alarm or protective instruction is issued, follow the established local procedure. Move to the designated protective location when directed and account for people as required. Do not pause in an exposed area to improve an image, identify a model, or complete a course checklist.",
          "The correct response depends on the organization, jurisdiction, and situation. A public course cannot replace local emergency plans, command instructions, airspace procedures, or applicable law. Know the approved reporting route and how to obtain current protective instructions before an incident occurs."
        ]
      },
      {
        "heading": "Observe only when safe and permitted",
        "body": [
          "From a safe position, provide a brief account of what was actually observed. State uncertainty and any relevant limitations such as darkness or a brief view. If an image or recording already exists, preserve it through approved channels. Do not expose sensitive installation information in a public post.",
          "Do not follow an unknown aircraft, approach an apparent landing point, or attempt to retrieve debris. Do not direct a laser at it, interfere with radio systems, or attempt an improvised interception. Such actions can endanger people and other aircraft and may be unlawful."
        ]
      },
      {
        "heading": "Keep the message short and factual",
        "body": [
          "A useful first report can be brief: “At [time and zone], from [location permitted by local reporting procedures], I observed [literal description]. The observation lasted [approximate duration if known]. Identity is unknown. I have [original recording / no recording].” Add information requested by the responsible authority.",
          "Keep hearsay separate: “A forwarded message claims…” is different from “I observed…”. If the situation changes, send a correction or update through the same authorized process. Avoid broad distribution that creates duplicate or conflicting reports."
        ]
      },
      {
        "heading": "After the immediate event",
        "body": [
          "Wait for the appropriate authority to issue further instructions or an all-clear. An aircraft no longer being visible is not, by itself, an all-clear. Preserve records, note discrepancies, and participate in an authorized review if requested.",
          "A good review asks whether the reporting route worked, whether people understood the protective instructions, whether timestamps were clear, and whether uncertainty was preserved. It does not require public disclosure of deployment information or operational capabilities."
        ]
      }
    ],
    "takeaways": [
      "Protective instructions take priority over gathering identification evidence.",
      "Report literal observations and label secondhand claims.",
      "Use authorized channels and wait for an authorized all-clear."
    ],
    "sourceIds": [
      "cisa-uas",
      "faa-cuas"
    ]
  },
  {
    "id": "response",
    "title": "Counter-UAS: authority, coordination, and safe decision making",
    "kicker": "08 · Response framework",
    "duration": "15 min",
    "summary": "Understand the roles of detection, assessment, protective measures, and authorized response without turning a public course into an engagement plan.",
    "objectives": [
      "Explain why a single distance does not determine an appropriate response.",
      "Distinguish detection capability from legal and operational authority.",
      "Describe the governance and coordination elements of a responsible counter-UAS programme."
    ],
    "sections": [
      {
        "heading": "A response framework begins with purpose and authority",
        "body": [
          "Counter-UAS programmes seek to manage risks from uncrewed aircraft while protecting people, other aviation, infrastructure, and communications. A responsible programme defines who receives reports, who assesses them, who directs protective measures, and who is authorized to take any further action.",
          "Possessing a sensor or another piece of equipment does not confer legal authority to use it in every context. Authority can depend on jurisdiction, organization, mission, and current orders. Public guidance from one country must not be assumed to authorize actions in another country."
        ]
      },
      {
        "heading": "Why a distance-to-weapon table is not appropriate here",
        "body": [
          "Range alone does not establish identity, intent, legal authority, airspace conditions, risk to bystanders, or the effects of an intervention. A public table that maps distance to a weapon would omit the context needed for a lawful, safe, and authorized decision. This course therefore provides no weapon recommendations, engagement distances, or firing rules.",
          "The useful learning question is: “Who is responsible for this decision, what evidence is available, and which approved procedure applies?” An unconfirmed observation should remain unconfirmed until the responsible process resolves it. Course completion creates no authority to engage an aircraft."
        ]
      },
      {
        "heading": "Separate five responsibilities",
        "body": [
          "An organization can distinguish observation, technical assessment, protective coordination, authorized response decisions, and post-event review. The same organization may assign these functions in different ways, but clear responsibilities help prevent a sensor alert from being mistaken for a command.",
          "For this course, “layered defense” means several complementary organizational safeguards: reliable reporting, informed human review, protective procedures, coordination, and evaluation. It is not a proposed arrangement of weapons, sensors, or engagement zones."
        ],
        "bullets": [
          "Observation: collect and preserve evidence through approved means.",
          "Assessment: examine uncertainty, provenance, and plausible explanations.",
          "Protection: communicate and implement approved measures for people.",
          "Authorized response: defer decisions to designated personnel using applicable procedures.",
          "Review: preserve records, learn from errors, and update training through controlled processes."
        ]
      },
      {
        "heading": "Understand broad intervention concerns",
        "body": [
          "Some counter-UAS approaches seek to affect communications or navigation; others physically interfere with an aircraft. These broad categories can create different consequences, including interference with other systems, falling objects, or effects on uninvolved aviation. This course does not select, configure, or compare operational methods for a particular aircraft or site.",
          "Planning therefore requires authorized legal, aviation, technical, safety, and command coordination. Equipment testing and training need approved conditions and representative evaluation. An effectiveness claim in a product description is not proof of suitability in a particular setting."
        ]
      },
      {
        "heading": "Evaluate a programme without publishing an engagement plan",
        "body": [
          "Useful programme questions include whether reports reach the right people, whether alerts are understandable, whether sensor information retains timestamps and provenance, whether exercises include uncertainty, and whether corrective actions are tracked. These questions improve reliability without publishing operational thresholds or site vulnerabilities.",
          "Use tabletop exercises that reward restraint, clear communication, and correct escalation. A scenario can end successfully with a well-documented unresolved observation and proper protective coordination. A forced identification or an unauthorized action is not a training success."
        ]
      }
    ],
    "takeaways": [
      "Distance alone cannot determine a lawful and safe response.",
      "Detection, assessment, protection, and response authority are distinct.",
      "A useful public course teaches coordination and uncertainty, not engagement parameters."
    ],
    "sourceIds": [
      "faa-cuas",
      "cisa-uas"
    ]
  },
  {
    "id": "debris",
    "title": "Debris and aftermath: preserve safety before evidence",
    "kicker": "09 · Post-event safety",
    "duration": "9 min",
    "summary": "Recognize why apparently inert parts can remain hazardous and preserve evidence without approaching, handling, or publicizing sensitive material.",
    "objectives": [
      "Explain why apparent inactivity does not establish that debris is safe.",
      "Describe safe reporting and non-interference principles.",
      "Keep specialist identification and recovery responsibilities distinct from public observation."
    ],
    "sections": [
      {
        "heading": "Appearance does not establish safety",
        "body": [
          "An aircraft component or fragment may contain hazardous energy sources, sharp materials, fuel residues, damaged batteries, or unexploded explosive components. A damaged or apparently inactive object is not necessarily safe. A familiar-looking part does not establish that the rest of the object is harmless.",
          "Do not approach, touch, move, open, collect, or attempt to disable suspected aircraft debris. Do not manipulate it to obtain a better photograph or expose a marking. Follow local instructions and notify the designated authority from a safe position."
        ]
      },
      {
        "heading": "Let designated specialists manage the scene",
        "body": [
          "The responsible authority determines access, any protective area, inspection, and recovery. A public identification course cannot establish a safe distance or certify an object as inert. Follow instructions from the personnel assigned to the incident.",
          "If others are nearby, communicate the concern without approaching the object or placing yourself at risk. Do not improvise a recovery or disposal plan. If there is smoke, fire, injury, or another immediate emergency, use the established emergency reporting process and follow the instructions you receive."
        ]
      },
      {
        "heading": "Preserve context without disturbing anything",
        "body": [
          "If you already have an observation or recording, preserve its original context and provide it through approved channels. State where and when the observation was made using the organization’s reporting procedures. Do not move an object to make an identification easier.",
          "Photographs of labels or components can be misleading when detached from their original context. Specialist identification combines evidence and provenance. A public image that resembles a catalogue component is not enough to certify an aircraft model, operator, or cause of an incident."
        ]
      },
      {
        "heading": "Avoid public speculation",
        "body": [
          "Unverified debris claims can spread rapidly. Share only what the responsible organization authorizes for public release. Keep original evidence and later interpretations separate. A corrected identification should be documented rather than concealed.",
          "The training goal is simple: protect people, report through the proper route, preserve existing evidence, and leave inspection and recovery to designated specialists."
        ]
      }
    ],
    "takeaways": [
      "Do not infer safety from an inactive appearance.",
      "Do not touch, move, open, or collect suspected aircraft debris.",
      "Authorized specialists determine access, inspection, and recovery."
    ],
    "sourceIds": [
      "cisa-uas"
    ]
  },
  {
    "id": "capstone",
    "title": "Capstone: explain what the evidence does and does not show",
    "kicker": "10 · Integrated practice",
    "duration": "15 min",
    "summary": "Combine recognition, CFAR, sensor-network reasoning, and safe reporting in a synthetic scenario that rewards justified uncertainty.",
    "objectives": [
      "Produce a bounded assessment from incomplete information.",
      "Identify double counting and an unsupported site-specific claim.",
      "Distinguish a signal-processing result from a response authorization."
    ],
    "sections": [
      {
        "heading": "The classroom scenario",
        "body": [
          "This fictional scenario uses no real installation data. An observer reports a brief view of a triangular-looking object. A blurred image is forwarded through two messages. A demonstration detector produces several threshold crossings in a synthetic profile with a background transition. Someone says the agreement proves a particular aircraft model and asks which system should respond.",
          "Treat every item as a claim to examine. The observer’s description may support a broad visible configuration. The two forwarded messages may contain the same image. The synthetic detector output is an exercise in signal processing, not an observation of the pictured object. No part of the scenario establishes a deployed sensor inventory or a real threat."
        ]
      },
      {
        "heading": "Step 1: separate the evidence streams",
        "body": [
          "List the original observation, the original image if available, the two forwarded copies, and the synthetic demonstration output. Mark which items derive from the same source. Preserve the observation time separately from the message time.",
          "The copies do not add independent confirmation. The demonstration has no shared physical provenance with the image. Combining them into a single “confirmed track” would be a category error. A coherent narrative is not the same thing as a justified association."
        ]
      },
      {
        "heading": "Step 2: describe the limited recognition result",
        "body": [
          "A careful description is: “The available image may be consistent with a triangular or delta-like configuration; precise identity is unresolved because of blur, viewpoint, and missing distinguishing detail.” A catalogue can supply candidate families and confusion notes, but it cannot restore absent evidence.",
          "State what further evidence would improve the assessment at a general level: original provenance, a clearer authorized image, or a validated independent observation. Do not seek that evidence by approaching a hazard or exposing sensitive information."
        ]
      },
      {
        "heading": "Step 3: explain the detector result",
        "body": [
          "A CA-CFAR threshold crossing says the CUT exceeded the threshold computed from nearby reference powers. In the synthetic background-transition case, the common-background assumption is weakened. The detector can be demonstrating a model limitation rather than a reliable event classification.",
          "Neither a low chosen Pfa nor a prominent plotted peak proves an aircraft type or hostile intent. Check the sample statistic, assumptions, reference selection, and edge policy when explaining the exercise. Keep these mathematical observations separate from any operational assessment."
        ]
      },
      {
        "heading": "Step 4: complete a responsible response",
        "body": [
          "Follow the relevant protective and reporting instructions. Provide a concise report that distinguishes direct observation, copied material, a candidate interpretation, and unresolved information. Refer response decisions to the authorized personnel and procedures.",
          "An acceptable conclusion is: “Identity unresolved; original observation reported; evidence provenance preserved; applicable protective instructions followed.” There is no requirement to force a name or propose a weapon. A defensible result states what the evidence supports and stops where it does not."
        ]
      },
      {
        "heading": "Self-review checklist",
        "body": [
          "Before submitting the final assessment, explain your reasoning in plain language. A reader should be able to tell which statements came directly from observations, which are interpretations, and which remain unknown. If a new source contradicts your conclusion, the report should make it easy to update the assessment."
        ],
        "bullets": [
          "Did I describe what is visible before naming a family?",
          "Did I distinguish original evidence from repeated copies?",
          "Did I keep a threshold or false-alarm calculation separate from identity and intent?",
          "Did I avoid assuming which sensors are present at Arifjan or another site?",
          "Did I use the approved reporting and protective process?",
          "Did I leave response authority with the designated personnel?"
        ]
      }
    ],
    "takeaways": [
      "Uncertainty can be the correct final assessment.",
      "Evidence needs traceable provenance and justified association before it is fused.",
      "Good technical reasoning supports safe reporting; it does not create response authority."
    ],
    "sourceIds": [
      "mathworks-cfar",
      "cisa-uas",
      "faa-cuas"
    ]
  }
];
