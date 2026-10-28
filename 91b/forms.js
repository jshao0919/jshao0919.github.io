/**
 * Maintenance paperwork practice. These are instructional records, not official
 * forms, technical-manual criteria, status determinations, or dispatch authority.
 * Official-source access was unavailable during authoring; descriptive labels
 * deliberately avoid asserting the block numbers of a current form edition.
 */

export const statusSymbols = [
  {
    symbol: 'X', label: 'Inoperative status',
    description: 'A deficiency places the equipment in an inoperative status. Report the condition and follow the current technical manual and authorized maintenance process. A trainee does not clear this status by deciding that the equipment looks usable.'
  },
  {
    symbol: '/', label: 'Shortcoming',
    description: 'A deficiency does not place the equipment in an inoperative status under the applicable criteria. It still requires documentation and action. A slash is not a substitute for checking the technical manual or obtaining required authorization.'
  },
  {
    symbol: '-', label: 'Required action not performed when due',
    description: 'A required inspection, component replacement, maintenance operation, or test has not been performed when due. Determine the effect on equipment use from the applicable technical manual and authorized maintenance personnel; the symbol alone is not a release to operate.'
  },
  {
    symbol: 'circled X', label: 'Operation under specific authorization',
    description: 'An existing deficiency is subject to specifically authorized operation and limitations under the governing maintenance process. Only the designated authority can approve this condition. An operator must not convert an X to a circled X to make a dispatch possible.'
  }
];

export const formGuides = [
  {
    id: '2404', title: 'DA Form 2404 · Equipment Inspection and Maintenance Worksheet',
    summary: 'A manual inspection and maintenance worksheet. Match every entry to the actual equipment and current instructions. This lesson uses field names rather than claiming the layout or block numbering of the current official edition.',
    fields: [
      { name: 'Organization; equipment nomenclature and model', meaning: 'Identify the organization and the actual equipment inspected. A familiar nickname does not replace the required equipment identification.', example: 'TRAINING MOTOR POOL; instructional wheeled vehicle (fictional).' },
      { name: 'Registration / serial / national stock number identification', meaning: 'Use the identifier required by the form and local instructions, checked against the equipment. Do not invent an identifier or copy one from a neighboring vehicle.', example: 'TRAINING-01 — synthetic classroom identifier.' },
      { name: 'Usage readings; date; type of inspection', meaning: 'Read the applicable meter and include its units. Enter the inspection date in the format required by the current form or system and identify the inspection being performed. Leave inapplicable meters according to the instructions.', example: '12,340 km; 812 h; before-operation PMCS (fictional readings).' },
      { name: 'Technical manual number and date', meaning: 'Identify the actual applicable publication and its required edition/change information. A website or this course does not replace the equipment technical manual.', example: 'TRAINING CARD A — synthetic, not an equipment TM.' },
      { name: 'Inspection / supervisor identification', meaning: 'Use the prescribed inspection and supervisory signature/time fields. Each person signs only for the role and work they actually performed or were authorized to verify.', example: 'Training exercises do not collect real names or signatures.' },
      { name: 'Item number', meaning: 'Use the inspection or PMCS item reference required by the worksheet instructions. If a fault is not associated with a listed item, follow the current instructions rather than inventing a TM item number.', example: 'T-A01 — item on a fictional training card only.' },
      { name: 'Status', meaning: 'Use the applicable maintenance symbol under the governing technical manual and maintenance instructions. Obtain help when the criteria or authority are uncertain.', example: 'X is supplied by the fictional supervisor in the practice scenario.' },
      { name: 'Deficiencies and shortcomings', meaning: 'Describe the component, its location, and the observable condition. Add relevant measurements and units when actually obtained by an authorized procedure. Separate observations from an unconfirmed diagnosis.', example: 'Right rear tire sidewall has a visible cut.' },
      { name: 'Corrective action', meaning: 'The responsible authorized person records the work actually performed. “Replace tire” is a proposed action, not evidence that replacement occurred. Pending handoff notes belong wherever the current worksheet and unit process require.', example: 'Reporting exercises use a separate pending-action note. Correction-writing exercises supply fictional completed work and verification to document.' },
      { name: 'Initial when corrected', meaning: 'The authorized person initials only after the required corrective action and verification under the governing process. A trainee or operator does not initial a repair merely because a fault was reported.', example: 'Reporting exercises leave initials blank; correction-writing exercises supply fictional initials for a fictional authorized corrector.' }
    ],
    workflow: [
      'Obtain the current authorized worksheet and the technical manual for the exact equipment. Read the instructions before entering data.',
      'Match the equipment identity, meter readings, date, inspection type, and publication reference to what is actually being inspected.',
      'Perform the authorized inspection in the technical manual order. Record each new fault clearly and check for an existing record of the same condition.',
      'Enter the required item reference and status using the governing criteria. Record what you observed, where you observed it, and any reliable measurements.',
      'Report conditions requiring immediate attention. Reporting a fault, assigning a status, and authorizing operation are separate responsibilities.',
      'Route the worksheet through the prescribed maintenance process. The responsible maintainer records actual corrective action, and authorized personnel verify and close the fault as required.',
      'Review the worksheet for legibility, missing information, duplicate faults, and unsupported completion claims. Retain or file it according to the current process.'
    ],
    pitfalls: [
      'Do not copy an example TM number, date, meter reading, fault, or signature into a real record.',
      '“Bad tire” omits location and the observable condition; “needs a new tire” asserts a solution without recording the finding.',
      'Do not use a form to declare that equipment is safe when the technical manual or required authority has not established that.',
      'Do not erase or overwrite a status change casually. Follow the authorized correction and status-clearing instructions.'
    ]
  },
  {
    id: '5988', title: 'DA Form 5988-E · Equipment Maintenance and Inspection Worksheet',
    summary: 'An equipment maintenance and inspection worksheet associated with the automated maintenance process. Its generated equipment and fault information must be checked, and new findings must reach the authorized maintenance system. Exact screen names and print layouts depend on the current implementation.',
    fields: [
      { name: 'Generated equipment identification', meaning: 'Confirm that the worksheet belongs to the equipment in front of you. Report a mismatch; do not change an identifier just to make the sheet appear to fit.', example: 'Match the equipment number and serial/registration information against the actual asset.' },
      { name: 'Usage readings and inspection information', meaning: 'Verify applicable miles/kilometers and hours, the inspection date, and relevant inspection information under the unit process. Keep the units attached to each reading.', example: 'A distance reading of 12,340 km is not 12,340 miles.' },
      { name: 'Previously recorded faults', meaning: 'Review existing faults, statuses, and relevant recorded actions before writing new entries. A repeated symptom may belong to an existing open fault; a distinct new condition may require a separate record.', example: 'Compare the component, location, and condition; a matching vehicle alone does not establish a duplicate.' },
      { name: 'New fault information', meaning: 'Record the required inspection reference and the actual condition. Where the worksheet does not provide a separate PMCS item column, include the reference as directed by the current instructions.', example: 'Training item T-B02: right rear lamp lens is cracked.' },
      { name: 'Fault identifier versus PMCS item reference', meaning: 'A system fault number identifies a maintenance record. A PMCS item number identifies an inspection task. They serve different purposes and must not be substituted for each other.', example: 'The fictional item T-B02 is not an automated fault number.' },
      { name: 'Status and maintenance action', meaning: 'Follow the governing status criteria and approved reporting workflow. Authorized maintenance personnel process work and update the system; writing a note on the printout does not by itself close an electronic fault.', example: 'Report a new condition and route the worksheet for processing.' },
      { name: 'Correction / verification information', meaning: 'Record completed work and verification only through the authorized process. Keep handoff notes distinct from completion, and do not provide another person’s initials or approval.', example: 'A classroom pending-action note is not a mechanic’s correction sign-off.' }
    ],
    workflow: [
      'Obtain the worksheet produced or approved for the equipment and current inspection. Check its equipment identity before using it.',
      'Review open faults and any applicable limitations with the responsible personnel. Resolve unclear instructions before operating.',
      'Verify meter readings and perform the technical-manual inspection. Compare each finding with existing faults to avoid careless duplication.',
      'Record new findings, inspection references, and the required status according to the current instructions. Do not create a system fault number yourself.',
      'Give the worksheet and an accurate verbal handoff to the responsible maintenance personnel. Identify any condition requiring immediate action.',
      'Follow the authorized process for entering or reconciling the information in the maintenance system. Do not assume paper notes automatically updated the database.',
      'After actual maintenance and required verification, authorized personnel record completion and update status. Confirm the handoff is complete under the local process.'
    ],
    pitfalls: [
      'A preprinted fault is not proof that the present condition has already been repaired.',
      'Do not rewrite generated equipment information or delete a fault merely because it looks inconvenient.',
      'Do not invent a universal GCSS-Army menu sequence: use current role-based training and unit instructions.',
      'A signed dispatch, a submitted worksheet, and a closed maintenance fault are different records and decisions.'
    ]
  },
  {
    id: 'dispatch', title: 'Dispatch and use records · DA Form 5987-E / DD Form 1970',
    summary: 'DA Form 5987-E is a motor equipment dispatch record; DD Form 1970 is a motor equipment utilization record. Use the record and workflow currently authorized by the unit. Neither is a substitute for documenting maintenance faults.',
    fields: [
      { name: 'Equipment and operator identification', meaning: 'Verify the correct equipment, qualified operator, and authorized record. The dispatcher verifies requirements under the current process.', example: 'Use synthetic classroom identity only in this course.' },
      { name: 'Authorized use and approval', meaning: 'The designated authority approves use under applicable requirements and any established limitations. A worksheet with no new faults does not itself constitute dispatch approval.', example: 'Do not invent an approving official or signature.' },
      { name: 'Departure / return readings and times', meaning: 'Enter actual values in the required units and time format. Confirm start and end readings refer to the same meter.', example: 'Do not mix kilometers at departure with miles on return.' },
      { name: 'Use, fuel, and related entries when required', meaning: 'Record only the information required by the applicable form and instructions, based on actual events. Use the correct units and approved correction method.', example: 'A classroom example does not establish a vehicle fuel rate or authorized mission.' },
      { name: 'Return and closeout', meaning: 'Report findings, submit required maintenance paperwork, and complete the dispatcher’s return process. Returning a dispatch record does not clear an unresolved equipment fault.', example: 'After-operation finding goes into the authorized maintenance reporting workflow.' }
    ],
    workflow: [
      'Confirm which dispatch or utilization record the unit currently requires and who may issue, approve, and close it.',
      'Complete required checks of qualifications, equipment identity, maintenance status, and authorization through the designated personnel.',
      'Record actual starting readings and required departure information; retain and use the record as instructed.',
      'During use, make required entries when it is safe and authorized to do so. Report new maintenance conditions through the proper channel.',
      'At return, enter actual ending information, perform the required after-operation checks, hand over fault documentation, and complete authorized closeout.'
    ],
    pitfalls: [
      'Do not use a dispatch form as a repair order or as permission to ignore a maintenance limitation.',
      'DD Form 1970 is not automatically interchangeable with every electronic dispatch workflow; confirm the authorized process.',
      'Never pre-sign, backdate, estimate unobserved meter readings, or sign for another person.'
    ]
  },
  {
    id: '2408-14', title: 'DA Form 2408-14 · Uncorrected Fault Record',
    summary: 'A record for uncorrected faults when required by the applicable maintenance instructions. Its use and relationship to automated records must be confirmed with current doctrine and the unit process. It is not a way to make an unresolved problem disappear.',
    fields: [
      { name: 'Equipment identity', meaning: 'Associate the record with the correct equipment using the required identification.', example: 'TRAINING-01 is only a fictional learning identifier.' },
      { name: 'Fault and originating reference', meaning: 'Preserve enough accurate information to identify the condition and relate it to its originating record under the instructions.', example: 'Component, location, observable condition, and required cross-reference.' },
      { name: 'Dates and required follow-up information', meaning: 'Use the actual required dates and keep the record current through authorized personnel and procedures.', example: 'Do not fabricate a completion date for an uncorrected fault.' },
      { name: 'Correction / disposition', meaning: 'An entry is resolved only through the prescribed action and documentation. Recording a deferral or carry-forward is not a repair.', example: 'Only actual authorized correction supports a completion entry.' }
    ],
    workflow: [
      'Ask the responsible maintenance personnel whether this record is required for the equipment and current maintenance system.',
      'Follow the authorized decision and documentation process for carrying an uncorrected fault forward. Do not independently defer an X-status fault.',
      'Preserve accurate fault information and required links to the originating record. Keep unresolved conditions visible to those responsible for equipment status.',
      'Review and update the record through the prescribed process. Close or dispose of an entry only when the authorized conditions are met.'
    ],
    pitfalls: [
      'Moving a fault to another record does not change its physical condition or authorize equipment operation.',
      'A part on order is not proof of a completed repair.',
      'Do not create a parallel personal record that leaves the official maintenance system incomplete.'
    ]
  }
];

const commonRecord = {
  organization: 'TRAINING MOTOR POOL — fictional',
  equipment: 'Instructional wheeled vehicle — generic',
  identifier: 'TRAINING-01',
  date: '2026-01-15 (synthetic example)',
  odometer: '12,340 km (synthetic)',
  hours: '812 h (synthetic)'
};

const pendingAction = 'Reported to supervisor; no repair performed.';

function scenario(data) {
  const correction = data.mode === 'correction';
  return {
    ...data,
    mode: correction ? 'correction' : 'report',
    record: { ...commonRecord, ...data.record },
    expected: { ...data.expected, action: correction ? data.expected.action : pendingAction, initials: correction ? data.expected.initials : '' },
    steps: [
      { title: '1 · Match the record', body: `Confirm the synthetic identity, meter units, and ${data.record.tmReference}. In real work use the exact equipment TM and current worksheet; training cards are not real TM references.` },
      { title: '2 · Trace the inspection item', body: `Find ${data.expected.item} on the fictional training card. Copy that item reference; do not invent an official TM item or a system fault number.` },
      { title: '3 · Use the supplied status', body: `For this exercise the fictional supervisor has specified ${data.expected.status}. This is a scenario fact, not a universal status rule for this symptom. In real work apply the actual TM and authorized maintenance process.` },
      { title: '4 · Write the observation', body: `State the component, location, and observed condition. A clear example is: “${data.expected.fault}” Do not add measurements or a confirmed diagnosis you did not obtain.` },
      correction
        ? { title: '5 · Record actual work and verification', body: `Use only the completed-work facts supplied in this classroom exercise: ${data.completedWork} Verification: ${data.verification} ${data.closeout} A repair entry does not itself authorize dispatch, change status, or close an electronic record.` }
        : { title: '5 · Record the handoff honestly', body: 'The only action completed in the exercise is reporting the finding to the supervisor. Enter a pending-action note such as “Reported to supervisor; no repair performed.” On a real worksheet place pending notes where the current instructions require.' },
      correction
        ? { title: '6 · Attribute the supplied correction', body: `The exercise identifies the fictional authorized corrector as ${data.expected.initials}. Use those supplied classroom initials after recording the completed work and verification. In real work never sign for another person; this exercise does not grant correction or status-clearing authority.` }
        : { title: '6 · Keep correction approval separate', body: 'No repair or authorized correction verification has occurred. Leave correction initials blank. Reporting a fault does not entitle the reporter to sign a completed correction.' }
    ],
    hints: {
      item: `The training card gives ${data.expected.item}. This is a fictional inspection reference.`,
      status: `The fictional supervisor has assigned ${data.expected.status}; use that supplied value.`,
      fault: `Include: ${data.rubric.map(rule => rule.label).join('; ')}.`,
      action: correction ? `Include: ${data.actionRubric.map(rule => rule.label).join('; ')}. Use only the supplied facts.` : 'State that the supervisor was notified and that no repair was performed or that maintenance evaluation is pending.',
      initials: correction ? `The fictional authorized corrector is ${data.expected.initials}; use only those supplied classroom initials.` : 'Leave this empty: no authorized correction has been completed.'
    }
  };
}

export const formScenarios = [
  scenario({
    id: 'tire-cut', title: 'Before PMCS · tire sidewall finding', formType: '2404',
    brief: 'On TRAINING CARD A, item T-A01 covers the tire visual check. A fictional supervisor has already assigned X for this scenario. You report the finding; no repair is performed.',
    record: { tmReference: 'TRAINING CARD A — fictional, not a TM', inspectionType: 'Before-operation PMCS (training)' },
    observation: 'You see a cut in the sidewall of the right rear tire. You have not measured its depth or determined whether the tire is repairable.',
    expected: { item: 'T-A01', status: 'X', fault: 'Right rear tire sidewall has a visible cut.' },
    rubric: [
      { label: 'right side', patterns: ['\\bright\\b'] },
      { label: 'rear location', patterns: ['\\brear\\b'] },
      { label: 'tire sidewall', patterns: ['\\b(?:tire|tyre)\\b'], also: ['\\bsidewall\\b', '\\bside wall\\b'] },
      { label: 'visible cut', patterns: ['\\b(?:cut|gash|split)\\b'] }
    ],
    contradictions: ['\\bleft\\b', '\\bfront\\b', '\\b(?:no|without)\\s+(?:visible\\s+)?(?:cut|gash|split)\\b']
  }),
  scenario({
    id: 'lamp-lens', title: 'New 5988-E finding · lamp lens', formType: '5988',
    brief: 'No matching open fault appears on the fictional worksheet. TRAINING CARD B identifies item T-B02. The fictional supervisor supplies / for this exercise after applying the scenario criteria. You do not infer real-world serviceability from that example.',
    record: { tmReference: 'TRAINING CARD B — fictional, not a TM', inspectionType: 'Before-operation PMCS (training)' },
    observation: 'The right rear lamp lens is cracked. You have not conducted an electrical test and cannot claim that the entire lighting system works.',
    expected: { item: 'T-B02', status: '/', fault: 'Right rear lamp lens is cracked.' },
    rubric: [
      { label: 'right rear location', patterns: ['\\bright\\b'], also: ['\\brear\\b'] },
      { label: 'lamp or light lens', patterns: ['\\b(?:lamp|light|taillight|tail light)\\b'], also: ['\\blens\\b'] },
      { label: 'cracked condition', patterns: ['\\bcrack(?:ed|s)?\\b'] }
    ],
    contradictions: ['\\bleft\\b', '\\bfront\\b', '\\b(?:no|without)\\s+(?:visible\\s+)?cracks?\\b', '\\bnot\\s+cracked\\b']
  }),
  scenario({
    id: 'fluid-drips', title: 'After PMCS · observed fluid loss', formType: '2404',
    brief: 'TRAINING CARD A identifies T-A03. The fictional supervisor has assigned X for this condition. The course does not assign real equipment status from leak class alone.',
    record: { tmReference: 'TRAINING CARD A — fictional, not a TM', inspectionType: 'After-operation PMCS (training)' },
    observation: 'While safely standing beside the parked vehicle, you see fluid drops falling from the area of the left front hose connection. The fluid type and failed part have not been confirmed. You do not go underneath unsupported equipment.',
    expected: { item: 'T-A03', status: 'X', fault: 'Fluid drops are falling from the area of the left front hose connection; fluid type not confirmed.' },
    rubric: [
      { label: 'left front location', patterns: ['\\bleft\\b'], also: ['\\bfront\\b'] },
      { label: 'hose connection area', patterns: ['\\bhose\\b'], also: ['\\b(?:connection|fitting|joint)\\b'] },
      { label: 'fluid drops falling or dripping', patterns: ['\\b(?:fluid|liquid)\\b'], also: ['\\b(?:fall(?:ing)?|drip(?:ping|s)?)\\b'] }
    ],
    contradictions: ['\\bright\\b', '\\brear\\b', '\\b(?:no|without)\\s+(?:fluid\\s+)?(?:leak|drops|drips)\\b', '\\b(?:brake|fuel|coolant|oil)\\s+(?:pump|line|hose)\\s+(?:has\\s+)?failed\\b']
  }),
  scenario({
    id: 'inspection-due', title: 'Scheduled task · inspection not recorded', formType: '5988',
    brief: 'The fictional supervisor checked the schedule and records and confirmed that the required inspection is overdue and has not been performed. TRAINING CARD B identifies T-B04, and the supervisor supplies the dash (-) status. No vehicle-specific interval is taught here.',
    record: { tmReference: 'TRAINING CARD B — fictional, not a TM', inspectionType: 'Scheduled-inspection record review (training)' },
    observation: 'The scheduled inspection for the battery hold-down has not been performed when due. This is a missed inspection, not evidence that the battery hold-down is physically broken.',
    expected: { item: 'T-B04', status: '-', fault: 'Required battery hold-down inspection is overdue and has not been performed.' },
    rubric: [
      { label: 'battery hold-down', patterns: ['\\bbattery\\b'], also: ['\\bhold[ -]?down\\b'] },
      { label: 'inspection', patterns: ['\\binspection\\b'] },
      { label: 'overdue or not performed when due', patterns: ['\\boverdue\\b', '\\bnot\\s+(?:been\\s+)?(?:performed|completed|done)\\b', '\\bmissed\\b'] }
    ],
    contradictions: ['\\b(?:is|was|has been)\\s+(?:already\\s+)?completed\\b', '\\b(?:broken|cracked|missing)\\s+(?:battery\\s+)?hold[ -]?down\\b']
  }),
  scenario({
    id: 'seat-cover', title: 'Cab check · describe the observed condition', formType: '2404',
    brief: 'TRAINING CARD A identifies T-A05. The fictional supervisor has assigned / for the specific training condition. A torn cover alone does not establish the condition of the seat structure or restraint.',
    record: { tmReference: 'TRAINING CARD A — fictional, not a TM', inspectionType: 'Before-operation PMCS (training)' },
    observation: 'The driver seat cushion cover is torn. You did not find or verify a fault in the seat frame or restraint and must not invent one.',
    expected: { item: 'T-A05', status: '/', fault: 'Driver seat cushion cover is torn.' },
    rubric: [
      { label: 'driver seat', patterns: ['\\bdriver(?:[’\']s)?\\b'], also: ['\\bseat\\b'] },
      { label: 'cushion cover', patterns: ['\\bcushion\\b'], also: ['\\bcover\\b', '\\bupholstery\\b'] },
      { label: 'torn condition', patterns: ['\\b(?:torn|tear|ripped|rip)\\b'] }
    ],
    contradictions: ['\\bpassenger\\b', '\\b(?:no|without)\\s+(?:visible\\s+)?(?:tear|rip)\\b', '\\bnot\\s+torn\\b', '\\b(?:frame|restraint)\\s+(?:is\\s+)?(?:broken|failed)\\b']
  }),
  scenario({
    id: 'mirror-housing', title: '5988-E handoff · avoid a false completion', formType: '5988',
    brief: 'TRAINING CARD B identifies T-B06. This finding is distinct from the existing fictional left-side mirror fault. The supervisor supplies / for the exercise. No replacement or verification has happened.',
    record: { tmReference: 'TRAINING CARD B — fictional, not a TM', inspectionType: 'After-operation PMCS (training)' },
    observation: 'The right exterior mirror housing is cracked. The observed crack is in the housing, not the glass. Report this precise finding without writing that a replacement was installed.',
    expected: { item: 'T-B06', status: '/', fault: 'Right exterior mirror housing is cracked.' },
    rubric: [
      { label: 'right exterior location', patterns: ['\\bright\\b'], also: ['\\b(?:exterior|outside|external)\\b'] },
      { label: 'mirror housing', patterns: ['\\bmirror\\b'], also: ['\\bhousing\\b', '\\bcasing\\b'] },
      { label: 'cracked condition', patterns: ['\\bcrack(?:ed|s)?\\b'] }
    ],
    contradictions: ['\\bleft\\b', '\\bglass\\s+(?:is\\s+)?cracked\\b', '\\bnot\\s+cracked\\b', '\\b(?:no|without)\\s+(?:visible\\s+)?cracks?\\b']
  }),
  scenario({
    id: 'lens-correction', title: '2404 correction writing · completed lens replacement', formType: '2404', mode: 'correction',
    brief: 'Classroom documentation exercise: TRAINING CARD C supplies item T-C07 and the original fault-row status /. A fictional authorized maintainer, initials TR, has already completed the described work and verification. Write that supplied history; do not perform a repair or infer a status change. TR is fictional and must never be copied into a real record.',
    record: { tmReference: 'TRAINING CARD C — fictional, not a TM', inspectionType: 'Correction documentation from supplied facts (training)' },
    observation: 'Original recorded finding: the right rear lamp lens was cracked. Keep the original fault description; the separate correction entry records what was done about it.',
    completedWork: 'TR replaced the right rear lamp lens following the fictional task in TRAINING CARD C.',
    verification: 'The authorized inspection confirmed secure installation and correct lamp function under the fictional training procedure.',
    closeout: 'No road test, vehicle-wide serviceability determination, dispatch approval, or status-clearing action is supplied.',
    expected: { item: 'T-C07', status: '/', fault: 'Right rear lamp lens is cracked.', action: 'Replaced right rear lamp lens per TRAINING CARD C; authorized inspection verified secure installation and correct lamp function.', initials: 'TR' },
    rubric: [
      { label: 'right rear location', patterns: ['\\bright\\b'], also: ['\\brear\\b'] },
      { label: 'lamp lens', patterns: ['\\b(?:lamp|light|taillight|tail light)\\b'], also: ['\\blens\\b'] },
      { label: 'original cracked condition', patterns: ['\\bcrack(?:ed|s)?\\b'] }
    ],
    contradictions: ['\\bleft\\b', '\\bfront\\b', '\\bnot\\s+cracked\\b'],
    actionRubric: [
      { label: 'completed lens replacement', patterns: ['\\b(?:replaced|replacement completed|installed)\\b'], also: ['\\blens\\b'] },
      { label: 'right rear lamp location', patterns: ['\\bright\\b'], also: ['\\brear\\b'] },
      { label: 'TRAINING CARD C reference', patterns: ['\\btraining card c\\b'] },
      { label: 'verification of secure installation', patterns: ['\\b(?:verified|confirmed|checked)\\b'], also: ['\\bsecur(?:e|ely|ity)\\b'] },
      { label: 'verified lamp function', patterns: ['\\b(?:lamp|light)\\b'], also: ['\\b(?:function|operation|operates|works)\\b'] }
    ],
    actionContradictions: ['\\bleft\\b', '\\bfront\\b', '\\b(?:no|not)\\s+(?:repair|replacement|verification|inspection)\\b', '\\b(?:not|never)\\s+(?:replaced|installed|verified|confirmed|checked)\\b', '\\b(?:verification|inspection|replacement|repair)\\s+(?:is\\s+)?pending\\b', '\\b(?:bulb|wiring|harness)\\s+(?:was\\s+)?replaced\\b', '\\breplaced\\s+(?:the\\s+)?(?:bulb|wiring|harness)\\b']
  }),
  scenario({
    id: 'mirror-correction', title: '5988-E correction writing · system update still pending', formType: '5988', mode: 'correction',
    brief: 'Classroom documentation exercise: existing fictional record TRAINING-FAULT-08 concerns the right exterior mirror housing. TRAINING CARD D supplies item T-D08 and original fault-row status /. Fictional authorized corrector TR completed the supplied work and verification. Maintenance control has not reconciled the electronic record. TR is a fictional exercise identity, not permission to sign for a real maintainer.',
    record: { tmReference: 'TRAINING CARD D — fictional, not a TM', inspectionType: 'Existing-fault correction documentation (training)' },
    observation: 'Original recorded finding: the right exterior mirror housing was cracked. Preserve that finding and its relationship to the existing record; do not create a new fault merely to document its correction.',
    completedWork: 'TR replaced the right exterior mirror housing following the fictional task in TRAINING CARD D.',
    verification: 'The authorized check verified secure installation and mirror adjustment under the fictional training procedure.',
    closeout: 'The maintenance-control system update is pending. Do not claim that the electronic fault is closed, the record is reconciled, status is cleared, or the vehicle is released to operate.',
    expected: { item: 'T-D08', status: '/', fault: 'Right exterior mirror housing is cracked.', action: 'Replaced right exterior mirror housing per TRAINING CARD D; secure installation and mirror adjustment verified. Maintenance-control system update pending.', initials: 'TR' },
    rubric: [
      { label: 'right exterior location', patterns: ['\\bright\\b'], also: ['\\b(?:exterior|outside|external)\\b'] },
      { label: 'mirror housing', patterns: ['\\bmirror\\b'], also: ['\\b(?:housing|casing)\\b'] },
      { label: 'original cracked condition', patterns: ['\\bcrack(?:ed|s)?\\b'] }
    ],
    contradictions: ['\\bleft\\b', '\\bglass\\s+(?:is\\s+)?cracked\\b', '\\bnot\\s+cracked\\b'],
    actionRubric: [
      { label: 'completed mirror housing replacement', patterns: ['\\b(?:replaced|replacement completed|installed)\\b'], also: ['\\b(?:housing|casing)\\b'] },
      { label: 'right exterior mirror location', patterns: ['\\bright\\b'], also: ['\\b(?:exterior|outside|external)\\b'] },
      { label: 'TRAINING CARD D reference', patterns: ['\\btraining card d\\b'] },
      { label: 'verification of secure installation', patterns: ['\\b(?:verified|confirmed|checked)\\b'], also: ['\\bsecur(?:e|ely|ity)\\b'] },
      { label: 'mirror adjustment check', patterns: ['\\bmirror\\b'], also: ['\\badjustment\\b'] },
      { label: 'electronic/system record update still pending', patterns: ['\\b(?:system|electronic|maintenance[ -]control)\\b'], also: ['\\bpending\\b', '\\bnot (?:yet )?(?:updated|reconciled|closed)\\b'] }
    ],
    actionContradictions: ['\\bleft\\b', '\\b(?:no|not)\\s+(?:repair|replacement|verification|inspection)\\b', '\\b(?:not|never)\\s+(?:replaced|installed|verified|confirmed|checked)\\b', '\\b(?:verification|inspection|replacement|repair)\\s+(?:is\\s+)?pending\\b', '\\b(?:glass|bracket)\\s+(?:was\\s+)?replaced\\b', '\\breplaced\\s+(?:the\\s+)?(?:glass|bracket)\\b']
  })
];

const matchesAny = (text, patterns = []) => patterns.some(pattern => new RegExp(pattern, 'i').test(text));
const read = (values, name) => typeof values?.[name] === 'string' ? values[name].trim() : '';

/**
 * A transparent practice rubric, not natural-language verification or approval.
 * Only this course's synthetic scenario objects are accepted. No entered text is
 * evaluated as code, sent to a server, or interpreted as an authorized sign-off.
 */
export function evaluateForm(inputScenario, values = {}) {
  const active = formScenarios.find(item => item === inputScenario || item.id === inputScenario?.id);
  if (!active) throw new TypeError('Choose a known training scenario.');
  const item = read(values, 'item');
  const status = read(values, 'status');
  const fault = read(values, 'fault');
  const action = read(values, 'action');
  const initials = read(values, 'initials');
  const missing = active.rubric.filter(rule => !matchesAny(fault, rule.patterns) || (rule.also && !matchesAny(fault, rule.also)));
  const contradiction = matchesAny(fault, active.contradictions);
  const correction = active.mode === 'correction';
  // Ignore simple, explicit negations when looking for an unsupported positive
  // completion claim. This remains a disclosed key-detail rubric, not an NLP
  // verifier: a qualified person must review real maintenance documentation.
  const actionClaims = action.replace(/\b(?:not|never)\s+(?:(?:yet|been)\s+)?(?:repaired|replaced|fixed|installed|changed|completed|approved|released|returned|cleared|closed|reconciled|updated|serviceable)\b/gi, '[explicitly not completed]');
  const unsupportedRelease = /\b(?:approved|released|cleared)\s+(?:(?:the\s+)?vehicle\s+)?(?:for|to)\s+(?:operate|operation|use|dispatch|service)\b|\b(?:ready|safe)\s+(?:for|to)\s+(?:drive|operate|use|dispatch|operation)\b|\breturned?\s+to\s+service\b|\b(?:vehicle|equipment)\s+(?:is\s+)?serviceable\b|\bstatus\s+(?:(?:is|was)\s+)?(?:cleared|removed)\b|\bcleared\s+(?:the\s+)?status\b/i.test(actionClaims);
  const unsupportedClosure = /\b(?:closed|reconciled|updated)\s+(?:the\s+)?(?:electronic|system|fault|record)\b|\b(?:fault|record|system)\s+(?:(?:is|was|now)\s+|has\s+been\s+)?(?:closed|reconciled|updated)\b/i.test(actionClaims);
  const claimedCorrection = /\b(?:repaired|replaced|fixed|installed|changed|cleared|serviceable|signed\s+off)\b|\brepairs?\s+(?:(?:is|are)\s+)?(?:complete|completed)\b/i.test(actionClaims);
  const reported = /\b(?:reported|notified|informed|advised)\b/i.test(action) && /\b(?:supervisor|maintenance\s+(?:supervisor|control))\b/i.test(action) && !/\b(?:not|never)\s+(?:reported|notified|informed|advised)\b/i.test(action);
  const pending = /\bno\s+(?:repairs?|corrective\s+work)\s+(?:(?:was|were|has\s+been|have\s+been)\s+)?(?:performed|completed|done|conducted)\b|\brepairs?\s+(?:(?:is|are)\s+)?pending\b|\bawaiting\s+(?:authorized\s+)?(?:evaluation|inspection|maintenance)\b|\bnot\s+(?:yet\s+)?repaired\b/i.test(action);
  const missingAction = (active.actionRubric || []).filter(rule => !matchesAny(action, rule.patterns) || (rule.also && !matchesAny(action, rule.also)));
  const contradictoryAction = matchesAny(action, active.actionContradictions);
  let actionOk;
  let actionMessage;
  if (action.length > 1600) {
    actionOk = false; actionMessage = 'Keep the action entry under 1,600 characters.';
  } else if (unsupportedRelease || unsupportedClosure) {
    actionOk = false; actionMessage = 'The supplied facts do not include a release to operate, status clearing, or electronic-record closure. Remove that unsupported completion or approval claim.';
  } else if (correction) {
    actionOk = missingAction.length === 0 && !contradictoryAction;
    actionMessage = contradictoryAction
      ? 'The action contradicts the supplied work, location, verification, or pending tasks. Record only the completed-work facts in this exercise.'
      : missingAction.length
        ? `Add the supplied correction detail: ${missingAction.map(rule => rule.label).join('; ')}.`
        : 'The entry includes the supplied completed work and verification, with no status clearing or system closure inferred. This is classroom documentation, not a real correction certification.';
  } else {
    actionOk = reported && pending && !claimedCorrection;
    actionMessage = claimedCorrection
      ? 'No repair, installation, status clearing, or release occurred. Record the reported finding and pending work without claiming a completed correction.'
      : !reported || !pending
        ? 'State both parts of the handoff: the supervisor was notified, and no repair was performed or evaluation remains pending.'
        : 'The note records the actual handoff and keeps pending maintenance separate from completed work.';
  }
  const correctInitials = initials === active.expected.initials;
  const checks = [
    { field: 'item', ok: item.toUpperCase() === active.expected.item, message: item.toUpperCase() === active.expected.item ? 'The fictional inspection item matches the training card.' : `Use ${active.expected.item}, the item supplied by the training card. A PMCS item is not a system fault identifier.` },
    { field: 'status', ok: status === active.expected.status, message: status === active.expected.status ? 'The status matches the fictional supervisor’s instruction. This example is not a real equipment status determination.' : `The fictional supervisor supplied ${active.expected.status}. Apply that scenario instruction; do not infer a universal status from the symptom.` },
    { field: 'fault', ok: fault.length <= 1600 && missing.length === 0 && !contradiction, message: contradiction ? 'The entry contradicts the scenario’s location, observed condition, or limits of what was checked. Describe only the supplied finding.' : fault.length > 1600 ? 'Keep the fault concise: this practice field allows 1,600 characters.' : missing.length ? `Add the observed detail: ${missing.map(rule => rule.label).join('; ')}.` : 'The component, location, and observed condition are present. This rule-based coach checks key details; a qualified reviewer still evaluates a real record.' },
    { field: 'action', ok: actionOk, message: actionMessage },
    { field: 'initials', ok: correctInitials, message: correction ? (correctInitials ? 'The initials match the fictional authorized corrector supplied by the exercise. They are not a real signature or permission to sign for someone else.' : `Use only ${active.expected.initials}, the fictional corrector supplied for this exercise, after documenting the supplied work and verification.`) : (correctInitials ? 'Correct: no correction initials are entered because no authorized correction has occurred.' : 'Leave correction initials blank. The person reporting a fault cannot sign for an unperformed or unverified repair.') }
  ];
  return { checks, passed: checks.every(check => check.ok) };
}
