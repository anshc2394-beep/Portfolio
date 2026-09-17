export type Project = {
  id: string;
  name: string;
  category: string;
  year?: string;
  description: string;
  stack: string[];
  github: string | null;
  live: string | null;
  media:
    | {
        kind: "screenshot";
        src: string;
        alt: string;
        width: number;
        height: number;
        label: string;
        caption: string;
      }
    | {
        kind: "pipeline";
        label: string;
        caption: string;
        steps: { title: string; detail: string }[];
      }
    | { kind: "voice"; label: string; caption: string };
  takeaway: string;
  details: { label: string; text: string }[];
};

export const profile = {
  name: "Ansh Chaudhary",
  email: "anshc2394@gmail.com",
  location: "Athens, Georgia",
  github: "https://github.com/anshc2394-beep",
  linkedin: "https://www.linkedin.com/in/ansh-chaudhary-9b3214354/",
  resume: "/Ansh-Chaudhary-Resume.pdf",
  portrait: {
    src: "/ansh-portrait.webp",
    small: "/ansh-portrait-small.webp",
    alt: "Ansh Chaudhary smiling in a black shirt",
    width: 640,
    height: 640,
  },
  headline: "Software, systems, and a little curiosity.",
  intro:
    "I’m a sophomore studying Computer Systems Engineering at the University of Georgia. I build for the web and explore how AI can make software more useful.",
  bio: "I like understanding what’s happening underneath the interface—not just getting something to run. Computer engineering gives me a way to connect the software I write to the systems it runs on.",
  bioContinued:
    "Right now, I’m learning through projects, coursework, and product teams. I’m especially interested in the space between software engineering and AI: taking an idea, working through the messy parts, and making something people can actually use.",
  education: {
    school: "University of Georgia",
    degree: "B.S. Computer Systems Engineering",
    emphasis: "Emphasis in Artificial Intelligence",
    graduation: "May 2029",
    start: "2025",
  },
  opportunity: {
    term: "Summer 2027",
    roles: "Software Engineering · AI / ML · Computer Engineering",
    relocation: "Based in Athens, GA. Open to relocating.",
  },
  experience: [
    {
      company: "Handshake",
      role: "AI Software Engineering Intern",
      date: "Jan 2026 — Present",
      context: "Remote",
      description:
        "Working on LLM integration, model inference, and prompt-tuning workflows in a recruiting technology environment.",
      contributions: [
        "Contributing to model inference and prompt-tuning workflows.",
        "Working with the team on semantic search and talent-matching functionality.",
      ],
    },
    {
      company: "Offerdox",
      role: "Software & technology internship",
      date: null,
      context: "HR technology",
      description:
        "Contributed to an HR technology product in a team development environment.",
      contributions: [
        "Worked on web and mobile functionality and UX, connecting product decisions to how people use the software.",
        "Gained exposure to AI-assisted recruiting tools and the process of developing a product with a team.",
      ],
    },
    {
      company: "THRIVE | Coworking",
      role: "Software Engineering Intern",
      date: "Aug 2024 — Jan 2025",
      context: "Alpharetta, GA",
      description:
        "Worked on an AI-powered employee training platform and custom learning management system.",
      contributions: [
        "Used Python, Java, and machine-learning tools to support personalized training content.",
        "Worked with data processing and SQL in the context of employee learning and business reporting.",
      ],
    },
  ],
  skills: [
    {
      title: "Languages",
      items: [
        "Python",
        "Java",
        "TypeScript",
        "JavaScript",
        "SQL",
        "HTML & CSS",
      ],
    },
    {
      title: "Building with",
      items: [
        "Next.js",
        "FastAPI",
        "Flask",
        "Scikit-learn",
        "Git & GitHub",
        "REST APIs",
        "SQLite",
        "NumPy & Pandas",
      ],
    },
    {
      title: "Exploring further",
      items: [
        "AI & machine learning",
        "Data structures",
        "Backend development",
        "Computer systems",
        "Computer networks",
      ],
    },
  ],
  interests: ["Basketball", "Going on runs", "Listening to music"],
  artists: ["Lauryn Hill", "The Alchemist", "Alicia Keys"],
  // Add verified coursework here when available. Do not infer completed courses.
  coursework: [] as string[],
};

export const projects: Project[] = [
  {
    id: "world-cup-path",
    name: "World Cup Path",
    category: "Full-stack · Simulation",
    year: "2026",
    description:
      "A World Cup simulator for exploring a simple question: how much can one group-stage result change a team’s path to the final? Edit scores, follow the bracket, and compare simulated outcomes.",
    stack: ["Next.js", "TypeScript", "Python", "FastAPI", "SQLite"],
    github: "https://github.com/anshc2394-beep/World-Cup-Path",
    live: null, // Add the verified public deployment URL here.
    media: {
      kind: "screenshot",
      src: "/world-cup-path.webp",
      alt: "World Cup Path application showing its tournament simulator and prediction tools",
      width: 1440,
      height: 748,
      label: "WORLD CUP PATH / 2026",
      caption: "Project screenshot",
    },
    takeaway:
      "The useful part is keeping the tournament rules separate from the interface, so manual predictions and simulations use the same logic.",
    details: [
      {
        label: "The idea",
        text: "Make the expanded 48-team tournament easier to explore: edit scores, calculate standings, and follow qualification through to a Round of 32 bracket.",
      },
      {
        label: "Under the hood",
        text: "A seeded Monte Carlo engine uses rating-based expected goals and Poisson-style score sampling to estimate how far each team could go.",
      },
      {
        label: "The engineering challenge",
        text: "Connecting tournament rules, repeatable simulations, and an interactive frontend—with SQLite persistence for saved and shared predictions.",
      },
    ],
  },
  {
    id: "netwatch-soc",
    name: "NetWatch SOC",
    category: "Networks · Machine learning",
    description:
      "An experimental network-monitoring project exploring the gap between raw packets and a useful alert. It brings together flow aggregation, Isolation Forest anomaly scoring, and a Flask investigation interface.",
    stack: ["Python", "Flask", "Scapy", "Scikit-learn"],
    github: "https://github.com/anshc2394-beep/NetWatch-SOC",
    live: null,
    media: {
      kind: "pipeline",
      label: "NETWATCH SOC / SYSTEM DESIGN",
      caption: "Architecture study · experimental implementation",
      steps: [
        { title: "Capture", detail: "Scapy thread → packet queue" },
        { title: "Aggregate", detail: "5-tuple flows → timed windows" },
        { title: "Score", detail: "Behavioral features → Isolation Forest" },
        { title: "Investigate", detail: "Flask API → related flow activity" },
      ],
    },
    takeaway:
      "An unusual flow is a starting point for investigation—not proof of an attack. The baseline and the features matter as much as the model.",
    details: [
      {
        label: "The question",
        text: "How do you turn a stream of individual packets into behavior worth investigating? The project groups traffic by source and destination addresses, ports, and protocol before scoring it.",
      },
      {
        label: "Under the hood",
        text: "A capture thread feeds a bounded queue. A separate worker aggregates five-second flow windows, including packet counts, byte counts, duration, and packet timing. The detector code scales those features and fits an unsupervised Isolation Forest.",
      },
      {
        label: "Engineering focus",
        text: "Separating capture from feature processing keeps packet handling out of Flask’s request path. API endpoints expose flows, alerts, and IP-related activity for the investigation UI.",
      },
      {
        label: "Current scope",
        text: "This is a learning project with an implemented UI and a live detection path still under development. Its demo data is simulated; anomaly scores describe deviation from a baseline, not verified attack classifications.",
      },
    ],
  },
  {
    id: "desk-caddy",
    name: "Desk Caddy AI",
    category: "Voice · Backend workflows",
    year: "2025 — Present",
    description:
      "A front-desk phone assistant that captures appointment requests, saves leads, and notifies the business owner. Built around keeping a conversation on track.",
    stack: ["Python", "FastAPI", "Twilio", "SQLAlchemy"],
    github: "https://github.com/anshc2394-beep/DeskReceptionistAI",
    live: null,
    media: {
      kind: "voice",
      label: "DESK CADDY AI",
      caption: "Deterministic voice flow",
    },
    takeaway:
      "The interesting work is handling silence, repeated questions, and partial answers—not just the happy path through a call.",
    details: [
      {
        label: "The idea",
        text: "Answer inbound calls, collect appointment requests, and pass them to the business owner for follow-up. The current version captures requests rather than booking appointments.",
      },
      {
        label: "Under the hood",
        text: "Twilio speech webhooks feed a deterministic FastAPI flow: language, service, preferred time, name, phone, and confirmation. SQLAlchemy stores the current step and collected answers across requests.",
      },
      {
        label: "The engineering challenge",
        text: "Retry counters handle empty speech. Pattern matching catches questions the assistant cannot answer, with a fallback to taking a message. Completed requests are saved as leads and passed to the notification code.",
      },
    ],
  },
];
