/**
 * S.U.T.R.A. Sample Data Store
 * Grounded realistic government scenarios for institutional demonstration.
 * Labeled as Sample Scenarios.
 */

export const SAMPLE_PROJECTS = [
  {
    id: "proj-001",
    title: "District Flood Advisory & Emergency Response Protocol",
    source_type: "document",
    source_format: "PDF (Circular No. 2026/DDMA/FLD/08)",
    source_name: "DDMA_Mahanadi_Basin_Alert_Level4.pdf",
    source_size: "1.4 MB",
    word_count: 1420,
    created_at: "2026-09-22T10:30:00Z",
    status: "Completed",
    category: "Disaster Management",
    author: "Shri R. K. Verma, District Relief Commissioner",
    selected_formats: [
      "executive_summary",
      "government_advisory",
      "linkedin_post",
      "x_thread",
      "presentation",
      "infographic_plan",
      "video_package"
    ],
    config: {
      target_audience: "General Public & District Administration",
      tone: "Urgent",
      language: "English",
      detail_level: "Detailed",
      objective: "Alert & Direct Emergency Action"
    },
    source_text: `DISTRICT DISASTER MANAGEMENT AUTHORITY (DDMA)
ORDER NO. DDMA/FLD/2026/894-B | DATED: 22nd SEPTEMBER 2026

SUBJECT: PRECAUTIONARY EVACUATION AND RED ALERT ISSUANCE FOR LOW-LYING BASIN SECTORS ALONG MAHANADI RIVER TRIBUTARIES

1. SITUATION OVERVIEW:
According to hydrological telemetry data from the Central Water Commission (CWC) and precipitation radar forecasts from the India Meteorological Department (IMD), upstream catchment discharge at Hirakud reservoir has crossed 9,40,000 cusecs due to 48 hours of continuous heavy rainfall (210mm recorded in Sector 4). The current water level at the Naraj Barrage gauging station stands at 27.40 meters, exceeding the Danger Level (DL: 26.41m) by 0.99 meters with an upward trajectory.

2. AFFECTED BLOCKS & POPULATION:
Immediate inundation risk is projected within the next 8 to 14 hours across 47 Gram Panchayats in Blocks A (Banki), B (Tigiria), and C (Athagarh). An estimated vulnerable population of 68,500 residents residing in unprotected riparian corridors requires immediate phased evacuation to higher-ground Multi-Purpose Cyclone & Flood Shelters (MCFS).

3. DIRECTIVES FOR LINE DEPARTMENTS:
- Department of Water Resources: Activate 24x7 embankment patrol teams along vulnerable spurs SP-12 through SP-19. Immediate deployment of 25,000 geotextile sandbags to weak points.
- National Disaster Response Force (NDRF) & State Disaster Response Action Force (ODRAF): 4 teams with 28 motorized inflatable boats deployed across Banki-Tigiria bridgehead.
- Food & Civil Supplies: Pre-position 72 hours of dry food packets, potable drinking water tanker fleets, and halogen tablets across 32 operational shelters.
- Health & Family Welfare: Mobilize mobile medical teams with anti-snake venom, ORS sachets, and water purification units.
- Energy Department: Precautionary power grid isolation for submerged low-tension feeders to prevent electrocution hazards.

4. PUBLIC HELPLINES:
District Emergency Operation Centre (DEOC) 24x7 Toll-Free: 1077 / 0671-2507812
NDRF Rescue Coordination Desk: +91 94370 12891`,

    analysis: {
      main_topic: "Emergency Flood Alert & Evacuation Mandate for Mahanadi Tributary Riparian Zones",
      summary: "River water levels have breached the danger mark by 0.99m following 9.4 lakh cusecs reservoir discharge. Evacuation protocols activated for 68,500 citizens across 47 Gram Panchayats with NDRF deployment and 24x7 embankment surveillance.",
      key_facts: [
        "Water level at Naraj gauging station reached 27.40m (Danger Level: 26.41m).",
        "Hirakud upstream reservoir outflow exceeds 9,40,000 cusecs.",
        "47 Gram Panchayats across Banki, Tigiria, and Athagarh blocks at high risk.",
        "68,500 vulnerable residents scheduled for phased relocation.",
        "4 NDRF/ODRAF teams deployed with 28 motorized boats.",
        "32 Multi-Purpose Cyclone & Flood Shelters activated with 72-hour provisions."
      ],
      key_messages: [
        "Avoid riverbanks and low-lying agricultural plains immediately.",
        "Move vulnerable elders, children, and livestock to designated shelters before 18:00 hrs.",
        "Do not touch submerged electrical transformers or fallen cables.",
        "Use official helpline 1077 for emergency evacuation assistance."
      ],
      entities: {
        organizations: ["DDMA", "CWC", "IMD", "NDRF", "ODRAF", "Dept of Water Resources"],
        locations: ["Naraj Barrage", "Hirakud", "Banki", "Tigiria", "Athagarh"],
        roles: ["District Relief Commissioner", "Embankment Patrol Engineers", "Shelter In-Charge Officers"],
        regulations: ["Disaster Management Act 2005 (Section 30/34)"]
      },
      important_events: [
        { time: "06:00 HRS", event: "Hirakud reservoir outflow elevated to 9.40 lakh cusecs" },
        { time: "09:30 HRS", event: "Naraj gauge breaches Danger Level (27.40m recorded)" },
        { time: "11:00 HRS", event: "DDMA Order 894-B enacted; Red Alert broadcasted" },
        { time: "14:00 HRS - 18:00 HRS", event: "Mandatory evacuation window for 47 riparian villages" }
      ],
      detected_audience: "General Public, Local Panchayats, Emergency Responders",
      potential_sensitivity: "High Urgency / Life Safety Alert (Authorized Public Advisory)"
    },

    outputs: {
      executive_summary: {
        overview: "The District Disaster Management Authority (DDMA) has issued a Red Alert following critical hydrological telemetry indicating Hirakud discharge exceeding 9.40 lakh cusecs and Naraj gauge exceeding Danger Level by 0.99 meters. Immediate inter-agency execution is underway to safeguard 68,500 residents across 47 Gram Panchayats.",
        key_findings: [
          "Inundation window projected within 8 to 14 hours for Banki, Tigiria, and Athagarh riparian corridors.",
          "Critical vulnerability identified at embankment spurs SP-12 through SP-19; geotextile reinforcement deployed.",
          "Primary public risk stems from low-tension electrical lines in submerged sectors and delayed civilian evacuation."
        ],
        implications: [
          "Potential isolation of 12 road arterial links connecting Banki to district headquarters.",
          "Temporary suspension of standard power distribution to 6 low-lying feeder grids.",
          "Requirement for extended emergency shelter management for a minimum 96-hour period."
        ],
        recommended_actions: [
          { priority: "P0 (Immediate)", action: "Complete evacuation of 68,500 residents to 32 shelters before nightfall.", owner: "Revenue & Police Adm" },
          { priority: "P0 (Immediate)", action: "Deploy 28 motorized inflatable rescue boats at strategic staging points.", owner: "NDRF / ODRAF" },
          { priority: "P1 (High)", action: "Commence round-the-clock patrol on 24km riverbank embankment spurs.", owner: "Water Resources Dept" },
          { priority: "P1 (High)", action: "Ensure water filtration plants and medical stocks at all 32 shelters.", owner: "Health & Civil Supplies" }
        ],
        sources: ["CWC Telemetry Bulletin #142", "IMD Doppler Radar Cuttack", "DDMA Order 894-B"]
      },

      government_advisory: {
        ref_number: "DDMA/EMERGENCY-ADV/2026/089",
        date: "22 September 2026",
        issuing_authority: "DISTRICT DISASTER MANAGEMENT AUTHORITY",
        department: "Office of the District Collector & District Magistrate",
        situation_overview: "A critical surge in the Mahanadi river basin has resulted in floodwaters breaching the designated danger threshold at Naraj Gauge (27.40m vs 26.41m DL). Residents of riparian and low-lying localities are instructed to comply with official evacuation advisories immediately.",
        key_information: "A Red Alert is operational across Banki, Tigiria, and Athagarh. 32 Multi-Purpose Cyclone & Flood Shelters have been equipped with dry rations, baby food, clean water, and medical aid.",
        affected_areas: ["Banki Block (Panchayats 1 to 18)", "Tigiria Block (Panchayats 1 to 15)", "Athagarh Riverfront Sectors (14 Panchayats)"],
        potential_impact: "Severe surface inundation up to 4-6 feet in agricultural lowlands; disruption of rural road networks; temporary planned power cut in flooded feeders.",
        recommended_actions: [
          "Follow instructions of village Revenue Inspectors and ODRAF personnel without delay.",
          "Secure livestock and essential identity documents in waterproof bags.",
          "Strictly avoid driving or wading through moving floodwaters."
        ],
        public_guidance: "Do not spread unverified rumors on messaging platforms. Rely solely on official broadcasts from All India Radio, Doordarshan, and the District Information Portal.",
        emergency_contacts: [
          { service: "District Control Room (Toll-Free)", contact: "1077" },
          { service: "Direct Police Control Room", contact: "112" },
          { service: "NDRF Rescue Coordination Desk", contact: "+91 94370 12891" },
          { service: "Health / Ambulance Helpdesk", contact: "108" }
        ]
      },

      linkedin_post: {
        hook: "🚨 PUBLIC ADVISORY: Red Alert issued for Mahanadi River Basin tributaries. Precautionary evacuation protocol activated across 47 Gram Panchayats.",
        body: `As District Relief Authorities coordinate response efforts, the safety and welfare of every citizen remains our utmost priority.

Due to heavy upstream rainfall and reservoir discharge exceeding 9.4 lakh cusecs, the water level at Naraj Gauge has breached the danger threshold. 

The District Administration, in active coordination with NDRF, ODRAF, and line departments, has initiated swift proactive measures:
• 32 Multi-purpose Flood Shelters fully operational with medical & food supplies
• 4 NDRF/ODRAF rescue units deployed with 28 motorized boats
• 24x7 embankment monitoring teams stationed at vulnerable spurs

We urge all citizens in affected blocks (Banki, Tigiria, Athagarh) to cooperate with local field officers and relocate to designated shelters before 18:00 hrs.

Together, through timely action and community resilience, we ensure zero casualty.`,
        key_points: [
          "Zero-casualty protocol in full effect",
          "District helpline active 24x7: Dial 1077",
          "Verify updates exclusively through verified administrative handles"
        ],
        hashtags: ["#DisasterManagement", "#PublicSafety", "#FloodAlert", "#CivicAdministration", "#CommunityResilience"],
        char_count: 980
      },

      x_thread: {
        post_count: 4,
        posts: [
          {
            post_number: 1,
            text: "🚨 1/4 [RED ALERT - MAHANADI BASIN]: Water level at Naraj Barrage has breached danger level at 27.40m (+0.99m). DDMA has activated immediate emergency response protocols across Banki, Tigiria & Athagarh blocks. Follow instructions of field teams.",
            char_count: 246
          },
          {
            post_number: 2,
            text: "⚠️ 2/4 EVACUATION NOTICE: Residents across 47 low-lying Gram Panchayats are being safely relocated to 32 Multi-Purpose Flood Shelters. Free food, clean water, medical aid & shelter are stocked for 72+ hours. Please shift before 18:00 hrs.",
            char_count: 242
          },
          {
            post_number: 3,
            text: "⚡ 3/4 SAFETY DIRECTIVES:\n• Avoid venturing near swollen riverbanks or bridges\n• Do not touch submerged electrical installations\n• Boil drinking water or use halogen tablets provided by Health teams\n• Keep mobile devices charged while power is active.",
            char_count: 260
          },
          {
            post_number: 4,
            text: "📞 4/4 24x7 EMERGENCY HELPLINES:\n• District Control Room: 1077 (Toll-Free)\n• Police / Disaster Emergency: 112\n• NDRF Rescue Desk: 94370 12891\n\nStay calm, stay safe, and rely only on verified administrative bulletins. RT to amplify.",
            char_count: 242
          }
        ]
      },

      presentation: {
        total_slides: 6,
        slides: [
          {
            slide_number: 1,
            title: "District Flood Response & Evacuation Strategy",
            subtitle: "Inter-Agency Coordination Briefing | Monsoon 2026",
            bullets: [
              "Emergency Command Briefing convened by District Disaster Management Authority (DDMA)",
              "Telemetry: Naraj Gauge at 27.40m (+0.99m over Danger Mark)",
              "Operational Mandate: Zero civilian casualty & infrastructure preservation"
            ],
            speaker_notes: "Welcome senior officials and responders. This briefing outlines the critical 24-hour action window following heavy discharge from Hirakud and upstream catchment rainfall."
          },
          {
            slide_number: 2,
            title: "Hydrological Situation & Inundation Threat",
            subtitle: "Current Water Volume & Projected River Swell",
            bullets: [
              "Upstream reservoir discharge: 9,40,000 cusecs continuous volume",
              "Naraj Barrage: 27.40m (Danger Level: 26.41m, Warning Level: 25.41m)",
              "Lead time to peak flood stage in lower basin: Estimated 8 to 14 hours",
              "47 Gram Panchayats across 3 blocks categorized as Zone-1 (High Vulnerability)"
            ],
            speaker_notes: "Highlight the 8-to-14 hour window. Emphasize that early evacuation before nightfall is non-negotiable to avoid nighttime boat rescue hazards."
          },
          {
            slide_number: 3,
            title: "Target Population & Shelter Readiness",
            subtitle: "Logistics for 68,500 Riparian Residents",
            bullets: [
              "32 Multi-Purpose Cyclone & Flood Shelters (MCFS) opened and sanitized",
              "72-hour provisions: Dry rations, water tankers, baby supplements pre-positioned",
              "Dedicated livestock corrals established on elevated school grounds",
              "Public health mobile teams deployed with anti-snake venom and ORS kits"
            ],
            speaker_notes: "Ensure Block Development Officers (BDOs) confirm receipt of supplies at all 32 shelter checkpoints by 14:00 hrs."
          },
          {
            slide_number: 4,
            title: "Operational Deployment: NDRF, Police & Engineers",
            subtitle: "Asset Mobilization Matrix",
            bullets: [
              "NDRF / ODRAF: 4 specialized search-and-rescue teams (120 personnel)",
              "Water assets: 28 motorized inflatable rescue craft pre-positioned at bridgeheads",
              "Irrigation Dept: 24-hour patrol squads on embankment spurs SP-12 through SP-19",
              "25,000 geotextile sandbags allocated for rapid breach remediation"
            ],
            speaker_notes: "Point out that spurs 14 and 17 have historical seepage records and require double-shift structural surveillance."
          },
          {
            slide_number: 5,
            title: "Public Communication & Helplines Protocol",
            subtitle: "Multi-Channel Dissemination Plan",
            bullets: [
              "Toll-free emergency helpline 1077 operational with 12 parallel lines",
              "Automated SMS geocast sent to 1,20,000 localized cellular subscribers",
              "PA systems mounted on mobile police PCR vans in vulnerable villages",
              "Unified administrative updates delivered via S.U.T.R.A. multi-channel pipeline"
            ],
            speaker_notes: "Review our communication integrity: all official advisories must originate from the verified S.U.T.R.A. administrative pipeline to eliminate conflicting figures."
          },
          {
            slide_number: 6,
            title: "Next Steps & Milestone Timetable",
            subtitle: "Immediate 12-Hour Operational Roadmap",
            bullets: [
              "14:00 HRS: Mandatory evacuation phase commences under Sub-Divisional Magistrates",
              "18:00 HRS: 100% shelter occupancy check & roll call verification",
              "20:00 HRS: Planned power isolation for inundated feeder sectors",
              "06:00 HRS Tomorrow: Post-peak hydrology review and damage assessment review"
            ],
            speaker_notes: "Conclude briefing. Questions from line department heads before teams depart for field operational sectors."
          }
        ]
      },

      infographic_plan: {
        title: "Mahanadi Basin Flood Safety & Evacuation Roadmap",
        catchphrase: "Timely Relocation Saves Lives: Official DDMA Safety Guide",
        key_statistic: {
          number: "68,500",
          unit: "Citizens",
          label: "Secured across 32 Multi-Purpose Shelters with 72h Provisions"
        },
        key_messages: [
          "Move to designated higher-ground shelters before 18:00 HRS today",
          "Never attempt to drive or cross submerged causeways or bridges",
          "Boil all drinking water or use distributed halogen disinfectant tablets",
          "Dial toll-free 1077 for immediate emergency evacuation assistance"
        ],
        important_facts: [
          "Naraj water mark: 27.40m (+0.99m above Danger Level)",
          "47 Gram Panchayats under active Red Alert surveillance",
          "28 motorized rescue boats standing by across 3 bridgeheads",
          "32 emergency shelters fully equipped with food and medical care"
        ],
        timeline: [
          { phase: "Phase 1 (Morning)", action: "Hydrology Red Alert issued; sandbag reinforcement on spurs" },
          { phase: "Phase 2 (Afternoon)", action: "Village-level door-to-door evacuation to 32 shelters" },
          { phase: "Phase 3 (Evening)", action: "Verification roll-call; low-tension power grid isolation" },
          { phase: "Phase 4 (Night)", action: "Continuous embankment watch and mobile rescue boat patrols" }
        ],
        visual_hierarchy: [
          "Top: Bold Emergency Alert Banner with Warning Level badge (High Contrast)",
          "Upper Middle: Hero Metric Card with 68,500 Citizens & 32 Shelters",
          "Center Grid: 4 Action Pillars (Evacuate, Safeguard, Purify Water, Dial 1077)",
          "Lower Section: Visual 4-Step Time Horizon from Alert to Safe Haven",
          "Bottom Footer: Emergency Helpline 1077, 112, and verified QR code"
        ],
        suggested_icons: [
          "Shield with water wave (Flood Defense)",
          "Lifebuoy / Rescue boat (NDRF Operations)",
          "Tent / Shelter icon (Safe Haven)",
          "Phone handset with signal waves (24x7 Helpline 1077)"
        ],
        call_to_action: "Protect your family and livestock. Shift to your assigned flood shelter immediately."
      },

      video_package: {
        title: "Official Citizen Alert: Mahanadi Basin Flood Evacuation Protocol",
        target_duration: "90 Seconds",
        target_audience: "General Public & Rural Communities in Riparian Sectors",
        tone: "Urgent, Reassuring, Clear, Authoritative",
        scenes: [
          {
            scene_number: 1,
            time_range: "0:00 - 0:15",
            visual_description: "Wide aerial establishing shot of the river gauge showing elevated water levels, followed by clear graphic overlay of 'RED ALERT - LEVEL 4'.",
            narration_en: "This is an urgent public safety announcement from the District Disaster Management Authority. Due to heavy upstream rainfall, water levels have breached the danger mark.",
            narration_hi: "जिला आपदा प्रबंधन प्राधिकरण द्वारा यह एक अत्यावश्यक जनहित सूचना है। भारी वर्षा के कारण महानदी बेसिन में जलस्तर खतरे के निशान को पार कर चुका है।",
            on_screen_text: "RED ALERT: Mahanadi River Basin Swell | Level: 27.40m (Danger Level: 26.41m)",
            transition: "Hard cut to field footage"
          },
          {
            scene_number: 2,
            time_range: "0:15 - 0:35",
            visual_description: "Footage of NDRF personnel preparing rescue boats and guiding villagers towards safe vehicles. Animated district map highlighting Banki, Tigiria, and Athagarh.",
            narration_en: "If you reside in low-lying villages across Banki, Tigiria, or Athagarh, an immediate evacuation is underway. Thirty-two flood shelters are open, fully equipped with food, water, and medical care.",
            narration_hi: "बांकी, तिगिरिया और अठगढ़ के निचले क्षेत्रों में रहने वाले सभी नागरिक तुरंत सुरक्षित स्थानों पर जाएं। 32 आश्रय केंद्र भोजन, पानी और दवाओं के साथ तैयार हैं।",
            on_screen_text: "EVACUATION IN PROGRESS: 47 Gram Panchayats | 32 Shelters Open",
            transition: "Wipe to infographic graphic"
          },
          {
            scene_number: 3,
            time_range: "0:35 - 0:55",
            visual_description: "Graphic checklist highlighting essential items: waterproof document pouches, warm clothing, emergency medicines, and livestock untethering safety.",
            narration_en: "Please pack only essential medication, identification papers in waterproof bags, and move your livestock to elevated community corrals before nightfall.",
            narration_hi: "कृपया जरूरी दवाएं और पहचान पत्र वॉटरप्रूफ बैग में रखें और शाम 6 बजे से पहले अपने पशुओं को ऊंचे स्थानों पर पहुंचाएं।",
            on_screen_text: "WHAT TO CARRY: Essential Medicines • Identity Cards • Warm Clothes",
            transition: "Dissolve to helpline callout"
          },
          {
            scene_number: 4,
            time_range: "0:55 - 0:75",
            visual_description: "Safety warning graphics showing crossed-out flooded road with a car, and warning icon against downed electrical power cables in water.",
            narration_en: "Crucially: never attempt to drive or walk through flooded causeways, and stay clear of downed power cables. Power to flooded feeders is being isolated for your safety.",
            narration_hi: "सावधान रहें: बहते पानी या जलमग्न पुलों को पार न करें और टूटे बिजली के तारों से दूर रहें। आपकी सुरक्षा के लिए बिजली की आपूर्ति रोकी जा रही है।",
            on_screen_text: "CRITICAL SAFETY: Do Not Cross Submerged Roads • Stay Away from Power Lines",
            transition: "Fade to emergency contact screen"
          },
          {
            scene_number: 5,
            time_range: "0:75 - 0:90",
            visual_description: "Clean institutional card displaying the District Helpline numbers in large, high-contrast typography, accompanied by official verification badges.",
            narration_en: "For immediate rescue assistance, call the District Emergency Control Room 24x7 at toll-free 1077 or dial 112. Stay vigilant, stay safe.",
            narration_hi: "आपातकालीन सहायता के लिए टोल-फ्री नंबर 1077 या 112 पर तुरंत संपर्क करें। सतर्क रहें, सुरक्षित रहें।",
            on_screen_text: "24x7 EMERGENCY TOLL-FREE: 1077 | POLICE & RESCUE: 112",
            transition: "Fade to black"
          }
        ]
      }
    }
  },
  {
    id: "proj-002",
    title: "National Digital Health Interoperability Policy Circular",
    source_type: "document",
    source_format: "DOCX (Circular MoHFW/NDHM/2026/14)",
    source_name: "MoHFW_ABDM_Interoperability_Standards.docx",
    source_size: "890 KB",
    word_count: 2150,
    created_at: "2026-09-20T14:15:00Z",
    status: "Completed",
    category: "Policy Circular",
    author: "Joint Secretary (Digital Health), MoHFW",
    selected_formats: ["executive_summary", "government_advisory", "linkedin_post", "presentation", "infographic_plan"],
    config: {
      target_audience: "Hospital Administrators, Health Tech Vendors & Chief Medical Officers",
      tone: "Formal",
      language: "English",
      detail_level: "Standard",
      objective: "Explain Regulatory Compliance"
    },
    source_text: `MINISTRY OF HEALTH & FAMILY WELFARE | GOVERNMENT OF INDIA
NOTIFICATION REF: NDHM/COMP/2026/041 | DATED: 18th SEPTEMBER 2026

SUBJECT: MANDATORY ADOPTION OF AYUSHMAN BHARAT DIGITAL MISSION (ABDM) MILESTONE 3 INTEROPERABILITY STANDARDS FOR CLINICAL ESTABLISHMENTS

1. STATUTORY CONTEXT:
In exercise of powers conferred under Section 12 of the Clinical Establishments Act and in alignment with the Digital Personal Data Protection Act, all empaneled tertiary healthcare facilities, diagnostic diagnostic chains, and medical colleges possessing over 50 beds are hereby directed to implement ABDM Milestone-3 FHIR (Fast Healthcare Interoperability Resources) Release 4.0 data exchange protocols.

2. COMPLIANCE MILESTONES & TIMELINES:
- Phase 1 (By 30th November 2026): Completion of Ayushman Bharat Health Account (ABHA) seed linking across 100% of in-patient (IPD) and out-patient (OPD) registrations.
- Phase 2 (By 15th January 2027): Bi-directional integration of electronic health records (EHR) through certified Health Information Provider (HIP) and Health Information User (HIU) gateways.
- Phase 3 (By 31st March 2027): Full audit sign-off on Consent Manager and Gateway (CMG) workflows adhering to end-to-end telemetry encryption standards.

3. INCENTIVES & NON-COMPLIANCE REMEDIES:
Institutions attaining full compliance prior to milestone targets qualify for the Digital Health Incentive Scheme (DHIS), providing reimbursement up to ₹500 per digitized transaction. Failure to certify compliance by the final deadline will entail review of National Accreditation Board for Hospitals (NABH) certifications and potential disqualification from government insurance reimbursement panels.`,

    analysis: {
      main_topic: "Mandatory FHIR 4.0 and ABHA Integration for Healthcare Institutions",
      summary: "All hospitals and diagnostic facilities with 50+ beds must adopt ABDM Milestone-3 interoperability standards by March 2027, backed by Digital Health Incentive Scheme rewards and panel compliance audits.",
      key_facts: [
        "Applies to all healthcare establishments with 50+ beds.",
        "Requires FHIR Release 4.0 standard compliance.",
        "Phase 1 deadline: 30 November 2026 (100% ABHA seeding).",
        "Phase 2 deadline: 15 January 2027 (EHR gateway linking).",
        "Phase 3 deadline: 31 March 2027 (Full Consent Manager audit).",
        "Incentive up to ₹500 per transaction via DHIS."
      ],
      key_messages: [
        "Digital health record portability is now a statutory standard.",
        "Hospitals must verify EHR software compatibility with certified gateways immediately.",
        "Early compliance unlocks substantial financial incentives via DHIS."
      ],
      entities: {
        organizations: ["MoHFW", "NHA", "NABH", "QCI"],
        locations: ["National (Pan-India)"],
        roles: ["Medical Directors", "Hospital CIOs", "State Health Secretaries"],
        regulations: ["Clinical Establishments Act", "DPDP Act 2023", "ABDM Guidelines"]
      },
      important_events: [
        { time: "18 SEP 2026", event: "Official Circular Notification published" },
        { time: "30 NOV 2026", event: "Milestone 1: 100% ABHA patient seeding cutoff" },
        { time: "15 JAN 2027", event: "Milestone 2: Bi-directional EHR linking cutoff" },
        { time: "31 MAR 2027", event: "Milestone 3: Final compliance certification cutoff" }
      ],
      detected_audience: "Hospital Administrators, HealthTech Integrators, Clinical Officers",
      potential_sensitivity: "Regulatory Policy Circular (Compliance Mandatory)"
    },

    outputs: {
      executive_summary: {
        overview: "The Ministry of Health & Family Welfare has issued a regulatory mandate directing all hospitals with 50 or more beds to achieve ABDM Milestone-3 interoperability certification by March 31, 2027. The circular pairs statutory compliance with financial incentives under the Digital Health Incentive Scheme.",
        key_findings: [
          "Covers all hospitals, diagnostics, and medical colleges exceeding 50 bed capacity.",
          "Mandates FHIR R4.0 data exchange standards for seamless EHR portability.",
          "Establishes a three-tiered milestone roadmap culminating on March 31, 2027."
        ],
        implications: [
          "Hospital IT systems require immediate API upgrade to support certified HIP/HIU gateways.",
          "Non-compliant facilities risk loss of NABH accreditation and panel exclusion."
        ],
        recommended_actions: [
          { priority: "P0 (Immediate)", action: "Audit internal Electronic Health Record (EHR) systems for FHIR 4.0 readiness.", owner: "Hospital IT Director" },
          { priority: "P1 (30 Nov)", action: "Achieve 100% ABHA integration at registration counters.", owner: "Patient Admin Dept" },
          { priority: "P1 (15 Jan)", action: "Connect with certified ABDM consent manager gateway.", owner: "Technical Vendor Lead" }
        ],
        sources: ["MoHFW Notification NDHM/COMP/2026/041", "National Health Authority Technical Specifications"]
      },

      government_advisory: {
        ref_number: "MOHFW/POLICY-ADV/2026/112",
        date: "20 September 2026",
        issuing_authority: "MINISTRY OF HEALTH & FAMILY WELFARE",
        department: "Ayushman Bharat Digital Mission (ABDM) Division",
        situation_overview: "To accelerate universal digital health continuity across public and private hospitals, all clinical establishments with over 50 beds must align infrastructure with national interoperability standards.",
        key_information: "FHIR R4.0 data exchange protocols and ABHA consent architecture must be integrated in three structured phases ending March 31, 2027.",
        affected_areas: ["All Tier-1, Tier-2, and Tier-3 Clinical Establishments nationwide"],
        potential_impact: "Streamlined inter-hospital referrals, elimination of repetitive diagnostic testing, and eligibility for DHIS financial incentives.",
        recommended_actions: [
          "Appoint an internal ABDM Nodal Compliance Officer within 14 working days.",
          "Register on the National Health Claims Exchange (NHCX) sandbox for testing.",
          "Apply for DHIS incentive claims for all digitized patient episodes."
        ],
        public_guidance: "Patients will enjoy seamless digital portability of discharge summaries, lab reports, and prescriptions via their personal ABHA app.",
        emergency_contacts: [
          { service: "ABDM Technical Helpdesk", contact: "1800-11-4477" },
          { service: "NHA Sandbox Integration Support", contact: "integration@abdm.gov.in" }
        ]
      },

      linkedin_post: {
        hook: "🏥 Digital Health Transformation: Ministry of Health issues mandatory interoperability guidelines for all 50+ bed clinical establishments across India.",
        body: `A pivotal milestone in creating an integrated, patient-centric healthcare ecosystem has arrived.

Under the new circular, all hospitals, diagnostic chains, and medical institutions must transition to FHIR R4.0 interoperability standards under the Ayushman Bharat Digital Mission (ABDM).

Key Milestones:
🔹 30 Nov 2026: 100% ABHA patient account seeding at registration
🔹 15 Jan 2027: Bi-directional EHR linking via certified gateways
🔹 31 Mar 2027: Full compliance sign-off & consent manager integration

💡 Financial Incentives: Early-adopting facilities can claim up to ₹500 per digitized transaction under the Digital Health Incentive Scheme (DHIS).

Is your hospital IT infrastructure ready for seamless EHR interoperability? Learn more about the technical specifications below.`,
        key_points: [
          "Statutory compliance for 50+ bed facilities",
          "Substantial DHIS financial incentives available",
          "Enhanced continuity of care for millions of patients"
        ],
        hashtags: ["#DigitalHealth", "#ABDM", "#HealthTech", "#HealthcareTransformation", "#HospitalManagement"],
        char_count: 940
      },

      presentation: {
        total_slides: 5,
        slides: [
          {
            slide_number: 1,
            title: "ABDM Milestone 3 Interoperability Mandate",
            subtitle: "Compliance Roadmap & Technical Architecture for Hospitals",
            bullets: [
              "MoHFW Statutory Notification Ref: NDHM/COMP/2026/041",
              "Scope: All hospitals, clinics, and labs with 50+ bed capacity",
              "Primary Objective: Unified, encrypted patient record portability nationwide"
            ],
            speaker_notes: "This deck outlines the regulatory obligations and technical milestones required of hospital leadership."
          },
          {
            slide_number: 2,
            title: "Three-Phase Compliance Timeline",
            subtitle: "Strict Timetable Towards Full Certification",
            bullets: [
              "Phase 1 (Nov 30, 2026): 100% ABHA verification at OPD/IPD check-in",
              "Phase 2 (Jan 15, 2027): FHIR R4.0 Electronic Health Record exchange gateway live",
              "Phase 3 (Mar 31, 2027): Final consent manager audit and operational certification"
            ],
            speaker_notes: "Stress that Phase 1 requires only front-desk workflow updates, while Phase 2 involves deep EMR backend integration."
          },
          {
            slide_number: 3,
            title: "Financial Incentives & Penalties",
            subtitle: "The Business Case for Timely Compliance",
            bullets: [
              "DHIS Rewards: Up to ₹500 subsidy per digitized patient transaction",
              "Priority access to National Health Claims Exchange (NHCX) paperless insurance claims",
              "Non-compliance risk: Review of NABH accreditation and empanelment suspension"
            ],
            speaker_notes: "Highlight the DHIS economics: a 200-bed hospital processing 3,000 monthly patients can generate substantial IT modernization offsets."
          },
          {
            slide_number: 4,
            title: "Required Architecture Changes",
            subtitle: "From Legacy Silos to Federated Interoperability",
            bullets: [
              "Bridge existing HMS/EMR database via certified Open APIs",
              "Implement Consent Manager and Gateway (CMG) for cryptographic patient approvals",
              "Enforce strict adherence to DPDP Act 2023 data minimization norms"
            ],
            speaker_notes: "Our technical team can guide internal developers through the NHA Sandbox testing environment."
          },
          {
            slide_number: 5,
            title: "Action Items for Hospital Leadership",
            subtitle: "Next 30 Days Execution Priorities",
            bullets: [
              "Designate internal ABDM Nodal Officer by next Friday",
              "Schedule vendor readiness review with current EHR/HMS software providers",
              "Initiate staff training for front-desk ABHA generation kiosks"
            ],
            speaker_notes: "Concluding slide. Encourage immediate registration on the NHA sandbox."
          }
        ]
      },

      infographic_plan: {
        title: "ABDM Interoperability Compliance Roadmap",
        catchphrase: "One Patient, One Record: Connecting Healthcare Nationwide",
        key_statistic: {
          number: "₹500",
          unit: "Per Record",
          label: "Incentive available to compliant hospitals under the DHIS Scheme"
        },
        key_messages: [
          "Mandatory for all medical facilities with 50+ beds",
          "Three clear milestone deadlines: Nov 2026, Jan 2027, Mar 2027",
          "Patient consent is sovereign and cryptographically protected",
          "Paperless, fast-track insurance claim processing via NHCX"
        ],
        important_facts: [
          "FHIR R4.0 recognized as universal data standard",
          "Over 500 million ABHA IDs already generated nationwide",
          "Accreditation audits linked to interoperability compliance"
        ],
        timeline: [
          { phase: "Nov 30, 2026", action: "Milestone 1: 100% ABHA Patient Linkage" },
          { phase: "Jan 15, 2027", action: "Milestone 2: FHIR Gateway EHR Integration" },
          { phase: "Mar 31, 2027", action: "Milestone 3: Full Interoperability Sign-off" }
        ],
        visual_hierarchy: [
          "Header: National Digital Health Roadmap Title & Trust Badge",
          "Hero: Incentive Callout Box (₹500 per transaction)",
          "Central Timeline: 3 Step Progress Track with Milestone Flags",
          "Four Benefit Quadrants: Patient, Hospital, Doctor, Insurer",
          "Footer: Helpdesk link and NHA integration QR code"
        ],
        suggested_icons: [
          "Stethoscope with digital signal",
          "Hospital building with network nodes",
          "Shield with lock (Consent Security)",
          "Rupee symbol with growth arrow (Incentives)"
        ],
        call_to_action: "Register your hospital on the ABDM Sandbox portal today."
      }
    }
  },
  {
    id: "proj-003",
    title: "Critical Infrastructure Cybersecurity Advisory",
    source_type: "document",
    source_format: "TXT (Incident Alert CERT-IN/SCADA/2026-99)",
    source_name: "CERT_IN_SCADA_Telemetry_Advisory.txt",
    source_size: "320 KB",
    word_count: 980,
    created_at: "2026-09-19T08:45:00Z",
    status: "Completed",
    category: "Cybersecurity Brief",
    author: "Chief Information Security Officer, Smart Cities Mission",
    selected_formats: ["executive_summary", "government_advisory", "linkedin_post", "x_thread"],
    config: {
      target_audience: "Municipal IT Officers & SCADA Engineers",
      tone: "Urgent",
      language: "English",
      detail_level: "Detailed",
      objective: "Alert & Direct Emergency Action"
    },
    source_text: `CRITICAL INFORMATION INFRASTRUCTURE PROTECTION CENTRE (NCIIPC) & CERT-IN
FLASH ADVISORY: ALERT-SCADA-2026-0922 | SEVERITY: HIGH / CRITICAL

SUBJECT: TARGETED CREDENTIAL SPRAYING AND UNAUTHORIZED MODBUS/TCP PROBING AGAINST MUNICIPAL WATER UTILITY AND TRAFFIC SCADA SYSTEMS

1. INCIDENT DESCRIPTION:
Telemetry collected from national honeypot networks between 15th-18th September indicates coordinated reconnaissance campaigns originating from botnets targeting exposed Port 502 (Modbus/TCP) and Port 47808 (BACnet) across 14 municipal corporations. Threat actors are exploiting default vendor administrative credentials on legacy Remote Terminal Units (RTUs) and programmable logic controllers (PLCs).

2. INDICATORS OF COMPROMISE (IoCs):
- Inbound connection spikes on Port 502 from known proxy egress ranges: 185.220.101.0/24 and 193.148.16.0/22.
- Failed authentication loops on web-based Human Machine Interfaces (HMIs) matching user 'administrator', 'operator', 'scada_admin'.

3. IMMEDIATE MANDATORY ACTIONS:
- Firewall Rule Enforcement: Block all external WAN ingress on TCP Ports 502, 102, and 47808 immediately.
- Air-gap Verification: Verify that operational technology (OT) networks are strictly segmented from administrative corporate IT networks via unidirectional data diodes or hardened DMZ firewalls.
- Credential Reset: Enforce mandatory password rotation on all RTU/PLC firmware and disable default factory accounts.
- Log Forwarding: Direct all perimeter firewall syslog streams to the National Cyber Coordination Centre (NCCC) portal.`,

    analysis: {
      main_topic: "Active Threat Campaign Against Municipal SCADA & Water Utility Networks",
      summary: "CERT-In telemetry identifies coordinated brute-force and credential spraying attacks targeting exposed Modbus/TCP port 502 on municipal water and traffic control systems. Immediate isolation and credential reset mandated.",
      key_facts: [
        "Targets industrial ports 502 (Modbus) and 47808 (BACnet).",
        "Affects legacy RTU and PLC installations across 14 municipal bodies.",
        "Primary attack vector: default manufacturer credentials and unsegmented WAN exposures.",
        "No reported operational shutdown; threat contained in reconnaissance phase."
      ],
      key_messages: [
        "Immediately isolate OT industrial control networks from the public internet.",
        "Enforce multi-factor authentication and rotate all default factory passwords.",
        "Submit suspicious firewall logs to the CERT-In incident portal."
      ],
      entities: {
        organizations: ["CERT-In", "NCIIPC", "Ministry of Housing & Urban Affairs", "Municipal Corporations"],
        locations: ["14 Municipal Utility Centres"],
        roles: ["CISO", "SCADA Network Engineers", "Municipal Commissioners"],
        regulations: ["IT Act Section 70 (Critical Information Infrastructure)", "CERT-In Directions 2022"]
      },
      important_events: [
        { time: "15-18 SEP", event: "Automated port probing detected across municipal IP ranges" },
        { time: "19 SEP 07:00", event: "CERT-In Flash Advisory ALERT-SCADA-2026-0922 issued" },
        { time: "24-HOUR DEADLINE", event: "Mandatory compliance report due on OT isolation" }
      ],
      detected_audience: "Municipal IT Heads, OT Engineers, Cyber Response Teams",
      potential_sensitivity: "Critical Cybersecurity Warning (Institutional Restricted)"
    },

    outputs: {
      executive_summary: {
        overview: "A national cybersecurity advisory has been dispatched following automated reconnaissance targeting municipal water distribution and traffic signal supervisory control and data acquisition (SCADA) networks. Prompt network segmentation and credential updates are required to prevent lateral intrusion.",
        key_findings: [
          "Targeted port probing identified across 14 municipal corporation networks.",
          "Attacks exploit exposed default credentials on unsegmented industrial controllers.",
          "Immediate containment window: 24 hours to enforce WAN access control lists."
        ],
        implications: [
          "Potential vulnerability of civic water chlorination and pump station controls if unpatched.",
          "Statutory requirement under CERT-In guidelines to submit incident reports within 6 hours of detected anomaly."
        ],
        recommended_actions: [
          { priority: "P0 (Immediate)", action: "Isolate TCP Port 502 and Port 47808 at boundary perimeter firewalls.", owner: "Network Admin" },
          { priority: "P0 (Immediate)", action: "Enforce rotation of all default vendor credentials on RTUs and PLCs.", owner: "SCADA Engineer" },
          { priority: "P1 (High)", action: "Conduct OT-IT network boundary air-gap audit.", owner: "CISO" }
        ],
        sources: ["CERT-In Advisory Ref #2026-0922", "NCIIPC Telemetry Report"]
      },

      government_advisory: {
        ref_number: "CERT-IN/CRIT-INFRA/2026/041",
        date: "19 September 2026",
        issuing_authority: "INDIAN COMPUTER EMERGENCY RESPONSE TEAM (CERT-IN)",
        department: "Critical Infrastructure Cyber Defense Directorate",
        situation_overview: "Active cyber threat actors are scanning municipal IP ranges for exposed industrial control protocols. Municipal authorities must safeguard supervisory systems immediately.",
        key_information: "All external internet access to industrial control interfaces must be severed immediately. Virtual Private Network (VPN) with multi-factor authentication (MFA) is strictly mandatory for remote engineering maintenance.",
        affected_areas: ["All Municipal Water Boards, Sewage Treatment Utilities, and Smart Traffic Control Centers"],
        potential_impact: "Unauthorized parameter tampering, service disruption, or data theft if industrial controllers remain exposed.",
        recommended_actions: [
          "Verify that no SCADA/HMI server has a direct public IP address.",
          "Disable Telnet, HTTP, and FTP on all industrial network devices.",
          "Verify integrity of PLC logic programs against baseline golden images."
        ],
        public_guidance: "Civic services remain fully operational and secure. This advisory is an administrative defense directive.",
        emergency_contacts: [
          { service: "CERT-In Incident Reporting Desk", contact: "incident@cert-in.org.in" },
          { service: "National Cyber Hotline", contact: "1930" }
        ]
      },

      linkedin_post: {
        hook: "🛡️ CYBERSECURITY ALERT: Critical protection directives issued for municipal SCADA networks and public water infrastructure.",
        body: `Public infrastructure resilience begins with rigorous operational technology (OT) hygiene.

Recent threat intelligence highlights active credential spraying targeting legacy industrial protocols (Modbus Port 502 and BACnet). Municipal bodies and utility operators are directed to take immediate action:

🔒 Critical Directives:
1. Air-gap or firewall-isolate all OT networks from corporate IT networks
2. Eliminate all default manufacturer credentials across PLCs and RTUs
3. Enforce multi-factor authentication for any remote maintenance access
4. Stream perimeter firewall logs to central security monitoring

Proactive cyber defense safeguards our civic lifelines. Review your municipal network perimeter today.`,
        key_points: [
          "Zero tolerance for exposed default credentials",
          "Mandatory segmentation between IT and OT systems",
          "Report all anomalous industrial traffic to CERT-In"
        ],
        hashtags: ["#CyberSecurity", "#CriticalInfrastructure", "#SCADA", "#SmartCities", "#InfoSec"],
        char_count: 850
      },

      x_thread: {
        post_count: 3,
        posts: [
          {
            post_number: 1,
            text: "🚨 1/3 [CYBER ADVISORY]: CERT-In has issued high-severity guidance for municipal utilities and smart city control centers regarding active probing of SCADA/Modbus systems. Municipal IT teams must verify network perimeter defenses immediately.",
            char_count: 247
          },
          {
            post_number: 2,
            text: "⚠️ 2/3 MANDATORY ACTIONS:\n• Block inbound WAN access on Port 502 (Modbus) & Port 47808 (BACnet)\n• Change all default factory passwords on industrial controllers\n• Ensure strict air-gapping between administrative IT and utility OT networks.",
            char_count: 251
          },
          {
            post_number: 3,
            text: "📞 3/3 REPORTING:\nAny unauthorized access attempts or suspicious telemetry must be reported to the CERT-In Incident Response Desk at incident@cert-in.org.in or National Cyber Hotline 1930. Detailed advisory available in portal.",
            char_count: 228
          }
        ]
      }
    }
  },
  {
    id: "proj-004",
    title: "Seasonal Vector-Borne Disease Prevention Advisory",
    source_type: "document",
    source_format: "PDF (Public Health Directive HFW/2026/89)",
    source_name: "Directorate_Health_Dengue_Mitigation.pdf",
    source_size: "1.1 MB",
    word_count: 1340,
    created_at: "2026-09-17T11:20:00Z",
    status: "Completed",
    category: "Public Health",
    author: "Director of Public Health & Preventive Medicine",
    selected_formats: ["executive_summary", "government_advisory", "linkedin_post", "infographic_plan", "video_package"],
    config: {
      target_audience: "General Citizens & Ward Health Officers",
      tone: "Informative",
      language: "English",
      detail_level: "Standard",
      objective: "Public Awareness & Community Sanitation"
    },
    source_text: `DIRECTORATE OF PUBLIC HEALTH & EPIDEMIOLOGY
CIRCULAR REF: DPH/VBD/2026/184 | DATED: 17th SEPTEMBER 2026

SUBJECT: INTENSIFIED COMMUNITY MOSQUITO SOURCE REDUCTION CAMPAIGN & CLINICAL PREPAREDNESS FOR MONSOON SEASON

1. EPIDEMIOLOGICAL CONTEXT:
Surveillance data from the Integrated Disease Surveillance Programme (IDSP) demonstrates a 18% weekly increase in recorded Dengue (DenV-2) and Chikungunya cases across urban wards with high container breeding indices. The larval Breteau Index (BI) in 12 identified municipal clusters has exceeded the safe threshold of 5%.

2. URBAN LOCAL BODY (ULB) RESPONSIBILITIES:
- Weekly 'Dry Day' Observance: Every Sunday to be observed as mandatory household container inspection day. Citizens are urged to empty air cooler trays, discarded tires, flower vases, and rooftop open drums.
- Anti-Larval Operations: Vector control squads must carry out focal pyrethrum space spraying and Bacillus thuringiensis israelensis (BTI) larviciding across all catch basins.
- Hospital Bed Reservation: 10% of general beds in district civil hospitals and Community Health Centres (CHCs) to be reserved with mosquito nets for febrile patients.
- Diagnostic Availability: Free NS1 antigen and IgM ELISA testing to be maintained in sufficient stock at all primary health centers.`,

    analysis: {
      main_topic: "Intensified Dengue and Chikungunya Vector Control and Clinical Readiness",
      summary: "Following an 18% increase in seasonal vector-borne infection rates, public health authorities have mandated weekly Dry Day community drives, anti-larval spraying, and 10% bed reservation in civil hospitals.",
      key_facts: [
        "18% week-on-week increase in reported febrile vector cases.",
        "Larval Breteau Index exceeded 5% safety mark across 12 urban wards.",
        "Weekly Sunday community 'Dry Day' designated for water container emptying.",
        "10% bed reservation with insecticidal nets in public hospitals.",
        "Free diagnostic NS1/IgM testing available at all Primary Health Centres."
      ],
      key_messages: [
        "Prevent mosquito breeding by eliminating stagnant water in coolers and flower pots every Sunday.",
        "Do not self-medicate with aspirin or ibuprofen for high fever; consult nearest health centre.",
        "Seek medical advice if fever persists beyond 48 hours or warning signs appear."
      ],
      entities: {
        organizations: ["Directorate of Public Health", "IDSP", "Municipal Health Department", "CHCs"],
        locations: ["12 High-Burden Urban Wards", "District Hospitals"],
        roles: ["Ward Sanitary Inspectors", "Chief Medical Officers", "ASHA Health Workers"],
        regulations: ["Public Health Act", "National Vector Borne Disease Control Programme"]
      },
      important_events: [
        { time: "17 SEP", event: "Epidemiological Advisory released" },
        { time: "EVERY SUNDAY", event: "Ward-wide Community Dry Day & source reduction inspection" },
        { time: "DAILY", event: "Morning and evening fogging in identified cluster wards" }
      ],
      detected_audience: "Urban Citizens, Resident Welfare Associations, Ward Health Staff",
      potential_sensitivity: "Public Health Awareness (Non-Alarmist, Action-Oriented)"
    },

    outputs: {
      executive_summary: {
        overview: "The Directorate of Public Health has initiated an intensified vector-borne disease containment drive in response to early monsoon epidemiological indicators showing localized surges in Dengue incidence across 12 urban wards.",
        key_findings: [
          "Breteau Index has climbed above the 5% risk threshold in high-density residential wards.",
          "Stagnant water accumulation in evaporative coolers and rooftop storage is the primary vector source.",
          "Early clinical intervention protocols have been distributed to all primary health centres."
        ],
        implications: [
          "Requirement for synchronized civic fogging and community-led domestic source reduction.",
          "Need to prevent secondary transmission through strict in-hospital mosquito netting."
        ],
        recommended_actions: [
          { priority: "P0 (Immediate)", action: "Mobilize ASHA workers and sanitary staff for house-to-house larval inspections.", owner: "Municipal Health Officer" },
          { priority: "P1 (Weekly)", action: "Execute community awareness campaigns for Sunday Dry Day observance.", owner: "Information & PR Dept" },
          { priority: "P1 (Ongoing)", action: "Ensure adequate stocks of NS1 diagnostic kits and platelets at blood banks.", owner: "Civil Surgeon" }
        ],
        sources: ["IDSP Weekly Epidemiological Bulletin", "DPH Vector Survey Report"]
      },

      government_advisory: {
        ref_number: "DPH/HEALTH-ADV/2026/058",
        date: "17 September 2026",
        issuing_authority: "DIRECTORATE OF PUBLIC HEALTH & EPIDEMIOLOGY",
        department: "National Vector Borne Disease Control Programme",
        situation_overview: "With the onset of seasonal post-monsoon weather patterns, urban areas are witnessing increased Aedes mosquito breeding. Proactive containment prevents widespread transmission.",
        key_information: "A collective civic drive is underway across all municipal wards. Every Sunday is declared a 'Dry Day' for checking and emptying open water receptacles.",
        affected_areas: ["All Urban Local Bodies, Town Municipalities, and Peri-Urban Settlements"],
        potential_impact: "Seasonal vector transmission manageable through timely community source reduction and early diagnosis.",
        recommended_actions: [
          "Clean and dry domestic desert coolers, flower vases, and animal water troughs weekly.",
          "Keep overhead water storage tanks tightly covered with sealed lids.",
          "Use mosquito repellents and wear full-sleeve clothing during dawn and dusk hours."
        ],
        public_guidance: "In case of sudden high fever, severe headache, or joint pain, visit the nearest government health center immediately. Diagnostic tests are completely free of charge.",
        emergency_contacts: [
          { service: "State Health Helpline (Toll-Free)", contact: "104" },
          { service: "Vector Control Sanitation Helpdesk", contact: "011-23965555" },
          { service: "Ambulance Emergency Dispatch", contact: "108" }
        ]
      },

      linkedin_post: {
        hook: "🦟 Community Health Focus: Public health advisory on vector-borne disease prevention and civic source reduction.",
        body: `Public health is a shared civic responsibility.

As monsoon rains create potential micro-breeding sites for disease-carrying vectors, health authorities have rolled out an integrated community mitigation framework:

✨ 4 Essential Citizen Actions:
1. Observe 'Sunday Dry Day': Empty and scrub water trays in air coolers and plant pots
2. Secure overhead water tanks with tightly sealed lids
3. Avoid self-medicating with non-steroidal anti-inflammatory drugs; seek clinical testing
4. Report stagnant water accumulations to your ward municipal sanitary inspector

All Government Primary Health Centres are equipped with free diagnostic facilities and 24x7 clinical support.

Protect your family and neighborhood. Together, we can break the transmission cycle.`,
        key_points: [
          "Weekly source reduction prevents over 80% of vector breeding",
          "Free testing available at all government health facilities",
          "Dial 104 for health advice and consultation"
        ],
        hashtags: ["#PublicHealth", "#DenguePrevention", "#CommunityHealth", "#CivicAction", "#HealthAwareness"],
        char_count: 910
      },

      infographic_plan: {
        title: "Stop Dengue Before It Starts: 4-Step Home Defense",
        catchphrase: "Break the Breeding Cycle: 10 Minutes Every Sunday",
        key_statistic: {
          number: "80%",
          unit: "Breeding Sites",
          label: "Can be eliminated through simple weekly household water disposal"
        },
        key_messages: [
          "Inspect air coolers, flower pots, and plastic containers every Sunday",
          "Keep all water storage containers tightly covered",
          "Use mosquito nets and wear long-sleeved clothing",
          "Get free diagnostic testing at your nearest Health Centre"
        ],
        important_facts: [
          "Aedes mosquitoes breed in clean, undisturbed stagnant water",
          "Breeding cycle from egg to adult mosquito takes only 7 to 10 days",
          "Free testing available via 104 helpline coordination"
        ],
        timeline: [
          { phase: "Every Sunday", action: "Empty and dry all standing water containers" },
          { phase: "Mid-Week", action: "Inspect rooftop drains and sunshades after rain" },
          { phase: "On Symptoms", action: "Visit Health Centre within 24 hours of fever onset" }
        ],
        visual_hierarchy: [
          "Header: Clean Public Health Awareness Banner with Health Badge",
          "Hero: Large 80% Source Reduction Statistic",
          "Center: 4 Illustrated Home Hotspots (Coolers, Pots, Rooftops, Tanks)",
          "Warning Box: Fever Red Flags (Severe abdominal pain, persistent vomiting)",
          "Footer: State Health Helpline 104 and nearest clinic finder"
        ],
        suggested_icons: [
          "Calendar marked Sunday (Dry Day)",
          "Water droplet with prohibition slash (No Stagnant Water)",
          "House with protective shield (Safe Homes)",
          "Telephone with 104 dial badge (Helpline)"
        ],
        call_to_action: "Join your community this Sunday. Dedicate 10 minutes to protect your loved ones."
      },

      video_package: {
        title: "Beat the Bite: Community Dengue Prevention Guide",
        target_duration: "60 Seconds",
        target_audience: "Families, Urban Residents, Students",
        tone: "Friendly, Instructive, Clear, Actionable",
        scenes: [
          {
            scene_number: 1,
            time_range: "0:00 - 0:15",
            visual_description: "Upbeat music. Close-up of water dripping into a small flowerpot tray, followed by a magnifying glass graphic showing mosquito larvae.",
            narration_en: "Did you know that just a few spoons of stagnant water in your home can breed hundreds of mosquitoes in one week?",
            narration_hi: "क्या आप जानते हैं कि घर में जमा मात्र कुछ चम्मच पानी में भी सैकड़ों मच्छर पनप सकते हैं?",
            on_screen_text: "DID YOU KNOW? Aedes mosquitoes breed in clean standing water",
            transition: "Quick swipe to checklist"
          },
          {
            scene_number: 2,
            time_range: "0:15 - 0:30",
            visual_description: "A citizen cheerfully scrubbing an air cooler tray and covering a water drum with a tight lid.",
            narration_en: "Protect your home with Sunday Dry Day! Spend just ten minutes emptying coolers, pots, and buckets. Scrub them dry and cover all water tanks.",
            narration_hi: "रविवार को मनाएं 'ड्राई डे'! सिर्फ 10 मिनट में कूलर, गमलों और बर्तनों का पानी खाली करें और टंकियों को अच्छी तरह ढकें।",
            on_screen_text: "SUNDAY DRY DAY: 10 Minutes to a Mosquito-Free Home",
            transition: "Cut to health tip screen"
          },
          {
            scene_number: 3,
            time_range: "0:30 - 0:45",
            visual_description: "Doctor in a clinic speaking gently. Graphics highlighting 'No Self-Medication' and symptom warning signs.",
            narration_en: "If someone at home develops high fever, never take painkillers without advice. Visit your nearest government health clinic for free testing.",
            narration_hi: "बुखार होने पर बिना डॉक्टर की सलाह दर्द की दवाएं न लें। नजदीकी सरकारी अस्पताल में निःशुल्क जांच कराएं।",
            on_screen_text: "FEVER? Free Testing at Government Health Centres | Avoid Self-Medication",
            transition: "Fade to helpline screen"
          },
          {
            scene_number: 4,
            time_range: "0:45 - 0:60",
            visual_description: "Clean royal azure, emerald green, and white public health card displaying Toll-Free Helpline 104 with emergency logo.",
            narration_en: "For free medical advice or to report breeding in your area, call toll-free 104. Let's make our neighborhood dengue-free together!",
            narration_hi: "मुफ्त सलाह के लिए टोल-फ्री 104 पर कॉल करें। आइए मिलकर अपने इलाके को सुरक्षित बनाएं!",
            on_screen_text: "TOLL-FREE HEALTH HELPLINE: 104 | Department of Public Health",
            transition: "Fade to institutional end-card"
          }
        ]
      }
    }
  }
];

// Inject Phase 2C required fields (audit_trail, comments, version) into sample data
SAMPLE_PROJECTS.forEach(project => {
  project.version = 1;
  project.comments = [];
  project.audit_trail = [
    { time: 'T+0s', label: 'Source document submitted for transformation', type: 'info', meta: 'Operator initiated pipeline' },
    { time: 'T+1.2s', label: 'Source ingestion & format detection complete', type: 'success', meta: 'Text input' },
    { time: 'T+3.8s', label: 'Semantic analysis & entity extraction complete', type: 'success', meta: 'Key facts identified' },
    { time: 'T+5.1s', label: 'Audience calibration & tone adjustment applied', type: 'success', meta: project.config?.target_audience + ' · ' + project.config?.tone },
    { time: 'T+8.4s', label: 'Multi-channel artifact generation complete', type: 'success', meta: (project.selected_formats?.length || 0) + ' formats synthesized' },
    { time: 'T+9.0s', label: 'Verification & consistency audit passed', type: 'success', meta: 'Zero informational drift detected' },
    { time: 'T+9.2s', label: 'Artifacts ready for review & export', type: 'info', meta: 'All channels operational' },
  ];
});
