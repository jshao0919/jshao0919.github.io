/** Original common-PMCS training. Vehicle procedures and current forms instructions control actual work. */
export const lessons = [
  {
    id: 'roles', title: 'Start with the vehicle and its manual', eyebrow: '01 · Foundation', minutes: 20,
    summary: 'Understand what a 91B does, where PMCS fits, and how to find the instruction that applies to the vehicle in front of you.',
    objectives: ['Separate operator checks from maintainer work and release authority.', 'Match equipment identity to the correct technical publication.', 'Read a PMCS table without confusing a check with a rejection criterion.'],
    sections: [
      {
        title: 'What PMCS accomplishes',
        body: 'Preventive maintenance checks and services (PMCS) are organized inspections and services used to find problems early, preserve equipment, and document its condition. A check asks you to look, listen, measure, or verify something. A service directs an action such as lubrication or replacement when the publication authorizes it. A quick walk around is useful, but it is not automatically a complete PMCS. The applicable technical manual (TM) tells you what work is required and when.',
        steps: ['Identify the vehicle and the inspection interval you are performing.', 'Use the applicable PMCS table in its stated order.', 'Perform each authorized check using its instructions and precautions.', 'Record findings that require documentation and report conditions that prevent safe completion.'],
        example: 'Seeing that a tire is present does not complete a tire check. The TM may require condition, inflation, wheel hardware, and other observations using specified methods.'
      },
      {
        title: 'Operator, maintainer, and supervisor roles',
        body: 'An operator conducts the checks and services assigned to the operator and reports faults. A 91B wheeled vehicle mechanic inspects, troubleshoots, repairs, and services equipment within training, authorization, and the maintenance allocation. A supervisor coordinates work, reviews documentation, and applies the relevant maintenance controls. A dispatch or release decision belongs to the designated authority. Finding a problem does not automatically authorize a repair, a status change, or operation of the vehicle.',
        steps: ['Read who the procedure is written for and what maintenance level it assigns.', 'Check that required training, tools, and authorization are available.', 'Refer work outside your assignment to the appropriate maintainer or supervisor.', 'Treat completion of a repair and authorization to operate as separate decisions.']
      },
      {
        title: 'Identify the equipment before opening a procedure',
        body: 'A family name or familiar appearance may not identify the exact configuration. Model, serial or registration identifiers, installed equipment, and applicable modifications can change the instruction. Use equipment records and identification plates according to local procedure. Do not infer an exact model from a generic drawing in this course. The truck in the demonstrations is an illustration, not a vehicle-specific maintenance reference.',
        steps: ['Read the equipment identification required by your work package or record.', 'Match the model and configuration to the publication applicability statement.', 'Check publication date, changes, warnings, and relevant supplemental instructions.', 'If identity or applicability is uncertain, resolve that uncertainty before performing the procedure.']
      },
      {
        title: 'Read the whole PMCS entry',
        body: 'PMCS tables commonly separate an item number, interval, location or item to check, procedure, and a column describing conditions under which equipment is not ready or available. Titles vary by manual. Read across the entire row, including notes and references. An item number is a navigation aid: it is not a vehicle fault code or a universal reference shared by every TM.',
        steps: ['Locate the interval and the item in the correct table.', 'Read warnings, cautions, and notes before starting.', 'Follow the procedure and any referenced work package.', 'Compare the actual observation with the applicable criteria.', 'Record the correct reference and observation; escalate uncertainty instead of inventing a limit.'],
        example: '“Inspect for leaks” tells you what to observe. The associated criteria and fluid-system instructions determine what the finding means for that vehicle.'
      },
      {
        title: 'Prepare a reference trail',
        body: 'A useful record lets another person find the instruction you used. Keep the publication identifier, applicable change information, and relevant table, work package, or item available. Use the exact reference format required by the form and local process. This course supplies general examples and links to publication discovery pages; it does not verify the currently effective edition of every Army publication.',
        steps: ['Obtain the authorized current publication through your unit’s publication process.', 'Keep the relevant instruction available at the job, rather than relying on memory.', 'Record the required publication identification accurately.', 'When the form and the TM appear inconsistent, ask the maintenance supervisor to resolve the conflict.']
      }
    ],
    takeaways: ['The applicable vehicle TM supplies the actual procedure and limits.', 'A mechanic’s skill does not replace authorization or maintenance allocation.', 'Read every PMCS row as a complete instruction, including its criteria.'],
    references: ['tm', 'ar-750-1', 'da-pam-750-1']
  },
  {
    id: 'safe-setup', title: 'Set up a safe inspection', eyebrow: '02 · Work preparation', minutes: 25,
    summary: 'Prepare the vehicle, work area, people, and tools before reaching into a system or moving the vehicle.',
    objectives: ['Recognize stored energy and movement hazards.', 'Use the procedure to choose the safe vehicle state.', 'Explain when to stop an inspection and obtain help.'],
    sections: [
      {
        title: 'Start with a work-area scan',
        body: 'Before touching the vehicle, look at the ground, surrounding traffic, overhead space, ventilation, lighting, and escape routes. Loose tools, oil, water, and poor lighting can turn a routine check into an injury. Keep other people out of the immediate work area when the procedure requires it. Select protective equipment for the actual task and exposure; gloves alone do not protect against every chemical, rotating component, or electrical hazard.',
        steps: ['Identify the work area and control traffic or pedestrian access as required.', 'Check lighting, footing, ventilation, and the location of emergency equipment.', 'Remove or report hazards that can be corrected safely.', 'Gather task-appropriate protective equipment and inspect it.', 'Tell the responsible person what work you are beginning.']
      },
      {
        title: 'Establish the required vehicle state',
        body: 'The safe state depends on the check. Some checks require the engine off and the system cool; others require a controlled operating check by authorized personnel. Never assume that parking alone removes all energy. A vehicle can roll, a raised component can fall, a system can retain pressure, and electrical circuits can remain energized. Follow the TM and applicable energy-control procedure for the specific task.',
        steps: ['Read the procedure’s initial setup and warnings.', 'Secure the vehicle against movement as instructed.', 'Control ignition, electrical power, pressure, and other energy sources as required.', 'Verify the specified safe condition before beginning hands-on work.', 'Restore power or movement only through the prescribed sequence and communication.'],
        example: 'An engine-off visual inspection and an engine-running observation have different boundaries. Do not carry an engine-off hand placement into a running check.'
      },
      {
        title: 'Respect heat, pressure, and moving parts',
        body: 'Hot coolant, oil, exhaust surfaces, and pressurized systems can cause serious injury. Do not loosen a hot cooling-system cap, open a line to “see if it has pressure,” or search for a pressurized leak with your hand. Keep clothing, hair, jewelry, and tools clear of fans, belts, shafts, and other moving parts. Some components can start or move unexpectedly. Use the inspection method and tools the procedure specifies.',
        steps: ['Identify heat, pressure, rotation, and automatic movement hazards before approaching.', 'Wait for or establish the conditions specified by the procedure.', 'Use an approved observation position; do not defeat guards.', 'Stop if an unexpected spray, movement, smell, or temperature condition appears.', 'Report suspected injection or other serious injury immediately through emergency procedures.']
      },
      {
        title: 'Lifting, wheels, and stored mechanical energy',
        body: 'A jack is a lifting device, not a substitute for the specified support arrangement. Never go beneath an unsupported vehicle or raised load. Wheels and tires can contain substantial stored energy, and some assemblies require specialized training and equipment. Springs, raised bodies, and other mechanisms also store energy. This course teaches recognition and reporting; it does not provide a lifting, tire-disassembly, or suspension-disassembly procedure.',
        steps: ['Identify whether the task requires lifting or work beneath a raised component.', 'Verify that an authorized procedure, correct equipment, and trained personnel are available.', 'Use designated lifting and support points only as the TM directs.', 'Keep clear until the required support and energy controls have been verified.', 'Refer specialized wheel, tire, and spring work to qualified personnel.']
      },
      {
        title: 'Use a stop-and-report decision',
        body: 'Stopping is the correct action when the procedure cannot be followed safely, required equipment is unavailable, or a condition may prevent safe operation. First protect people and prevent further exposure. Then identify the vehicle, describe what you observed, and notify the responsible person. Do not make an uncertain situation “fit” the checklist by checking a box or entering a guessed result.',
        steps: ['Pause the task without creating an additional hazard.', 'Secure the immediate area using the applicable procedure.', 'Notify the supervisor or other designated authority.', 'Record what was found and which check could not be completed.', 'Resume only after the issue is resolved and the work is authorized.']
      }
    ],
    takeaways: ['Choose the vehicle state from the procedure, not habit.', 'An engine-off vehicle may still contain pressure, heat, electricity, or stored mechanical energy.', 'A check that cannot be completed safely must be reported accurately.'],
    references: ['tm', 'da-pam-750-1']
  },
  {
    id: 'before-operation', title: 'Before-operation PMCS: build a repeatable walkaround', eyebrow: '03 · Inspection sequence', minutes: 30,
    summary: 'Follow a consistent inspection route while using the correct manual, not a memorized generic checklist.',
    objectives: ['Prepare records and inspect the vehicle systematically.', 'Distinguish an observation from a diagnosis.', 'Document incomplete checks and conditions requiring review.'],
    sections: [
      {
        title: 'Review the record before inspecting',
        body: 'A maintenance worksheet gives context: existing faults, open work, and equipment identification may already be recorded. Review it with the appropriate person before starting. An existing entry does not excuse you from checking the condition, and an empty fault section does not prove the vehicle is serviceable. Verify what work or limitations are currently applicable through the authorized maintenance process.',
        steps: ['Confirm the worksheet belongs to the vehicle in front of you.', 'Review open faults and any applicable restrictions with the responsible person.', 'Identify the before-operation PMCS instructions and required materials.', 'Resolve conflicting identity or status information before continuing.', 'Set up the vehicle safely for the first check.']
      },
      {
        title: 'Use a route to prevent omissions',
        body: 'A consistent route helps you notice changes and avoid checking the same item twice while missing another. The TM’s order controls; the course’s front, side, rear, cab, and underbody zones are only a learning aid. Pause at each item, observe it deliberately, and record the result before moving on. Do not crawl into an unsafe location just to match the illustration.',
        steps: ['Locate the first PMCS item and establish a safe viewing position.', 'Inspect that item using the required method.', 'Check the associated criteria and note any fault.', 'Move to the next item in the table.', 'At the end, review the table for missed or incomplete items.'],
        example: 'You observe a wet area near the left rear of a vehicle. Record the location and appearance, then use the TM to determine the authorized next check. Do not immediately label it a failed axle seal.'
      },
      {
        title: 'Exterior and ground observations',
        body: 'Before starting the vehicle, inspect the surrounding ground and visible exterior components as directed. New puddles, disturbed hardware, damaged lenses, unsecured panels, or a change in stance can prompt closer attention. A stain on the ground may belong to a previous vehicle; a dry ground surface does not rule out a leak that occurs only during operation. Record evidence with enough location and context for a maintainer to investigate.',
        steps: ['Observe the ground without walking through an unknown spill.', 'Check visible body, lighting, access-panel, and mounting conditions required by the TM.', 'Inspect tires, wheels, and accessible suspension items from safe positions.', 'Note new or changed conditions relative to existing records.', 'Use the specific procedure before opening panels or checking fluids.']
      },
      {
        title: 'Cab and required operating checks',
        body: 'Inspect the cab, restraints, visibility, controls, and instruments according to the applicable instructions. Confirm that loose items are secured. If the TM requires a start or operating check, complete its prerequisites and use the required ventilation, clearance, and personnel. A dashboard lamp turning off does not establish that every related component is serviceable; the full check still matters.',
        steps: ['Inspect access, seating, restraints, and required visibility items.', 'Identify controls and required indicators before use.', 'Complete the TM’s prerequisites for any start or functional check.', 'Observe the specified indication or response and compare it with the criteria.', 'Stop and report an abnormal condition using the applicable procedure.']
      },
      {
        title: 'Close the inspection loop',
        body: 'The last step is a review, not an assumption that the vehicle may move. Confirm which checks were completed, which faults were recorded, and what needs supervisor or maintenance review. The person authorized to determine status or dispatch uses the applicable records and criteria. Never represent an unperformed check as complete because the vehicle is needed.',
        steps: ['Reconcile your notes with the worksheet.', 'Ensure each fault has an accurate location, observation, and required reference.', 'Identify checks that could not be completed and why.', 'Report any condition requiring immediate review.', 'Obtain the required review or dispatch action before operation.']
      }
    ],
    takeaways: ['A repeatable route supports the TM; it does not replace the TM.', 'Review existing faults and report changes.', 'Completing a walkaround is separate from authorizing operation.'],
    references: ['tm', 'da-pam-750-8', 'dispatch']
  },
  {
    id: 'during-after', title: 'During and after operation: notice, stop, and follow through', eyebrow: '04 · Operating observations', minutes: 25,
    summary: 'Observe vehicle behavior safely, record useful context, and complete the required checks after use.',
    objectives: ['Monitor required indications without distracting the operator.', 'Describe an abnormal event with useful operating context.', 'Complete after-operation records and handoff.'],
    sections: [
      {
        title: 'During-operation PMCS is continuous attention',
        body: 'During-operation checks focus on required indications and vehicle behavior while the vehicle is being used. Examples include instrument indications, unusual noise, vibration, steering response, and braking behavior when the applicable procedure calls for those observations. They do not justify unsafe experiments. The operator must maintain safe control and attention; record detailed notes only when it is safe to do so.',
        steps: ['Know the required indications and operating precautions before moving.', 'Observe the items specified by the TM during normal authorized use.', 'Recognize a change from the expected condition.', 'Follow the TM and operating procedure if an abnormal indication appears.', 'Record the event once the vehicle and people are safe.']
      },
      {
        title: 'Respond to an abnormal indication',
        body: 'An unexpected warning, smoke, smell, loss of response, or unusual vibration requires a deliberate response. Do not continue simply to see whether it becomes worse. Use the vehicle’s published response procedure and the local emergency or recovery process as applicable. This course does not prescribe a universal shutdown sequence because the safe action depends on the system and situation.',
        steps: ['Maintain control and use the applicable immediate-action procedure.', 'Bring the vehicle and work area to the required safe condition.', 'Notify the responsible person and identify the vehicle.', 'Describe the indication and circumstances without guessing a failed component.', 'Do not resume operation until the required evaluation and authorization are complete.']
      },
      {
        title: 'Capture the context a mechanic needs',
        body: 'A fault that occurs only under certain conditions can be difficult to reproduce. Useful context includes when it began, what the vehicle was doing, which indication changed, and whether the condition continued after stopping. Record available readings accurately with units. Do not invent a number from memory, deliberately recreate a hazardous event, or state that a component failed when you only observed a symptom.',
        steps: ['Record the date and the relevant meter reading through the required process.', 'Name the location, indicator, or function involved.', 'State the operating condition in ordinary language.', 'Record the observed effect and any action taken.', 'Tell the maintainer what is uncertain or was not observed.'],
        example: 'Useful: “During normal operation, an intermittent squeal was heard near the engine compartment; source not determined. Reported to maintenance.” This is more informative than “engine bad,” without claiming an unverified cause.'
      },
      {
        title: 'After-operation PMCS has its own instructions',
        body: 'After use, some conditions are easier to notice, and the vehicle needs to be prepared for its next use. Follow the after-operation table rather than repeating only the checks you remember from the morning. Some observations require a particular temperature, waiting period, or vehicle state; those conditions come from the TM. Do not open hot or pressurized components simply because the vehicle has been parked.',
        steps: ['Secure the vehicle and establish the state required by the procedure.', 'Perform the after-operation PMCS items in their specified order.', 'Inspect for new damage, leaks, or loose items as directed.', 'Perform only authorized replenishment, cleaning, or other services.', 'Complete the record and report unresolved or new faults.']
      },
      {
        title: 'Make the handoff understandable',
        body: 'A useful handoff connects the observed condition, the record, and the next responsible person. Explain what happened, what was checked, what remains uncertain, and whether the vehicle has been referred for review. Do not rely on a verbal comment that never reaches the worksheet or maintenance process. The next operator needs the current record, not an informal promise that a problem will be fixed later.',
        steps: ['Confirm that all required observations and meter information were entered.', 'Point out new or changed faults to the responsible person.', 'Identify any checks or corrective actions still incomplete.', 'Follow the unit’s record-routing and vehicle-securing process.', 'Verify that the handoff was received.']
      }
    ],
    takeaways: ['Monitor required indications without compromising safe operation.', 'Context helps troubleshooting; guesses make it harder.', 'After-operation checks and a documented handoff prepare the next user.'],
    references: ['tm', 'da-pam-750-8', 'dispatch']
  },
  {
    id: 'tires-wheels', title: 'Tires and wheels: inspect without creating a hazard', eyebrow: '05 · Common systems', minutes: 25,
    summary: 'Recognize common tire and wheel observations, use the proper inspection method, and leave specialized work to qualified personnel.',
    objectives: ['Describe tire damage and wheel concerns precisely.', 'Explain why pressure and torque values must come from the applicable procedure.', 'Recognize wheel-assembly stored-energy hazards.'],
    sections: [
      {
        title: 'Start with position and visible condition',
        body: 'Identify the exact wheel position using the vehicle’s terminology. Inspect the visible tread, sidewall, valve area, and surrounding components as the TM directs. Look for the kinds of damage and interference the procedure identifies. A tire that appears inflated can still be outside its specified condition or pressure. Do not reach into a tight or unsafe space to see the hidden side of a wheel.',
        steps: ['Secure the vehicle and choose a safe viewing position.', 'Identify the wheel position unambiguously.', 'Inspect the accessible surfaces using the required method.', 'Note the location and appearance of damage or contact.', 'Use the TM’s criteria to determine the required reporting or maintenance action.']
      },
      {
        title: 'Pressure is a measurement, not an estimate',
        body: 'The required tire pressure and measurement conditions depend on the tire, vehicle, configuration, and procedure. Use the specified gauge and method. A generic training value is not an acceptable substitute. A central tire inflation indication, if fitted, must be interpreted under that system’s instructions. Inflation or deflation is a separate action that requires authorization and the correct safe procedure.',
        steps: ['Find the correct pressure instruction for the installed assembly and use conditions.', 'Confirm the required measurement state and gauge suitability.', 'Measure only as the TM and your training permit.', 'Record the actual value and unit when required.', 'Report a discrepancy and use the authorized adjustment or repair process.']
      },
      {
        title: 'Wheel hardware and witness marks',
        body: 'Inspect accessible wheel hardware and related indicators as the TM specifies. Missing hardware, visible movement, unusual staining, damaged components, or a changed witness mark can require investigation. A witness mark is only evidence of relative movement; it does not prove that the assembly has the correct torque. Do not use an improvised tightening sequence or a remembered torque value.',
        steps: ['Observe the hardware without disturbing it during a visual check.', 'Compare the condition with the applicable inspection criteria.', 'Record which position and component is affected.', 'Refer required torque verification or repair to the authorized procedure and personnel.', 'Ensure corrective work is documented and checked as required.']
      },
      {
        title: 'Treat wheel assemblies as stored-energy systems',
        body: 'Tire and wheel assemblies can release energy violently. Damaged wheels, multi-piece assemblies, inflation work, and disassembly require specific training and equipment. Do not loosen assembly hardware, apply heat, or attempt an improvised repair. The safe response to a suspected dangerous assembly is to keep people clear and use the established maintenance process.',
        steps: ['Recognize that inspection does not authorize disassembly.', 'Do not approach or handle an assembly showing a condition identified as hazardous by the procedure.', 'Keep others away from the hazard as required.', 'Notify qualified personnel and explain the observation.', 'Follow the approved isolation, handling, and repair instructions.']
      },
      {
        title: 'Write a tire or wheel fault that can be found',
        body: 'A useful entry identifies the vehicle location, component, observed condition, and applicable inspection reference. Avoid “bad tire” or “wheel loose” unless looseness was actually established by an authorized check. A drawing or photograph may supplement the record if unit rules allow it, but it does not replace the required written entry.',
        steps: ['Name the exact wheel position.', 'State what you saw or measured.', 'Include the required PMCS item or technical reference.', 'Record any relevant measurement with its unit and method context.', 'Report the condition for status determination under the TM.'],
        example: 'Training wording: “Left front tire sidewall has visible damage near the outer shoulder; condition referred for evaluation against the applicable TM criteria.” Add actual measurements only if the procedure required and you performed them.'
      }
    ],
    takeaways: ['Vehicle-specific pressure and torque values come from the correct technical data.', 'Witness marks do not verify torque.', 'Do not turn a visual inspection into unauthorized tire or wheel work.'],
    references: ['tm', 'da-pam-750-1', 'da-pam-750-8']
  },
  {
    id: 'fluids-cooling', title: 'Fluids, leaks, and cooling systems', eyebrow: '06 · Common systems', minutes: 30,
    summary: 'Check fluids under the correct conditions, describe leakage accurately, and distinguish leak appearance from operating authority.',
    objectives: ['Use the proper conditions and method for a level check.', 'Distinguish Class I, II, and III leak appearance.', 'Explain why leak class alone cannot determine whether a vehicle may operate.'],
    sections: [
      {
        title: 'A level reading needs the right conditions',
        body: 'Fluid level depends on the system and inspection conditions. The TM may specify vehicle attitude, temperature, engine state, waiting time, and how to read a gauge or indicator. A reading taken under the wrong conditions can lead to overfilling or a missed problem. Identify the exact fill or check point before opening anything. Never use the course illustration to locate a real component.',
        steps: ['Identify the system and applicable level-check instruction.', 'Establish the specified vehicle, temperature, and engine conditions.', 'Observe warnings about heat, pressure, contamination, and moving parts.', 'Read the correct indicator using the required method.', 'Record or report the result and perform replenishment only if authorized.']
      },
      {
        title: 'Use only the specified product and amount',
        body: 'Fluids that look similar may have very different properties. Use the product specification and replenishment method required by the applicable publication. Keep containers and tools clean, protect open systems from dirt, and prevent cross-contamination. Do not mix products based on color or substitute an available lubricant without an approved instruction.',
        steps: ['Verify the required product specification and container identification.', 'Inspect the container and dispensing equipment for contamination or damage.', 'Use the authorized fill procedure and quantity or level criterion.', 'Secure closures and clean incidental residue as instructed.', 'Document consumption, service, or a recurring need for replenishment when required.']
      },
      {
        title: 'Describe leak classes carefully',
        body: 'A common Army leak-description convention distinguishes Class I seepage or wetness that does not form drops, Class II leakage that forms drops but does not cause them to fall, and Class III leakage in which drops fall from the item being checked. Use the definitions in the applicable publication when classifying a real finding. These descriptions concern appearance; they do not identify the fluid, locate the original source, or grant permission to operate.',
        steps: ['Observe from a safe position using the prescribed method.', 'Determine whether there is wetness, a formed drop, or falling drops.', 'Identify the system and source only as far as the evidence supports.', 'Use the applicable leak definition and PMCS criteria.', 'Record the observation and refer any uncertainty for evaluation.'],
        example: 'A falling drop fits the usual Class III description. Whether that condition makes this vehicle unavailable must still be evaluated using the system-specific TM criteria and required authority.'
      },
      {
        title: 'Fluid type and system matter',
        body: 'Do not treat every leak alike. A small amount of fluid in a safety-critical system may demand a different response from a similar-looking stain elsewhere. Fuel, brake-related fluids, coolant, lubricants, and unknown fluids have different hazards. A dark spot does not prove that the source is engine oil, and fluid can travel along a surface before it drips. Avoid touching or smelling an unknown fluid to identify it.',
        steps: ['Keep clear of hot, moving, pressurized, or otherwise hazardous areas.', 'Record the location and appearance without guessing the source.', 'Consult the applicable system instructions and warnings.', 'Report an unknown or potentially hazardous leak promptly.', 'Use the approved spill, containment, and disposal process when required.']
      },
      {
        title: 'Cooling-system checks and heat',
        body: 'Cooling-system inspection can include accessible hoses, connections, visible condition, and indicators when the TM directs it. A hot system may remain pressurized after shutdown. Never loosen a hot cap to speed the check, squeeze a hose to infer pressure, or continue operation based on an assumption that a warning is “just a sensor.” Fans and belts also require the specified separation and energy controls.',
        steps: ['Read the cooling-system warning and setup instructions.', 'Wait for or establish the required safe state.', 'Inspect the specified visible items without bypassing guards.', 'Check the level or other condition only by the authorized method.', 'Record a leak, damaged component, or abnormal indication and obtain the required review.']
      },
      {
        title: 'Turn a leak observation into a useful record',
        body: 'Separate what you directly observed from what still needs diagnosis. Include the location, fluid identity if established, leak appearance, and relevant operating conditions. If cleaning and reinspection are required to locate the source, that is a task for the authorized procedure. Do not erase the original observation merely because the surface looks dry later.',
        steps: ['Name the location as precisely as you can.', 'State wetness, formed drops, or falling drops as observed.', 'State the fluid identity only if established.', 'Record the check conditions and required technical reference.', 'Report the finding and document any authorized follow-up.'],
        example: 'Training wording: “Wetness visible on the lower left side of the engine compartment; no drops formed during this inspection. Fluid and source not confirmed.” This keeps observation separate from diagnosis.'
      }
    ],
    takeaways: ['Level checks require the TM’s specified conditions.', 'Leak class describes appearance; system criteria determine the maintenance consequence.', 'Never open a hot pressurized system or identify an unknown fluid by touch.'],
    references: ['tm', 'da-pam-750-8']
  },
  {
    id: 'brakes-steering', title: 'Brakes, steering, and suspension observations', eyebrow: '07 · Safety-critical systems', minutes: 25,
    summary: 'Recognize what needs inspection and reporting without inventing universal adjustment or rejection limits.',
    objectives: ['Follow the prescribed method for safety-critical checks.', 'Distinguish visual observations from authorized functional tests.', 'Report abnormal braking or steering behavior without unsafe experiments.'],
    sections: [
      {
        title: 'Begin with the applicable system',
        body: 'Vehicles use different brake, steering, and suspension arrangements. First identify the system and read its inspection instructions. Do not transfer an adjustment method, pressure value, travel limit, or test sequence from another vehicle. A familiar control layout does not establish that the underlying system is the same.',
        steps: ['Confirm vehicle configuration and the relevant PMCS items.', 'Read the system’s warnings and setup requirements.', 'Identify which checks are assigned to your role.', 'Prepare the required equipment and safe work area.', 'Refer unclear instructions or conflicting symptoms to a qualified maintainer.']
      },
      {
        title: 'Inspect accessible components safely',
        body: 'Visual checks may address accessible lines, hoses, connections, mountings, and other components identified in the TM. Look for the specified kinds of damage, leakage, interference, or missing hardware. Do not place yourself under an unsupported vehicle or put fingers between components that can move. A visual check cannot establish an internal condition that requires a specified test.',
        steps: ['Establish the required safe vehicle state.', 'Use a safe viewing position for each specified component.', 'Observe condition without disturbing an adjustment or opening a line.', 'Record the exact location and visible condition.', 'Refer required measurements or tests to the applicable procedure.']
      },
      {
        title: 'Conduct only the prescribed functional check',
        body: 'A functional check asks whether a system responds as specified under controlled conditions. It may require an operator, an observer, a prepared area, or particular initial conditions. Do not improvise a road test, defeat a warning, or adjust a component until a symptom disappears. A successful response during one check does not cancel an unresolved fault from another check.',
        steps: ['Read the complete check, including its stop criteria, before starting.', 'Confirm the required personnel, area, and initial conditions.', 'Perform the specified actions in order.', 'Compare the observed response with the stated criteria.', 'Stop and report any unexpected or unacceptable response.']
      },
      {
        title: 'Describe the symptom without prescribing a repair',
        body: 'Examples of useful observations include a specific warning indication, visible leakage at a stated location, unusual steering effort, or a reported braking change. “Replace the pump” is a repair recommendation, not a description of what the operator observed. Diagnosis requires the authorized troubleshooting process and may reveal a different cause.',
        steps: ['Identify the affected function and the observed symptom.', 'Include when the symptom occurred and what was happening.', 'Record actual readings only when obtained by the required method.', 'Avoid naming a failed part unless it has been confirmed.', 'Report the condition for maintenance evaluation and status determination.'],
        example: 'Training wording: “Operator reports steering effort increased during authorized operation; cause not determined. Vehicle referred for maintenance evaluation.”'
      },
      {
        title: 'Do not use a defect symbol as permission',
        body: 'Recording a status symbol communicates a condition through the maintenance system; it does not independently authorize movement. Use the applicable TM criteria, current forms instructions, and designated review process. Do not reduce the severity of an entry because a short movement seems convenient or because the vehicle completed its last trip.',
        steps: ['Document the observed condition accurately.', 'Apply the required criteria and obtain review when uncertain.', 'Keep operation within the current authorized status and restrictions.', 'Complete authorized repair and required verification.', 'Have the designated personnel complete any status or release action.']
      }
    ],
    takeaways: ['Safety-critical systems require their own procedures and limits.', 'Functional checks need defined conditions and stop criteria.', 'A symptom is evidence for troubleshooting, not proof of a failed part.'],
    references: ['tm', 'da-pam-750-8', 'ar-750-1']
  },
  {
    id: 'electrical', title: 'Batteries, wiring, lights, and electrical symptoms', eyebrow: '08 · Common systems', minutes: 25,
    summary: 'Inspect accessible electrical items, recognize battery hazards, and document electrical faults without unsafe trial-and-error work.',
    objectives: ['Identify common battery and electrical inspection hazards.', 'Separate visible evidence from an electrical diagnosis.', 'Use prescribed test equipment and connection procedures.'],
    sections: [
      {
        title: 'Electrical power can remain present',
        body: 'Turning off a control does not necessarily isolate every circuit. Batteries, stored energy, and alternate power paths may still present hazards. Jewelry and conductive tools can create a short circuit. Follow the task’s power-control instructions and use appropriate protective equipment. Do not disconnect a cable or remove a cover merely because the engine is stopped.',
        steps: ['Read the electrical warnings and initial setup for the task.', 'Identify the required power state and energy controls.', 'Remove or control conductive items as the procedure requires.', 'Use the specified tools and safe access method.', 'Verify the required state before hands-on work.']
      },
      {
        title: 'Battery inspection begins with condition and restraint',
        body: 'Battery tasks can involve corrosive material, gas, high current, and heavy components. Inspect the items assigned by the TM, such as accessible case condition, restraint, connections, and protective covers. Avoid sparks and ignition sources. A swollen, cracked, leaking, hot, or otherwise abnormal battery requires the procedure’s response and qualified review; do not experiment with charging or connection changes.',
        steps: ['Prepare the work area and protective equipment specified for the task.', 'Observe accessible battery and mounting conditions safely.', 'Record damage, leakage, corrosion, or insecure components as required.', 'Use the approved response for an abnormal battery condition.', 'Perform cleaning, servicing, removal, or charging only under the applicable procedure and authorization.']
      },
      {
        title: 'Wiring and connections: describe what is visible',
        body: 'Accessible wiring checks can reveal abrasion, damaged insulation, insecure routing, missing protection, or a visibly disconnected connector. Do not pull on a harness to “test” it, pierce insulation without an authorized procedure, or reconnect an unknown connector by guesswork. Electrical faults may be intermittent, and damage location matters to troubleshooting.',
        steps: ['Identify the harness or component location using the TM terminology.', 'Observe routing, protection, and visible condition as directed.', 'Keep clear of energized or moving components.', 'Record the specific visible defect and location.', 'Refer continuity, voltage, or other testing to the authorized procedure.']
      },
      {
        title: 'Lights and indicators need a defined check',
        body: 'A lighting check is more useful when it states which lamp, selected function, and observed response were involved. Confirm the required switch position and test conditions using the TM. A lamp that does not illuminate may have several possible causes. Do not immediately replace parts or bypass a protective device without troubleshooting and authorization.',
        steps: ['Prepare the vehicle and observer position for the specified check.', 'Select the required function according to the procedure.', 'Observe each required lamp or indication.', 'Record the exact function and location that did not respond correctly.', 'Follow the approved troubleshooting and repair process.'],
        example: 'Training wording: “Right rear turn indicator did not illuminate during the prescribed lighting check; left rear indicator illuminated.” This is more useful than “electrical system broken.”'
      },
      {
        title: 'Meters, protective devices, and starting support',
        body: 'Use test equipment with the correct rating, condition, range, and connection method specified for the task. Incorrect connections can damage equipment or injure personnel. Never bridge a fuse or circuit-protection device to make a system operate. External starting support, battery connection order, and charging procedures are vehicle- and equipment-specific tasks; use the exact authorized instructions and trained personnel.',
        steps: ['Confirm that testing or starting support is part of the authorized task.', 'Inspect the required equipment and verify its suitability.', 'Read the complete connection and disconnection sequence.', 'Perform the procedure within its stated limits and precautions.', 'Record the result and remove test equipment through the prescribed sequence.']
      }
    ],
    takeaways: ['Engine off does not mean every electrical circuit is safe to touch.', 'Report the exact lamp, harness location, or indication involved.', 'Do not bypass protection or improvise battery and test-equipment connections.'],
    references: ['tm', 'da-pam-750-1', 'da-pam-750-8']
  },
  {
    id: 'chassis-driveline', title: 'Chassis, driveline, body, and mounted equipment', eyebrow: '09 · Common systems', minutes: 25,
    summary: 'Inspect accessible structural and driveline items, verify secure stowage, and understand the limits of a visual check.',
    objectives: ['Recognize accessible conditions that need documentation.', 'Use safe access for underbody and raised-component checks.', 'Distinguish lubrication instructions from a general request to add grease.'],
    sections: [
      {
        title: 'Inspect structure and mountings systematically',
        body: 'The applicable PMCS may include frame, brackets, mounts, body panels, access doors, and other structural items. Observe the condition and security specified by the TM. A crack-like mark, displaced part, missing fastener, or unusual contact requires accurate documentation and evaluation; do not assume a mark is harmless or diagnose a structural failure from appearance alone.',
        steps: ['Identify each required item and a safe viewing position.', 'Observe the specified surfaces, attachments, and clearances.', 'Record the location and appearance of an abnormal condition.', 'Avoid removing hardware or disturbing an assembly during a visual check.', 'Refer required measurements or repair to the correct technical procedure.']
      },
      {
        title: 'Underbody access and rotating driveline components',
        body: 'Driveshafts and other rotating components create entanglement hazards. Inspect only under the vehicle state specified by the procedure, with required movement and energy controls. Never reach near a rotating shaft or place yourself beneath an unsupported vehicle. A visual inspection may identify a visible leak, damaged guard, or missing hardware; it does not establish internal wear or adjustment.',
        steps: ['Confirm safe access and the required vehicle state.', 'Inspect only the accessible items assigned by the TM.', 'Stay clear of pinch points, hot components, and stored energy.', 'Describe visible conditions without guessing internal damage.', 'Use authorized troubleshooting for noise, vibration, or other symptoms.']
      },
      {
        title: 'Lubrication is a specified service',
        body: 'The correct lubrication instruction identifies the product, point, interval, preparation, and method. Applying more lubricant is not automatically better, and the wrong product can damage equipment. Some points have special access or operating-state requirements. Use the lubrication order or applicable technical instruction; do not create a universal grease schedule from a generic vehicle picture.',
        steps: ['Identify the correct lubrication publication and applicable configuration.', 'Verify the point, product, interval, and task assignment.', 'Prepare the area and dispensing equipment as directed.', 'Perform the specified service without overapplication or contamination.', 'Record service completion and any inaccessible or damaged points as required.']
      },
      {
        title: 'Body, stowage, and required equipment',
        body: 'Loose tools and unsecured equipment can injure occupants or interfere with controls. Inspect stowage, retaining devices, access closures, and required on-vehicle equipment according to the applicable list and PMCS. Verify presence and condition rather than assuming a closed compartment is complete. Do not add improvised restraints or modify a mounting without authorization.',
        steps: ['Use the applicable inventory and inspection instructions.', 'Check required items for presence and visible serviceability.', 'Verify that stowage and closures are secured as directed.', 'Record missing, damaged, or insecure items accurately.', 'Route shortages and defects through the required supply and maintenance process.']
      },
      {
        title: 'Towing and recovery attachments are inspected, not improvised',
        body: 'A PMCS may include accessible towing or recovery attachments and related hardware. Inspect only as the TM assigns and document damage or missing parts. Recognizing an attachment does not establish its capacity or authorize a recovery operation. Actual towing, lifting, and recovery require their own procedures, ratings, equipment, and trained personnel.',
        steps: ['Identify the attachment and its assigned inspection task.', 'Observe the specified mounting, hardware, and visible condition.', 'Record any abnormal condition by exact location.', 'Prevent use of questionable equipment through the required reporting process.', 'Refer operational use to the applicable authorized procedure.']
      }
    ],
    takeaways: ['Visual checks reveal evidence; they do not prove internal condition.', 'Lubrication requires the specified product, point, method, and interval.', 'Secure stowage and complete equipment checks are part of readiness.'],
    references: ['tm', 'da-pam-750-1', 'da-pam-750-8']
  },
  {
    id: 'service-workflow', title: 'Scheduled services and the maintenance workflow', eyebrow: '10 · Shop practice', minutes: 30,
    summary: 'Connect inspection, troubleshooting, parts, repair, verification, and records into one traceable job.',
    objectives: ['Distinguish PMCS intervals from scheduled-service requirements.', 'Track a fault through an authorized maintenance process.', 'Explain why repair completion requires verification and record updates.'],
    sections: [
      {
        title: 'Intervals are instructions, not suggestions',
        body: 'Before, during, after, weekly, monthly, and service-based intervals appear only where the applicable publication requires them. Scheduled work may depend on time, usage, condition, or other specified criteria. Do not assume that every vehicle has the same schedule or that a low-mileage vehicle has no service due. Use the maintenance system and technical data together to identify what is required.',
        steps: ['Identify the applicable inspection and service schedules.', 'Verify dates, meter readings, and other scheduling information.', 'Review upcoming or overdue work with the responsible person.', 'Plan the required personnel, tools, materials, and work area.', 'Record completion or an unresolved scheduling discrepancy through the authorized process.']
      },
      {
        title: 'From observation to work assignment',
        body: 'A fault begins as evidence: a visible condition, a measured result, or an operating symptom. The record then supports review, prioritization, and assignment. The exact digital and paper workflow varies by unit and system configuration. Keep the original observation understandable so the assigned maintainer does not have to reconstruct what the operator meant.',
        steps: ['Document the finding and required reference.', 'Submit it through the unit’s maintenance reporting process.', 'Have the designated personnel review status and work requirements.', 'Assign work to qualified personnel using the required work documentation.', 'Preserve the connection between the original fault and later corrective actions.']
      },
      {
        title: 'Troubleshoot before replacing parts',
        body: 'A troubleshooting procedure narrows possible causes through specified observations and tests. Follow its sequence and safety instructions. Replacing the most familiar part may waste time and leave the fault unresolved. Record test results accurately, including required units and conditions, so the next maintainer can understand what has been ruled in or out.',
        steps: ['Confirm the reported symptom using an authorized method when safe.', 'Find the applicable troubleshooting procedure.', 'Complete each required test in order with suitable equipment.', 'Use the stated result to choose the next authorized step.', 'Document the confirmed cause or unresolved condition without inventing a result.']
      },
      {
        title: 'Parts and deferred work need traceability',
        body: 'A requested part is not an installed part, and an installed part is not proof that the fault is corrected. Preserve the link between the fault, work requirement, and parts or support action. When work cannot be completed, use the current authorized process for open or deferred faults. Do not delete or close a fault simply because a part is on order.',
        steps: ['Identify the required part or support through authorized technical and supply data.', 'Record the request or work status through the designated system.', 'Keep the fault visible until the required corrective and verification actions are complete.', 'Use authorized deferred-maintenance records only when applicable.', 'Communicate what remains pending during each handoff.']
      },
      {
        title: 'Repair, verify, and close the record',
        body: 'Corrective action should state what was actually done. Verification should state the check performed and its result, as required by the task and records process. “Fixed” alone gives the next person little information. Required inspections, supervisor reviews, and status changes must be completed by the designated personnel. Never pre-sign a job or enter completion before the work occurs.',
        steps: ['Perform the authorized repair or service using the applicable instruction.', 'Conduct the specified operational, quality, or other verification check.', 'Record the actual corrective action and verification result.', 'Obtain required reviews, signatures, or system actions from the responsible people.', 'Update equipment status and records through the authorized workflow.']
      },
      {
        title: 'Clean closeout supports the next job',
        body: 'Account for tools, restore guards and access covers as required, remove test equipment, and address waste or spills through approved procedures. Verify that the work area and vehicle are left in the specified condition. A complete record and clear handoff help prevent repeat work, missed faults, and assumptions about what was completed.',
        steps: ['Account for tools and removed or replaced items.', 'Restore the configuration specified by the procedure.', 'Handle waste, used fluids, and contaminated materials correctly.', 'Review the record for incomplete entries and unresolved faults.', 'Brief the next responsible person on the final condition and remaining work.']
      }
    ],
    takeaways: ['Use the actual schedule and meter data for the vehicle.', 'A parts request does not close a fault.', 'Repair, verification, record completion, and release are distinct steps.'],
    references: ['tm', 'ar-750-1', 'da-pam-750-1', 'da-pam-750-8', 'gcSS']
  },
  {
    id: 'fault-writing', title: 'Write faults that another mechanic can act on', eyebrow: '11 · Documentation skills', minutes: 30,
    summary: 'Turn an observation into a precise entry, apply status concepts carefully, and avoid common documentation errors.',
    objectives: ['Write a fault using location, observation, conditions, and reference.', 'Separate fault descriptions from corrective-action entries.', 'Explain common status symbols without treating them as self-authorized operating decisions.'],
    sections: [
      {
        title: 'Use four pieces of useful information',
        body: 'A useful fault entry answers: where is it, what was observed, under what relevant conditions, and which required inspection reference applies? It should be concise enough to read and specific enough to find. Include measurements and units only when they were actually obtained. The exact field placement depends on the form or system; the quality of the observation matters in every format.',
        steps: ['Name the component or exact vehicle location.', 'Describe what you saw, heard, measured, or experienced.', 'Add relevant operating or inspection conditions.', 'Enter the required PMCS item or technical reference in the appropriate field.', 'Read the entry as if you had never seen the vehicle.'],
        example: 'Weak: “Light bad.” Better: “Right rear turn indicator did not illuminate during the prescribed lighting check.” The required item reference belongs in the form’s reference field.'
      },
      {
        title: 'Keep observation separate from diagnosis',
        body: 'An observation is direct evidence. A diagnosis identifies the cause after the required evaluation. An operator can accurately report that a lamp did not illuminate without asserting that the bulb failed. A mechanic can later record a confirmed cause and corrective action. Keeping those stages separate prevents guesses from becoming accepted facts in the maintenance history.',
        steps: ['Underline the facts you directly observed.', 'Remove any unverified failed-part claim.', 'State “source not confirmed” or similar wording when needed.', 'Let authorized troubleshooting establish the cause.', 'Record the confirmed cause and repair in the proper corrective-action workflow.']
      },
      {
        title: 'Understand common status symbols',
        body: 'Common maintenance-record symbols include X for a deficiency that places equipment in an inoperable status; a diagonal slash for a material defect other than such a deficiency; and a horizontal dash for required inspection, maintenance action, or other applicable requirement that is due but not accomplished, as defined by the current instructions. A circled X concerns operation under specifically authorized limitations. Use the exact current definitions and applicable TM criteria. These brief descriptions are not a substitute for status determination or release authority.',
        steps: ['Find the condition’s applicable technical criteria.', 'Consult the current form or system instructions for the symbol.', 'Have the designated personnel resolve uncertain status.', 'Document the condition accurately without selecting a less restrictive symbol for convenience.', 'Keep any authorized limitations explicit and within the established process.']
      },
      {
        title: 'A circled X requires authority and specific limitations',
        body: 'A circled X is not a mechanic’s informal way to say “probably safe for a short trip.” It is used only through the applicable authorized process with specific limitations and required documentation. Do not create a restriction, sign for the approving person, or assume that another vehicle’s authorization applies. The interactive examples teach recognition of the concept and do not issue operational permission.',
        steps: ['Retain the original accurate deficiency description.', 'Refer any request for restricted operation to the designated authority.', 'Ensure required limitations and approval are recorded through the prescribed process.', 'Operate only if authorized and within those limitations.', 'Complete the required repair, verification, and status update afterward.']
      },
      {
        title: 'Corrective actions describe completed work',
        body: 'The fault describes the problem; the corrective action describes the work actually completed and the required verification. A future plan, parts request, or unperformed check must not be phrased as completed work. Required initials, signatures, dates, and approvals belong to the people who performed or authorized the corresponding action.',
        steps: ['Identify which recorded fault the action addresses.', 'State the authorized work actually completed.', 'Include the required verification method and result.', 'Enter required identifying information only for your own role.', 'Leave unresolved work open through the prescribed system.'],
        example: 'A training corrective-action sentence might read: “Completed the authorized repair; performed the specified lighting check and confirmed the right rear turn indicator illuminated.” Real entries must identify the actual work and reference as required.'
      },
      {
        title: 'Review legibility, accuracy, and record integrity',
        body: 'Use the required date format, units, identifiers, and correction method. Avoid unexplained abbreviations, ambiguous locations, copied meter readings, and blank required fields. Do not erase the history of a fault or alter someone else’s certification. Follow current instructions for correcting paper or digital records, and ask for review when a field’s meaning is unclear.',
        steps: ['Match equipment identifiers to the source record.', 'Verify dates, meter readings, units, and technical references.', 'Check that the fault and corrective action occupy the correct fields.', 'Use the authorized correction method for errors.', 'Route the record for the required review and retention.']
      }
    ],
    takeaways: ['Write evidence, location, conditions, and the required reference.', 'Status symbols communicate decisions made under the applicable criteria and authority.', 'Never enter a future repair or unperformed check as complete.'],
    references: ['tm', 'da-pam-750-8', 'da-2404', 'gcSS']
  },
  {
    id: 'da-2404', title: 'DA Form 2404: a guided paper worksheet', eyebrow: '12 · Forms practice', minutes: 35,
    summary: 'Practice a logical sequence for an Equipment Inspection and Maintenance Worksheet using fictional training data.',
    objectives: ['Populate identification and inspection information from valid sources.', 'Place faults and corrective actions in their proper parts of the worksheet.', 'Respect signature, review, and correction responsibilities.'],
    sections: [
      {
        title: 'Know which worksheet you are using',
        body: 'DA Form 2404 is the Equipment Inspection and Maintenance Worksheet. Use the current authorized form and instructions when your unit’s process calls for it. A unit using automated maintenance records may direct a different worksheet or workflow. The course demo is a simplified learning aid with fictional information; it is not an official blank form, a dispatch authorization, or a completed maintenance record.',
        steps: ['Confirm that DA Form 2404 is appropriate for the task under the unit process.', 'Obtain the current authorized form and completion instructions.', 'Identify which entries belong to the inspector, maintainer, and reviewer.', 'Gather the equipment record, current TM, and actual observations.', 'Use only training identities and values in this public practice tool.']
      },
      {
        title: 'Step 1: identify the equipment and inspection',
        body: 'Complete the organization and equipment-identification information required by the form. The nomenclature describes what the item is; the model identifies its configuration; the required registration, serial, or other identifier connects the worksheet to the individual item. Enter the inspection date and type according to current instructions. Do not substitute a bumper marking or familiar nickname where another identifier is required.',
        steps: ['Read the organization and equipment information from the authorized source.', 'Enter the required nomenclature, model, and identifying number accurately.', 'Enter the actual inspection date in the required format.', 'Identify the inspection type or interval correctly.', 'Recheck the header against the vehicle and source record before writing faults.']
      },
      {
        title: 'Step 2: record readings and technical references',
        body: 'Enter only meter or usage readings that apply to the equipment and form instructions. Record the actual reading in the proper field with the expected units; do not manufacture a value for an inapplicable field. Identify the applicable technical publication and required date or change information exactly as instructed. This course does not assign a fictional vehicle to a real TM number.',
        steps: ['Determine which usage fields apply to the equipment.', 'Read the applicable meter through the authorized method.', 'Enter the reading without silently changing units or rounding beyond the instruction.', 'Use the prescribed treatment for inapplicable fields.', 'Enter the correct technical-publication information from the publication itself.']
      },
      {
        title: 'Step 3: write one understandable fault entry',
        body: 'Use the inspection-item reference, status, and deficiency or shortcoming fields according to current completion instructions. Keep each entry tied to a distinct finding so corrective work can be traced. Do not invent an item number because the simulator asks for a reference: in real work, copy the reference from the applicable PMCS table or use the authorized treatment for the type of fault.',
        steps: ['Identify the applicable PMCS item or required reference.', 'Apply the correct status process using the TM criteria and current instructions.', 'Write the location and observed condition clearly.', 'Add relevant conditions or actual measurements when needed.', 'Review the entry with the responsible person if the reference or status is uncertain.'],
        example: 'Training entry: “Right rear turn indicator did not illuminate during the prescribed lighting check.” The demo supplies a fictional training reference; a real worksheet requires the actual applicable reference.'
      },
      {
        title: 'Step 4: document corrective work and required certification',
        body: 'The corrective-action area records work actually completed against the fault. Include the required verification and identifying information through the prescribed process. The inspector, maintainer, and maintenance supervisor have distinct responsibilities; do not sign or initial for another person or complete a certification before the action occurs. Exact signature and time entries must follow the current form instructions.',
        steps: ['Keep the fault entry readable while corrective work is performed.', 'Enter the actual authorized corrective action in the proper area.', 'Record the required verification result.', 'Have each responsible person complete their own required entry.', 'Obtain required review before the record is closed or routed.']
      },
      {
        title: 'Step 5: review and route the worksheet',
        body: 'Review the worksheet from top to bottom. Confirm identity, date, inspection type, usage readings, publication information, item references, status, fault descriptions, and any completed corrective actions. Follow the authorized correction method and record-routing process. A neatly completed form can still be wrong if it belongs to the wrong vehicle or reports work that never happened.',
        steps: ['Compare header information with the source record.', 'Match every fault to its reference and any corrective action.', 'Check that required entries are complete and readable.', 'Resolve errors through the approved correction process.', 'Submit and retain the record through the unit’s maintenance system.']
      }
    ],
    takeaways: ['Confirm the authorized form and instructions before entering real data.', 'Header accuracy connects the inspection to the correct equipment.', 'Faults, corrective actions, and certifications have different purposes and owners.'],
    references: ['da-2404', 'da-pam-750-8', 'tm']
  },
  {
    id: 'da-5988-e', title: 'DA Form 5988-E, dispatch records, and digital handoff', eyebrow: '13 · Forms practice', minutes: 35,
    summary: 'Read a generated maintenance worksheet, add new findings correctly, and distinguish maintenance records from dispatch and deferred-work records.',
    objectives: ['Review preprinted equipment and fault information before adding entries.', 'Keep open faults and completed actions traceable through the digital workflow.', 'Recognize the different purposes of inspection, dispatch, and deferred-maintenance records.'],
    sections: [
      {
        title: 'Start with the generated worksheet',
        body: 'DA Form 5988-E is an Equipment Maintenance and Inspection Worksheet associated with automated maintenance processes. It can contain system-generated equipment information, existing faults, and other maintenance information. Layout and local workflow can vary with the authorized system and output. Read the actual worksheet and current instructions instead of assuming every screen or printout matches a training screenshot.',
        steps: ['Confirm that the generated worksheet belongs to the correct equipment.', 'Review its date, identifiers, and other required header information.', 'Read existing faults and relevant maintenance information.', 'Resolve incorrect or outdated system information through authorized personnel.', 'Prepare to record new findings without overwriting existing history.']
      },
      {
        title: 'Separate preprinted information from new observations',
        body: 'A preprinted fault is an existing record, not proof that you personally inspected or repaired the condition. Check the required items and report changes. New faults need their own accurate entries under the current completion process. Do not duplicate an existing fault unnecessarily, but do not omit a changed condition merely because a similar entry appears on the sheet.',
        steps: ['Read the existing fault description and current recorded state.', 'Perform the applicable PMCS check safely.', 'Determine whether the observation is unchanged, changed, or a new issue.', 'Use the unit’s process to annotate or add the finding correctly.', 'Bring conflicting or unclear entries to the maintenance supervisor.'],
        example: 'If an existing lamp fault now affects a different lamp as well, report the additional observation. Do not assume the existing entry already describes it.'
      },
      {
        title: 'Use the available fields according to their purpose',
        body: 'Record the required technical reference, status, fault description, and corrective-action information in the designated areas. Do not force a paper DA Form 2404 field numbering scheme onto a DA Form 5988-E printout. Use the current system and forms instructions for exact field handling, signatures, and routing. A corrective-action field still means completed work, even when the sheet was printed by a computer.',
        steps: ['Locate the new-fault or appropriate entry area on the actual worksheet.', 'Enter the required reference and accurate observation.', 'Apply status through the authorized criteria and review process.', 'Record completed corrective work only when it has occurred.', 'Have the responsible personnel make the required review and certification entries.']
      },
      {
        title: 'Return the worksheet through the maintenance process',
        body: 'A paper note has not completed the workflow if the maintenance system still needs an authorized update. Return the worksheet to the designated maintenance or dispatch personnel so new faults, completed work, and other required changes can be entered and reconciled. The course does not imitate a live GCSS-Army transaction or prescribe universal menu paths; those depend on current training, roles, and system configuration.',
        steps: ['Review the completed worksheet for clear, accurate entries.', 'Identify new, changed, and unresolved faults during handoff.', 'Submit it to the designated person through the unit process.', 'Ensure required system updates and reviews are completed by authorized users.', 'Retain or dispose of the document according to the applicable records instructions.']
      },
      {
        title: 'Maintenance, dispatch, and deferred-work records differ',
        body: 'A maintenance worksheet documents inspection findings and maintenance actions. A dispatch or utilization record supports authorization and recording of equipment use; examples encountered in Army workflows include DA Form 5987-E and, where authorized, DD Form 1970. DA Form 2408-14 is the Uncorrected Fault Record and is used only when the applicable maintenance-record instructions call for it. These records have different purposes and are not interchangeable. Confirm the current unit process and form applicability before using any of them.',
        steps: ['Identify whether the task concerns inspection, maintenance, dispatch, utilization, or deferred faults.', 'Use the form or system transaction prescribed for that purpose.', 'Keep fault and equipment identifiers consistent across the required records.', 'Do not treat a maintenance worksheet as permission to operate.', 'Do not move a fault to a deferred record merely to make a worksheet appear clear.']
      },
      {
        title: 'Protect real operational and personal information',
        body: 'The practice tool uses fictional records and stores learning progress locally in your browser. Real vehicle identifiers, unit details, personnel names, signatures, work orders, and operational schedules belong in authorized systems and approved handling processes. Do not paste them into a public training site or a shared practice export. Practicing with realistic structure does not require real unit data.',
        steps: ['Use the supplied fictional scenario for practice.', 'Keep real records in the authorized maintenance and records systems.', 'Check a training export before sharing it.', 'Remove practice data when using a shared device if appropriate.', 'Ask the records or maintenance supervisor about handling requirements for actual documents.']
      }
    ],
    takeaways: ['Review generated information before adding new observations.', 'A worksheet must reach the authorized system-update process.', 'Inspection, dispatch, and deferred-fault records serve different purposes.'],
    references: ['da-pam-750-8', 'gcSS', 'dispatch', 'tm']
  },
  {
    id: 'capstone', title: 'Capstone: inspect, document, and hand off', eyebrow: '14 · Apply the workflow', minutes: 40,
    summary: 'Bring the course together in a fictional vehicle inspection with clear observations, correct record choices, and an honest maintenance handoff.',
    objectives: ['Complete a structured inspection without skipping safety or record review.', 'Produce a clear training worksheet from observed facts.', 'Explain what must happen before a fault is closed or operation is authorized.'],
    sections: [
      {
        title: 'Scenario: a fictional training vehicle',
        body: 'You are assigned to help inspect a fictional wheeled training vehicle. The worksheet contains one open fault, and the inspection reveals several observations. The simulator supplies its own training references and criteria so you can practice the reasoning process. Those references are invented for the exercise and must never be copied onto an actual vehicle record. The drawing has no real model-specific component locations.',
        steps: ['Read the training vehicle identity and inspection objective.', 'Review the supplied existing fault and the exercise instructions.', 'Identify your role and which decisions require review.', 'Open the fictional training reference for each demonstrated item.', 'Prepare to record evidence without adding facts not supplied by the scenario.']
      },
      {
        title: 'Phase 1: prepare and inspect',
        body: 'Before selecting an inspection station, explain the safe work state and what you are trying to observe. Work through the inspection route deliberately. For each observation, decide whether you have enough information to describe it, whether the check is complete, and whether it requires a stop or referral under the supplied exercise criteria. Do not reward yourself for guessing a component failure.',
        steps: ['Complete the safe-setup review.', 'Inspect each assigned training item in order.', 'Read the observation and relevant exercise criteria.', 'Distinguish a completed check from one that requires additional authorized work.', 'Record new findings and report any condition requiring immediate review.']
      },
      {
        title: 'Phase 2: write the record',
        body: 'Choose the worksheet format the exercise assigns. Enter the fictional identification and inspection information, then write each fault using a precise location and observed condition. Use only the supplied training references and stated readings. If a scenario does not establish a diagnosis, your entry should not claim one. The form tutor gives feedback on completeness and meaning; it does not validate a real maintenance record.',
        steps: ['Match the worksheet to the fictional vehicle.', 'Enter the supplied date, inspection type, and applicable usage reading.', 'Select the supplied training reference for the finding.', 'Write an observation-based fault description.', 'Review status and any required escalation using the exercise criteria.']
      },
      {
        title: 'Phase 3: distinguish repair from a plan',
        body: 'One scenario may state that a repair has been completed and verified; another may state that a part is requested or the cause remains unknown. Your record must preserve that difference. Record completed work only when the scenario provides it. Keep unresolved faults open and identify the next responsible action without inventing a signature, test result, or release decision.',
        steps: ['Read exactly what corrective work the scenario says occurred.', 'Enter completed work and verification only when supplied.', 'Identify pending parts, tests, or work without marking them complete.', 'Leave required certifications to the designated role.', 'Check that every entry can be traced to a stated fact.']
      },
      {
        title: 'Phase 4: deliver a useful handoff',
        body: 'Brief the next person using five points: which vehicle, which inspection, what was found, what was completed, and what remains pending. Mention uncertainties and incomplete checks. A good handoff allows the next maintainer or supervisor to act without guessing. The course’s completion badge records learning activity only; it is not a qualification, equipment-status decision, or dispatch authorization.',
        steps: ['Identify the fictional vehicle and inspection.', 'Summarize new and changed faults by location and observation.', 'State any completed corrective work and verification.', 'State unresolved work and required review.', 'Confirm that the worksheet reaches the next responsible role.']
      },
      {
        title: 'Use the course as a rehearsal for supervised work',
        body: 'Review any missed questions and repeat the demonstrations until you can explain the reason for each step. Then apply that reasoning with the actual vehicle TM, current forms instructions, qualified supervision, and authorized maintenance system. Successful training means knowing when you have enough evidence to proceed and when you must stop, look up an instruction, or ask the responsible person.',
        steps: ['Review feedback for every missed concept.', 'Repeat the form exercise with a different supplied scenario.', 'Explain the difference between an observation, diagnosis, corrective action, and release.', 'Locate the real publications and local workflow before actual work.', 'Practice on equipment only within your training and authorization.']
      }
    ],
    takeaways: ['Keep every record entry traceable to an observation or completed action.', 'Uncertainty and incomplete work must remain visible.', 'Course completion prepares you for supervised practice; it does not authorize maintenance or operation.'],
    references: ['tm', 'da-pam-750-8', 'da-2404', 'gcSS', 'dispatch']
  }
];

export const quizQuestions = [
  { id: 'roles-1', lessonId: 'roles', prompt: 'You recognize the vehicle family, but the model and installed equipment differ from the truck you trained on. What should you do first?', options: ['Use the familiar vehicle’s PMCS because the family name matches.', 'Match the actual model and configuration to the applicable publication.', 'Copy the last worksheet without checking applicability.', 'Use the course drawing as the component-location guide.'], answer: 1, explanation: 'The actual model, configuration, and publication applicability control the procedure. A familiar appearance is not enough to select technical instructions.' },
  { id: 'roles-2', lessonId: 'roles', prompt: 'What does a PMCS item number primarily help you do?', options: ['Identify a universal fault shared by all Army vehicles.', 'Determine the repair part without consulting technical data.', 'Locate the check in the applicable PMCS table.', 'Authorize operation after a fault is recorded.'], answer: 2, explanation: 'An item number points to a check in a particular table. It is not a universal fault code, repair instruction, or operating authorization.' },
  { id: 'roles-3', lessonId: 'roles', prompt: 'A mechanic has the skill to perform a repair that is outside the assigned maintenance task. Which statement is correct?', options: ['Skill alone permits the repair.', 'The operator may authorize any repair verbally.', 'Completing PMCS automatically authorizes all repairs.', 'The mechanic must follow training, authorization, and maintenance-allocation requirements.'], answer: 3, explanation: 'Technical skill is necessary but does not replace task assignment, maintenance allocation, safety requirements, or authorization.' },
  { id: 'safe-setup-1', lessonId: 'safe-setup', prompt: 'The engine is off. What can you conclude about stored energy?', options: ['Pressure, heat, electricity, and mechanical energy may still remain.', 'Every component is safe to touch.', 'A raised component no longer needs support.', 'Electrical isolation is complete.'], answer: 0, explanation: 'Engine shutdown does not remove every energy source. The task’s required controls and verification still apply.' },
  { id: 'safe-setup-2', lessonId: 'safe-setup', prompt: 'A required inspection would place you beneath an unsupported raised vehicle. What is the correct response?', options: ['Work quickly because the inspection is brief.', 'Ask someone to watch the jack while you inspect.', 'Stop and establish the authorized lifting, support, and energy-control arrangement.', 'Record the item as checked without inspecting it.'], answer: 2, explanation: 'Never go beneath an unsupported vehicle or load. Use the prescribed support arrangement and qualified personnel before work proceeds.' },
  { id: 'safe-setup-3', lessonId: 'safe-setup', prompt: 'You cannot safely complete a required check with the available equipment. How should you document it?', options: ['Mark it complete if the vehicle looks normal.', 'Accurately report the incomplete check and its reason through the required process.', 'Leave it unmentioned so the worksheet stays simple.', 'Estimate the result from the last inspection.'], answer: 1, explanation: 'An incomplete check must remain visible. Reporting the reason allows the responsible person to arrange the equipment or conditions needed for safe completion.' },
  { id: 'before-operation-1', lessonId: 'before-operation', prompt: 'The worksheet contains no open faults. What does that establish?', options: ['The vehicle is ready for any use.', 'No PMCS is needed today.', 'All previously required work was verified by you.', 'You still must perform the applicable checks and confirm the record belongs to the vehicle.'], answer: 3, explanation: 'A clear worksheet is not proof of current condition. Identity checks and the required inspection still need to occur.' },
  { id: 'before-operation-2', lessonId: 'before-operation', prompt: 'Why use a consistent inspection route?', options: ['It helps prevent omissions while following the applicable PMCS order.', 'It replaces the need to read the TM.', 'It makes all vehicles use the same checks.', 'It allows unsafe access when a component is next in the route.'], answer: 0, explanation: 'A route is an organizational aid. The actual checks, order, safe access, and criteria come from the applicable instructions.' },
  { id: 'before-operation-3', lessonId: 'before-operation', prompt: 'You see wetness near an axle but have not established the source. Which entry is most defensible?', options: ['Axle seal failed; replace it.', 'Axle assembly unserviceable because any wetness proves failure.', 'Wetness visible near the stated axle location; fluid and source not confirmed.', 'No fault because no diagnosis is available.'], answer: 2, explanation: 'Document what you observed and identify uncertainty. An unconfirmed source does not justify a diagnosis or omission of a reportable finding.' },
  { id: 'during-after-1', lessonId: 'during-after', prompt: 'An abnormal warning appears during operation. What should happen first?', options: ['Continue until you can determine whether it gets worse.', 'Follow the applicable response procedure while maintaining safe control.', 'Write a detailed note while driving.', 'Clear the indication and assume it was a sensor error.'], answer: 1, explanation: 'Protect people and maintain control using the applicable procedure. Detailed documentation follows once it is safe.' },
  { id: 'during-after-2', lessonId: 'during-after', prompt: 'Which information best helps troubleshoot an intermittent symptom?', options: ['The operator’s guess about the failed part only.', 'A statement that the vehicle is old.', 'A repair instruction copied from another vehicle.', 'What occurred, when it occurred, the operating conditions, and actual observed indications.'], answer: 3, explanation: 'Specific symptom context helps a maintainer evaluate and reproduce a condition safely through the authorized troubleshooting process.' },
  { id: 'during-after-3', lessonId: 'during-after', prompt: 'How should after-operation PMCS be selected?', options: ['Use the applicable after-operation instructions and their required conditions.', 'Repeat only the checks you remember from the morning.', 'Skip it if the vehicle completed its trip.', 'Open all fluid systems immediately while they are hot.'], answer: 0, explanation: 'After-operation PMCS has its own assigned checks and required vehicle states. Completing a trip does not eliminate those requirements.' },
  { id: 'tires-wheels-1', lessonId: 'tires-wheels', prompt: 'Where should the required tire pressure and measurement conditions come from?', options: ['A generic value learned for another truck.', 'The applicable technical instruction for the installed assembly and use conditions.', 'The tire’s appearance.', 'The course illustration.'], answer: 1, explanation: 'Pressure requirements and measurement conditions are specific to the vehicle, assembly, and applicable instructions.' },
  { id: 'tires-wheels-2', lessonId: 'tires-wheels', prompt: 'What does an unchanged witness mark prove about wheel-hardware torque?', options: ['It proves the exact torque value.', 'It replaces required torque checks indefinitely.', 'It does not independently verify correct torque.', 'It authorizes an improvised tightening sequence.'], answer: 2, explanation: 'A witness mark can indicate relative movement. It is not a measurement of torque and does not replace a required procedure.' },
  { id: 'tires-wheels-3', lessonId: 'tires-wheels', prompt: 'A wheel assembly appears damaged. What is the appropriate inspection boundary?', options: ['Loosen assembly hardware to see whether it is under stress.', 'Heat the damaged area to make removal easier.', 'Inflate it until its shape looks normal.', 'Keep clear as required, report the condition, and use qualified personnel and the approved procedure.'], answer: 3, explanation: 'Wheel assemblies contain stored energy. Suspected hazardous damage requires the prescribed response, not exploratory loosening, heating, or inflation.' },
  { id: 'fluids-cooling-1', lessonId: 'fluids-cooling', prompt: 'Under the common leak-description convention, which observation describes Class II?', options: ['Drops form but do not fall from the item being checked.', 'Wetness is visible but no drops form.', 'Drops fall from the item being checked.', 'Any fluid level below a marked range.'], answer: 0, explanation: 'Class II commonly describes formed drops that do not fall. Use the applicable publication’s definitions and system-specific criteria for real work.' },
  { id: 'fluids-cooling-2', lessonId: 'fluids-cooling', prompt: 'Does a leak class alone authorize continued vehicle operation?', options: ['Yes, all Class I leaks permit operation.', 'Yes, if the vehicle is needed immediately.', 'No; fluid, system, TM criteria, and the required authority also matter.', 'Yes, if the worksheet has space for the entry.'], answer: 2, explanation: 'Leak class describes appearance. It does not replace system-specific limits or the authorized status and operating decision.' },
  { id: 'fluids-cooling-3', lessonId: 'fluids-cooling', prompt: 'A fluid level is read under conditions different from those required by the TM. What is the best response?', options: ['Top up immediately to the highest visible mark.', 'Re-establish the specified conditions and perform the authorized check.', 'Use the reading because every level check is the same.', 'Average it with a remembered reading.'], answer: 1, explanation: 'Temperature, vehicle attitude, engine state, and waiting time can affect a reading. Use the prescribed conditions before deciding what the result means.' },
  { id: 'brakes-steering-1', lessonId: 'brakes-steering', prompt: 'Which is appropriate when checking an unfamiliar brake system?', options: ['Use the adjustment from the last vehicle you repaired.', 'Bypass the warning to finish the check.', 'Conduct an improvised road test.', 'Identify the actual system and follow its prescribed inspection and test procedures.'], answer: 3, explanation: 'Brake-system checks, limits, and setup conditions vary. The applicable technical instruction controls.' },
  { id: 'brakes-steering-2', lessonId: 'brakes-steering', prompt: 'Which statement separates a symptom from a diagnosis?', options: ['“Steering effort increased; cause not determined” reports a symptom without claiming a failed part.', '“Replace the pump” is always a complete operator observation.', 'Any steering symptom proves the same component failed.', 'A symptom cannot be documented until a repair is complete.'], answer: 0, explanation: 'An accurate symptom report supports troubleshooting. It does not need an invented failed-component diagnosis.' },
  { id: 'brakes-steering-3', lessonId: 'brakes-steering', prompt: 'A recorded defect seems minor enough for a short move. Who decides whether that move is permitted?', options: ['Whoever needs the vehicle first.', 'Any person who can change the worksheet symbol.', 'The designated authority under the applicable criteria and process.', 'The course quiz score.'], answer: 2, explanation: 'Convenience and distance do not replace the required technical criteria, review, restrictions, and operating authority.' },
  { id: 'electrical-1', lessonId: 'electrical', prompt: 'A rear lamp does not illuminate during the prescribed check. What should the first fault entry state?', options: ['The entire electrical system has failed.', 'The exact lamp, selected function, and observed response.', 'The bulb failed, even though it has not been tested.', 'The circuit should be bypassed.'], answer: 1, explanation: 'The observation identifies the symptom. Several causes may produce it, so diagnosis and corrective action follow the authorized process.' },
  { id: 'electrical-2', lessonId: 'electrical', prompt: 'A protective device repeatedly opens. Which response is correct?', options: ['Bridge it with conductive material.', 'Install an arbitrary higher-rated device.', 'Keep resetting it without investigating.', 'Use the authorized troubleshooting procedure and specified protective device.'], answer: 3, explanation: 'Protective devices must not be bypassed or arbitrarily uprated. The fault needs the prescribed evaluation and repair.' },
  { id: 'electrical-3', lessonId: 'electrical', prompt: 'What controls external starting-support connections?', options: ['The exact applicable procedure, suitable equipment, and trained authorized personnel.', 'A universal sequence from memory for every vehicle.', 'Cable color alone.', 'The fact that the engine is stopped.'], answer: 0, explanation: 'Connection order, equipment suitability, and precautions are vehicle- and equipment-specific. Do not improvise.' },
  { id: 'chassis-driveline-1', lessonId: 'chassis-driveline', prompt: 'What information is needed before performing a lubrication service?', options: ['Only the location of a visible fitting.', 'The applicable product, point, interval, preparation, and method.', 'A belief that more lubricant is always better.', 'The schedule from an unrelated vehicle.'], answer: 1, explanation: 'Lubrication is a specified service. Correct product, interval, method, and task assignment matter.' },
  { id: 'chassis-driveline-2', lessonId: 'chassis-driveline', prompt: 'A visual underbody check shows a wet area. What can that check establish by itself?', options: ['The exact internal component failure.', 'The required replacement part.', 'The visible condition and location, subject to safe observation.', 'That no troubleshooting is needed.'], answer: 2, explanation: 'A visual observation is evidence. Internal condition and cause may require additional authorized tests.' },
  { id: 'chassis-driveline-3', lessonId: 'chassis-driveline', prompt: 'Inspecting a towing attachment establishes which of the following?', options: ['Permission to use any available recovery method.', 'Its capacity without technical data.', 'Authority to modify its mounting.', 'Only the observed condition under the assigned check; actual use requires its own procedure and authority.'], answer: 3, explanation: 'Inspection and operational use are separate tasks. Ratings, procedures, equipment, and qualifications govern towing or recovery.' },
  { id: 'service-workflow-1', lessonId: 'service-workflow', prompt: 'A needed part has been requested but not installed. How should the fault be treated?', options: ['Keep the unresolved fault visible through the authorized process.', 'Close it because the supply action is complete.', 'Enter the repair as finished.', 'Remove the original observation from the record.'], answer: 0, explanation: 'Requesting a part is progress toward repair, but the fault remains unresolved until required corrective action and verification are complete.' },
  { id: 'service-workflow-2', lessonId: 'service-workflow', prompt: 'Why follow the troubleshooting sequence before replacing parts?', options: ['It guarantees the first suspected part is wrong.', 'It avoids the need to record test results.', 'It uses defined evidence to narrow causes and choose the authorized next step.', 'It permits testing without safety setup.'], answer: 2, explanation: 'Structured troubleshooting connects test results to decisions and reduces unsupported parts replacement. Safety and documentation still apply.' },
  { id: 'service-workflow-3', lessonId: 'service-workflow', prompt: 'What should happen after an authorized repair and before closure?', options: ['Write “fixed” and skip any required checks.', 'Complete required verification, documentation, and review by the designated personnel.', 'Pre-sign any remaining inspection.', 'Assume operation is authorized because a part was replaced.'], answer: 1, explanation: 'Repair completion, verification, record completion, status updates, and release are distinct requirements in the maintenance process.' },
  { id: 'fault-writing-1', lessonId: 'fault-writing', prompt: 'Which is the strongest initial fault description?', options: ['Vehicle bad.', 'Replace whichever part usually fails.', 'Fixed later.', 'Right rear turn indicator did not illuminate during the prescribed lighting check.'], answer: 3, explanation: 'The entry identifies location, function, and observed condition without inventing a cause or completed repair.' },
  { id: 'fault-writing-2', lessonId: 'fault-writing', prompt: 'What is the correct understanding of a circled X?', options: ['It concerns operation under specifically authorized limitations and the required documentation process.', 'It lets any mechanic permit a short trip.', 'It means all repairs are complete.', 'It can replace an X whenever a vehicle is urgently needed.'], answer: 0, explanation: 'A circled X is not an informal convenience symbol. Applicable authority, limitations, and documentation are required.' },
  { id: 'fault-writing-3', lessonId: 'fault-writing', prompt: 'Which entry belongs in a corrective-action record?', options: ['A repair you hope to perform next week, written as complete.', 'An unverified operator guess about the failed part.', 'The actual completed work and required verification result.', 'A signature entered for an absent supervisor.'], answer: 2, explanation: 'Corrective actions describe completed work. Future plans, guesses, and another person’s certification must not be represented as completed actions.' },
  { id: 'da-2404-1', lessonId: 'da-2404', prompt: 'Before using DA Form 2404 for real work, what should you confirm?', options: ['That the practice website can print it.', 'That it is the authorized worksheet for the task and you have current completion instructions.', 'That the previous worksheet used the same date.', 'That every field can be filled with a guessed value.'], answer: 1, explanation: 'Form applicability and current instructions come first. The course uses a simplified practice representation, not an official completed record.' },
  { id: 'da-2404-2', lessonId: 'da-2404', prompt: 'An equipment-usage field does not apply. What should you do?', options: ['Invent a value so nothing is blank.', 'Copy a number from another vehicle.', 'Enter zero without checking instructions.', 'Use the current instructions for handling an inapplicable field.'], answer: 3, explanation: 'Required treatment of an inapplicable field comes from the form instructions. Do not manufacture readings or assume a universal entry.' },
  { id: 'da-2404-3', lessonId: 'da-2404', prompt: 'Who should complete a required signature or certification?', options: ['The person responsible for the corresponding action under the prescribed process.', 'Anyone who can write the name legibly.', 'The trainee before the work begins.', 'The website automatically.'], answer: 0, explanation: 'Signatures and certifications belong to the responsible people and completed actions. They must not be pre-entered or completed for someone else.' },
  { id: 'da-5988-e-1', lessonId: 'da-5988-e', prompt: 'What should you do first with a generated DA Form 5988-E worksheet?', options: ['Assume all printed information is current.', 'Verify equipment identity and review the generated information and existing faults.', 'Erase existing faults before adding new ones.', 'Treat the printout as automatic dispatch authorization.'], answer: 1, explanation: 'Generated information requires review. Equipment identity, existing faults, and discrepancies must be understood before adding observations.' },
  { id: 'da-5988-e-2', lessonId: 'da-5988-e', prompt: 'A new fault is written on the worksheet. What completes the handoff?', options: ['Leaving the sheet in an unrelated vehicle.', 'Assuming the handwriting automatically updates the maintenance system.', 'Returning it through the designated process for required review and authorized system updates.', 'Deleting the fault from the next printout.'], answer: 2, explanation: 'A paper entry must reach the required maintenance workflow. Authorized users complete the necessary system updates and review.' },
  { id: 'da-5988-e-3', lessonId: 'da-5988-e', prompt: 'Which statement correctly distinguishes records?', options: ['A maintenance worksheet and a dispatch record are interchangeable.', 'A deferred-fault record permits any unresolved fault to disappear.', 'Every unit uses exactly the same paper and screen layout.', 'Maintenance, dispatch, and deferred-fault records have different purposes and prescribed applicability.'], answer: 3, explanation: 'Use the record or transaction prescribed for the task. An inspection worksheet does not independently authorize operation or justify deferring a fault.' },
  { id: 'capstone-1', lessonId: 'capstone', prompt: 'The training scenario does not state a failed component. What should your fault entry do?', options: ['Describe the supplied observation and preserve the uncertainty.', 'Choose the most likely failed component and state it as fact.', 'Invent a test result.', 'Omit the finding because diagnosis is incomplete.'], answer: 0, explanation: 'An accurate observation is useful before diagnosis is complete. Every entry should be traceable to a supplied fact or an actual completed action.' },
  { id: 'capstone-2', lessonId: 'capstone', prompt: 'Which handoff is complete enough to support the next person?', options: ['“It is probably fine.”', '“The form is somewhere in the cab.”', 'Vehicle identity, inspection, findings, completed work, and unresolved work or required review.', 'Only the name of a requested part.'], answer: 2, explanation: 'A structured handoff connects the equipment, evidence, completed actions, and remaining responsibilities.' },
  { id: 'capstone-3', lessonId: 'capstone', prompt: 'What does completing this course authorize?', options: ['Independent release of any inspected vehicle.', 'It records learning activity; real work still requires the applicable training, procedures, supervision, and authority.', 'Use of fictional training references on actual forms.', 'Signing for the maintenance supervisor.'], answer: 1, explanation: 'The course is preparation and practice. It is not a qualification, an official maintenance record, or an operating authorization.' }
];

export const glossary = [
  { term: '91B', definition: 'The Army military occupational specialty for a wheeled vehicle mechanic. Actual tasks depend on training, assignment, authorization, and applicable technical instructions.' },
  { term: 'PMCS', definition: 'Preventive maintenance checks and services: the inspections and services assigned by the applicable technical publication to maintain equipment and identify faults.' },
  { term: 'TM', definition: 'Technical manual. The applicable current manual provides vehicle-specific procedures, warnings, inspection criteria, and technical data.' },
  { term: 'Work package', definition: 'A defined portion of a technical publication addressing a task or subject. Its applicability, setup, warnings, and steps must be read together.' },
  { term: 'Maintenance allocation', definition: 'The assignment of maintenance functions to authorized levels or organizations in the applicable maintenance system and technical data.' },
  { term: 'Operator check', definition: 'A check assigned to the equipment operator by the applicable instructions. It does not automatically authorize maintainer-level repair.' },
  { term: 'Before-operation check', definition: 'A PMCS check required before use when the applicable publication assigns that interval.' },
  { term: 'During-operation check', definition: 'A required observation or check during authorized use, performed without compromising safe control.' },
  { term: 'After-operation check', definition: 'A PMCS check required after use, performed under the conditions specified by the applicable publication.' },
  { term: 'Fault', definition: 'A recorded abnormal equipment condition or requirement handled through the maintenance process. Its meaning and status are established using the applicable criteria and instructions.' },
  { term: 'Observation', definition: 'What a person actually saw, heard, measured, or experienced, separated from an unconfirmed explanation of its cause.' },
  { term: 'Diagnosis', definition: 'Identification of a fault’s cause through the authorized inspection or troubleshooting process.' },
  { term: 'Corrective action', definition: 'The work actually completed to address a recorded fault, documented with required verification and identifying information.' },
  { term: 'Verification', definition: 'The specified check or inspection used to establish whether the completed work achieved the required result.' },
  { term: 'Class I leak', definition: 'Under a common Army convention, seepage or wetness that does not form drops. Use the applicable publication’s definitions and system criteria.' },
  { term: 'Class II leak', definition: 'Under a common Army convention, leakage that forms drops but does not cause them to fall from the item being checked. Appearance alone does not authorize operation.' },
  { term: 'Class III leak', definition: 'Under a common Army convention, leakage in which drops fall from the item being checked. Apply the actual system-specific criteria and required status process.' },
  { term: 'X status symbol', definition: 'A common maintenance-record symbol for a deficiency that places equipment in an inoperable status. Apply current instructions and the relevant technical criteria.' },
  { term: 'Diagonal slash status symbol', definition: 'A common maintenance-record symbol for a material defect other than an inoperable-status deficiency, as defined by current instructions. It is not independent permission to operate.' },
  { term: 'Horizontal dash status symbol', definition: 'A common maintenance-record symbol for a required inspection or other applicable maintenance requirement that is due but not accomplished. Current instructions define its exact use.' },
  { term: 'Circled X', definition: 'A maintenance-record symbol concerning operation under specifically authorized limitations. Required authority, limitations, and documentation must be established through the applicable process.' },
  { term: 'DA Form 2404', definition: 'Equipment Inspection and Maintenance Worksheet. Use the current authorized form and completion instructions when the maintenance process calls for it.' },
  { term: 'DA Form 5988-E', definition: 'Equipment Maintenance and Inspection Worksheet associated with automated maintenance processes. Review generated information and use the current system workflow.' },
  { term: 'DA Form 5987-E', definition: 'An equipment dispatch record encountered in Army maintenance workflows. Applicability and completion follow current instructions and the unit’s authorized process.' },
  { term: 'DD Form 1970', definition: 'Motor Equipment Utilization Record. Use it only where the applicable current dispatch or utilization process prescribes it.' },
  { term: 'DA Form 2408-14', definition: 'Uncorrected Fault Record. Its use for unresolved or deferred faults is governed by applicable current maintenance-record instructions.' },
  { term: 'GCSS-Army', definition: 'Global Combat Support System–Army. Authorized users perform maintenance and related transactions according to current training, roles, and system configuration.' },
  { term: 'Dispatch', definition: 'The prescribed process for authorizing and recording equipment use. A maintenance worksheet alone does not establish dispatch authority.' },
  { term: 'Meter reading', definition: 'An actual usage indication, such as an applicable mileage or operating-hours reading, recorded in the proper field and units.' },
  { term: 'Nomenclature', definition: 'The standardized name or description identifying what an equipment item is; it is distinct from the individual item’s serial or registration identifier.' },
  { term: 'Energy control', definition: 'The task-specific process used to control hazardous electrical, mechanical, pressure, thermal, or other energy before and during work.' },
  { term: 'Witness mark', definition: 'A visual alignment mark that may show relative movement. It does not independently measure or verify torque.' },
  { term: 'Lubrication order', definition: 'Technical instructions identifying required lubrication products, points, intervals, and methods for applicable equipment.' },
  { term: 'Handoff', definition: 'A clear transfer of equipment information and responsibility, including findings, completed work, unresolved tasks, and required review.' }
];
