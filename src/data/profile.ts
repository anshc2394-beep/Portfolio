export type Project = {
  id: string;
  name: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
  github: string | null;
  live: string | null;
  details: { label: string; text: string }[];
};

export const profile = {
  name: "Ansh Chaudhary",
  email: "anshc2394@gmail.com",
  location: "Athens, Georgia",
  github: "https://github.com/anshc2394-beep",
  linkedin: "https://www.linkedin.com/in/ansh-chaudhary-9b3214354/",
  resume: "/Ansh-Chaudhary-Resume.pdf",
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
      tags: "Language models / Inference / Semantic search",
    },
    {
      company: "Offerdox",
      role: "Software & technology internship",
      date: null,
      context: "HR technology",
      description:
        "Worked on web and mobile product functionality and UX, with exposure to AI-assisted recruiting and collaboration in a real product team.",
      tags: "Web & mobile / Product UX / Recruiting technology",
    },
    {
      company: "THRIVE | Coworking",
      role: "Software Engineering Intern",
      date: "Aug 2024 — Jan 2025",
      context: "Alpharetta, GA",
      description:
        "Worked on an AI-powered employee training platform and custom learning management system, using Python, Java, and data tools to support personalized learning.",
      tags: "Python / Java / Machine learning / SQL",
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
      ],
    },
  ],
  interests: ["Strength training", "Basketball", "Pickleball"],
  artists: ["Lauryn Hill", "Drake"],
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
      "One tournament. A lot of possible futures. A World Cup simulator for exploring how group-stage scores shape the path to the final.",
    stack: ["Next.js", "TypeScript", "Python", "FastAPI", "SQLite"],
    github: "https://github.com/anshc2394-beep/World-Cup-Path",
    live: null, // Add the verified public deployment URL here.
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
    id: "desk-caddy",
    name: "Desk Caddy AI",
    category: "AI · Voice workflows",
    year: "2025 — Present",
    description:
      "A front-desk phone assistant that captures appointment requests, saves leads, and notifies the business owner. Built around keeping a conversation on track.",
    stack: ["Python", "Node.js", "REST APIs", "LLMs", "Webhooks"],
    github: "https://github.com/anshc2394-beep/DeskReceptionistAI",
    live: null,
    details: [
      {
        label: "The idea",
        text: "Answer inbound calls, collect appointment requests, and pass them to the business owner for follow-up. The current version captures requests rather than booking appointments.",
      },
      {
        label: "Under the hood",
        text: "Multi-stage conversational state machines preserve context. Intent routing and fallback handling help manage interruptions and unclear input.",
      },
      {
        label: "The engineering challenge",
        text: "Coordinating asynchronous services with JSON schemas while keeping response time and conversational continuity in mind.",
      },
    ],
  },
];
