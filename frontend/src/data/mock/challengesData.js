export const CHALLENGES_DATABASE = {
  // Web Level 1 Mission 1
  "ch-web-l1-m1": {
    id: "ch-web-l1-m1",
    type: "multiple-choice",
    title: "Internet vs World Wide Web",
    question: "Which of the following statements accurately characterizes the relationship between the Internet and the World Wide Web?",
    options: [
      { id: "opt-1", text: "The Internet and the Web are synonymous terms for the exact same system." },
      { id: "opt-2", text: "The Internet is the global physical network infrastructure, while the Web is an application service running on top of it.", isCorrect: true },
      { id: "opt-3", text: "The Web is the physical copper and fiber cables, whereas the Internet is just the browser software." },
      { id: "opt-4", text: "The Web existed in the 1960s, while the Internet was invented in 1989 by Tim Berners-Lee." }
    ],
    explanation: "Correct! The Internet connects millions of computers globally via TCP/IP. The World Wide Web is an information space of interlinked documents accessed via HTTP on top of the Internet.",
    xpReward: 20,
    coinReward: 10,
    skills: ["Internet Architecture"]
  },

  // Web Level 1 Mission 2: Ordering Challenge
  "ch-web-l1-m2": {
    id: "ch-web-l1-m2",
    type: "ordering",
    title: "The URL Journey Sequence",
    question: "Arrange the sequence of events that take place when a user types 'https://netra.dev' into their browser and presses Enter:",
    correctOrder: [
      "Browser checks local DNS cache & OS hosts file",
      "Recursive DNS resolver looks up IP address (e.g., 104.21.5.12)",
      "Client initiates TCP three-way handshake (SYN, SYN-ACK, ACK)",
      "TLS handshake negotiates cipher suite and cryptographic keys",
      "Browser transmits encrypted HTTP GET request with headers",
      "Web server returns HTTP 200 response with HTML payload",
      "Browser rendering engine constructs DOM and Paint Tree"
    ],
    shuffledItems: [
      "Client initiates TCP three-way handshake (SYN, SYN-ACK, ACK)",
      "Browser checks local DNS cache & OS hosts file",
      "Browser rendering engine constructs DOM and Paint Tree",
      "Recursive DNS resolver looks up IP address (e.g., 104.21.5.12)",
      "Web server returns HTTP 200 response with HTML payload",
      "TLS handshake negotiates cipher suite and cryptographic keys",
      "Browser transmits encrypted HTTP GET request with headers"
    ],
    explanation: "Superb! Tracing this exact pipeline is a classic technical placement interview question. First resolution, then transport, security, HTTP exchange, and lastly rendering.",
    xpReward: 25,
    coinReward: 15,
    skills: ["DNS & IP", "Browser Architecture"]
  },

  // Web Level 1 Mission 5: HTTP Inspector
  "ch-web-l1-m5": {
    id: "ch-web-l1-m5",
    type: "debug",
    title: "Inspect the HTTP Response",
    question: "A frontend engineer makes an API call to save a student profile. The server returns HTTP 401 Unauthorized with headers: `WWW-Authenticate: Bearer`. What is the root cause?",
    codeSnippet: `POST /api/v1/student/profile HTTP/1.1\nHost: api.netra.dev\nContent-Type: application/json\n\n{ "domain": "web", "xp": 100 }\n\nHTTP/1.1 401 Unauthorized\nWWW-Authenticate: Bearer\nContent-Type: application/json\n\n{ "error": "Missing or invalid bearer token" }`,
    options: [
      { id: "opt-1", text: "The request method should have been GET instead of POST." },
      { id: "opt-2", text: "The client did not provide an Authorization header with a valid Bearer token.", isCorrect: true },
      { id: "opt-3", text: "The server database crashed and cannot handle JSON requests." },
      { id: "opt-4", text: "The URL path is missing the query string parameter '?token='." }
    ],
    explanation: "HTTP 401 Unauthorized indicates that the request requires client authentication. In REST APIs, the standard approach is passing `Authorization: Bearer <id_token>`.",
    xpReward: 35,
    coinReward: 15,
    skills: ["HTTP Protocols"]
  },

  // Web Level 2 Mission 3: HTML Tags (Detailed MVP)
  "ch-web-l2-m3": {
    id: "ch-web-l2-m3",
    type: "code-completion",
    title: "Assemble the HTML Link Element",
    question: "Complete the markup below to create an accessible, secure link that opens NETRA's roadmap in a new browser tab with proper security attributes:",
    template: `<a href="https://netra.dev/roadmap" target="___" rel="___">Explore Roadmap</a>`,
    blanks: [
      { id: "blank-1", placeholder: "target attribute", expected: "_blank" },
      { id: "blank-2", placeholder: "rel security attribute", expected: "noopener noreferrer" }
    ],
    optionsBlank1: ["_blank", "_self", "_parent", "_top"],
    optionsBlank2: ["noopener noreferrer", "nofollow", "external", "secure"],
    explanation: "Brilliant! `target=\"_blank\"` instructs the browser to open a fresh tab, and `rel=\"noopener noreferrer\"` protects against reverse tabnabbing security exploits.",
    xpReward: 30,
    coinReward: 15,
    skills: ["Semantic Web", "Accessibility"]
  },

  // Web Level 3 Mission 5: Box Model
  "ch-web-l3-m5": {
    id: "ch-web-l3-m5",
    type: "prediction",
    title: "Calculate Total Rendered Box Width",
    question: "Given an element with the following CSS rules and standard `box-sizing: content-box`:\n\nwidth: 240px;\npadding: 20px;\nborder: 5px solid #2563EB;\nmargin: 30px;\n\nWhat is the total horizontal space occupied on the screen (including margins)?",
    options: [
      { id: "opt-1", text: "240px" },
      { id: "opt-2", text: "290px" },
      { id: "opt-3", text: "350px", isCorrect: true },
      { id: "opt-4", text: "380px" }
    ],
    explanation: "Total occupied width = Width (240) + Left/Right Padding (20+20=40) + Left/Right Border (5+5=10) + Left/Right Margin (30+30=60) = 240 + 40 + 10 + 60 = 350px!",
    xpReward: 35,
    coinReward: 15,
    skills: ["CSS Box Model"]
  },

  // Web Level 4 Mission 2: Flexbox
  "ch-web-l4-m2": {
    id: "ch-web-l4-m2",
    type: "multiple-choice",
    title: "Flexbox Main Axis Alignment",
    question: "You want 3 mission cards inside a horizontal flex row (`flex-direction: row`) to be evenly distributed with equal space between each item touching the outer edges. Which property should you use?",
    options: [
      { id: "opt-1", text: "align-items: center;" },
      { id: "opt-2", text: "justify-content: space-between;", isCorrect: true },
      { id: "opt-3", text: "justify-content: space-around;" },
      { id: "opt-4", text: "flex-wrap: nowrap;" }
    ],
    explanation: "`justify-content: space-between` aligns flex items along the main axis such that the first item is at the start edge, the last is at the end edge, and remaining space is distributed evenly.",
    xpReward: 30,
    coinReward: 15,
    skills: ["Flex Containers"]
  },

  // Web Level 6 Mission 11: DOM
  "ch-web-l6-m11": {
    id: "ch-web-l6-m11",
    type: "debug",
    title: "Fix the Event Listener Null Error",
    question: "A script throws `Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')`. Look at the snippet below. Why is it failing?",
    codeSnippet: `<head>\n  <script>\n    const btn = document.querySelector('#claim-xp-btn');\n    btn.addEventListener('click', claimReward);\n  </script>\n</head>\n<body>\n  <button id=\"claim-xp-btn\">Claim 50 XP</button>\n</body>`,
    options: [
      { id: "opt-1", text: "addEventListener is not supported on button elements in modern browsers." },
      { id: "opt-2", text: "The script runs in the <head> before the DOM parser encounters the button in the <body>, so document.querySelector returns null.", isCorrect: true },
      { id: "opt-3", text: "The button element must have an onclick inline attribute instead." },
      { id: "opt-4", text: "The id claim-xp-btn contains hyphens which are illegal in JavaScript selectors." }
    ],
    explanation: "Spot on! The browser executes synchronous scripts immediately as it parses HTML. In `<head>`, the `<body>` has not been parsed yet, so `#claim-xp-btn` doesn't exist yet in the DOM tree. Use `defer` or place the script at the bottom of `<body>`.",
    xpReward: 35,
    coinReward: 15,
    skills: ["DOM Scripting", "Event Loop"]
  },

  // App Level 2 Mission 1: Dart Sound Null Safety
  "ch-app-l2-m1": {
    id: "ch-app-l2-m1",
    type: "code-completion",
    title: "Dart Sound Null Safety",
    question: "Complete the Dart function declaration so that it safely accepts an optional student nickname that might be null, but returns a guaranteed non-null fallback String:",
    template: `String getDisplayName(String? nickname, String defaultName) {\n  return nickname ___ defaultName;\n}`,
    blanks: [
      { id: "blank-1", placeholder: "null-coalescing operator", expected: "??" }
    ],
    optionsBlank1: ["??", "?.", "!", "?:"],
    explanation: "Excellent! The `??` operator (if-null operator) returns the left expression if it is not null, otherwise evaluates and returns the right expression.",
    xpReward: 25,
    coinReward: 10,
    skills: ["Sound Null Safety"]
  },

  // App Level 4 Mission 1: StatelessWidget vs StatefulWidget
  "ch-app-l4-m1": {
    id: "ch-app-l4-m1",
    type: "multiple-choice",
    title: "Choosing the Right Flutter Widget",
    question: "You are building a live XP Counter in Flutter that increments smoothly every time a student finishes a challenge. Which widget class should you subclass?",
    options: [
      { id: "opt-1", text: "StatelessWidget, because it renders faster and memory is lightweight." },
      { id: "opt-2", text: "StatefulWidget, because the internal counter variable changes dynamically over time and requires setState() to trigger rebuilds.", isCorrect: true },
      { id: "opt-3", text: "InheritedWidget directly without a State object." },
      { id: "opt-4", text: "RenderObjectWidget, because text cannot be animated otherwise." }
    ],
    explanation: "Correct! When a widget's visual representation needs to mutate based on internal state changes during runtime, `StatefulWidget` paired with `State` is the fundamental Flutter paradigm.",
    xpReward: 30,
    coinReward: 15,
    skills: ["Widget Hierarchy"]
  }
};

export const getChallengeById = (id) => CHALLENGES_DATABASE[id] || CHALLENGES_DATABASE["ch-web-l2-m3"];
