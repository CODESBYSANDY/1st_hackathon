export const APP_CURRICULUM = {
  domainId: "app",
  domainName: "App Development",
  levels: [
    {
      id: "app-l1",
      number: 1,
      title: "Mobile Application Fundamentals",
      subtitle: "Understand mobile operating systems, native compilation, and Flutter's engine",
      status: "completed",
      progress: 100,
      skills: ["Mobile Architecture", "Native vs Cross-Platform", "Flutter Engine"],
      reward: { xp: 120, coins: 50 },
      recommendationReason: "Mobile foundations cleared with excellence!",
      missions: [
        {
          id: "app-l1-m1",
          number: 1,
          title: "What is a Mobile Application?",
          objective: "Understand sandboxing, lifecycles, and hardware constraints on iOS and Android.",
          status: "completed",
          xp: 20,
          coins: 10,
          concept: "Mobile applications run inside secure sandboxes with constrained memory, battery limitations, and strict app lifecycles (foreground, background, suspended).",
          challengeId: "ch-app-l1-m1"
        },
        {
          id: "app-l1-m2",
          number: 2,
          title: "Native vs Cross-Platform",
          objective: "Compare Swift/Kotlin native pipelines against Flutter's single-codebase direct rendering.",
          status: "completed",
          xp: 25,
          coins: 10,
          concept: "Native requires two separate codebases (Swift for iOS, Kotlin for Android). Flutter compiles ahead-of-time (AOT) to native ARM machine code and draws every pixel directly using the Impeller/Skia graphics engine without a JavaScript bridge.",
          challengeId: "ch-app-l1-m2"
        },
        {
          id: "app-l1-m4",
          number: 4,
          title: "What is Flutter?",
          objective: "Explore Google's UI toolkit and its multi-platform targets.",
          status: "completed",
          xp: 25,
          coins: 10,
          concept: "In Flutter, 'Everything is a Widget'. The framework renders its own UI controls, guaranteeing identical visual fidelity across devices.",
          challengeId: "ch-app-l1-m4"
        }
      ],
      checkpoint: {
        id: "app-chk-01",
        title: "Mobile Architecture Checkpoint",
        status: "completed",
        type: "checkpoint",
        xp: 50,
        coins: 25
      },
      boss: {
        id: "app-boss-01",
        title: "Boss Test: The Platform Dilemma",
        status: "completed",
        type: "boss",
        xp: 100,
        coins: 50
      }
    },
    {
      id: "app-l2",
      number: 2,
      title: "Dart Fundamentals",
      subtitle: "Master the strongly typed, null-safe programming language powering Flutter",
      status: "in_progress",
      progress: 50,
      skills: ["Sound Null Safety", "Data Types", "Functions", "Collections"],
      reward: { xp: 180, coins: 70 },
      recommendationReason: "Recommended milestone to sharpen your Dart typing skills.",
      missions: [
        {
          id: "app-l2-m1",
          number: 1,
          title: "Variables and Sound Null Safety",
          objective: "Learn nullable (`String?`) vs non-nullable types and the `late` keyword.",
          status: "completed",
          xp: 25,
          coins: 10,
          concept: "Dart features **Sound Null Safety**. Variables cannot contain `null` unless explicitly marked with a question mark: `String? name;`. This prevents `NullPointerException` crashes at runtime.",
          visualType: "nullSafetyVisualizer",
          challengeId: "ch-app-l2-m1"
        },
        {
          id: "app-l2-m2",
          number: 2,
          title: "Control Flow & Collections",
          objective: "Master Lists, Sets, Maps, spread operators (`...`), and collection `if`.",
          status: "recommended",
          isCurrent: true,
          xp: 30,
          coins: 15,
          concept: "Dart provides powerful UI-centric collection capabilities such as collection-if: `[if (isLoggedIn) UserProfileWidget()]` and spread operators.",
          challengeId: "ch-app-l2-m2"
        },
        {
          id: "app-l2-m3",
          number: 3,
          title: "Functions & Closures",
          objective: "Write named parameters, default values, and anonymous functions in Dart.",
          status: "available",
          xp: 25,
          coins: 10,
          challengeId: "ch-app-l2-m3"
        }
      ],
      checkpoint: {
        id: "app-chk-02",
        title: "Checkpoint: Dart Null-Safe Logic",
        status: "locked",
        type: "checkpoint",
        xp: 50,
        coins: 30
      },
      boss: {
        id: "app-boss-02",
        title: "Boss Test: Dart Placement CLI Engine",
        status: "locked",
        type: "boss",
        xp: 120,
        coins: 60
      }
    },
    {
      id: "app-l3",
      number: 3,
      title: "Dart Object-Oriented Programming",
      subtitle: "Classes, constructors, inheritance, mixins, and abstract interfaces",
      status: "locked",
      progress: 0,
      skills: ["Classes & Objects", "Factory Constructors", "Mixins", "Inheritance"],
      reward: { xp: 190, coins: 80 }
    },
    {
      id: "app-l4",
      number: 4,
      title: "Flutter Fundamentals & Widget Tree",
      subtitle: "Assemble declarative UI hierarchies from Stateless and Stateful widgets",
      status: "available",
      progress: 25,
      skills: ["StatelessWidget", "StatefulWidget", "build() Method", "Scaffold"],
      reward: { xp: 220, coins: 90 },
      recommendationReason: "Unlocks mobile UI design capabilities.",
      missions: [
        {
          id: "app-l4-m1",
          number: 1,
          title: "Stateless vs Stateful Widgets",
          objective: "Understand immutability vs dynamic state with `setState()`.",
          status: "available",
          xp: 30,
          coins: 15,
          concept: "`StatelessWidget` describes UI that depends only on its configuration. `StatefulWidget` maintains mutable state that triggers rebuilds via `setState(() { ... })`.",
          visualType: "widgetTreeExplorer",
          challengeId: "ch-app-l4-m1"
        },
        {
          id: "app-l4-m2",
          number: 2,
          title: "Scaffold & Material Architecture",
          objective: "Construct standard app shells with AppBar, Body, and FloatingActionButton.",
          status: "locked",
          xp: 30,
          coins: 15,
          challengeId: "ch-app-l4-m2"
        }
      ],
      checkpoint: {
        id: "app-chk-04",
        title: "Checkpoint: Widget Tree Assembly",
        status: "locked",
        type: "checkpoint",
        xp: 60,
        coins: 35
      },
      boss: {
        id: "app-boss-04",
        title: "Boss Test: The Broken Flutter Screen",
        status: "locked",
        type: "boss",
        xp: 140,
        coins: 70
      }
    },
    {
      id: "app-l5",
      number: 5,
      title: "Layout & Mobile UI Engineering",
      subtitle: "Master Column, Row, Expanded, ListView, GridView, and MediaQuery",
      status: "locked",
      progress: 0,
      skills: ["Row & Column", "Expanded & Flexible", "ListView.builder", "Responsive UI"],
      reward: { xp: 230, coins: 95 },
      missions: [
        {
          id: "app-l5-m1",
          number: 1,
          title: "Flex Layouts with Row and Column",
          objective: "Distinguish MainAxisAlignment from CrossAxisAlignment in mobile viewports.",
          status: "locked",
          xp: 25,
          coins: 10,
          challengeId: "ch-app-l5-m1"
        },
        {
          id: "app-l5-m2",
          number: 2,
          title: "Handling Infinite Scrolling with ListView",
          objective: "Implement lazy-loading `ListView.builder` to conserve device RAM.",
          status: "locked",
          xp: 35,
          coins: 15,
          challengeId: "ch-app-l5-m2"
        }
      ],
      checkpoint: {
        id: "app-chk-05",
        title: "Checkpoint: Responsive Mobile Layout",
        status: "locked",
        type: "checkpoint",
        xp: 60,
        coins: 35
      },
      boss: {
        id: "app-boss-05",
        title: "Boss Test: The Pixel-Perfect Feed Screen",
        status: "locked",
        type: "boss",
        xp: 150,
        coins: 70
      }
    },
    {
      id: "app-l6",
      number: 6,
      title: "Navigation & Route Stacks",
      subtitle: "Push and pop screens, manage backstacks, and pass arguments with Navigator",
      status: "locked",
      progress: 0,
      skills: ["Navigator 2.0", "Route Stacks", "Passing Arguments", "Deep Linking"],
      reward: { xp: 240, coins: 100 },
      missions: [
        {
          id: "app-l6-m1",
          number: 1,
          title: "Navigator Push & Pop",
          objective: "Understand LIFO stack mechanics in mobile screen transitions.",
          status: "locked",
          xp: 30,
          coins: 15,
          concept: "Screens in mobile are maintained as a stack. `Navigator.push()` places a screen on top, while `Navigator.pop()` removes it and reveals the previous screen.",
          challengeId: "ch-app-l6-m1"
        }
      ],
      checkpoint: {
        id: "app-chk-06",
        title: "Checkpoint: Multi-Screen Routing",
        status: "locked",
        type: "checkpoint",
        xp: 60,
        coins: 35
      },
      boss: {
        id: "app-boss-06",
        title: "Boss Test: The Seamless Onboarding Flow",
        status: "locked",
        type: "boss",
        xp: 150,
        coins: 75
      }
    },
    {
      id: "app-l7",
      number: 7,
      title: "State Management in Flutter",
      subtitle: "Local state, ChangeNotifier, Provider/Riverpod principles, and selective rebuilds",
      status: "locked",
      progress: 0,
      skills: ["State Management", "ChangeNotifier", "Rebuild Optimization"],
      reward: { xp: 270, coins: 110 }
    },
    {
      id: "app-l8",
      number: 8,
      title: "Forms & User Input",
      subtitle: "TextFormField, form keys, input formatters, and synchronous validation",
      status: "locked",
      progress: 0,
      skills: ["Form Validation", "TextEditingController", "FocusNodes"],
      reward: { xp: 230, coins: 95 }
    },
    {
      id: "app-l9",
      number: 9,
      title: "Local Storage & Persistence",
      subtitle: "SharedPreferences, secure storage, and offline device caching",
      status: "locked",
      progress: 0,
      skills: ["Key-Value Storage", "Offline Cache", "Serialization"],
      reward: { xp: 240, coins: 100 }
    },
    {
      id: "app-l10",
      number: 10,
      title: "Networking & REST APIs in Flutter",
      subtitle: "The `http` package, async JSON decoding, and network error resilience",
      status: "locked",
      progress: 0,
      skills: ["HTTP Package", "JSON Serialization", "FutureBuilder"],
      reward: { xp: 280, coins: 120 }
    },
    {
      id: "app-l11",
      number: 11,
      title: "Firebase Integration for Mobile",
      subtitle: "Firebase Auth on mobile, Firestore real-time listeners, and Cloud Storage",
      status: "locked",
      progress: 0,
      skills: ["Firebase Auth", "Firestore SDK", "StreamBuilder"],
      reward: { xp: 300, coins: 130 }
    },
    {
      id: "app-l12",
      number: 12,
      title: "Mobile App Architecture",
      subtitle: "Clean architecture: Presentation layer, Domain layer, and Data repositories",
      status: "locked",
      progress: 0,
      skills: ["Clean Architecture", "Repository Pattern", "Separation of Concerns"],
      reward: { xp: 310, coins: 130 }
    },
    {
      id: "app-l13",
      number: 13,
      title: "Error Handling & Offline States",
      subtitle: "Graceful error boundaries, timeout recovery, and offline banner indicators",
      status: "locked",
      progress: 0,
      skills: ["Exception Handling", "Connectivity Monitoring", "Fallback States"],
      reward: { xp: 260, coins: 110 }
    },
    {
      id: "app-l14",
      number: 14,
      title: "Mobile App Security",
      subtitle: "Encrypted SharedPreferences, certificate pinning, and biometric auth",
      status: "locked",
      progress: 0,
      skills: ["KeyStore / Keychain", "Biometrics", "Code Obfuscation"],
      reward: { xp: 300, coins: 130 }
    },
    {
      id: "app-l15",
      number: 15,
      title: "Testing Flutter Applications",
      subtitle: "Unit tests, widget tests with WidgetTester, and golden screenshot tests",
      status: "locked",
      progress: 0,
      skills: ["Unit Testing", "Widget Testing", "Finder APIs"],
      reward: { xp: 280, coins: 120 }
    },
    {
      id: "app-l16",
      number: 16,
      title: "Performance & Rendering Optimization",
      subtitle: "Eliminating jank, repainting boundaries, const constructors, and memory profilers",
      status: "locked",
      progress: 0,
      skills: ["Flutter DevTools", "Frame Rate (60/120fps)", "Const Optimization"],
      reward: { xp: 290, coins: 120 }
    },
    {
      id: "app-l17",
      number: 17,
      title: "Builds & Store Deployment",
      subtitle: "Generating Android App Bundles (AAB), signing keys, and iOS provisioning",
      status: "locked",
      progress: 0,
      skills: ["Android Keystore", "Release Mode", "Fastlane", "Store Guidelines"],
      reward: { xp: 300, coins: 130 }
    },
    {
      id: "app-l18",
      number: 18,
      title: "App Capstone: NETRA Student Companion",
      subtitle: "Deploy a complete multi-screen adaptive placement prep companion app",
      status: "locked",
      progress: 0,
      skills: ["Full Mobile Pipeline", "State & Auth", "Real-Time Sync", "Release Build"],
      reward: { xp: 500, coins: 250 }
    }
  ]
};
