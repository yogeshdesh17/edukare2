export const INSTITUTE = {
  name: "Edukare Academy",
  tagline: "Education with Care",
  phone: "8530180202",
  email: "edukareacademy14@gmail.com",
  website: "edukareacademy.com",
  address: "4th Floor, Above Bank of Baroda, Venus Garden, Mundhwa Kharadi Road, Kharadi, Pune – 411014",
  founded: 2020,
  social: {
    instagram: "https://instagram.com/edukare_academy",
    youtube: "#", // placeholder
    facebook: "#", // placeholder
    whatsapp: "https://wa.me/918530180202?text=Hi%2C%20I%20want%20to%20enquire%20about%20admissions%20at%20Edukare%20Academy"
  },
  stats: [
    { value: "5+", label: "Years of Excellence", icon: "🏆" },
    { value: "500+", label: "Students Transformed", icon: "🎓" },
    { value: "14", label: "Expert Faculty", icon: "👩‍🏫" },
    { value: "18+", label: "CET & Board Toppers", icon: "⭐" }
  ]
};

export const WHY_US = [
  { icon: "📋", title: "KYC Monthly Reports", desc: "Individual progress report with personal teacher remarks — every single month. You're never in the dark about your child." },
  { icon: "👥", title: "Limited Batch Size", desc: "Small batches ensure every student gets personal attention. No student gets lost in a crowd." },
  { icon: "🔬", title: "Biometric Attendance", desc: "Tech-enabled attendance tracking. Parents stay informed, students stay accountable." },
  { icon: "📅", title: "Academic Calendar", desc: "Full year plan published upfront. Test dates, syllabus milestones — everything visible in advance." },
  { icon: "🎯", title: "Weekly Tests", desc: "Board + JEE/NEET/CET pattern simultaneously. Dual preparation without switching institutes." },
  { icon: "🤝", title: "Career Counselling", desc: "Expert guidance for Engineering & Medical admissions — counselling, cut-offs, and process support included." },
  { icon: "📓", title: "Printed Study Notes", desc: "Customised material designed for fast learning and effective revision by Edukare faculty." },
  { icon: "🏫", title: "Class 8 to CET/JEE/NEET", desc: "One institute for 6+ years. Build your foundation here and crack the toughest exams here too." },
];

export const COURSES = [
  {
    id: "8-10-cbse",
    title: "8th–10th CBSE",
    subtitle: "School Foundation",
    exam: "CBSE Boards",
    color: "#1A3C8F",
    icon: "📘",
    desc: "Strong conceptual foundation across all CBSE subjects. Two batch options: Arjuna (core) and Chanakya (all subjects).",
    batches: ["Arjuna", "Chanakya"],
    duration: "1 Academic Year",
    dailyHours: "2–3 hrs",
    features: ["Math & Science focus", "All subjects option", "Weekly tests", "Monthly KYC report"],
    fees: [
      { batch: "Arjuna", subjects: "Math, Science", total: "₹30,000", earlyBird: "₹27,000" },
      { batch: "Chanakya", subjects: "All Subjects", total: "₹40,000", earlyBird: "₹36,000" },
    ]
  },
  {
    id: "8-10-ssc",
    title: "8th–10th SSC",
    subtitle: "School Foundation",
    exam: "SSC Boards",
    color: "#1A6B3A",
    icon: "📗",
    desc: "Rigorous preparation for Maharashtra SSC board students. Arjuna and Chanakya batches available.",
    batches: ["Arjuna", "Chanakya"],
    duration: "1 Academic Year",
    dailyHours: "2–3 hrs",
    features: ["Maharashtra SSC pattern", "Marathi & English medium support", "Weekly tests", "Monthly KYC report"],
    fees: [
      { batch: "Arjuna", subjects: "Math, Science, English", total: "₹20,000–35,000*", earlyBird: "₹18,000–31,500*" },
      { batch: "Chanakya", subjects: "All Subjects", total: "₹30,000–45,000*", earlyBird: "₹27,000–40,500*" },
    ]
  },
  {
    id: "11-12-science",
    title: "11th–12th Science",
    subtitle: "Junior College",
    exam: "HSC + JEE / NEET / CET",
    color: "#E87B1A",
    icon: "🔬",
    desc: "Integrated boards + competitive exam preparation. PCM for JEE/CET, PCB for NEET. Multiple fee tiers.",
    batches: ["Batch A", "B", "C", "D", "E", "F"],
    duration: "2 Years (11th + 12th)",
    dailyHours: "2.5 hrs",
    features: ["Board + JEE/NEET simultaneously", "Academic calendar for 2 years", "Pre-board doubt sessions", "CET Crash Course in final year"],
    fees: [
      { batch: "A — 11th–12th Boards + JEE/NEET", subjects: "PCM/PCB", total: "₹1,80,000", earlyBird: "₹1,50,000 (lumpsum)" },
      { batch: "C — 11th–12th Boards + CET", subjects: "PCM/PCB", total: "₹1,50,000", earlyBird: "₹1,26,000 (lumpsum)" },
      { batch: "D — 11th–12th Boards Only", subjects: "PCM/PCB", total: "₹1,30,000", earlyBird: "₹1,10,000 (lumpsum)" },
    ]
  },
  {
    id: "11-12-commerce",
    title: "11th–12th Commerce",
    subtitle: "Junior College",
    exam: "HSC Boards",
    color: "#1A3C8F",
    icon: "📊",
    desc: "Complete Commerce stream coaching for Boards. Accounting taught by a qualified CA.",
    batches: ["Batch F"],
    duration: "1–2 Years",
    dailyHours: "1.5–2 hrs",
    features: ["Accounting by CA faculty", "Economics, OCM, SP, Maths", "Board exam pattern tests", "Monthly KYC report"],
    fees: [
      { batch: "F — 11th or 12th Boards Only", subjects: "Commerce subjects", total: "₹75,000", earlyBird: "₹63,000 (lumpsum)" },
    ]
  },
  {
    id: "jee-neet",
    title: "JEE / NEET",
    subtitle: "Competitive Exams",
    exam: "JEE Main + Advanced / NEET",
    color: "#C9960A",
    icon: "🏆",
    desc: "Integrated JEE and NEET preparation alongside HSC boards. Structured 2-year plan with milestones.",
    batches: ["Batch A (with Boards)"],
    duration: "2 Years",
    dailyHours: "2.5 hrs",
    features: ["Simultaneous board + JEE/NEET", "Full portion JEE tests (Dec)", "Pre-boards + doubt sessions", "PCM / PCB streams"],
    fees: [
      { batch: "A — 11th–12th + JEE/NEET", subjects: "PCM / PCB", total: "₹1,80,000", earlyBird: "₹1,50,000 (lumpsum)" },
      { batch: "B — 12th + JEE/NEET", subjects: "PCM / PCB", total: "₹1,00,000", earlyBird: "₹85,000 (lumpsum)" },
    ]
  },
  {
    id: "cet-crash",
    title: "MH-CET Crash Course",
    subtitle: "⚡ Batch Live Now",
    exam: "MH-CET 2026",
    color: "#1A6B3A",
    icon: "⚡",
    desc: "Intensive 45-day crash course for MH-CET. 4.5 hours daily. 90+ practice papers. Limited seats.",
    batches: ["Batch G"],
    duration: "45 Days",
    dailyHours: "4.5 hrs",
    features: ["4.5 hours daily lectures", "90+ CET practice papers (last 3 years)", "CET Test App access", "Limited batch — personal attention"],
    fees: [
      { batch: "G — CET Crash Course", subjects: "Physics, Chemistry, Maths/Biology", total: "₹15,000", earlyBird: "₹15,000" },
    ]
  }
];

// faceY: objectPosition vertical % for the circular thumbnail.
// Only set when the default 'center' crops the face out (tall full-body portraits).
export const FACULTY = [
  { id: 1,  name: "Mr. Vijay Patil",     qual: "B.Com, MBA (Marketing)",    subject: "Director & Founder", isDirector: true },
  { id: 2,  name: "Rakesh Wakchure",     qual: "B.E. (Mechanical)",         subject: "Physics" },
  { id: 3,  name: "Swati Katke",         qual: "B.E. (Electronics)",        subject: "Mathematics",  faceY: '35%' },
  { id: 4,  name: "Meenakshi Waghmare", qual: "M.Sc., B.Ed (Chemistry)",   subject: "Chemistry" },
  { id: 5,  name: "Kirti Shinde",        qual: "M.Sc., B.Ed (Botany)",      subject: "Biology" },
  { id: 6,  name: "Sonali Donolikar",    qual: "M.Sc., B.Ed (Physics)",     subject: "Physics" },
  { id: 7,  name: "Yogesh Gaikwad",      qual: "M.Sc., B.Ed, Ph.D",         subject: "Chemistry" },
  { id: 8,  name: "Mayur Gaikwad",       qual: "M.Sc., B.Ed (Zoology)",     subject: "Biology" },
  { id: 9,  name: "Arvind Tambe",        qual: "M.A., B.Ed (Economics)",    subject: "Social Studies" },
  { id: 10, name: "Kabir Alhat",         qual: "M.A., B.Ed (English)",      subject: "English",      faceY: '12%' },
  { id: 11, name: "Prakash Mehtre",      qual: "M.A., B.Ed (Hindi)",        subject: "Hindi",        faceY: '12%' },
  { id: 12, name: "Kanchan Jagtap",      qual: "M.A., B.Ed (English)",      subject: "English" },
  { id: 13, name: "Manish Chauhan",      qual: "BCA, D.El.Ed",              subject: "Physics" },
  { id: 14, name: "Ankansha Garg",       qual: "C.A.",                      subject: "Accounting" },
  { id: 15, name: "Sandeep Sole",        qual: "B.A., D.Ed (Marathi)",      subject: "Marathi" },
];

export const TOPPERS = [
  { name: "Swara Yeola", exam: "10th CBSE", score: "98.00%", category: "boards" },
  { name: "Samiksha Autane", exam: "10th CBSE", score: "95.00%", category: "boards" },
  { name: "Druv Kukawalkar", exam: "10th CBSE", score: "93.60%", category: "boards" },
  { name: "Avaneesh Khoosekar", exam: "10th CBSE", score: "91.00%", category: "boards" },
  { name: "Avanish Deshpande", exam: "10th CBSE", score: "92.00%", category: "boards" },
  { name: "Nikhil Chaudhary", exam: "10th CBSE", score: "90.80%", category: "boards" },
  { name: "Mugda Dalvi", exam: "10th CBSE", score: "90.00%", category: "boards" },
  { name: "Tanisha Manghrani", exam: "10th CBSE", score: "90.00%", category: "boards" },
  { name: "Arnav Jagtap", exam: "10th SSC", score: "90.00%", category: "boards" },
  { name: "Shardul Nawale", exam: "10th SSC", score: "82.60%", category: "boards" },
  { name: "Livia Shusheel", exam: "MH-CET", score: "98.27%", category: "cet" },
  { name: "Tanisha Botre", exam: "MH-CET", score: "92.24%", category: "cet" },
  { name: "Shubham Gaikwad", exam: "MH-CET", score: "88.01%", category: "cet" },
  { name: "Arush Wagh", exam: "MH-CET", score: "85.09%", category: "cet" },
  { name: "Sofia Inamdar", exam: "MH-CET", score: "83.55%", category: "cet" },
  { name: "Shaudyvardhan Undre", exam: "MH-CET", score: "83.05%", category: "cet" },
  { name: "Parth Nasare", exam: "MH-CET", score: "83.00%", category: "cet" },
  { name: "Niharika Malewar", exam: "MH-CET", score: "83.00%", category: "cet" },
];

export const TESTIMONIALS = [
  { name: "Pranjal Ramesh Gladade", cls: "8th CBSE", quote: "Teachers at Edukare Academy made learning easy with simple examples. Notes are easy to understand. My marks have improved and I feel happy to come to class." },
  { name: "Rohit Ganjarde", cls: "HSC 11th, CET/JEE", quote: "I received proper guidance for CET/JEE here. Teachers support at every step. Notes and practice papers are very useful. Counselling helped me stay calm. I strongly recommend Edukare Academy." },
  { name: "Manasi Mulajkar", cls: "12th CBSE", quote: "Teachers give personal attention. Edukare Academy helped me manage board syllabus easily. Study material is well organised. Regular practice improved my writing speed. I feel stress-free before exams." },
  { name: "Darshana Shrinivas Hasanpalli", cls: "8th CBSE", quote: "Edukare Academy helped me become more regular in studies. Teachers guide us properly and encourage us to ask questions. My understanding is much better now." },
  { name: "Tejomayee M. Nikam", cls: "10th SSC", quote: "Teachers at Edukare Academy are very supportive. They explain topics again if needed. Doubt sessions are very useful. I improved my performance in school exams and now I study with confidence." },
  { name: "Chandani Tak", cls: "12th HSC, CET", quote: "I joined Edukare Academy for board preparation. Teacher focuses on concepts and exam writing. Regular tests helped for revision. Counselling sessions guided me well. My performance has improved." },
  { name: "Ankita Gad", cls: "11th CBSE, JEE", quote: "Competitive exam preparation became easier at Edukare Academy. Teachers explain difficult topics simply. Doubt sessions helped clear concepts and weekly tests improved my speed. I am happy with my progress." },
];

export const ACTIVITIES = [
  { label: "Trip to Sinhagad Fort", emoji: "🏔️" },
  { label: "Pawna Lake Excursion", emoji: "🌊" },
  { label: "Diwali Get Together", emoji: "🪔" },
  { label: "Teachers Day Celebration", emoji: "🌸" },
  { label: "Birthday Celebrations", emoji: "🎂" },
];
