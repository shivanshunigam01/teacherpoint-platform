export type Role = "student" | "teacher" | "parent" | "admin";

export const GRADIENTS = [
  "linear-gradient(135deg,#38bdf8,#6366f1)",
  "linear-gradient(135deg,#a78bfa,#ec4899)",
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#10b981,#06b6d4)",
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#ec4899,#f43f5e)",
  "linear-gradient(135deg,#0ea5e9,#22d3ee)",
  "linear-gradient(135deg,#f97316,#eab308)",
];

export interface Tutor {
  id: string;
  name: string;
  subject: string;
  location: string;
  rating: number;
  reviews: number;
  experience: number;
  price: number;
  verified: boolean;
  topTen?: boolean;
  online: boolean;
  language: string[];
  gender: "male" | "female";
  bio: string;
  initials: string;
  gradient: string;
  availability: string;
}

export const TUTORS: Tutor[] = [
  { id: "t1", name: "Emma Smith", subject: "Mathematics", location: "New York, USA", rating: 4.9, reviews: 312, experience: 6, price: 35, verified: true, topTen: true, online: true, language: ["English"], gender: "female", bio: "Helping students unlock the beauty of math through intuition-first teaching.", initials: "ES", gradient: GRADIENTS[0], availability: "Weekdays · Evenings" },
  { id: "t2", name: "Sarah Johnson", subject: "English Literature", location: "Los Angeles, USA", rating: 4.8, reviews: 245, experience: 5, price: 28, verified: true, online: true, language: ["English", "Spanish"], gender: "female", bio: "Award-winning English tutor focused on confident communication and writing.", initials: "SJ", gradient: GRADIENTS[1], availability: "Flexible" },
  { id: "t3", name: "Mark Wilson", subject: "Physics", location: "Chicago, USA", rating: 4.7, reviews: 198, experience: 8, price: 40, verified: true, online: true, language: ["English"], gender: "male", bio: "Physics PhD turning hard concepts into 'aha!' moments daily.", initials: "MW", gradient: GRADIENTS[2], availability: "Weekends" },
  { id: "t4", name: "Anna Brown", subject: "Chemistry", location: "Miami, USA", rating: 4.9, reviews: 289, experience: 7, price: 38, verified: true, topTen: true, online: false, language: ["English"], gender: "female", bio: "Chemistry made simple — lab-tested teaching methods that work.", initials: "AB", gradient: GRADIENTS[3], availability: "Mon-Fri" },
  { id: "t5", name: "Rahul Mehta", subject: "Computer Science", location: "Bengaluru, India", rating: 4.9, reviews: 421, experience: 10, price: 30, verified: true, topTen: true, online: true, language: ["English", "Hindi"], gender: "male", bio: "Ex-Google engineer teaching code, systems, and DSA the right way.", initials: "RM", gradient: GRADIENTS[4], availability: "Daily" },
  { id: "t6", name: "Priya Sharma", subject: "Biology", location: "Delhi, India", rating: 4.8, reviews: 167, experience: 6, price: 22, verified: true, online: true, language: ["English", "Hindi"], gender: "female", bio: "NEET expert with 95% student success rate.", initials: "PS", gradient: GRADIENTS[5], availability: "Evenings" },
  { id: "t7", name: "David Lee", subject: "Spoken English", location: "Toronto, Canada", rating: 4.7, reviews: 134, experience: 4, price: 25, verified: true, online: true, language: ["English"], gender: "male", bio: "Confidence-first English coaching for global learners.", initials: "DL", gradient: GRADIENTS[6], availability: "Flexible" },
  { id: "t8", name: "Maria Garcia", subject: "Spanish", location: "Madrid, Spain", rating: 4.9, reviews: 256, experience: 9, price: 32, verified: true, topTen: true, online: true, language: ["Spanish", "English"], gender: "female", bio: "Native Spanish tutor — fluent conversations from week one.", initials: "MG", gradient: GRADIENTS[7], availability: "Daily" },
  { id: "t9", name: "Arjun Kapoor", subject: "Economics", location: "Mumbai, India", rating: 4.6, reviews: 98, experience: 5, price: 20, verified: true, online: true, language: ["English", "Hindi"], gender: "male", bio: "Macro & micro economics for high school and college students.", initials: "AK", gradient: GRADIENTS[0], availability: "Weekends" },
  { id: "t10", name: "Lisa Chen", subject: "Mandarin", location: "Singapore", rating: 4.8, reviews: 178, experience: 7, price: 35, verified: true, online: true, language: ["Mandarin", "English"], gender: "female", bio: "Mandarin made fun with cultural context.", initials: "LC", gradient: GRADIENTS[1], availability: "Evenings" },
  { id: "t11", name: "James Carter", subject: "History", location: "London, UK", rating: 4.7, reviews: 89, experience: 12, price: 33, verified: true, online: false, language: ["English"], gender: "male", bio: "Bringing history alive through stories and primary sources.", initials: "JC", gradient: GRADIENTS[2], availability: "Mon-Thu" },
  { id: "t12", name: "Neha Iyer", subject: "Mathematics", location: "Chennai, India", rating: 4.9, reviews: 354, experience: 8, price: 24, verified: true, topTen: true, online: true, language: ["English", "Hindi", "Tamil"], gender: "female", bio: "JEE/NEET math specialist — 1000+ students mentored.", initials: "NI", gradient: GRADIENTS[3], availability: "Daily" },
];

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  reviews: number;
  price: number;
  oldPrice: number;
  duration: string;
  lessons: number;
  students: number;
  bestseller?: boolean;
  certificate: boolean;
  language: string;
  gradient: string;
  description: string;
}

export const COURSES: Course[] = [
  { id: "c1", title: "AI Coding Agents Masterclass", instructor: "Rahul Mehta", category: "AI & ML", level: "Intermediate", rating: 4.8, reviews: 2415, price: 19, oldPrice: 99, duration: "18h", lessons: 86, students: 12450, bestseller: true, certificate: true, language: "English", gradient: GRADIENTS[0], description: "Build production-grade AI agents with LLMs, RAG, and tool-calling." },
  { id: "c2", title: "PMP Certification Exam Prep 2026", instructor: "Sarah Johnson", category: "Business", level: "Advanced", rating: 4.7, reviews: 1820, price: 24, oldPrice: 129, duration: "32h", lessons: 142, students: 8900, certificate: true, language: "English", gradient: GRADIENTS[1], description: "Pass the PMP on your first try with 1500+ practice questions." },
  { id: "c3", title: "Python Complete Bootcamp", instructor: "Mark Wilson", category: "Development", level: "Beginner", rating: 4.9, reviews: 5432, price: 15, oldPrice: 89, duration: "42h", lessons: 220, students: 32100, bestseller: true, certificate: true, language: "English", gradient: GRADIENTS[2], description: "Zero to hero — Python, automation, web scraping, and data analysis." },
  { id: "c4", title: "Data Science Masterclass", instructor: "Anna Brown", category: "Data Science", level: "Intermediate", rating: 4.8, reviews: 3210, price: 22, oldPrice: 119, duration: "38h", lessons: 156, students: 18700, bestseller: true, certificate: true, language: "English", gradient: GRADIENTS[3], description: "End-to-end data science with Python, ML, and real projects." },
  { id: "c5", title: "Digital Marketing Pro 2026", instructor: "Emma Smith", category: "Marketing", level: "Beginner", rating: 4.6, reviews: 1942, price: 17, oldPrice: 99, duration: "24h", lessons: 98, students: 14300, certificate: true, language: "English", gradient: GRADIENTS[4], description: "SEO, ads, social, and analytics — a full marketing stack." },
  { id: "c6", title: "Web Development Full Stack", instructor: "Rahul Mehta", category: "Development", level: "Intermediate", rating: 4.9, reviews: 4120, price: 21, oldPrice: 139, duration: "55h", lessons: 280, students: 25600, bestseller: true, certificate: true, language: "English", gradient: GRADIENTS[5], description: "MERN stack, deploy real apps, build a portfolio." },
  { id: "c7", title: "Spoken English Mastery", instructor: "David Lee", category: "Languages", level: "Beginner", rating: 4.7, reviews: 2156, price: 12, oldPrice: 69, duration: "16h", lessons: 64, students: 19800, certificate: true, language: "English", gradient: GRADIENTS[6], description: "Speak confident, fluent English in 30 days." },
  { id: "c8", title: "Mathematics Foundation Class 10", instructor: "Neha Iyer", category: "School", level: "Beginner", rating: 4.8, reviews: 987, price: 14, oldPrice: 79, duration: "28h", lessons: 110, students: 7800, certificate: true, language: "English", gradient: GRADIENTS[7], description: "Complete CBSE class 10 math with concept videos and tests." },
  { id: "c9", title: "Excel for Business Analytics", instructor: "Arjun Kapoor", category: "Business", level: "Intermediate", rating: 4.6, reviews: 1234, price: 13, oldPrice: 65, duration: "12h", lessons: 52, students: 9500, certificate: true, language: "English", gradient: GRADIENTS[0], description: "Pivot tables, DAX, dashboards — Excel like a pro." },
  { id: "c10", title: "UI/UX Design Bootcamp", instructor: "Lisa Chen", category: "Design", level: "Beginner", rating: 4.9, reviews: 3015, price: 19, oldPrice: 109, duration: "28h", lessons: 134, students: 16200, bestseller: true, certificate: true, language: "English", gradient: GRADIENTS[1], description: "Design systems, Figma, prototyping, and portfolio building." },
  { id: "c11", title: "JEE Advanced Physics", instructor: "Mark Wilson", category: "School", level: "Advanced", rating: 4.7, reviews: 654, price: 18, oldPrice: 99, duration: "44h", lessons: 178, students: 5400, certificate: true, language: "English", gradient: GRADIENTS[2], description: "Crack JEE Advanced with concept-based physics training." },
  { id: "c12", title: "Spanish Conversation A1-B1", instructor: "Maria Garcia", category: "Languages", level: "Beginner", rating: 4.9, reviews: 2890, price: 16, oldPrice: 89, duration: "22h", lessons: 88, students: 13800, bestseller: true, certificate: true, language: "Spanish", gradient: GRADIENTS[3], description: "Hold real Spanish conversations from your first week." },
];

export const CATEGORIES = [
  { id: "all", name: "All", icon: "Sparkles" },
  { id: "dev", name: "Development", icon: "Code" },
  { id: "ai", name: "AI & ML", icon: "Brain" },
  { id: "data", name: "Data Science", icon: "BarChart3" },
  { id: "design", name: "Design", icon: "Palette" },
  { id: "business", name: "Business", icon: "Briefcase" },
  { id: "marketing", name: "Marketing", icon: "Megaphone" },
  { id: "languages", name: "Languages", icon: "Languages" },
  { id: "school", name: "School", icon: "GraduationCap" },
];

export const SKILLS = [
  { name: "ChatGPT", icon: "Bot", color: "from-emerald-400 to-cyan-500" },
  { name: "Python", icon: "Code2", color: "from-blue-400 to-indigo-600" },
  { name: "Figma", icon: "Palette", color: "from-pink-400 to-rose-600" },
  { name: "Excel", icon: "Table", color: "from-green-400 to-emerald-600" },
  { name: "PowerBI", icon: "BarChart3", color: "from-yellow-400 to-orange-500" },
  { name: "React", icon: "Atom", color: "from-cyan-400 to-blue-500" },
  { name: "SQL", icon: "Database", color: "from-purple-400 to-indigo-600" },
  { name: "Tableau", icon: "PieChart", color: "from-teal-400 to-cyan-600" },
  { name: "AWS", icon: "Cloud", color: "from-orange-400 to-red-500" },
  { name: "Photoshop", icon: "Image", color: "from-blue-500 to-purple-600" },
  { name: "TensorFlow", icon: "Brain", color: "from-orange-400 to-pink-500" },
  { name: "Notion", icon: "FileText", color: "from-gray-400 to-gray-700" },
];

export const COMBOS = [
  { id: "k1", title: "Full Stack Developer Combo", courses: 6, hours: 120, price: 49, oldPrice: 299, includes: ["Web Dev", "React", "Node.js", "MongoDB", "AWS", "DevOps"], gradient: GRADIENTS[0] },
  { id: "k2", title: "AI & Data Science Pack", courses: 5, hours: 95, price: 59, oldPrice: 349, includes: ["Python", "ML", "Deep Learning", "NLP", "GenAI"], gradient: GRADIENTS[1] },
  { id: "k3", title: "Digital Marketer Pro", courses: 4, hours: 68, price: 39, oldPrice: 229, includes: ["SEO", "Ads", "Social", "Analytics"], gradient: GRADIENTS[3] },
  { id: "k4", title: "School Excellence Bundle", courses: 8, hours: 220, price: 69, oldPrice: 399, includes: ["Math", "Science", "English", "Tests"], gradient: GRADIENTS[4] },
];

export const TESTIMONIALS = [
  { id: "r1", name: "Aarav Patel", role: "Student, Class 12", rating: 5, text: "TeacherPoint helped me find the perfect math tutor. My grades jumped from B to A+ in 3 months!", initials: "AP" },
  { id: "r2", name: "Jessica Wong", role: "UI Designer", rating: 5, text: "The UI/UX bootcamp was hands-on and got me my first design job at a startup.", initials: "JW" },
  { id: "r3", name: "Mohammed Khan", role: "Software Engineer", rating: 5, text: "Best platform for live tutoring. The AI assistant recommended courses I actually needed.", initials: "MK" },
  { id: "r4", name: "Sofia Rodriguez", role: "Marketing Lead", rating: 5, text: "Loved the combo packs — saved tons and learned a complete skill stack.", initials: "SR" },
  { id: "r5", name: "Ryan O'Connor", role: "Parent", rating: 5, text: "I track my son's progress weekly. The parent dashboard is a game-changer.", initials: "RO" },
  { id: "r6", name: "Mei Lin", role: "Career Switcher", rating: 5, text: "Switched from finance to data science thanks to TeacherPoint mentors.", initials: "ML" },
];

export const FAQS = [
  { q: "How do I find the right tutor on TeacherPoint?", a: "Use our advanced filters — subject, price, location, language, and verified badges — to shortlist tutors. You can chat with up to 3 free trial sessions before booking." },
  { q: "Are courses on TeacherPoint certified?", a: "Yes — every course includes a verified completion certificate that can be shared on LinkedIn and added to your resume." },
  { q: "Can parents track their child's learning?", a: "Absolutely. The Parent Dashboard shows enrolled courses, attendance, test scores, and weekly learning hours in real time." },
  { q: "What payment methods are supported?", a: "We accept Razorpay, Stripe, PayPal, UPI, debit/credit cards, and net banking across multiple currencies." },
  { q: "Is there a refund policy?", a: "Yes — 7-day no-questions-asked refund on every course and tutor session purchase." },
  { q: "How do teachers get verified?", a: "Teachers submit ID, qualifications, and complete a demo class. Our review team verifies within 48 hours." },
  { q: "Do you support live and recorded learning?", a: "Both. Most courses include lifetime recorded access; tutors offer 1-on-1 live sessions in your timezone." },
  { q: "Can I become a teacher on TeacherPoint?", a: "Yes — apply via 'Become a Teacher'. Once verified, you can list courses, accept students, and earn weekly payouts." },
];

export const COMPANIES = ["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Adobe", "IBM", "Spotify"];

export const STATS = [
  { value: "12,500+", label: "Verified Tutors" },
  { value: "850K+", label: "Active Students" },
  { value: "4.9★", label: "Average Rating" },
  { value: "120+", label: "Countries" },
];

export const HOW_IT_WORKS = [
  { step: "01", title: "Search", desc: "Discover tutors and courses tailored to your goals.", icon: "Search" },
  { step: "02", title: "Connect", desc: "Chat free, book a trial, and pick your perfect match.", icon: "MessageCircle" },
  { step: "03", title: "Learn", desc: "Live sessions, recorded lessons, and earn certificates.", icon: "GraduationCap" },
];

export const LEARNING_TIMELINE = [
  { title: "Watch Lessons", desc: "Industry-led video lessons, anytime, anywhere.", icon: "PlayCircle" },
  { title: "Practice Live", desc: "Hands-on assignments and 1-on-1 doubt clearing.", icon: "Target" },
  { title: "Build Projects", desc: "Real-world projects reviewed by mentors.", icon: "Hammer" },
  { title: "Get Certified", desc: "Earn an industry-recognized certificate.", icon: "Award" },
  { title: "Land a Job", desc: "Career support, mock interviews, and referrals.", icon: "Briefcase" },
];

export const COMPARISON = [
  { feature: "Verified Expert Tutors", us: true, others: false },
  { feature: "Live 1-on-1 Sessions", us: true, others: true },
  { feature: "Lifetime Course Access", us: true, others: false },
  { feature: "Industry Certificates", us: true, others: true },
  { feature: "Parent Dashboard", us: true, others: false },
  { feature: "AI Learning Assistant", us: true, others: false },
  { feature: "7-Day Refund Guarantee", us: true, others: false },
  { feature: "Multi-language Support", us: true, others: true },
];

export const NOTIFICATIONS = [
  { id: "n1", title: "New course recommendation", body: "AI Coding Agents Masterclass — perfect for your goals.", time: "2m ago", unread: true },
  { id: "n2", title: "Emma Smith accepted your booking", body: "Math session scheduled for Friday 6 PM.", time: "1h ago", unread: true },
  { id: "n3", title: "Certificate ready", body: "Your Python Bootcamp certificate is ready.", time: "Yesterday", unread: false },
  { id: "n4", title: "Weekly progress report", body: "You completed 4h of learning this week.", time: "2d ago", unread: false },
];

export const SUPPORT_TICKETS = [
  { id: "#1042", subject: "Refund request for PMP course", status: "Open", priority: "High", date: "May 12" },
  { id: "#1041", subject: "Cannot access certificate", status: "In Progress", priority: "Medium", date: "May 10" },
  { id: "#1038", subject: "Tutor reschedule request", status: "Resolved", priority: "Low", date: "May 8" },
];

export const PAYMENT_PLANS = [
  { name: "Free", price: 0, period: "forever", features: ["Browse tutors & courses", "3 free trial sessions", "Basic dashboard", "Community access"], cta: "Get Started", highlight: false },
  { name: "Pro", price: 19, period: "month", features: ["Unlimited tutor chats", "All courses 50% off", "AI learning assistant", "Priority support", "Downloadable certificates"], cta: "Start Pro Trial", highlight: true },
  { name: "Premium", price: 49, period: "month", features: ["Everything in Pro", "1-on-1 mentor included", "Career coaching", "Job referrals", "Family accounts (4 users)"], cta: "Go Premium", highlight: false },
];

export const REVENUE_DATA = [
  { month: "Jan", revenue: 42000, payouts: 28000 },
  { month: "Feb", revenue: 51000, payouts: 34000 },
  { month: "Mar", revenue: 67000, payouts: 45000 },
  { month: "Apr", revenue: 78000, payouts: 52000 },
  { month: "May", revenue: 92000, payouts: 61000 },
  { month: "Jun", revenue: 105000, payouts: 70000 },
];

export const ENROLLMENT_DATA = [
  { day: "Mon", count: 120 }, { day: "Tue", count: 180 }, { day: "Wed", count: 240 },
  { day: "Thu", count: 200 }, { day: "Fri", count: 320 }, { day: "Sat", count: 410 }, { day: "Sun", count: 380 },
];

export const ADMIN_USERS = [
  { id: "u1", name: "Aarav Patel", role: "Student", email: "aarav@example.com", joined: "May 12, 2026", status: "Active" },
  { id: "u2", name: "Emma Smith", role: "Teacher", email: "emma@example.com", joined: "Apr 22, 2026", status: "Active" },
  { id: "u3", name: "Ryan O'Connor", role: "Parent", email: "ryan@example.com", joined: "May 02, 2026", status: "Active" },
  { id: "u4", name: "Lisa Chen", role: "Teacher", email: "lisa@example.com", joined: "Mar 18, 2026", status: "Pending" },
  { id: "u5", name: "Mohammed Khan", role: "Student", email: "mk@example.com", joined: "May 09, 2026", status: "Active" },
];

export const DEMO_USERS: Record<Role, { name: string; email: string }> = {
  student: { name: "Aarav Patel", email: "student@teacherpoint.com" },
  teacher: { name: "Emma Smith", email: "teacher@teacherpoint.com" },
  parent: { name: "Ryan O'Connor", email: "parent@teacherpoint.com" },
  admin: { name: "Admin", email: "admin@teacherpoint.com" },
};
