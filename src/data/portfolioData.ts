export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period?: string;
  details?: string;
}

export interface PersonalInfo {
  name: string;
  professionalTitle: string;
  shortBio: string;
  extendedBio: string;
  experience: string;
  location: string;
  languages: string[];
  mainSpecialties: string[];
  otherExpertise: string[];
  profilePhoto: string;
  availabilityStatus: string;
  heroHeading: string;
  heroDescription: string;
  moreAboutMe: string;
  phone?: string;
  educationList?: EducationItem[];
  experienceList?: ExperienceItem[];
  toolsUsed?: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'DEVELOPMENT' | 'CONTENT & VIDEO' | 'AI CREATIVE' | 'DESIGN';
  description: string;
  iconName: string;
  tools: string[];
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  tools: string[];
  whoItIsFor: string;
  whatIsIncluded: string[];
  estimatedDeliveryTime: string;
  startingPrice: string;
  currency: string;
  whatTheClientReceives: string[];
  ctaText: string;
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  type: 'Client Project' | 'Personal Project' | 'Showcase Project';
  category: 'Web Development' | 'Python' | 'Video Editing' | 'AI Video' | 'AI Animation' | 'Thumbnails' | 'Posters' | 'Content Creation';
  featured: boolean;
  shortDescription: string;
  problem: string;
  myRole: string;
  toolsAndTechnologies: string[];
  solution: string;
  features: string[];
  screenshots: string[];
  videoUrl?: string;
  finalResult: string;
  liveLink?: string;
  gitHubLink?: string;
  date: string;
}

export interface StatisticItem {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface WhyWorkItem {
  number: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  price: string;
  currency: string;
  billingPeriod?: string;
  description: string;
  deliveryTime: string;
  revisions: string;
  features: string[];
  enabled: boolean;
  ctaText: string;
  popular?: boolean;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  business: string;
  review: string;
  project: string;
  date: string;
  clientImage?: string;
  rating: number;
}

export interface SocialLinks {
  email: string;
  fiverr: string;
  github: string;
  linkedin: string;
  instagram: string;
  whatsapp: string;
}

export interface ContactInfo {
  location: string;
  responseTime: string;
  preferredPlatform: string;
  workingHours: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: SkillItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  statistics: StatisticItem[];
  whyWorkWithMe: WhyWorkItem[];
  workProcess: ProcessStep[];
  pricing: PricingTier[];
  testimonials: TestimonialItem[];
  socialLinks: SocialLinks;
  contactInfo: ContactInfo;
}

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  personalInfo: {
    name: "Mr. Sagar",
    professionalTitle: "Digital Content Creator | Web Developer & CS Student",
    shortBio: "Hey! Mr Sagar here. Digital Content Creator and aspiring developer with 1+ years of self-driven experience producing video, photo, social content, responsive web development, and AI-accelerated workflows.",
    extendedBio: "Hey! Mr Sagar here. Digital Content Creator and aspiring with 1+ years of self-driven experience producing video, photo, and social content. Known for consistency, creative problem-solving, and a strong drive to improve both as a communicator and a technical creator. Comfortable wearing multiple hats: filming, editing, coding, and managing online presence.",
    experience: "1+ Years",
    location: "Peer Maluk Shah, Kot Badin, Pakistan",
    languages: ["English", "Urdu", "Sindhi"],
    mainSpecialties: [
      "Content Creation",
      "Video Editing",
      "Web Development (HTML, CSS, JS, Python)",
      "AI Integration & Prompt Engineering"
    ],
    otherExpertise: [
      "Photography & Retouching",
      "Modeling & Visual Branding",
      "Personal Project Management",
      "Social Marketing & Influencing",
      "Python & Flask Development",
      "Voice Generators & AI Translators",
      "Paid AI Tool Workflows (Kimi, Claude, Gemini, ChatGPT)",
      "Leadership & Communicator"
    ],
    profilePhoto: "/sagar_profile.jpg",
    availabilityStatus: "Available for Freelance & Collaborative Projects",
    heroHeading: "Mr. Sagar\nDigital Creator & Web Developer.",
    heroDescription: "Hey! Mr Sagar here. Digital Content Creator & Web Developer from Pakistan. I build modern responsive websites, craft viral video edits & digital content, and leverage state-of-the-art AI tools.",
    moreAboutMe: "Currently continuing Bachelor Program in Computer Science (CS) after completing Intermediate education in Sindh Badin. I blend programming logic in Python, Flask, HTML, CSS, and JS with visual storytelling, photo retouching, video production, and deep generative AI research.",
    phone: "+923113122617",
    toolsUsed: [
      "ChatGPT",
      "Google Gemini",
      "Claude",
      "Kimi",
      "GitHub Copilot",
      "Python 3 & Flask",
      "HTML5, CSS3, JavaScript",
      "Voice Generators & AI Translators",
      "Video & Photo Retouching Suites"
    ],
    educationList: [
      {
        id: "edu-1",
        degree: "Bachelor Program (CS)",
        institution: "Continue in Bachelor in Computer Science (CS)",
        period: "Current",
        details: "Focusing on software development, computer science fundamentals, web systems, and AI integration."
      },
      {
        id: "edu-2",
        degree: "Intermediate",
        institution: "Sindh Badin, Pakistan",
        period: "Completed",
        details: "Pre-engineering / science foundation with academic excellence."
      }
    ],
    experienceList: [
      {
        id: "exp-1",
        role: "Self Project Building",
        company: "Management & Consistency",
        location: "Pakistan",
        period: "2024 – Present",
        bullets: [
          "Integrated AI tools (ChatGPT, GitHub Copilot, Gemini, Claude, Kimi) into daily workflow to improve productivity and content output quality in videos and photo.",
          "Used AI tools to speed up coding, debug errors, and learn new web development concepts faster. Prompt making, edits, and multi-model workflows.",
          "Applied AI chatbots/tools to research and troubleshoot web development problems, improving build speed and code quality."
        ]
      },
      {
        id: "exp-2",
        role: "Video Editor, Website, etc.",
        company: "Self Experience & Partners",
        location: "Pakistan",
        period: "2020 – 2024",
        bullets: [
          "Stayed current with trending content formats and editing styles to keep output fresh and competitive.",
          "Collaborated informally with other creators to expand content ideas and improve production quality.",
          "Managed end-to-end video production workflow – scripting, filming, editing, color correction, and final publishing.",
          "Edited and retouched photography for digital branding and social media content.",
          "Created engaging social media content that grew audience reach and engagement over a 2-year period."
        ]
      }
    ]
  },
  skills: [
    {
      id: "skill-1",
      name: "Python Developer",
      category: "DEVELOPMENT",
      description: "Writing clean, efficient Python scripts, automation routines, API integrations, and backend utilities.",
      iconName: "Terminal",
      tools: ["Python 3", "Automation Scripts", "FastAPI / Flask", "BeautifulSoup", "Data Parsing"]
    },
    {
      id: "skill-2",
      name: "Web Developer",
      category: "DEVELOPMENT",
      description: "Building responsive, modern, mobile-friendly frontends with clean UI architectures and liquid interactions.",
      iconName: "Globe",
      tools: ["React", "TypeScript", "Tailwind CSS", "HTML5 & CSS3", "Responsive Layouts"]
    },
    {
      id: "skill-3",
      name: "Content Creator",
      category: "CONTENT & VIDEO",
      description: "Developing strategic digital content, engaging social assets, visual storytelling, and brand media.",
      iconName: "Sparkles",
      tools: ["Content Strategy", "Digital Storytelling", "Visual Hook Design", "Multi-platform Formats"]
    },
    {
      id: "skill-4",
      name: "Video Editor",
      category: "CONTENT & VIDEO",
      description: "Crafting polished video edits with pacing, smooth transitions, color adjustment, and sound synchronization.",
      iconName: "Video",
      tools: ["Video Trimming", "B-roll Integration", "Motion Titles", "Pacing & SFX"]
    },
    {
      id: "skill-5",
      name: "AI Video Creator",
      category: "AI CREATIVE",
      description: "Directing generative AI video workflows, prompt engineering, dynamic motion clips, and high-impact reels.",
      iconName: "Cpu",
      tools: ["AI Prompting", "Generative Video", "Scene Continuity", "Visual Upscaling"]
    },
    {
      id: "skill-6",
      name: "AI Animation Creator",
      category: "AI CREATIVE",
      description: "Generating stylized AI animations, motion graphics elements, character loops, and creative micro-visuals.",
      iconName: "Layers",
      tools: ["AI Animation Pipelines", "Keyframe Tweaking", "Concept Loops", "Dynamic Textures"]
    },
    {
      id: "skill-7",
      name: "Thumbnail Designer",
      category: "DESIGN",
      description: "Designing high-CTR YouTube thumbnails with vibrant contrast, clear typography, facial emphasis, and visual hierarchy.",
      iconName: "Image",
      tools: ["CTR Optimization", "Photoshop / Canva", "Typography Hierarchy", "Color Grading"]
    },
    {
      id: "skill-8",
      name: "Poster Designer",
      category: "DESIGN",
      description: "Designing modern digital posters, social media banners, event graphics, and promotional marketing creatives.",
      iconName: "Palette",
      tools: ["Poster Composition", "Vector Graphics", "Visual Branding", "Typography Layouts"]
    }
  ],
  services: [
    {
      id: "service-1",
      name: "Python Development & Automation",
      description: "Custom Python scripts, task automation, data scraping, and API integrations tailored to simplify your workflow.",
      tools: ["Python 3", "Automation Libraries", "REST APIs", "Requests"],
      whoItIsFor: "Individuals, professionals, and small businesses looking to automate repetitive tasks or build custom tools.",
      whatIsIncluded: [
        "Well-structured Python script source code",
        "Setup instructions and execution guide",
        "Error handling and exception checking",
        "Configurable parameters"
      ],
      estimatedDeliveryTime: "1–5 days",
      startingPrice: "$5",
      currency: "USD",
      whatTheClientReceives: [
        "Clean, commented Python codebase (.py)",
        "Requirements file and quick-start README",
        "Demonstration video or test run output"
      ],
      ctaText: "Order Python Service",
      featured: true
    },
    {
      id: "service-2",
      name: "Responsive Website Development",
      description: "Modern, responsive websites with clean interfaces, mobile optimization, and fast loading performance.",
      tools: ["React", "HTML5", "CSS3", "Tailwind CSS", "JavaScript"],
      whoItIsFor: "Individuals, content creators, freelancers, and growing businesses needing a professional web presence.",
      whatIsIncluded: [
        "Fully responsive layout (Desktop, Tablet, Mobile)",
        "Modern Apple-inspired Liquid Glass UI",
        "Cross-browser compatibility",
        "Clean semantic code structure",
        "Deployment guidance"
      ],
      estimatedDeliveryTime: "1–8 days (up to 15 days for larger projects)",
      startingPrice: "$10",
      currency: "USD",
      whatTheClientReceives: [
        "Complete source code repository",
        "Optimized production build files",
        "Live deployment support"
      ],
      ctaText: "Order Web Development",
      featured: true
    },
    {
      id: "service-3",
      name: "Content Creation",
      description: "Strategic digital content, post captions, carousel scripts, and visual concepts for digital channels.",
      tools: ["Creative Copywriting", "Canva", "Visual Concepting"],
      whoItIsFor: "Content creators, brands, and entrepreneurs wanting cohesive, engaging visual and textual content.",
      whatIsIncluded: [
        "Topic research and idea brainstorming",
        "Clear hook and body copywriting",
        "Visual formatting and layout suggestions",
        "Platform-specific optimization"
      ],
      estimatedDeliveryTime: "1–3 days",
      startingPrice: "$5",
      currency: "USD",
      whatTheClientReceives: [
        "Ready-to-publish content copy & templates",
        "Content calendar recommendations"
      ],
      ctaText: "Order Content Service"
    },
    {
      id: "service-4",
      name: "Video Editing",
      description: "Crisp, dynamic video editing with smooth cutaways, subtitles, sound design, and color balancing.",
      tools: ["Premiere Pro / CapCut", "Sound Effects", "Dynamic Subtitles"],
      whoItIsFor: "YouTubers, short-form creators (Reels/TikTok/Shorts), and educators seeking high-retention video edits.",
      whatIsIncluded: [
        "Pacing optimization and jump-cut cleaning",
        "Animated subtitles and captions",
        "Sound effects and background music mixing",
        "Color correction and export in 1080p / 4K"
      ],
      estimatedDeliveryTime: "1–4 days",
      startingPrice: "$5",
      currency: "USD",
      whatTheClientReceives: [
        "Rendered MP4 video file in requested aspect ratio",
        "Project files if required"
      ],
      ctaText: "Order Video Editing"
    },
    {
      id: "service-5",
      name: "AI Video Creation",
      description: "Cutting-edge AI-generated video sequences, cinematic conceptual reels, and visual storytelling.",
      tools: ["AI Video Generators", "Upscaling Tools", "Prompt Engineering"],
      whoItIsFor: "Marketers, creators, and brands wanting futuristic visuals without expensive camera crews.",
      whatIsIncluded: [
        "Custom prompt generation & scene styling",
        "High-definition video rendering",
        "Soundtrack pairing and pacing",
        "Aspect ratio formatting (16:9 or 9:16)"
      ],
      estimatedDeliveryTime: "1–4 days",
      startingPrice: "$10",
      currency: "USD",
      whatTheClientReceives: [
        "High-definition video files (.mp4)",
        "Prompt documentation used in generation"
      ],
      ctaText: "Order AI Video"
    },
    {
      id: "service-6",
      name: "AI Animation",
      description: "Dynamic AI-driven animations, motion graphic clips, aesthetic loops, and creative visual assets.",
      tools: ["AI Animation Suites", "Motion Interpolation", "Color Grading"],
      whoItIsFor: "Musicians, streamers, brands, and storytellers looking for unique animated visuals.",
      whatIsIncluded: [
        "Art direction & style exploration",
        "Smooth loop generation",
        "Visual effects & mood lighting",
        "Ready-to-use video/GIF exports"
      ],
      estimatedDeliveryTime: "2–5 days",
      startingPrice: "$10",
      currency: "USD",
      whatTheClientReceives: [
        "Seamless loop / animation render",
        "Multiple export resolutions"
      ],
      ctaText: "Order AI Animation"
    },
    {
      id: "service-7",
      name: "YouTube Thumbnail Design",
      description: "High-CTR, click-optimized YouTube thumbnails designed with bold contrast, expressive typography, and clear focal points.",
      tools: ["Photoshop", "Canva", "Color Correction Tools"],
      whoItIsFor: "YouTube creators seeking higher click-through rates and stand-out visual branding.",
      whatIsIncluded: [
        "Attention-grabbing composition",
        "Subject cutout & enhancement",
        "High-contrast readable typography",
        "Full HD 1920x1080 export"
      ],
      estimatedDeliveryTime: "1–2 days",
      startingPrice: "$5",
      currency: "USD",
      whatTheClientReceives: [
        "High-resolution PNG / JPG files",
        "Source file upon request"
      ],
      ctaText: "Order Thumbnail Design",
      featured: true
    },
    {
      id: "service-8",
      name: "Poster & Graphic Design",
      description: "Sleek digital posters, promotional flyers, announcements, and visual graphics for web and social media.",
      tools: ["Vector Design", "Photoshop", "Canva Pro"],
      whoItIsFor: "Event organizers, digital brands, creators, and businesses.",
      whatIsIncluded: [
        "Original custom poster design layout",
        "Modern typography and color scheme",
        "Print-ready & web-ready export formats",
        "Revision round for typography tweaks"
      ],
      estimatedDeliveryTime: "1–3 days",
      startingPrice: "$5",
      currency: "USD",
      whatTheClientReceives: [
        "Print-ready PDF and high-res web PNG/JPG",
        "Design source files upon request"
      ],
      ctaText: "Order Poster Design"
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "Python Workflow Automation & Data Extractor",
      type: "Personal Project",
      category: "Python",
      featured: true,
      shortDescription: "A modular Python automation tool designed to extract structured web information and format it into clean CSV and JSON datasets.",
      problem: "Extracting repetitive data from digital listings manually takes hours of tedious copy-pasting and is prone to human error.",
      myRole: "Python Developer — Architecture, scripting, exception handling, and dataset formatting.",
      toolsAndTechnologies: ["Python 3", "BeautifulSoup4", "Requests", "CSV/JSON Engine"],
      solution: "Developed an automated Python script with rate-limiting, custom header rotation, and structured JSON output to extract and clean public listings reliably.",
      features: [
        "Automated multi-page traversal",
        "Robust error resilience with auto-retry",
        "Clean dataset export to CSV and JSON",
        "Configurable CLI arguments"
      ],
      screenshots: [
        "/sagar_profile.jpg"
      ],
      finalResult: "Reduced manual data compilation time from 4+ hours down to under 90 seconds with 100% structured accuracy.",
      gitHubLink: "https://github.com/mesagarhere",
      date: "2025"
    },
    {
      id: "proj-2",
      name: "Liquid Glass Developer Portfolio Architecture",
      type: "Personal Project",
      category: "Web Development",
      featured: true,
      shortDescription: "A responsive personal portfolio built with Apple-inspired Liquid Glass translucency, subtle ambient lighting, and dynamic configuration.",
      problem: "Traditional portfolios rely on flat cards and solid dark themes that feel generic and lack modern visual identity.",
      myRole: "Full Frontend Design & Development — CSS glass engineering, typography pairing, responsive layout.",
      toolsAndTechnologies: ["React", "TypeScript", "Tailwind CSS", "Lucide Icons", "Motion"],
      solution: "Engineered a layered glass interface with multi-level backdrop blur, ambient atmospheric glow, dynamic data binding, and comprehensive responsiveness.",
      features: [
        "Apple iOS-inspired Liquid Glass aesthetic",
        "Dynamic theme switching (Dark & Light)",
        "Interactive case study viewer",
        "Complete responsive touch and desktop design"
      ],
      screenshots: [
        "/sagar_profile.jpg"
      ],
      finalResult: "A unique, high-end digital presence communicating both software engineering capabilities and creative design mastery.",
      gitHubLink: "https://github.com/mesagarhere",
      date: "2026"
    },
    {
      id: "proj-3",
      name: "High-CTR Visual YouTube Thumbnail System",
      type: "Personal Project",
      category: "Thumbnails",
      featured: true,
      shortDescription: "A design concept pack of high-impact YouTube thumbnails optimized for visual hierarchy, facial expression emphasis, and mobile clickability.",
      problem: "Many video creators suffer from low click-through rates due to cluttered thumbnails, low contrast, and unreadable text on mobile screens.",
      myRole: "Thumbnail Designer — Concepting, subject enhancement, typography styling, contrast balancing.",
      toolsAndTechnologies: ["Photoshop", "Canva", "Color Grading", "CTR Analysis"],
      solution: "Implemented the 3-element visual rule: clear subject focus, 3 words or fewer in bold high-contrast font, and dramatic backlight separation.",
      features: [
        "Mobile-first readability testing",
        "High-contrast color grading",
        "Expressive subject cutout and contour highlights",
        "Tailored for tech and creator niches"
      ],
      screenshots: [
        "/sagar_profile.jpg"
      ],
      finalResult: "Crafted thumbnail layouts engineered to maximize viewer curiosity and stand out in crowded recommendation feeds.",
      date: "2025"
    },
    {
      id: "proj-4",
      name: "AI Cinematic Visual Concept Reel",
      type: "Personal Project",
      category: "AI Video",
      featured: false,
      shortDescription: "A series of high-definition AI-generated visual sequences demonstrating cinematic atmosphere, prompt continuity, and motion design.",
      problem: "Creating high-production cinematic reels often demands thousands of dollars in camera equipment and location scouting.",
      myRole: "AI Creator & Video Editor — Prompt crafting, scene pacing, sound design, color consistency.",
      toolsAndTechnologies: ["AI Video Pipelines", "Video Upscaling", "Sound Synthesis", "CapCut"],
      solution: "Iterated precise multi-stage prompts to generate atmospheric sci-fi and tech environments, then edited them into a coherent rhythmic showcase.",
      features: [
        "Cinematic camera motions and lighting",
        "Synchronized sound design and ambient audio",
        "Consistent color palette across clips",
        "Exported in 1080p 60fps"
      ],
      screenshots: [
        "/sagar_profile.jpg"
      ],
      finalResult: "A visually striking video reel showing how emerging generative tools can produce professional creative media on a lean budget.",
      date: "2025"
    }
  ],
  statistics: [
    {
      id: "stat-1",
      label: "Projects Completed",
      value: "Building My Client Portfolio",
      description: "Dedicated to delivering high-quality client and personal projects."
    },
    {
      id: "stat-2",
      label: "Creative Projects",
      value: "Multiple Personal Projects",
      description: "Web apps, Python automation scripts, video edits, and AI media."
    },
    {
      id: "stat-3",
      label: "Technologies",
      value: "Growing Skill Set",
      description: "Python, modern web technologies, AI creative tools, and design suites."
    },
    {
      id: "stat-4",
      label: "Happy Clients",
      value: "Building Client Relationships",
      description: "Focused on honest communication, reliable turnaround, and genuine value."
    }
  ],
  whyWorkWithMe: [
    {
      number: "01",
      title: "Creative Approach",
      description: "Merging practical programming with visual design to create work that functions seamlessly and looks modern."
    },
    {
      number: "02",
      title: "Modern Technology",
      description: "Utilizing up-to-date Python workflows, responsive web frameworks, and AI tools for efficient delivery."
    },
    {
      number: "03",
      title: "Attention To Detail",
      description: "Caring deeply about typography, responsive breakpoints, clean code comments, and polished aesthetics."
    },
    {
      number: "04",
      title: "Client-Focused Work",
      description: "Listening to your goals attentively, maintaining clear communication, and tailoring results to your needs."
    },
    {
      number: "05",
      title: "Responsive Design",
      description: "Ensuring every website and digital graphic looks balanced on mobile phones, tablets, and desktop displays."
    },
    {
      number: "06",
      title: "Professional Delivery",
      description: "Respecting agreed timelines, providing organized deliverables, and standing behind the quality of my work."
    }
  ],
  workProcess: [
    {
      step: "01",
      title: "Initial Discussion",
      description: "Understand the client's idea, goals, timeline, and exact requirements."
    },
    {
      step: "02",
      title: "Requirements & Quotation",
      description: "Confirm deliverables, project scope, estimated delivery time, and fair pricing."
    },
    {
      step: "03",
      title: "Planning",
      description: "Plan the design, development steps, asset gathering, or production workflow."
    },
    {
      step: "04",
      title: "Development / Production",
      description: "Build the website, write the Python tool, edit the video, or produce the requested creative assets."
    },
    {
      step: "05",
      title: "Revisions",
      description: "Review the work together and make agreed refinements to ensure satisfaction."
    },
    {
      step: "06",
      title: "Final Delivery",
      description: "Deliver the completed, production-ready files and provide clear instructions."
    },
    {
      step: "07",
      title: "Support",
      description: "Provide reasonable post-delivery guidance to ensure everything runs smoothly."
    }
  ],
  pricing: [
    {
      id: "price-starter",
      name: "Starter Creative",
      badge: "Fast & Accessible",
      price: "5",
      currency: "USD",
      billingPeriod: "per task",
      description: "Perfect for quick graphics, YouTube thumbnails, simple Python tasks, or single visual assets.",
      deliveryTime: "1–2 Days",
      revisions: "2 Revisions",
      features: [
        "1 High-CTR Thumbnail or Poster design",
        "OR 1 Single-purpose Python automation script",
        "High-resolution exports (PNG / JPG / .py)",
        "Prompt communication & fast turnaround",
        "Commercial usage rights"
      ],
      enabled: true,
      ctaText: "Order on Fiverr",
      popular: false
    },
    {
      id: "price-standard",
      name: "Standard Digital",
      badge: "Most Popular",
      price: "10",
      currency: "USD",
      billingPeriod: "starting from",
      description: "Ideal for video editing, multi-scene AI video clips, responsive landing pages, or multi-step Python tools.",
      deliveryTime: "2–4 Days",
      revisions: "3 Revisions",
      features: [
        "Full responsive single-page web section/landing page",
        "OR Short-form video editing with captions & SFX",
        "OR Custom AI video/animation generation",
        "Clean source files & clear documentation",
        "Priority message response"
      ],
      enabled: true,
      ctaText: "Start Project",
      popular: true
    },
    {
      id: "price-premium",
      name: "Custom / Comprehensive",
      badge: "Full Solution",
      price: "Custom",
      currency: "USD",
      billingPeriod: "quote based",
      description: "Comprehensive multi-page websites, custom web tools, complete channel branding, or ongoing creator support.",
      deliveryTime: "5–15 Days",
      revisions: "Unlimited during scope",
      features: [
        "Multi-section responsive website with custom UI",
        "Complex Python data scraping & automation pipeline",
        "Full YouTube branding pack (Thumbnails + Banner)",
        "Dedicated revision rounds and walkthrough",
        "Post-delivery support"
      ],
      enabled: true,
      ctaText: "Request a Quote",
      popular: false
    }
  ],
  testimonials: [],
  socialLinks: {
    email: "mrsagar.0790@gmail.com",
    fiverr: "https://www.fiverr.com/s/jyje2oV",
    github: "https://github.com/mesagarhere",
    linkedin: "https://www.linkedin.com/in/mr-sagar-77939b395/",
    instagram: "https://instagram.com",
    whatsapp: "+923113122617"
  },
  contactInfo: {
    location: "Peer Maluk Shah, Kot Badin, Pakistan",
    responseTime: "Usually within 1–4 hours",
    preferredPlatform: "Fiverr / Direct Email / WhatsApp",
    workingHours: "Flexible (PKT / GMT+5 friendly)"
  }
};
