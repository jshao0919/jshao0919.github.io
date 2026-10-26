// Scenario-based learning checks; answers are zero-based option indexes.
export const quizQuestions = [
  {
    "id": "foundations-1",
    "moduleId": "foundations",
    "prompt": "A photograph shows an uncrewed aircraft. Which statement is best supported?",
    "options": [
      "The photograph establishes the full UAS architecture.",
      "The photograph shows the air vehicle, but associated control equipment and links may be unknown.",
      "The photograph proves the aircraft is operating autonomously.",
      "The photograph establishes who is controlling it."
    ],
    "answer": 1,
    "explanation": "A UAS includes the aircraft and associated equipment and links. An image of the aircraft generally does not establish the other parts, its control mode, or its operator."
  },
  {
    "id": "foundations-2",
    "moduleId": "foundations",
    "prompt": "Two sources use different Latin spellings for a similar aircraft name. What is the best next step?",
    "options": [
      "Treat them as different aircraft without further checks.",
      "Merge the names immediately because spelling differences never matter.",
      "Compare provenance, dates, imagery, and the source’s use of each name before treating them as aliases.",
      "Use whichever spelling appears more often as proof of identity."
    ],
    "answer": 2,
    "explanation": "Transliteration can create aliases, but names can also be reused or misapplied. Source comparison is needed before claiming equivalence."
  },
  {
    "id": "foundations-3",
    "moduleId": "foundations",
    "prompt": "Which pair of claims needs separate evidence?",
    "options": [
      "The aircraft was designed in a country, and the aircraft is currently operated by that country.",
      "The image is blurred, and fine detail is difficult to see.",
      "The report was forwarded, and the message is not an original recording.",
      "The course is public, and its content is available to readers."
    ],
    "answer": 0,
    "explanation": "Design origin does not establish the current operator. Transfer, derivatives, assembly, and misidentification can complicate attribution."
  },
  {
    "id": "foundations-4",
    "moduleId": "foundations",
    "prompt": "An official announcement describes a new aircraft. What does the announcement directly establish?",
    "options": [
      "Every advertised capability has been independently verified.",
      "The aircraft is widely deployed wherever related equipment exists.",
      "Every aircraft with a similar name is the same design.",
      "The issuing organization made those claims; independent verification of capability is a separate question."
    ],
    "answer": 3,
    "explanation": "An announcement is evidence of the announcement and its attributed claims. Verification of capabilities, availability, and use requires additional support."
  },
  {
    "id": "recognition-1",
    "moduleId": "recognition",
    "prompt": "A tail is not visible in a blurred underside image. Which description is best?",
    "options": [
      "The aircraft definitely has no tail.",
      "The tail arrangement is unresolved in this view.",
      "The image proves the aircraft belongs to one particular family.",
      "The aircraft must use jet propulsion."
    ],
    "answer": 1,
    "explanation": "Not visible does not mean absent. Perspective, blur, and occlusion may hide a tail or other feature."
  },
  {
    "id": "recognition-2",
    "moduleId": "recognition",
    "prompt": "A triangular outline appears in an image. What is a defensible conclusion?",
    "options": [
      "A particular national origin is confirmed.",
      "A particular model is confirmed because all triangular aircraft are related.",
      "The image may support a broad delta-like configuration, with precise identity still unresolved.",
      "The object’s role and intent are established."
    ],
    "answer": 2,
    "explanation": "Broad shapes occur across unrelated designs. A configuration observation alone does not establish model, origin, role, or intent."
  },
  {
    "id": "recognition-3",
    "moduleId": "recognition",
    "prompt": "Two objects occupy the same number of pixels in separate photographs. What follows?",
    "options": [
      "They have the same physical size.",
      "They are at the same distance.",
      "They are the same model.",
      "Without reliable geometry and context, physical size and distance remain unresolved."
    ],
    "answer": 3,
    "explanation": "Apparent image size depends on distance, optics, cropping, viewpoint, and physical size. Equal pixel size is not a size or distance measurement."
  },
  {
    "id": "recognition-4",
    "moduleId": "recognition",
    "prompt": "Which assessment best explains confidence?",
    "options": [
      "“A delta-like outline is visible, but blur hides distinguishing details; exact identity remains unresolved.”",
      "“I recognize the shape, so it is 99% certain.”",
      "“Everyone in the forwarded discussion agrees, so no caveat is needed.”",
      "“The catalogue contains a similar silhouette, which settles the model.”"
    ],
    "answer": 0,
    "explanation": "A useful confidence statement links the claim to observed evidence, explains limitations, and leaves room for alternatives. Unsupported percentages add apparent precision without justification."
  },
  {
    "id": "families-1",
    "moduleId": "families",
    "prompt": "Two articles repeat the same original announcement. How should their agreement be interpreted?",
    "options": [
      "As two fully independent confirmations.",
      "As evidence that the aircraft is in widespread use.",
      "As potentially one underlying information chain.",
      "As proof that all uncertainty has been resolved."
    ],
    "answer": 2,
    "explanation": "Different publications can depend on the same source. Independence depends on the underlying evidence, not the number of articles."
  },
  {
    "id": "families-2",
    "moduleId": "families",
    "prompt": "A catalogue card is labeled “documented.” What does that label mean in this course?",
    "options": [
      "It marks an established public-reference family name; this build did not freshly verify claim-level support or current status.",
      "Any similar-looking aircraft must be that family.",
      "The card establishes current deployment at a named installation.",
      "No later information can change the entry."
    ],
    "answer": 0,
    "explanation": "Evidence labels are bounded reading aids. The linked material could not be retrieved during this build, so the category does not certify claim-level support, capabilities, variants, or a current deployment inventory."
  },
  {
    "id": "families-3",
    "moduleId": "families",
    "prompt": "A caption names a model, but visible features do not clearly support that name. What should you do?",
    "options": [
      "Ignore the image and adopt the caption.",
      "Rewrite the observed features so they match the caption.",
      "Discard both sources without recording them.",
      "Record the mismatch, preserve provenance, and keep identity unresolved pending review."
    ],
    "answer": 3,
    "explanation": "The caption is a claim that needs support. A mismatch is information to preserve and examine, not a reason to force agreement."
  },
  {
    "id": "families-4",
    "moduleId": "families",
    "prompt": "Which statement appropriately describes the scope of a public Iranian UAS catalogue?",
    "options": [
      "It necessarily includes every undisclosed prototype.",
      "It covers a bounded public reference set and may omit unreported variants or modifications.",
      "It establishes that every listed design is currently operational.",
      "It guarantees identity whenever a silhouette appears similar."
    ],
    "answer": 1,
    "explanation": "Public information is incomplete and changes over time. A useful catalogue states its scope and avoids claiming exhaustive coverage or operational availability."
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
