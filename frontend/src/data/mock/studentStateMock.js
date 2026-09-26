export const DEFAULT_STUDENT_STATE = {
  student: {
    id: "stu-netra-001",
    name: "Prakash",
    domain: "web",
    targetRole: "Full Stack Web Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    college: "Computer Science & Engineering",
    batch: "2025"
  },
  progress: {
    overall: 42,
    xp: 850,
    streak: 5,
    coins: 120,
    levelNumber: 4,
    rank: "Junior Architect"
  },
  current_activity: {
    lesson_id: "web-l2-m3",
    title: "HTML Tags and Text Elements",
    level_id: "web-l2",
    domain_id: "web",
    difficulty: 2
  },
  skills: [
    { name: "HTML & Semantics", percentage: 82, status: "Mastered", color: "#10B981" },
    { name: "Internet & HTTP", percentage: 90, status: "Mastered", color: "#10B981" },
    { name: "CSS & Box Model", percentage: 64, status: "Developing", color: "#3B82F6" },
    { name: "Flexbox Layouts", percentage: 45, status: "Developing", color: "#3B82F6" },
    { name: "JavaScript DOM", percentage: 31, status: "Needs Practice", color: "#EF4444" }
  ],
  weak_areas: ["DOM Event Delegation", "CSS Specificity Calculation"],
  strong_areas: ["HTTP Status Codes", "Semantic Landmark Markup"],
  next_action: {
    type: "lesson",
    id: "web-l2-m3",
    title: "HTML Tags and Text Elements",
    reason: "Recommended based on your current level progress in Web Development."
  },
  recent_activities: [
    { id: "act-1", title: "Completed: Document Structure", xp: "+20 XP", coins: "+10", timestamp: "Today, 10:15 AM", type: "mission" },
    { id: "act-2", title: "Conquered: Boss Test (Disconnected Gateway)", xp: "+100 XP", coins: "+50", timestamp: "Yesterday", type: "boss" },
    { id: "act-3", title: "Mastered: HTTP Fundamentals", xp: "+35 XP", coins: "+15", timestamp: "2 days ago", type: "mission" }
  ]
};
