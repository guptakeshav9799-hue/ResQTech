export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Institution {
  rank: number;
  name: string;
  score: number;
  category: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
  location: string;
}

export interface Report {
  id: string;
  title: string;
  building: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved';
  reporter: string;
  timestamp: string;
  location?: string;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  status: 'safe' | 'pending' | 'missing';
}

export interface DrillResult {
  id: string;
  type: 'Fire' | 'Earthquake' | 'Flood';
  date: string;
  duration: number;
  participantCount: number;
  successRate: number;
  notes?: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    question: "If you smell smoke in a building, what should you do first?",
    options: ["Run to the nearest exit", "Use the elevator", "Crawl low under the smoke", "Open windows for ventilation"],
    correctAnswer: 2,
    explanation: "Smoke rises, so staying low helps you breathe cleaner air and see better."
  },
  {
    id: "2", 
    question: "During an earthquake, what is the safest action to take?",
    options: ["Run outside immediately", "Drop, Cover, and Hold On", "Stand in a doorway", "Hide under stairs"],
    correctAnswer: 1,
    explanation: "Drop, Cover, and Hold On protects you from falling objects and helps you stay stable."
  },
  {
    id: "3",
    question: "What should you do if you're trapped in floodwater?",
    options: ["Try to walk through it", "Wait for help on higher ground", "Drive through it quickly", "Swim to safety"],
    correctAnswer: 1,
    explanation: "Even shallow moving water can knock you down. Stay on higher ground and wait for rescue."
  },
  {
    id: "4",
    question: "Where should you meet after evacuating during a fire drill?",
    options: ["In the parking lot", "At the designated assembly point", "Near the fire trucks", "In another building"],
    correctAnswer: 1,
    explanation: "Assembly points are pre-determined safe locations where attendance can be taken."
  }
];

export const institutionRankings: Institution[] = [
  {
    rank: 1,
    name: "Titiksha Public School",
    score: 94,
    category: "Excellent",
    location: "New Delhi"
  },
  {
    rank: 2,
    name: "Delhi Technical University",
    score: 89,
    category: "Excellent", 
    location: "Delhi"
  },
  {
    rank: 3,
    name: "MAIT",
    score: 85,
    category: "Good",
    location: "New Delhi"
  },
  {
    rank: 4,
    name: "BPIT",
    score: 78,
    category: "Good",
    location: "Delhi"
  },
  {
    rank: 5,
    name: "VIPS",
    score: 72,
    category: "Average",
    location: "Delhi"
  },
  {
    rank: 6,
    name: "MAIT",
    score: 68,
    category: "Average",
    location: "Delhi"
  },
  {
    rank: 7,
    name: "JIMS",
    score: 55,
    category: "Needs Improvement",
    location: "Delhi"
  }
];

export const mockReports: Report[] = [
  {
    id: "1",
    title: "Blocked Fire Exit",
    building: "Main Academic Block",
    description: "Fire exit on 2nd floor is blocked by construction materials",
    severity: "High",
    status: "Open",
    reporter: "Arvind Sharma (Teacher)",
    timestamp: "2025-01-15T10:30:00",
    location: "Floor 2, East Wing"
  },
  {
    id: "2", 
    title: "Faulty Emergency Light",
    building: "Library Building",
    description: "Emergency exit light not working in stairwell B",
    severity: "Medium",
    status: "In Progress",
    reporter: "Vineet Dahiya (Student)",
    timestamp: "2025-01-14T14:15:00",
    location: "Stairwell B, Floor 3"
  },
  {
    id: "3",
    title: "Damaged Fire safety Pipeline",
    building: "Cafeteria",
    description: "Fire safety pipeline is damaged and leaking water",
    severity: "Low",
    status: "Resolved",
    reporter: "Admin Staff",
    timestamp: "2025-01-13T09:45:00",
    location: "North Parking Area"
  }
];

export const mockStudents: Student[] = [
  { id: "1", name: "Keshav Gupta", class: "CSE-A", status: "safe" },
  { id: "2", name: "Vineet Dahiya", class: "CSE-A", status: "safe" },
  { id: "3", name: "Gopal", class: "CSE-A", status: "pending" },
  { id: "4", name: "Aditya", class: "CSE-A", status: "safe" },
  { id: "5", name: "Puneet", class: "CSE-A", status: "pending" },
  { id: "6", name: "Aman", class: "CSE-A", status: "safe" },
  { id: "7", name: "Harsh", class: "CSE-A", status: "missing" },
  { id: "8", name: "suryansh", class: "CSE-A", status: "safe" }
];

export const drillHistory: DrillResult[] = [
  {
    id: "1",
    type: "Fire",
    date: "2025-09-13",
    duration: 4.2,
    participantCount: 850,
    successRate: 96,
    notes: "Excellent response time. Minor delay in Block C."
  },
  {
    id: "2", 
    type: "Earthquake",
    date: "2025-01-03",
    duration: 3.8,
    participantCount: 823,
    successRate: 94,
    notes: "Good overall performance. Need to improve Drop-Cover-Hold response."
  },
  {
    id: "3",
    type: "Fire",
    date: "2025-12-15",
    duration: 5.1,
    participantCount: 801,
    successRate: 89,
    notes: "Some congestion in main stairwell. Additional training needed."
  }
];

export const campusLocations = [
  {
    id: "main-building",
    name: "Main Academic Block", 
    position: { x: 40, y: 30 },
    riskLevel: "Low",
    evacuationRoute: "Exit via main stairwell to Football Ground (Assembly Point A)",
    capacity: 500,
    currentOccupancy: 340
  },
  {
    id: "library",
    name: "Library Building",
    position: { x: 60, y: 50 },
    riskLevel: "Medium", 
    evacuationRoute: "Exit via north stairwell to Assembly Point B",
    capacity: 200,
    currentOccupancy: 85
  },
  {
    id: "cafeteria",
    name: "Cafeteria & Commons",
    position: { x: 25, y: 65 },
    riskLevel: "Low",
    evacuationRoute: "Exit via main doors to Assembly Point C", 
    capacity: 300,
    currentOccupancy: 120
  },
  {
    id: "Girls-hostel",
    name: "Girl's Hostel Building",
    position: { x: 75, y: 25 },
    riskLevel: "High",
    evacuationRoute: "Exit via emergency exits to Parking area(Assembly Point D)",
    capacity: 150,
    currentOccupancy: 45
  }
];