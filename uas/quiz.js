// Scenario-based learning checks; answers are zero-based option indexes.
export const quizQuestions = [
  {
    "id": "foundations-1",
    "moduleId": "foundations",
    "prompt": "An archive caption names a model, while its photograph shows a small surface ahead of the main wing. Which study note keeps the evidence separate?",
    "options": [
      "“The visible surface independently proves the model named in the caption.”",
      "“Source claim: the caption names X. Visible feature: a forward surface appears. Unknown: the model attribution has not been independently checked.”",
      "“The filename proves the aircraft’s current operator.”",
      "“The image establishes the complete UAS and its present-day use.”"
    ],
    "answer": 1,
    "explanation": "The three-part method separates the source’s model label, a broad visible relationship, and unresolved attribution. A shared anatomical feature does not independently authenticate a caption."
  },
  {
    "id": "foundations-2",
    "moduleId": "foundations",
    "prompt": "A file was uploaded in 2024, and its description says the photograph was taken in 2012. Which statement is appropriate?",
    "options": [
      "The upload proves that the pictured aircraft was observed in 2024.",
      "The two dates must describe the same event.",
      "Record 2012 as the source’s stated capture date and 2024 as the upload date; neither should silently replace the other.",
      "Discard the older date because upload dates are always more accurate."
    ],
    "answer": 2,
    "explanation": "Capture and upload dates answer different questions. Preserve both with their stated provenance, and retain uncertainty if the original capture date has not been verified."
  },
  {
    "id": "foundations-3",
    "moduleId": "foundations",
    "prompt": "A public image has a reuse license and a model name in its caption. What does the license establish?",
    "options": [
      "The stated conditions for reusing the file; it does not verify the model attribution.",
      "That the caption’s model name has been independently authenticated.",
      "That every related image has the same license.",
      "That the uploader is necessarily the photographer."
    ],
    "answer": 0,
    "explanation": "A license concerns reuse, while a caption makes a factual claim. Check the individual file’s creator, source, conditions, and history; do not confuse permission with accuracy."
  },
  {
    "id": "foundations-4",
    "moduleId": "foundations",
    "prompt": "A search result is an SVG drawing uploaded by one account and credited to a different illustrator. How should it be described?",
    "options": [
      "As a photograph made by the uploader.",
      "As a verified photograph because the archive returned it for the model name.",
      "As proof of the full-size aircraft’s current service status.",
      "As an illustration with a stated illustrator and a separate uploader; inspect its source and caption before relying on it."
    ],
    "answer": 3,
    "explanation": "A drawing is not a photograph, and uploader and creator can be different people. Archive retrieval does not authenticate the subject, date, or model attribution."
  },
  {
    "id": "recognition-1",
    "moduleId": "recognition",
    "prompt": "In broad aircraft anatomy, what does “canard” describe?",
    "options": [
      "A guaranteed model name for any triangular aircraft.",
      "A small wing-like foreplane ahead of the main wing.",
      "Two rear structural members, which necessarily contain two engines.",
      "A license category for aircraft photographs."
    ],
    "answer": 1,
    "explanation": "Canard is an anatomical arrangement, not a model name. In a source image, the feature’s position must actually be visible before describing it that way."
  },
  {
    "id": "recognition-2",
    "moduleId": "recognition",
    "prompt": "Why are “delta wing” and “flying wing” not interchangeable terms?",
    "options": [
      "Both are unique names for the same aircraft family.",
      "A triangular outline proves every aspect of an aircraft’s architecture.",
      "Delta describes a broadly triangular wing planform; flying wing describes an overall airframe arrangement.",
      "A source caption makes the distinction unnecessary."
    ],
    "answer": 2,
    "explanation": "A wing-shape description and an overall architecture description answer different questions. One cannot be inferred solely from the other or from a distorted view."
  },
  {
    "id": "recognition-3",
    "moduleId": "recognition",
    "prompt": "An attributed drawing shows two long rearward structural members and calls them “twin booms.” What can be inferred from that term alone?",
    "options": [
      "The aircraft necessarily has two engines.",
      "The drawing establishes a precise variant.",
      "Every similar arrangement belongs to one country.",
      "The drawing depicts a structural arrangement; engine count and model identity require separate evidence."
    ],
    "answer": 3,
    "explanation": "Booms are structural members. “Twin boom” does not itself specify engine count, model, national origin, or the accuracy of the drawing’s attribution."
  },
  {
    "id": "recognition-4",
    "moduleId": "recognition",
    "prompt": "A caption calls the aircraft a “pusher,” but the propeller is obscured in the image. Which note is best?",
    "options": [
      "“The source describes a pusher arrangement; the propeller arrangement is not resolved in this view.”",
      "“The invisible propeller proves jet propulsion.”",
      "“The pusher label alone confirms a model name.”",
      "“I can treat the caption’s description as a directly observed feature.”"
    ],
    "answer": 0,
    "explanation": "Keep the source’s claim separate from what is visible. A pusher is a broad propulsion arrangement, and an obscured propeller cannot supply independent visual confirmation."
  },
  {
    "id": "families-1",
    "moduleId": "families",
    "prompt": "The course uses Ababil-2 as a canard-related study topic and Ababil-3 as a twin-boom-related topic. What is the historical-source lesson?",
    "options": [
      "A shared family name guarantees an identical arrangement.",
      "Either broad feature authenticates every archive caption using that family name.",
      "A family can include differing arrangements; record each source label and inspect the broad feature without treating it as independent model verification.",
      "The catalogue establishes that every labeled archive image has been reviewed."
    ],
    "answer": 2,
    "explanation": "The examples illustrate vocabulary and variation within a named family. The image results were not verified during this build, and shared anatomical terms do not authenticate a model label."
  },
  {
    "id": "families-2",
    "moduleId": "families",
    "prompt": "Two archive items are labeled Shahed-131 and Shahed-136, and both appear broadly delta-like. Which conclusion is supported by that broad similarity?",
    "options": [
      "They share a broad descriptive form; that similarity does not verify either caption or resolve a variant.",
      "Both captions must refer to one identical airframe.",
      "The outline independently proves both model labels.",
      "The archive labels establish current operational status."
    ],
    "answer": 0,
    "explanation": "A broad shared form is not a variant test. Preserve each source’s exact label and provenance, and keep unresolved attribution separate from visible anatomy."
  },
  {
    "id": "families-3",
    "moduleId": "families",
    "prompt": "An archive category named for a model contains a photograph, a diagram, and an image of a display model. What should a learner do?",
    "options": [
      "Treat all three as authenticated photographs of the full-size aircraft.",
      "Assume category membership proves every caption.",
      "Ignore the individual file pages because the category name settles the identity.",
      "Inspect each file’s medium, creator, source, caption, and dates; category membership is a search aid rather than verification."
    ],
    "answer": 3,
    "explanation": "Archive categories organize material and can contain related, illustrative, or mislabeled items. Each source item needs its own description and provenance."
  },
  {
    "id": "families-4",
    "moduleId": "families",
    "prompt": "Three websites repeat one aircraft photograph with the same model caption, and all credit the same original publisher. How should the model claim be counted?",
    "options": [
      "As three independent identifications.",
      "As potentially one underlying source claim repeated three times, pending separate evidence.",
      "As proof that the creator and uploader are the same person.",
      "As proof that the image’s license certifies the caption."
    ],
    "answer": 1,
    "explanation": "Repeated copies do not create independent source evidence. Trace the shared image and caption to their origin, and record any later analysis as separate interpretation."
  },
  {
    "id": "observation-1",
    "moduleId": "observation",
    "prompt": "Which sequence correctly separates information layers?",
    "options": [
      "Measurement → track estimate → classification hypothesis → contextual assessment.",
      "Classification → certainty → authorization → measurement.",
      "Model name → hostile intent → raw observation → evidence.",
      "Forwarded label → confirmed identity → automatic response."
    ],
    "answer": 0,
    "explanation": "Measurements, tracks, classification, and contextual assessment are related but distinct. None automatically supplies the certainty or authority required by the next layer."
  },
  {
    "id": "observation-2",
    "moduleId": "observation",
    "prompt": "A forwarded clip has no original time or location. Which claim is justified?",
    "options": [
      "It confirms a current local event.",
      "It is independent evidence of every accompanying caption.",
      "It may be relevant background, but it does not establish a current local event without provenance.",
      "Its forwarding time is the time of the original observation."
    ],
    "answer": 2,
    "explanation": "Receipt or forwarding time is not necessarily observation time. Missing provenance limits what the clip can establish."
  },
  {
    "id": "observation-3",
    "moduleId": "observation",
    "prompt": "You learn that an earlier report misstated an observation time. What is the best correction?",
    "options": [
      "Silently replace every copy so the error is invisible.",
      "Issue a traceable correction through the approved reporting process.",
      "Leave it unchanged to avoid acknowledging uncertainty.",
      "Invent a precise time if the original time is still unknown."
    ],
    "answer": 1,
    "explanation": "Traceable corrections improve reliability. Preserve the distinction between the original report, the corrected information, and any remaining uncertainty."
  },
  {
    "id": "observation-4",
    "moduleId": "observation",
    "prompt": "One image is forwarded to three people, who all repeat its first caption. How many independent image observations does that establish?",
    "options": [
      "Four, including the caption.",
      "Three, because three people repeated it.",
      "Two, because an image and caption are different media.",
      "One underlying image observation, unless additional independent evidence is supplied."
    ],
    "answer": 3,
    "explanation": "Repeated copies and interpretations do not create new independent measurements. Trace each claim to the original evidence."
  },
  {
    "id": "cfar-1",
    "moduleId": "cfar",
    "prompt": "In the CA-CFAR formula, what is N?",
    "options": [
      "The CUT plus every guard cell.",
      "The total number of training cells used in the reference average, excluding the CUT and guard cells.",
      "The number of threshold crossings.",
      "The number of aircraft believed to be present."
    ],
    "answer": 1,
    "explanation": "Here N counts all reference powers used to estimate the background. In a symmetric window it includes training cells on both sides, but not guard cells or the CUT."
  },
  {
    "id": "cfar-2",
    "moduleId": "cfar",
    "prompt": "Why are guard cells excluded from the reference average?",
    "options": [
      "They prove the identity of a detected object.",
      "They remove the need for a statistical background model.",
      "They guarantee that all training cells contain pure noise.",
      "They reduce contamination of the reference estimate by a signal extending beyond the CUT."
    ],
    "answer": 3,
    "explanation": "Guard cells help keep signal energy near the CUT out of the background estimate. They do not guarantee uncontaminated reference data or remove the need to validate assumptions."
  },
  {
    "id": "cfar-3",
    "moduleId": "cfar",
    "prompt": "Four linear-power training values are 1, 1, 1, and 9. What is their CA reference mean?",
    "options": [
      "3",
      "1",
      "9",
      "12"
    ],
    "answer": 0,
    "explanation": "The arithmetic mean is (1 + 1 + 1 + 9)/4 = 3. The unusually large reference value raises the estimate, illustrating why contaminated reference cells can change the threshold."
  },
  {
    "id": "cfar-4",
    "moduleId": "cfar",
    "prompt": "For the stated independent exponential model, N = 16 and p = 0.01 give α ≈ 5.336. If Z = 2, what is the threshold T?",
    "options": [
      "2.668",
      "5.336",
      "Approximately 10.673 normalized power units.",
      "Exactly 0.01 normalized power units."
    ],
    "answer": 2,
    "explanation": "CA-CFAR uses T = αZ. Using the unrounded multiplier gives T ≈ 10.673. The displayed α is rounded to three decimals. These are teaching values, not recommended settings for any sensor."
  },
  {
    "id": "cfar-5",
    "moduleId": "cfar",
    "prompt": "A detector uses a model-based per-cell false-alarm probability p = 0.01. What does p describe?",
    "options": [
      "The probability that a detected aircraft is hostile.",
      "The probability that a background-only tested cell crosses the threshold under the stated model.",
      "The probability that a catalogue name is correct.",
      "The probability that a reported detection is false, given that a detection occurred."
    ],
    "answer": 1,
    "explanation": "Pfa is conditioned on the absence of the modeled signal. It is not the posterior probability of a false detection, an aircraft identity, or hostile intent."
  },
  {
    "id": "cfar-6",
    "moduleId": "cfar",
    "prompt": "Which situation weakens the textbook CA-CFAR guarantee used in this course?",
    "options": [
      "All reference and CUT powers are independent exponential variables with a common mean.",
      "The common background mean changes uniformly while the model assumptions still hold.",
      "A threshold is computed from linear power.",
      "Reference cells straddle a background transition or are strongly correlated."
    ],
    "answer": 3,
    "explanation": "The derived multiplier assumes independent exponential powers with the same background mean. Nonuniform backgrounds, correlation, or a different power distribution can invalidate the simple guarantee."
  },
  {
    "id": "networks-1",
    "moduleId": "networks",
    "prompt": "What does the generic network diagram in this course establish about Camp Arifjan?",
    "options": [
      "No inventory or deployment claim; it illustrates general sensor-network concepts only.",
      "That every illustrated sensor is deployed there.",
      "That a particular coverage map or readiness condition exists there.",
      "That a particular response system is authorized there."
    ],
    "answer": 0,
    "explanation": "A conceptual architecture is not evidence of an installation inventory, coverage, readiness, or authority. The course makes no such site-specific assertions."
  },
  {
    "id": "networks-2",
    "moduleId": "networks",
    "prompt": "A passive RF observation shows no relevant emission. What is the strongest general conclusion?",
    "options": [
      "No aircraft exists.",
      "Every nearby aircraft has been disabled.",
      "That observation alone does not establish the absence of an aircraft.",
      "The observation proves a specific airframe identity."
    ],
    "answer": 2,
    "explanation": "RF observations concern emissions within a receiver’s capabilities and observation conditions. Absence of a relevant observation is not a universal proof that no aircraft is present."
  },
  {
    "id": "networks-3",
    "moduleId": "networks",
    "prompt": "Two displays show the same fused track forwarded from one upstream system. How should that evidence be treated?",
    "options": [
      "As two independent confirmations.",
      "As one underlying estimate displayed twice, unless separate provenance establishes additional evidence.",
      "As a guaranteed model identification.",
      "As proof that the underlying measurements have no uncertainty."
    ],
    "answer": 1,
    "explanation": "Display count is not evidence count. Shared upstream data can create correlated or duplicate information."
  },
  {
    "id": "networks-4",
    "moduleId": "networks",
    "prompt": "Why should measurement time be distinguished from receipt time?",
    "options": [
      "They are always identical.",
      "Receipt time proves the aircraft’s identity.",
      "Only receipt time is relevant to association.",
      "Processing and transmission delays can make a received observation older than it appears."
    ],
    "answer": 3,
    "explanation": "Time alignment depends on when the measurement was made, not just when it arrived. Preserving both timestamps helps explain age, delay, and uncertainty."
  },
  {
    "id": "networks-5",
    "moduleId": "networks",
    "prompt": "What does data association ask?",
    "options": [
      "Whether different observations plausibly refer to the same object or event.",
      "Which intervention should automatically follow a threshold crossing.",
      "Which country controls every observed emitter.",
      "Whether a precise display can replace provenance."
    ],
    "answer": 0,
    "explanation": "Association links observations under a hypothesis. It is distinct from identity classification, intent assessment, and response authorization."
  },
  {
    "id": "networks-6",
    "moduleId": "networks",
    "prompt": "Why can multiplying separate likelihood ratios overstate confidence?",
    "options": [
      "Probability calculations never require assumptions.",
      "Every sensor output is independent by definition.",
      "The evidence may be conditionally dependent or derived from the same underlying observation.",
      "Repeating a label always supplies independent evidence."
    ],
    "answer": 2,
    "explanation": "The simple product requires appropriate conditional-independence assumptions. Shared data or common error sources can lead to double counting if those assumptions are ignored."
  },
  {
    "id": "procedures-1",
    "moduleId": "procedures",
    "prompt": "A protective alarm is issued while someone is trying to photograph an unknown aircraft. What takes priority?",
    "options": [
      "Obtaining the sharpest possible image.",
      "Following the established protective instructions.",
      "Completing an identification quiz.",
      "Posting a public model identification before moving."
    ],
    "answer": 1,
    "explanation": "Protective instructions take priority over collecting identification evidence. Never delay a protective action to improve a photograph."
  },
  {
    "id": "procedures-2",
    "moduleId": "procedures",
    "prompt": "Which first report is most useful?",
    "options": [
      "“It must be a specific model because it looked familiar.”",
      "“A forwarded message proves the event is happening here now.”",
      "“Everyone should independently investigate the landing point.”",
      "“At this time, from the permitted reporting location, I observed these features; exact identity is unknown.”"
    ],
    "answer": 3,
    "explanation": "A concise report states what was directly observed, provides permitted context, and preserves uncertainty. It avoids substituting a guess for evidence."
  },
  {
    "id": "procedures-3",
    "moduleId": "procedures",
    "prompt": "The observed object is no longer visible. What follows?",
    "options": [
      "Wait for the authorized all-clear or further instructions; disappearance alone does not provide an all-clear.",
      "The event is conclusively over.",
      "All preserved evidence should be deleted.",
      "Anyone may decide independently to resume normal activity."
    ],
    "answer": 0,
    "explanation": "Loss of visibility does not establish that protective measures are no longer needed. Follow the responsible authority’s instructions."
  },
  {
    "id": "procedures-4",
    "moduleId": "procedures",
    "prompt": "Which action best preserves evidence quality?",
    "options": [
      "Edit the only copy until it matches a catalogue silhouette.",
      "Publish sensitive location details so strangers can identify the event.",
      "Retain the original recording, label any derivative edits, and use approved reporting channels.",
      "Forward an unlabeled screenshot and discard the original."
    ],
    "answer": 2,
    "explanation": "Original files and provenance make later review more reliable. Separate edited copies and respect authorized handling requirements."
  },
  {
    "id": "response-1",
    "moduleId": "response",
    "prompt": "Why does this public course not provide a distance-to-weapon table?",
    "options": [
      "Distance automatically establishes hostile intent.",
      "Range alone omits identity, authority, aviation conditions, and risks needed for a lawful and safe decision.",
      "Every sensor alert already contains a response authorization.",
      "A public course can replace local orders once a distance is measured."
    ],
    "answer": 1,
    "explanation": "A response decision requires far more than range. This course teaches awareness and coordination; designated personnel and applicable procedures govern response decisions."
  },
  {
    "id": "response-2",
    "moduleId": "response",
    "prompt": "An organization owns detection equipment. What can be concluded about its authority?",
    "options": [
      "Ownership authorizes any counter-UAS action anywhere.",
      "Training completion provides authority in every jurisdiction.",
      "Public guidance from one country automatically governs another country.",
      "Ownership alone does not establish the legal or operational authority for a particular action."
    ],
    "answer": 3,
    "explanation": "Authority depends on applicable law, jurisdiction, mission, organizational responsibilities, and current instructions. Capability and authority are separate."
  },
  {
    "id": "response-3",
    "moduleId": "response",
    "prompt": "Which sequence best describes the course’s non-operational response framework?",
    "options": [
      "Preserve observations, assess uncertainty, coordinate protective measures, defer response decisions to authorized personnel, and review the event.",
      "Convert every alert directly into a model label and intervention.",
      "Select an intervention from apparent silhouette size.",
      "Treat a product advertisement as an approved local procedure."
    ],
    "answer": 0,
    "explanation": "The framework separates evidence, assessment, protection, response authority, and review. It supplies no engagement rule or operational system selection."
  },
  {
    "id": "response-4",
    "moduleId": "response",
    "prompt": "Which tabletop exercise outcome can be successful?",
    "options": [
      "Participants force a model name even when the evidence is weak.",
      "Participants improvise an intervention without authority.",
      "Participants report identity as unresolved, preserve evidence, and follow the correct protective and escalation process.",
      "Participants hide corrections to preserve apparent certainty."
    ],
    "answer": 2,
    "explanation": "Sound uncertainty management and correct coordination are valid outcomes. A training exercise should not reward unsupported certainty or unauthorized action."
  },
  {
    "id": "debris-1",
    "moduleId": "debris",
    "prompt": "An object believed to be aircraft debris appears inactive. What is the appropriate principle?",
    "options": [
      "Inactive appearance proves it is safe to handle.",
      "Do not approach or manipulate it; report through the designated process and follow instructions.",
      "Move it to improve lighting for a photograph.",
      "Open it to check whether it is dangerous."
    ],
    "answer": 1,
    "explanation": "Apparently inactive debris can retain hazards. Do not touch, move, open, collect, or attempt to disable it. Designated specialists determine inspection and recovery."
  },
  {
    "id": "debris-2",
    "moduleId": "debris",
    "prompt": "A label would be easier to photograph if a fragment were turned over. What should a learner do?",
    "options": [
      "Turn it over with a tool.",
      "Ask an untrained person to hold it.",
      "Collect it for later identification.",
      "Leave it undisturbed and report existing observations through approved channels."
    ],
    "answer": 3,
    "explanation": "Improving an identification image does not justify disturbing suspected debris. Preserve safety and context; leave inspection to designated specialists."
  },
  {
    "id": "debris-3",
    "moduleId": "debris",
    "prompt": "Who determines scene access and recovery procedures?",
    "options": [
      "The responsible authority and designated specialists.",
      "Anyone who has finished the public course.",
      "The person with the best camera.",
      "The first person to suggest a model name."
    ],
    "answer": 0,
    "explanation": "A public awareness course does not certify debris as safe or authorize access, inspection, or recovery."
  },
  {
    "id": "debris-4",
    "moduleId": "debris",
    "prompt": "A component photograph resembles a catalogue image. What does that establish?",
    "options": [
      "The operator and cause of the event are confirmed.",
      "The complete aircraft identity is certain.",
      "It may suggest a hypothesis, but provenance and specialist examination are still needed.",
      "The fragment is harmless because it looks familiar."
    ],
    "answer": 2,
    "explanation": "Component resemblance can be a clue, not a complete attribution or safety determination. Context and specialist examination matter."
  },
  {
    "id": "capstone-1",
    "moduleId": "capstone",
    "prompt": "Two forwarded copies of a blurred image are combined with an unrelated synthetic CFAR plot. What is the main reasoning error?",
    "options": [
      "A synthetic plot always proves the same event as an image.",
      "The copies and demonstration are being treated as independent evidence of one physical event without justified provenance.",
      "More visual materials necessarily reduce uncertainty.",
      "Any detector threshold crossing establishes an aircraft model."
    ],
    "answer": 1,
    "explanation": "Copies do not create independent observations, and a synthetic exercise does not observe the pictured event. Fusion requires justified association and provenance."
  },
  {
    "id": "capstone-2",
    "moduleId": "capstone",
    "prompt": "What is the best recognition result from a blurred triangular outline with no distinguishing detail?",
    "options": [
      "Exact model and intent confirmed.",
      "A definitive national attribution.",
      "A weapon recommendation based on shape.",
      "A possible broad delta-like configuration, with precise identity unresolved."
    ],
    "answer": 3,
    "explanation": "The conclusion should match the evidence. A broad visible configuration can be reported without pretending that it uniquely identifies a model or origin."
  },
  {
    "id": "capstone-3",
    "moduleId": "capstone",
    "prompt": "A CA-CFAR demonstration crosses a threshold near a background transition. What should the learner explain first?",
    "options": [
      "The reference estimate and its assumptions may be affected by a nonuniform background.",
      "The plotted peak establishes hostile intent.",
      "The threshold crossing authorizes a response.",
      "The exercise proves which sensors exist at a real installation."
    ],
    "answer": 0,
    "explanation": "A background transition weakens the common-background assumption. The plot is a signal-processing demonstration and cannot establish identity, deployment, or authority."
  },
  {
    "id": "capstone-4",
    "moduleId": "capstone",
    "prompt": "Which final capstone statement is best?",
    "options": [
      "“A model must be named because every exercise requires certainty.”",
      "“The course authorizes us to choose a response system.”",
      "“Identity remains unresolved; observations were reported, provenance preserved, and protective instructions followed.”",
      "“The generic network diagram confirms the local deployment inventory.”"
    ],
    "answer": 2,
    "explanation": "A bounded, evidence-based conclusion can remain uncertain while still completing the reporting and protective process correctly."
  }
];
