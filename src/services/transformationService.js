/**
 * S.U.T.R.A. Transformation Service
 * Simulates the backend AI pipeline: Source -> Understanding -> Transformation -> Response -> Artifact
 * Ready to be connected to cloud functions or backend API.
 */

import { getStoredProjects, saveStoredProjects } from './store';

export const PIPELINE_STEPS = [
  { id: 1, label: "Uploading Source", description: "Ingesting raw document bytes and validating security signatures" },
  { id: 2, label: "Extracting Content", description: "Parsing semantic text hierarchy, tables, dates, and metadata" },
  { id: 3, label: "Analyzing Context", description: "Running administrative language models to classify domain and urgency" },
  { id: 4, label: "Identifying Key Information", description: "Extracting statutory facts, deadlines, affected parties, and actions" },
  { id: 5, label: "Building Structured Knowledge", description: "Synthesizing unified institutional knowledge graph representation" },
  { id: 6, label: "Generating Selected Outputs", description: "Synthesizing audience-calibrated artifacts for chosen communication channels" },
  { id: 7, label: "Finalizing Artifacts", description: "Conducting tone audit, formatting compliance check, and persisting records" }
];

export async function runMockTransformation({
  sourceText,
  sourceName = "Source_Document.txt",
  sourceType = "text",
  selectedFormats = ["executive_summary", "government_advisory", "linkedin_post"],
  config = {
    target_audience: "General Public",
    tone: "Formal",
    language: "English",
    detail_level: "Standard",
    objective: "Inform"
  },
  onProgress = () => {}
}) {
  // Step-by-step progress simulation (restrained, institutional feel)
  for (let step = 1; step <= PIPELINE_STEPS.length; step++) {
    onProgress({
      currentStep: step,
      totalSteps: PIPELINE_STEPS.length,
      stepInfo: PIPELINE_STEPS[step - 1],
      isComplete: false
    });
    
    // Realistic timing variation per stage
    let delayMs = 350;
    switch(step) {
      case 1: delayMs = 400; break; // Ingest
      case 2: delayMs = 800; break; // Parse
      case 3: delayMs = 1500; break; // Analyze
      case 4: delayMs = 1200; break; // Identify
      case 5: delayMs = 900; break; // Build
      case 6: delayMs = 2000; break; // Generate (longest)
      case 7: delayMs = 600; break; // Finalize
    }
    
    await new Promise(res => setTimeout(res, delayMs));
  }

  // Derive title from text or source name
  const title = sourceText.split('\n')[0].replace(/[^a-zA-Z0-9\s.,-]/g, '').trim().slice(0, 70) 
    || `Transformation: ${sourceName.replace(/\.[^/.]+$/, "")}`;

  // Word count calculation
  const words = sourceText.trim().split(/\s+/).filter(Boolean).length || 240;

  // Build generated project object
  const newProject = {
    id: `proj-${Date.now().toString(36)}`,
    title: title || "New Administrative Communication Artifact",
    source_type: sourceType,
    source_format: sourceType === 'text' ? 'Direct Text Input' : 'Uploaded File',
    source_name: sourceName,
    source_size: `${Math.max(12, Math.round(words * 6.5 / 1024))} KB`,
    word_count: words,
    created_at: new Date().toISOString(),
    status: "Completed",
    category: determineCategory(sourceText),
    author: "Authorized Operator (Current Session)",
    selected_formats: selectedFormats,
    config,
    source_text: sourceText,
    analysis: generateAnalysisFromText(sourceText, config),
    outputs: generateOutputsFromText(sourceText, selectedFormats, config)
  };

  // Persist to store
  const projects = getStoredProjects();
  projects.unshift(newProject);
  saveStoredProjects(projects);

  onProgress({
    currentStep: PIPELINE_STEPS.length,
    totalSteps: PIPELINE_STEPS.length,
    stepInfo: PIPELINE_STEPS[PIPELINE_STEPS.length - 1],
    isComplete: true
  });

  return newProject;
}

function determineCategory(text) {
  const lower = text.toLowerCase();
  if (lower.includes('flood') || lower.includes('disaster') || lower.includes('evacuat') || lower.includes('cyclone')) {
    return "Disaster Management";
  }
  if (lower.includes('health') || lower.includes('fever') || lower.includes('hospital') || lower.includes('dengue') || lower.includes('medical')) {
    return "Public Health";
  }
  if (lower.includes('cyber') || lower.includes('scada') || lower.includes('port') || lower.includes('firewall') || lower.includes('threat')) {
    return "Cybersecurity";
  }
  if (lower.includes('scheme') || lower.includes('policy') || lower.includes('circular') || lower.includes('compliance')) {
    return "Policy Circular";
  }
  return "Administrative Communication";
}

function generateAnalysisFromText(text, config) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const firstLine = lines[0] || "Administrative Communication Source";
  
  return {
    main_topic: firstLine.slice(0, 90),
    summary: `Structured analysis derived from source text containing ${lines.length} paragraphs. Identifies operational directives, designated stakeholders, and compliance milestones calibrated for ${config.target_audience}.`,
    key_facts: [
      "Key directives formulated under institutional administrative authority.",
      "Clear deadlines and implementation responsibilities outlined for respective departments.",
      "Statutory guidelines adhere to existing public communication protocols.",
      `Target audience identified as: ${config.target_audience}.`,
      `Tone calibrated to: ${config.tone}.`
    ],
    key_messages: [
      "Adhere strictly to official verification protocols before publishing.",
      "Ensure synchronized dissemination across digital and field channels.",
      "Maintain accessible record logs for inter-departmental audit compliance."
    ],
    entities: {
      organizations: ["District Administration", "Public Information Directorate", "Coordination Committee"],
      locations: ["Administrative Headquarters", "District Regional Sectors"],
      roles: ["Authorized Information Officer", "Departmental Nodal Officer"],
      regulations: ["Right to Information Act", "Official Communications Guidelines"]
    },
    important_events: [
      { time: "T+00 HRS", event: "Source submission and AI semantic parsing completed" },
      { time: "T+02 HRS", event: "Departmental review and approval sign-off window" },
      { time: "T+04 HRS", event: "Scheduled multi-channel dissemination" }
    ],
    detected_audience: config.target_audience,
    potential_sensitivity: "Standard Administrative Guidance (Public Release Authorized)"
  };
}

function generateOutputsFromText(text, selectedFormats, config) {
  const outputs = {};
  const isHindi = config.language === "Hindi";
  const isHinglish = config.language === "Hinglish";

  if (selectedFormats.includes("executive_summary")) {
    outputs.executive_summary = {
      overview: `Executive summary synthesized from the submitted document for ${config.target_audience}. The briefing identifies critical operational imperatives, affected domains, and immediate response protocols in accordance with ${config.tone.toLowerCase()} communication objectives.`,
      key_findings: [
        "Primary operational directives require inter-agency coordination within the next 24 hours.",
        "Resource allocation and field officer deployment must align with verified priority matrices.",
        "Communication safeguards prevent informational drift across public-facing channels."
      ],
      implications: [
        "Immediate readiness check required across designated regional nodal desks.",
        "Enhanced public helpline capacity recommended during the active advisory window."
      ],
      recommended_actions: [
        { priority: "P0 (Immediate)", action: "Notify zonal coordinators and establish emergency communication roster.", owner: "Administration Desk" },
        { priority: "P1 (High)", action: "Disseminate approved advisories through verified official channels.", owner: "Public Information Cell" }
      ],
      sources: ["Submitted Source Document", "Administrative Verification Protocol"]
    };
  }

  if (selectedFormats.includes("government_advisory")) {
    outputs.government_advisory = {
      ref_number: `ADV/ADM/2026/${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      issuing_authority: "DEPARTMENT OF PUBLIC INFORMATION & COORDINATION",
      department: "Office of the Authorized Information Officer",
      situation_overview: `Official advisory issued regarding administrative directives detailed in the source communication. All concerned departments and citizens are advised to take note of the guidelines outlined herein.`,
      key_information: `Directives have been calibrated with high institutional rigor for ${config.target_audience}. Ensure all instructions are strictly carried out in accordance with standard operating procedures.`,
      affected_areas: ["All Designated Administrative Sectors and Municipal Jurisdictions"],
      potential_impact: "Orderly administrative execution, prevention of misinformation, and timely public service delivery.",
      recommended_actions: [
        "Comply with instructions issued by authorized departmental nodal representatives.",
        "Refrain from circulating unverified claims or unofficial excerpts.",
        "Refer to verified government portals for real-time status updates."
      ],
      public_guidance: "This advisory represents authorized administrative information for general guidance and public safety.",
      emergency_contacts: [
        { service: "Central Administrative Helpdesk", contact: "1800-11-2026" },
        { service: "Public Grievance Redressal Cell", contact: "011-23381200" }
      ]
    };
  }

  if (selectedFormats.includes("linkedin_post")) {
    const postBody = isHindi 
      ? `📢 महत्वपूर्ण प्रशासनिक सूचना: सभी संबंधित विभागों और नागरिकों के लिए नवीन दिशानिर्देश जारी किए गए हैं।\n\nसटीक समन्वय, पारदर्शिता और नागरिक कल्याण सुनिश्चित करने के उद्देश्य से मुख्य निर्देश निम्नानुसार हैं:\n• निर्धारित समय-सीमा के भीतर आवश्यक कार्रवाई पूर्ण करें\n• आधिकारिक माध्यमों से ही सूचना सत्यापित करें\n• जनहित में सहयोग प्रदान करें।`
      : isHinglish
      ? `📢 Important Administrative Update: New guidelines have been issued for smooth coordination across all sectors.\n\nKey highlights for transparent implementation:\n• Timely action to ensure full public safety & efficiency\n• Verified updates exclusively through official handles\n• Public cooperation is key to seamless execution.`
      : `📢 PUBLIC UPDATE: Official administrative guidance issued regarding strategic implementation guidelines.\n\nTo ensure coordinated execution, transparent reporting, and citizen safety, key measures have been put in place:\n• Dedicated nodal teams deployed for on-ground verification\n• Unified communication protocol activated to prevent informational drift\n• Continuous public support helplines operational 24x7.\n\nWe encourage all stakeholders and citizens to stay informed through authorized channels.`;

    outputs.linkedin_post = {
      hook: "🏛️ Administrative Announcement: Key updates and strategic directives for public information and inter-agency coordination.",
      body: postBody,
      key_points: [
        "Directives issued under official administrative purview",
        "24x7 verification helpdesk active",
        "Promoting institutional transparency and public trust"
      ],
      hashtags: ["#GoodGovernance", "#PublicAdministration", "#CitizenFirst", "#CivicCoordination"],
      char_count: postBody.length + 180
    };
  }

  if (selectedFormats.includes("x_thread")) {
    outputs.x_thread = {
      post_count: 3,
      posts: [
        {
          post_number: 1,
          text: `🏛️ 1/3 [OFFICIAL UPDATE]: Administrative guidance issued concerning designated operational protocols. Line departments instructed to initiate synchronized execution immediately. Full details below ⬇️`,
          char_count: 220
        },
        {
          post_number: 2,
          text: `⚠️ 2/3 KEY DIRECTIVES:\n• Verify all field instructions via certified nodal officers\n• Comply with established deadlines and reporting benchmarks\n• Helpline desks active for public assistance and queries.`,
          char_count: 235
        },
        {
          post_number: 3,
          text: `📞 3/3 FOR CITIZENS:\nAccess verified official updates and advisories directly on the S.U.T.R.A. portal. Report queries to toll-free 1800-11-2026. Please share to promote verified information.`,
          char_count: 228
        }
      ]
    };
  }

  if (selectedFormats.includes("presentation")) {
    outputs.presentation = {
      total_slides: 6,
      slides: [
        {
          slide_number: 1,
          title: "Executive Administrative Briefing",
          subtitle: `Strategic Overview | Prepared for ${config.target_audience}`,
          bullets: [
            "Official briefing synthesized via S.U.T.R.A. Information Transformation Pipeline",
            "Synthesized from source document with focus on statutory compliance",
            `Audience: ${config.target_audience} | Tone: ${config.tone}`
          ],
          speaker_notes: "Welcome attendees. This briefing captures the high-level policy directions, responsibilities, and milestones established in the source advisory."
        },
        {
          slide_number: 2,
          title: "Context & Statutory Rationale",
          subtitle: "Administrative Imperatives",
          bullets: [
            "Identifies immediate operational priorities across relevant jurisdictions",
            "Aligns institutional stakeholders with clear accountability matrices",
            "Mitigates informational discrepancies between internal and external channels"
          ],
          speaker_notes: "Highlight the critical requirement for inter-departmental consistency before any public release."
        },
        {
          slide_number: 3,
          title: "Key Findings & Operational Assessment",
          subtitle: "Core Metrics & Impact Areas",
          bullets: [
            "Implementation timelines partitioned into immediate (T+24h) and review (T+7d) phases",
            "Resource mobilization coordinated with line departments and regional desks",
            "Verification audits scheduled to confirm compliance benchmarks"
          ],
          speaker_notes: "Focus on the timeline deliverables and verify that each desk has designated primary points of contact."
        },
        {
          slide_number: 4,
          title: "Risk Analysis & Contingency Planning",
          subtitle: "Institutional Safeguards",
          bullets: [
            "Proactive protocols established to address potential bottleneck scenarios",
            "Continuous monitoring of public sentiment and grievance redressal channels",
            "Secure escalation paths for critical incidents or clarifications"
          ],
          speaker_notes: "Brief the leadership team on escalation triggers and emergency contact protocols."
        },
        {
          slide_number: 5,
          title: "Strategic Recommendations",
          subtitle: "Action Items for Line Leadership",
          bullets: [
            "Conduct briefings with field personnel within 12 hours of circular release",
            "Deploy standard communication assets across digital and print touchpoints",
            "Maintain audit trail of all notices, circulars, and media releases"
          ],
          speaker_notes: "Review the checklist with all zonal heads before adjourning."
        },
        {
          slide_number: 6,
          title: "Conclusion & Rollout Schedule",
          subtitle: "Next Steps & Verification",
          bullets: [
            "Phase 1 deployment effective immediately upon circular sign-off",
            "Central Helpdesk active 24x7 for inter-agency coordination queries",
            "Next review milestone scheduled in 48 hours"
          ],
          speaker_notes: "Open the floor for questions from nodal representatives."
        }
      ]
    };
  }

  if (selectedFormats.includes("infographic_plan")) {
    outputs.infographic_plan = {
      title: "Public Information Infographic Blueprint",
      catchphrase: "Clarity, Coordination, and Public Trust: Strategic Guidelines",
      key_statistic: {
        number: "100%",
        unit: "Verification",
        label: "Mandatory administrative sign-off across all disseminated communications"
      },
      key_messages: [
        "Official guidelines formulated for transparent public communication",
        "Field officers deployed for on-ground assistance and guidance",
        "Public helplines operational 24x7 for queries and grievance logging",
        "Always rely on verified administrative sources for authentic updates"
      ],
      important_facts: [
        `Target Audience: ${config.target_audience}`,
        `Communication Objective: ${config.objective}`,
        "Cross-channel consistency maintained through unified knowledge graph"
      ],
      timeline: [
        { phase: "Phase 1: Release", action: "Circular notification issued via official gazette & portal" },
        { phase: "Phase 2: Briefing", action: "Inter-agency coordination and nodal officer orientation" },
        { phase: "Phase 3: Public Outreach", action: "Multi-channel broadcast across digital, social, and press" },
        { phase: "Phase 4: Feedback", action: "Continuous grievance monitoring and status review" }
      ],
      visual_hierarchy: [
        "Top Header: Institutional Emblem-free Title & S.U.T.R.A. Transformation Tag",
        "Hero Stat Card: 100% Verification & Compliance Milestone",
        "Center Grid: 4 Action Pillars with high-contrast icons",
        "Timeline Section: 4-Phase Chronological Implementation Path",
        "Footer: Contact info, QR code for official document verification"
      ],
      suggested_icons: [
        "Document with checkmark (Verified Circular)",
        "Users group (Inter-agency Coordination)",
        "Megaphone / Bell (Public Dissemination)",
        "Shield (Compliance & Trust)"
      ],
      call_to_action: "Read the complete advisory on the official portal or contact your local administrative office."
    };
  }

  if (selectedFormats.includes("video_package")) {
    outputs.video_package = {
      title: "Administrative Brief: Key Updates and Public Guidance",
      target_duration: "60 Seconds",
      target_audience: config.target_audience,
      tone: config.tone,
      scenes: [
        {
          scene_number: 1,
          time_range: "0:00 - 0:12",
          visual_description: "Establishing shot of administrative headquarters with institutional banner graphic overlay.",
          narration_en: "An important public information update has been issued by the administration to provide clarity on upcoming directives.",
          narration_hi: "प्रशासन द्वारा सभी नागरिकों और संबंधित विभागों के लिए एक महत्वपूर्ण सूचना जारी की गई है।",
          on_screen_text: "OFFICIAL BRIEFING: Key Directives and Guidelines",
          transition: "Clean slide transition"
        },
        {
          scene_number: 2,
          time_range: "0:12 - 0:28",
          visual_description: "Motion graphic showing three highlighted bullet points with iconography representing coordination, safety, and compliance.",
          narration_en: "These directives establish structured timelines and designate key responsibilities across all administrative sectors.",
          narration_hi: "ये दिशानिर्देश सभी प्रशासनिक क्षेत्रों में स्पष्ट समय-सीमा और जिम्मेदारियां तय करते हैं।",
          on_screen_text: "KEY PILLARS: Timely Action • Field Coordination • Transparency",
          transition: "Fade to on-screen spokesperson"
        },
        {
          scene_number: 3,
          time_range: "0:28 - 0:45",
          visual_description: "Split-screen showcasing field offices and citizen service counters operating with verified guidelines.",
          narration_en: "Field officers are on duty to assist and answer questions, ensuring smooth and transparent execution.",
          narration_hi: "नागरिकों की सहायता के लिए अधिकारी उपस्थित हैं ताकि कार्य सुचारू रूप से संपन्न हो सके।",
          on_screen_text: "ON-GROUND SUPPORT: Nodal Desks Active for Citizen Guidance",
          transition: "Swipe to helpline graphic"
        },
        {
          scene_number: 4,
          time_range: "0:45 - 0:60",
          visual_description: "High-contrast card displaying toll-free helpline number, official website URL, and verification QR code.",
          narration_en: "For verified details and inquiries, contact the central helpdesk or visit the portal. Stay informed, stay empowered.",
          narration_hi: "अधिक जानकारी के लिए हमारे टोल-फ्री हेल्पलाइन या पोर्टल पर जाएं। सतर्क रहें, सशक्त रहें।",
          on_screen_text: "TOLL-FREE HELPLINE: 1800-11-2026 | S.U.T.R.A. Institutional Portal",
          transition: "Fade to institutional end-card"
        }
      ]
    };
  }

  return outputs;
}
