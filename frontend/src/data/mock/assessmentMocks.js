export const CHECKPOINTS_DATA = {
  "web-chk-01": {
    id: "web-chk-01",
    levelId: "web-l1",
    domainId: "web",
    title: "Checkpoint: Web Architecture & HTTP Inspector",
    badge: "Milestone Diagnostic",
    description: "Validate your mental model of the client-server relationship, DNS propagation, and status codes before advancing.",
    questions: [
      {
        id: "q1",
        question: "When a browser sends a request with header 'Accept: application/json', what is it communicating to the server?",
        options: [
          { id: "a", text: "The request body is formatted as JSON." },
          { id: "b", text: "The client expects the server to respond with a JSON payload.", isCorrect: true },
          { id: "c", text: "The server must authenticate using a JSON Web Token." },
          { id: "d", text: "The connection will downgrade to HTTP/1.0." }
        ]
      },
      {
        id: "q2",
        question: "What does an HTTP 502 Bad Gateway status code indicate?",
        options: [
          { id: "a", text: "The client's authentication token has expired." },
          { id: "b", text: "The requested route does not exist on the server." },
          { id: "c", text: "One server on the internet received an invalid response from another server while acting as a gateway or proxy.", isCorrect: true },
          { id: "d", text: "The client payload exceeded the maximum allowable upload size." }
        ]
      }
    ],
    defaultResult: {
      score_percentage: 100,
      correct_count: 2,
      total_questions: 2,
      skill_updates: {
        "Internet Architecture": 95,
        "HTTP Protocols": 90
      },
      strong_areas: ["HTTP Request Negotiation", "Proxy & Gateway Error Codes"],
      weak_areas: [],
      next_action: {
        "type": "level",
        "activity_id": "web-l2",
        "title": "Level 2: HTML Foundations"
      },
      lynxReaction: "Flawless diagnostic! You have grasped the client-server foundation. Level 2 awaits!"
    }
  },

  "web-chk-02": {
    id: "web-chk-02",
    levelId: "web-l2",
    domainId: "web",
    title: "Checkpoint: Semantic HTML & Accessibility Audit",
    badge: "Milestone Diagnostic",
    description: "Test your semantic structure and web accessibility rules before proceeding to the Level 2 Boss Test.",
    questions: [
      {
        id: "q1",
        question: "Why should an engineer use <button> instead of a clickable <div> with an onclick handler?",
        options: [
          { id: "a", text: "Browsers refuse to render CSS on clickable div elements." },
          { id: "b", text: "<button> comes with built-in keyboard accessibility (Enter/Space activation), focusability, and screen reader role announcement.", isCorrect: true },
          { id: "c", text: "Clickable divs cannot make fetch requests in modern JavaScript." },
          { id: "d", text: "There is no functional difference between the two." }
        ]
      }
    ],
    defaultResult: {
      score_percentage: 100,
      correct_count: 1,
      total_questions: 1,
      skill_updates: {
        "Semantic Web": 88,
        "Accessibility": 85
      },
      strong_areas: ["Accessible UI Controls"],
      weak_areas: [],
      next_action: {
        "type": "boss",
        "activity_id": "web-boss-02",
        "title": "Boss Test: The Multi-Section Semantic Portfolio"
      },
      lynxReaction: "Tremendous insight! You understand why accessibility is a non-negotiable engineering standard."
    }
  }
};

export const BOSS_TESTS_DATA = {
  "web-boss-01": {
    id: "web-boss-01",
    levelId: "web-l1",
    domainId: "web",
    title: "Boss Test: The Disconnected Gateway",
    badge: "Level 1 Boss Battle",
    xpReward: 100,
    coinReward: 50,
    scenario: "A critical customer cannot reach your company's checkout page at `https://checkout.acmecorp.com`. The customer receives an error: 'DNS_PROBE_FINISHED_NXDOMAIN'. Meanwhile, other subdomains like `https://acmecorp.com` resolve cleanly.",
    tasks: [
      {
        id: "task-1",
        description: "Analyze the DNS failure code 'NXDOMAIN'. What does this code signify?",
        options: [
          { id: "t1-a", text: "The web server reached 100% CPU capacity." },
          { id: "t1-b", text: "The domain name does not exist or has no valid DNS record (A/CNAME) pointing to an IP address.", isCorrect: true },
          { id: "t1-c", text: "The customer's credit card was declined." }
        ]
      },
      {
        id: "task-2",
        description: "Which DNS record must the DevOps engineer configure to map `checkout.acmecorp.com` to the checkout server's IPv4 address?",
        options: [
          { id: "t2-a", text: "MX record" },
          { id: "t2-b", text: "A record", isCorrect: true },
          { id: "t2-c", text: "TXT record" }
        ]
      }
    ]
  },

  "web-boss-02": {
    id: "web-boss-02",
    levelId: "web-l2",
    domainId: "web",
    title: "Boss Test: The Semantic Placement Portfolio",
    badge: "Level 2 Boss Battle",
    xpReward: 120,
    coinReward: 60,
    scenario: "A junior developer submitted a pull request with an entire portfolio built using 45 nested <div> elements and zero semantic landmark tags. Your placement challenge is to perform an architectural review.",
    tasks: [
      {
        id: "task-1",
        description: "Which landmark tag should enclose the primary unique content of the page (excluding sidebars, headers, and footers)?",
        options: [
          { id: "t1-a", text: "<main>", isCorrect: true },
          { id: "t1-b", text: "<section id='all'>" },
          { id: "t1-c", text: "<article role='page'>" }
        ]
      },
      {
        id: "task-2",
        description: "How should the student's navigation menu links be marked up?",
        options: [
          { id: "t2-a", text: "<nav> containing an unordered list <ul> of list items <li> and anchor tags <a>", isCorrect: true },
          { id: "t2-b", text: "Multiple <span> tags with onclick scripts" },
          { id: "t2-c", text: "<menu> tag with plain text" }
        ]
      }
    ]
  }
};
