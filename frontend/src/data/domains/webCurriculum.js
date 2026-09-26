export const WEB_CURRICULUM = {
  domainId: "web",
  domainName: "Web Development",
  levels: [
    {
      id: "web-l1",
      number: 1,
      title: "How the Web Works",
      subtitle: "Understand the invisible engine powering the modern internet",
      status: "completed",
      progress: 100,
      skills: ["Internet Architecture", "DNS & IP", "HTTP Protocols"],
      reward: { xp: 120, coins: 50 },
      recommendationReason: "Foundation completed with distinction!",
      missions: [
        {
          id: "web-l1-m1",
          number: 1,
          title: "What is the Internet?",
          objective: "Distinguish between the physical Internet and the World Wide Web service.",
          status: "completed",
          xp: 20,
          coins: 10,
          concept: "The **Internet** is a global physical network of connected computers communicating via standardized protocols (TCP/IP). The **World Wide Web (Web)** is an information-sharing service built on top of the Internet, utilizing HTTP to transfer documents.",
          visualType: "networkDiagram",
          interactiveTask: "Identify the client and server in a network exchange.",
          challengeId: "ch-web-l1-m1"
        },
        {
          id: "web-l1-m2",
          number: 2,
          title: "What Happens When You Type a URL?",
          objective: "Trace the 8-step journey from entering an address to browser rendering.",
          status: "completed",
          xp: 25,
          coins: 10,
          concept: "1. Browser checks cache → 2. DNS resolves domain to IP → 3. TCP handshake (SYN, SYN-ACK, ACK) → 4. TLS encryption established → 5. HTTP GET request sent → 6. Server processes & sends HTTP 200 response → 7. Browser parses HTML/CSS/JS → 8. DOM & Render tree displayed.",
          visualType: "urlJourney",
          interactiveTask: "Arrange the 6 primary pipeline stages in correct chronological order.",
          challengeId: "ch-web-l1-m2"
        },
        {
          id: "web-l1-m3",
          number: 3,
          title: "What is a Domain Name?",
          objective: "Understand top-level domains, DNS records (A, CNAME), and nameservers.",
          status: "completed",
          xp: 20,
          coins: 10,
          concept: "Humans remember domain names like `netra.dev`, but machines talk in IP addresses like `192.0.2.1`. The **Domain Name System (DNS)** is the phonebook of the web.",
          visualType: "dnsLookup",
          challengeId: "ch-web-l1-m3"
        },
        {
          id: "web-l1-m4",
          number: 4,
          title: "What is Web Hosting?",
          objective: "Differentiate static hosting, VPS, cloud providers, and serverless compute.",
          status: "completed",
          xp: 20,
          coins: 10,
          concept: "Web hosting provides the physical or virtual computing power and storage to keep web servers accessible 24/7.",
          challengeId: "ch-web-l1-m4"
        },
        {
          id: "web-l1-m5",
          number: 5,
          title: "HTTP Fundamentals",
          objective: "Master HTTP request verbs (GET, POST, PUT, DELETE), headers, and status codes.",
          status: "completed",
          xp: 35,
          coins: 15,
          concept: "Every request contains a **Method** (verb), **URL path**, **Headers** (metadata like Authorization), and an optional **Body** (JSON payload). Status codes: 2xx (Success), 3xx (Redirect), 4xx (Client Error), 5xx (Server Error).",
          visualType: "httpInspector",
          challengeId: "ch-web-l1-m5"
        }
      ],
      checkpoint: {
        id: "web-chk-01",
        title: "Request Journey Checkpoint",
        status: "completed",
        type: "checkpoint",
        xp: 50,
        coins: 25,
        summary: "Comprehensive assessment evaluating full client-server lifecycle, DNS resolution, and HTTP headers."
      },
      boss: {
        id: "web-boss-01",
        title: "Boss Test: The Disconnected Gateway",
        status: "completed",
        type: "boss",
        xp: 100,
        coins: 50,
        summary: "Diagnose and explain a broken web request from browser console to DNS lookup failure."
      }
    },
    {
      id: "web-l2",
      number: 2,
      title: "HTML Foundations",
      subtitle: "Build the semantic backbone and structural foundation of web applications",
      status: "in_progress",
      progress: 60,
      skills: ["Document Hierarchy", "Semantic Tags", "Accessibility", "Forms & Inputs"],
      reward: { xp: 180, coins: 75 },
      recommendationReason: "Continue your current active level to unlock styling.",
      missions: [
        {
          id: "web-l2-m1",
          number: 1,
          title: "What is HTML?",
          objective: "Understand HyperText Markup Language and browser parsing rules.",
          status: "completed",
          xp: 15,
          coins: 5,
          concept: "HTML defines the structure and meaning of web content. It turns raw text into structured headings, paragraphs, buttons, and links that browsers can interpret.",
          challengeId: "ch-web-l2-m1"
        },
        {
          id: "web-l2-m2",
          number: 2,
          title: "Document Structure",
          objective: "Master doctype, <html>, <head>, <meta>, <title>, and <body>.",
          status: "completed",
          xp: 20,
          coins: 10,
          concept: "A valid HTML5 document begins with `<!DOCTYPE html>`. Metadata, titles, and stylesheets reside in `<head>`, while renderable visual elements reside in `<body>`.",
          visualType: "domTree",
          challengeId: "ch-web-l2-m2"
        },
        {
          id: "web-l2-m3",
          number: 3,
          title: "HTML Tags and Text Elements",
          objective: "Understand how HTML tags structure content through elements, attributes, and nesting.",
          status: "recommended",
          isCurrent: true,
          xp: 25,
          coins: 15,
          concept: "An HTML tag is a keyword enclosed in angle brackets. An **element** consists of an opening tag, optional attributes, inner content, and a closing tag: `<tag attribute=\"value\">Content</tag>`. Self-closing tags like `<br />` and `<hr />` do not require closing tags.",
          example: `<h1>Welcome to NETRA</h1>\n<p>See your <strong>next step</strong> in tech placement preparation.</p>\n<a href="https://example.com" target="_blank" rel="noopener">Explore Worlds</a>`,
          visualType: "tagAnatomy",
          interactiveTask: "Inspect tag attributes and nested semantic elements.",
          challengeId: "ch-web-l2-m3"
        },
        {
          id: "web-l2-m4",
          number: 4,
          title: "Links and Navigation",
          objective: "Implement anchor tags, absolute vs relative paths, and security targets.",
          status: "available",
          xp: 20,
          coins: 10,
          concept: "The `<a>` tag creates hyperlinks using the `href` attribute. Use `target=\"_blank\"` with `rel=\"noopener noreferrer\"` when linking externally.",
          challengeId: "ch-web-l2-m4"
        },
        {
          id: "web-l2-m5",
          number: 5,
          title: "Images and Media",
          objective: "Master responsive images with <img>, src, alt descriptions, and dimensions.",
          status: "locked",
          xp: 20,
          coins: 10,
          concept: "Always supply concise, descriptive `alt` text for screen readers and search engines.",
          challengeId: "ch-web-l2-m5"
        },
        {
          id: "web-l2-m6",
          number: 6,
          title: "Lists & Grouping",
          objective: "Structure information with <ul>, <ol>, <li>, and definition lists <dl>.",
          status: "locked",
          xp: 15,
          coins: 10,
          challengeId: "ch-web-l2-m6"
        },
        {
          id: "web-l2-m7",
          number: 7,
          title: "Data Tables",
          objective: "Construct accessible tabular data with <table>, <thead>, <tbody>, <th>, <td>.",
          status: "locked",
          xp: 20,
          coins: 10,
          challengeId: "ch-web-l2-m7"
        },
        {
          id: "web-l2-m8",
          number: 8,
          title: "Interactive Forms",
          objective: "Build user input mechanisms with <form>, <input>, <label>, <select>, and validation.",
          status: "locked",
          xp: 25,
          coins: 15,
          challengeId: "ch-web-l2-m8"
        },
        {
          id: "web-l2-m9",
          number: 9,
          title: "Semantic HTML",
          objective: "Replace generic divs with <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>.",
          status: "locked",
          xp: 25,
          coins: 15,
          challengeId: "ch-web-l2-m9"
        },
        {
          id: "web-l2-m10",
          number: 10,
          title: "Web Accessibility (a11y)",
          objective: "Ensure accessibility with ARIA attributes, label associations, and keyboard focus.",
          status: "locked",
          xp: 30,
          coins: 15,
          challengeId: "ch-web-l2-m10"
        }
      ],
      checkpoint: {
        id: "web-chk-02",
        title: "Checkpoint: Semantic Structure Audit",
        status: "locked",
        type: "checkpoint",
        xp: 50,
        coins: 30,
        summary: "Spot 5 structural and accessibility violations in a sample student portal markup."
      },
      boss: {
        id: "web-boss-02",
        title: "Boss Test: The Multi-Section Semantic Portfolio",
        status: "locked",
        type: "boss",
        xp: 120,
        coins: 60,
        summary: "Architect a fully accessible, semantic multi-section placement profile page with zero non-semantic tags."
      }
    },
    {
      id: "web-l3",
      number: 3,
      title: "CSS Fundamentals",
      subtitle: "Master the visual rules, cascading logic, and core box model of the web",
      status: "available",
      progress: 0,
      skills: ["Selectors", "CSS Box Model", "Display Types", "Positioning Rules"],
      reward: { xp: 190, coins: 80 },
      recommendationReason: "Ready to explore once HTML foundations are completed.",
      missions: [
        {
          id: "web-l3-m1",
          number: 1,
          title: "What is CSS?",
          objective: "Learn syntax, the cascade algorithm, specificity calculation, and inheritance.",
          status: "available",
          xp: 20,
          coins: 10,
          concept: "CSS (Cascading Style Sheets) decorates and arranges HTML. Specificity is calculated as: Inline Styles > IDs > Classes/Attributes/Pseudo-classes > Elements.",
          challengeId: "ch-web-l3-m1"
        },
        {
          id: "web-l3-m2",
          number: 2,
          title: "CSS Selectors",
          objective: "Target elements accurately using combinators, attributes, and specificity hierarchies.",
          status: "locked",
          xp: 20,
          coins: 10,
          challengeId: "ch-web-l3-m2"
        },
        {
          id: "web-l3-m5",
          number: 5,
          title: "The CSS Box Model",
          objective: "Deconstruct Content, Padding, Border, and Margin with `box-sizing: border-box`.",
          status: "locked",
          xp: 35,
          coins: 15,
          concept: "Every HTML element is rendered as a rectangular box comprising four concentric layers: **Content**, **Padding** (inner cushion), **Border**, and **Margin** (outer spacing).",
          visualType: "boxModelInteractive",
          challengeId: "ch-web-l3-m5"
        }
      ],
      checkpoint: {
        id: "web-chk-03",
        title: "Checkpoint: CSS Specificity & Layout",
        status: "locked",
        type: "checkpoint",
        xp: 50,
        coins: 30
      },
      boss: {
        id: "web-boss-03",
        title: "Boss Test: Pixel-Perfect Style Restoration",
        status: "locked",
        type: "boss",
        xp: 130,
        coins: 60
      }
    },
    {
      id: "web-l4",
      number: 4,
      title: "Flexbox & Responsive Design",
      subtitle: "Engineer fluid one-dimensional layouts and multi-device adaptations",
      status: "locked",
      progress: 0,
      skills: ["Flex Containers", "Main/Cross Axis", "Media Queries", "Mobile First"],
      reward: { xp: 210, coins: 90 },
      missions: [
        {
          id: "web-l4-m1",
          number: 1,
          title: "Why Layouts are Difficult",
          objective: "Understand historical float/table hacks versus modern flex systems.",
          status: "locked",
          xp: 20,
          coins: 10,
          challengeId: "ch-web-l4-m1"
        },
        {
          id: "web-l4-m2",
          number: 2,
          title: "Flex Container & Main Axis",
          objective: "Control alignment with flex-direction, justify-content, and align-items.",
          status: "locked",
          xp: 30,
          coins: 15,
          visualType: "flexboxPlayground",
          challengeId: "ch-web-l4-m2"
        },
        {
          id: "web-l4-m8",
          number: 8,
          title: "Responsive Breakpoints",
          objective: "Write clean mobile-first media queries for mobile, tablet, and desktop.",
          status: "locked",
          xp: 30,
          coins: 15,
          challengeId: "ch-web-l4-m8"
        }
      ],
      checkpoint: {
        id: "web-chk-04",
        title: "Checkpoint: Responsive Flex Card",
        status: "locked",
        type: "checkpoint",
        xp: 60,
        coins: 35
      },
      boss: {
        id: "web-boss-04",
        title: "Boss Test: The Responsive Product Showcase",
        status: "locked",
        type: "boss",
        xp: 150,
        coins: 70
      }
    },
    {
      id: "web-l5",
      number: 5,
      title: "CSS Grid & UI Engineering",
      subtitle: "Architect two-dimensional layouts, dashboards, and complex component systems",
      status: "locked",
      progress: 0,
      skills: ["Grid Templates", "Grid Areas", "Dashboard Shells"],
      reward: { xp: 220, coins: 90 }
    },
    {
      id: "web-l6",
      number: 6,
      title: "JavaScript Fundamentals",
      subtitle: "Breathe dynamic life, logic, and interactivity into web interfaces",
      status: "needs_reinforcement",
      progress: 30,
      skills: ["ES6 Variables", "Data Types", "Conditionals & Loops", "Functions & Scope", "DOM Events"],
      reward: { xp: 250, coins: 100 },
      recommendationReason: "Needs Reinforcement: Previous attempt showed hesitation with DOM event handling.",
      missions: [
        {
          id: "web-l6-m1",
          number: 1,
          title: "What is JavaScript?",
          objective: "Understand the ECMAScript standard, V8 engine, and single-threaded event loop.",
          status: "completed",
          xp: 20,
          coins: 10,
          concept: "JavaScript is a high-level, single-threaded, garbage-collected language with first-class functions and a non-blocking event loop.",
          challengeId: "ch-web-l6-m1"
        },
        {
          id: "web-l6-m2",
          number: 2,
          title: "Variables: let, const & var",
          objective: "Differentiate block scope from function scope and prevent variable hoisting bugs.",
          status: "completed",
          xp: 25,
          coins: 10,
          challengeId: "ch-web-l6-m2"
        },
        {
          id: "web-l6-m11",
          number: 11,
          title: "DOM Traversal & Selection",
          objective: "Select and modify HTML nodes using querySelector, classList, and textContent.",
          status: "recommended",
          isCurrent: true,
          xp: 30,
          coins: 15,
          concept: "The Document Object Model (DOM) is an object-oriented representation of the web page. Use `document.querySelector('#target')` to grab elements.",
          visualType: "domTreeLive",
          challengeId: "ch-web-l6-m11"
        },
        {
          id: "web-l6-m12",
          number: 12,
          title: "Events & Event Listeners",
          objective: "Attach click, input, and submit handlers using addEventListener with event delegation.",
          status: "available",
          xp: 35,
          coins: 15,
          challengeId: "ch-web-l6-m12"
        }
      ],
      checkpoint: {
        id: "web-chk-06",
        title: "Checkpoint: Interactive Calculator Logic",
        status: "available",
        type: "checkpoint",
        xp: 70,
        coins: 40
      },
      boss: {
        id: "web-boss-06",
        title: "Boss Test: The Interactive Placement Quiz Engine",
        status: "locked",
        type: "boss",
        xp: 160,
        coins: 75
      }
    },
    {
      id: "web-l7",
      number: 7,
      title: "Modern JavaScript (ES6+)",
      subtitle: "Arrow functions, destructuring, modules, map/filter/reduce, and async/await",
      status: "locked",
      progress: 0,
      skills: ["ES6 Syntax", "Higher Order Functions", "Async/Await", "Promises"],
      reward: { xp: 250, coins: 100 }
    },
    {
      id: "web-l8",
      number: 8,
      title: "Web APIs & Asynchronous Programming",
      subtitle: "Fetch data from REST APIs, handle JSON streams, and manage loading states",
      status: "locked",
      progress: 0,
      skills: ["fetch()", "REST APIs", "JSON Parsing", "HTTP Headers"],
      reward: { xp: 260, coins: 110 }
    },
    {
      id: "web-l9",
      number: 9,
      title: "Git & Collaborative GitHub",
      subtitle: "Repositories, commits, branching strategies, pull requests, and merge conflicts",
      status: "locked",
      progress: 0,
      skills: ["Git CLI", "Branching", "Merge Conflicts", "PR Review"],
      reward: { xp: 200, coins: 80 }
    },
    {
      id: "web-l10",
      number: 10,
      title: "React Component Architecture",
      subtitle: "Components, JSX, props, state hooks, useEffect, and reactive component lifecycles",
      status: "locked",
      progress: 0,
      skills: ["React Components", "useState", "useEffect", "Props Drilling"],
      reward: { xp: 300, coins: 120 }
    },
    {
      id: "web-l11",
      number: 11,
      title: "Backend Fundamentals & FastAPI",
      subtitle: "Server concepts, routing, HTTP request handlers, and REST API contracts",
      status: "locked",
      progress: 0,
      skills: ["FastAPI", "API Design", "Pydantic Models", "Server Contracts"],
      reward: { xp: 280, coins: 110 }
    },
    {
      id: "web-l12",
      number: 12,
      title: "Database Fundamentals (SQL & Firestore)",
      subtitle: "Relational tables, primary keys, SQL queries, NoSQL documents, and collections",
      status: "locked",
      progress: 0,
      skills: ["SQL CRUD", "Firestore Collections", "Indexing", "Data Modeling"],
      reward: { xp: 290, coins: 120 }
    },
    {
      id: "web-l13",
      number: 13,
      title: "Authentication & Authorization",
      subtitle: "JWT tokens, Firebase Authentication, ID tokens, and route protection",
      status: "locked",
      progress: 0,
      skills: ["Firebase Auth", "JWT Verification", "Session Management", "RBAC"],
      reward: { xp: 310, coins: 130 }
    },
    {
      id: "web-l14",
      number: 14,
      title: "Web Security Fundamentals",
      subtitle: "HTTPS, XSS mitigation, CSRF tokens, SQL Injection defense, and security headers",
      status: "locked",
      progress: 0,
      skills: ["OWASP Top 10", "XSS Prevention", "CORS & CSP", "Input Sanitization"],
      reward: { xp: 320, coins: 140 }
    },
    {
      id: "web-l15",
      number: 15,
      title: "Testing & Debugging",
      subtitle: "Unit tests, browser DevTools breakpoints, network inspection, and bug discovery",
      status: "locked",
      progress: 0,
      skills: ["DevTools Debugging", "Jest/Vitest", "Integration Testing", "Breakpoints"],
      reward: { xp: 270, coins: 110 }
    },
    {
      id: "web-l16",
      number: 16,
      title: "Deployment & Cloud Infrastructure",
      subtitle: "Production builds, environment variables, DNS propagation, CDN, and CI/CD",
      status: "locked",
      progress: 0,
      skills: ["Vite Build", "Hosting & CDNs", "CI/CD Pipelines", "SSL/TLS Setup"],
      reward: { xp: 290, coins: 120 }
    },
    {
      id: "web-l17",
      number: 17,
      title: "Web Capstone: NETRA Placement Portal",
      subtitle: "Build a production-grade full-stack placement preparation web application",
      status: "locked",
      progress: 0,
      skills: ["Full Stack Architecture", "Auth & API", "Responsive UI", "Production Deploy"],
      reward: { xp: 500, coins: 250 }
    }
  ]
};
