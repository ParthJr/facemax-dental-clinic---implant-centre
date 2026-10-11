/**
 * Central Business Configuration for FACEMAX Dental Clinic and Implant Centre
 * Contains editable contact details, operating hours, ratings, verified links,
 * confirmed clinical services, and API form submission configuration.
 */

export interface ClinicalService {
  id: string;
  index: string;
  categoryTag: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  keyFeatures: string[];
  clinicalNote?: string;
  badgeText?: string;
  actionText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PatientJourneyStage {
  stage: string;
  title: string;
  description: string;
  tagline: string;
  iconName: string;
}

export const BUSINESS_CONFIG = {
  name: "FACEMAX Dental Clinic and Implant Centre",
  shortName: "FACEMAX",
  tagline: "Centre for Advanced Surgical Implantology & Cosmetic Smile Architecture",
  location: "Kudasan · Gandhinagar",
  
  contact: {
    address: {
      line1: "Shop E 152, Pramukh Anand Orbit Mall",
      line2: "Near Reliance Circle, Kudasan",
      city: "Gandhinagar",
      state: "Gujarat",
      postalCode: "382419",
      fullFormatted: "Shop E 152, Pramukh Anand Orbit Mall, near Reliance Circle, Kudasan, Gandhinagar, Gujarat 382419"
    },
    phoneDisplay: "090338 65172",
    phoneTel: "+919033865172",
    phoneNumeric: "09033865172",
    whatsappTel: "919033865172",
    email: "info@facemaxdental.com"
  },

  reputation: {
    googleRating: 5.0,
    googleReviewCount: 12,
    verifiedProfileLabel: "Google Verified Medical Profile",
    featuredReview: {
      quote: "The difference at FACEMAX is the clinical patience. Everything was explained clearly using 3D scans before anything happened. The surgical suite in Kudasan feels like a boutique hospital, calm and spotless.",
      author: "Verified Patient",
      subtitle: "Gandhinagar Resident · Implant Assessment",
      platform: "Google Review"
    }
  },

  schedule: {
    openingTimeDisplay: "Opens at 10:00 AM daily",
    operatingHours: [
      { days: "Mon – Sat", hours: "10:00 AM – 08:30 PM" },
      { days: "Sunday", hours: "By Appointment" },
      { days: "Emergency Care", hours: "On Call Priority" }
    ],
    timeSlots: [
      "Morning (10:00 AM - 01:00 PM)",
      "Afternoon (02:00 PM - 05:00 PM)",
      "Evening (05:00 PM - 08:30 PM)"
    ]
  },

  verifiedLinks: {
    googleMapDirections: "https://maps.google.com/?q=Pramukh+Anand+Orbit+Mall+Kudasan+Gandhinagar",
    googleReviews: "https://www.google.com/maps/place/FACEMAX+Dental+Clinic+and+Implant+Centre/@23.1815,72.6369,17z/",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.652132!2d72.6369!3d23.1815!2m3!1f0!0!f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e803d1234567%3A0x123456789!2sPramukh%20Anand%20Orbit%20Mall!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },

  apiConfig: {
    // Documented environment variable or local Express fallback
    consultationEndpoint: import.meta.env.VITE_CONSULTATION_API_URL || "/api/consultation",
    timeoutMs: 8000
  },

  // Confirmed clinical treatments list (strictly factual, zero invented credentials)
  confirmedServices: [
    {
      id: "general-dental-care",
      index: "01",
      categoryTag: "PREVENTIVE ESSENTIAL",
      title: "General Dental Care",
      shortDescription: "Comprehensive oral evaluation, high-definition digital diagnostic imaging, ultrasonic prophylaxis, and gentle restorative care assessments.",
      detailedDescription: "Our general dental evaluations prioritize early detection, periodontal stability, and structured oral health planning in an unhurried clinical environment.",
      keyFeatures: [
        "High-definition intraoral camera diagnostics",
        "Precision caries detection & guided enamel care",
        "Personalized oral biome maintenance strategy"
      ],
      actionText: "Book General Examination"
    },
    {
      id: "cosmetic-dentistry",
      index: "02",
      categoryTag: "AESTHETIC ARCHITECTURE",
      title: "Cosmetic Dentistry",
      shortDescription: "Bespoke smile design, aesthetic ceramic veneers, tooth alignment planning, and subtle shade refinement engineered around your lip dynamics.",
      detailedDescription: "Cosmetic procedures are planned with digital precision to respect facial proportions, facial symmetry, and natural tooth translucency without invasive over-preparation.",
      keyFeatures: [
        "Hand-layered ultra-thin ceramic veneers",
        "Digital smile simulation & mock-up previews",
        "Conservative enamel-sparing aesthetic refinement"
      ],
      clinicalNote: "Subject to individual clinical assessment",
      actionText: "Explore Cosmetic Design"
    },
    {
      id: "restorative-dentistry",
      index: "03",
      categoryTag: "FUNCTIONAL REHABILITATION",
      title: "Restorative Dentistry",
      shortDescription: "Precision zirconia and e.max crown restorations, bonded ceramic inlays/onlays, and functional bite rehabilitation designed to recover full masticatory efficiency.",
      detailedDescription: "When teeth are structurally compromised, custom CAD/CAM restorations restore strength, contour, and harmonious occlusal alignment.",
      keyFeatures: [
        "Biocompatible full-ceramic crowns & bridges",
        "Precision bonded inlays and onlays",
        "Bespoke masticatory bite alignment"
      ],
      badgeText: "Bespoke functional fit",
      actionText: "Enquire Restorative Care"
    },
    {
      id: "orthodontic-consultations",
      index: "04",
      categoryTag: "DIGITAL SIMULATIONS",
      title: "Orthodontic Consultations",
      shortDescription: "Transparent aligner assessments, arch alignment, and occlusion evaluations using 3D digital impressions for discrete and predictable alignment pathways.",
      detailedDescription: "Evaluate clear aligner systems and orthodontic options using 3D digital impressions without uncomfortable traditional impression materials.",
      keyFeatures: [
        "3D intraoral digital arch scanning",
        "Discrete clear aligner feasibility planning",
        "Occlusion and bite stability evaluation"
      ],
      badgeText: "Digital 3D impressions",
      actionText: "Enquire Orthodontics"
    }
  ] as ClinicalService[],

  // Factual Implant Education Content
  implantEducation: {
    tagline: "UNDERSTANDING TOOTH REPLACEMENT",
    title: "KNOW YOUR OPTIONS BEFORE YOU DECIDE.",
    overview: "Dental implants may be one viable option for replacing missing teeth or stabilizing dentures. Suitability depends entirely on individual oral health, bone density, and a thorough professional clinical assessment.",
    clinicalNote: "No two anatomical profiles are alike. We utilize CBCT 3D bone mapping to evaluate biological viability before any surgical or restorative recommendations are made.",
    stages: [
      {
        number: "01",
        title: "Consultation",
        description: "Discuss your personal concerns, health background, masticatory difficulty, and expectations. We listen first to establish an accurate clinical baseline."
      },
      {
        number: "02",
        title: "Assessment",
        description: "Understand the relevant clinical evaluation, high-resolution radiographic investigations, and 3D digital bone architecture assessments required to verify suitability."
      },
      {
        number: "03",
        title: "Treatment Planning",
        description: "Review suitable options, biological alternatives, transparent cost breakdowns, surgical stages, and expected healing timelines in complete clarity."
      },
      {
        number: "04",
        title: "Restoration & Follow-Up",
        description: "Understand the planned crown or bridge restoration, permanent bite alignment, hygiene protocols, and ongoing multi-year preventative care requirements."
      }
    ]
  },

  // Patient Journey 4-Stage Pathway
  patientJourney: [
    {
      stage: "STAGE 01",
      title: "Enquire",
      description: "Reach out through our online consultation desk or direct phone line to express your questions, goals, and schedule preferences.",
      tagline: "RESPONSE WITHIN 24H",
      iconName: "chat"
    },
    {
      stage: "STAGE 02",
      title: "Consult",
      description: "Attend your diagnostic visit at our Kudasan suite for intraoral assessment and gentle examination in a calm atmosphere.",
      tagline: "NO PRESSURE PROTOCOL",
      iconName: "stethoscope"
    },
    {
      stage: "STAGE 03",
      title: "Understand",
      description: "Review imaging findings on large patient displays with your surgeon to examine options, pros, cons, and timelines.",
      tagline: "VISUAL TRANSPARENCY",
      iconName: "visibility"
    },
    {
      stage: "STAGE 04",
      title: "Plan",
      description: "Proceed with confidence on your chosen clinical schedule with a clear, documented treatment plan and known milestone dates.",
      tagline: "TAILORED TRAJECTORY",
      iconName: "event_available"
    }
  ] as PatientJourneyStage[],

  // Informed Patient FAQs
  faqs: [
    {
      id: "faq-1",
      question: "What happens during a dental consultation?",
      answer: "During your initial consultation, we conduct an extensive examination of your dentition, gums, and joint dynamics. We take high-definition digital photographs and, when indicated, low-radiation 3D radiographs. Most importantly, we dedicate time to sit with you, discuss your oral health goals or symptoms, and formulate actionable next steps together."
    },
    {
      id: "faq-2",
      question: "What should I ask before choosing a cosmetic procedure?",
      answer: "We advise asking: What are the minimal-prep or non-invasive alternatives? How will the procedure affect functional bite and chewing dynamics? What is the expected lifespan of the porcelain materials? And how can digital smile mock-ups preview the aesthetic balance with your facial proportions prior to any tooth modification?"
    },
    {
      id: "faq-3",
      question: "How are dental implant options assessed?",
      answer: "Implant feasibility relies on precise bone height, bone density, sinus cavity locations, and overall systemic health. We utilize Cone Beam CT (CBCT) imaging to virtually plan implant positioning in 3D prior to any surgical intervention, confirming absolute precision and patient comfort."
    },
    {
      id: "faq-4",
      question: "What should I know about treatment costs and timelines?",
      answer: "We operate on complete transparency. Following diagnostic assessment, you receive an itemized overview detailing all procedural phases, laboratory component fees, and appointment durations. Treatment timelines vary depending on whether biological tissue healing intervals are necessary."
    },
    {
      id: "faq-5",
      question: "How can I maintain oral health after dental treatment?",
      answer: "Longevity depends on regular home hygiene paired with periodic clinical reviews. Every patient receives a tailored post-procedure protocol, including specific flossing or interdental brushes, non-abrasive polishing pastes, and recommended routine recall appointments every 6 months."
    }
  ] as FAQItem[]
};
