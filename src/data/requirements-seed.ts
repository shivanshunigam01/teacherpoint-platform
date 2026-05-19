import { TUTORS } from "@/data/mock";
import type {
  RequirementStoreState,
  TeacherPrivateContact,
  RequirementPost,
  TeacherProposal,
} from "@/types/requirements";

const now = new Date();
const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000).toISOString();

export const DEMO_USER_IDS = {
  student: "demo-student",
  teacher: "t1",
  admin: "demo-admin",
} as const;

export const TEACHER_PRIVATE_CONTACTS: TeacherPrivateContact[] = TUTORS.map((t, i) => ({
  teacherId: t.id,
  phone: `+1 (555) ${String(100 + i).padStart(3, "0")}-${String(2000 + i).slice(-4)}`,
  whatsapp: `+1 (555) ${String(100 + i).padStart(3, "0")}-${String(3000 + i).slice(-4)}`,
  email: `${t.name.toLowerCase().replace(/\s+/g, ".")}@teacherspoints.com`,
  preferredContactTime: "Weekdays 9 AM – 6 PM (your timezone)",
  joiningInstructions: `Join via TeachersPoints video room or WhatsApp. ${t.name} will share the meeting link after you connect.`,
}));

const SEED_REQUIREMENTS: RequirementPost[] = [
  {
    id: "req-demo-approved",
    studentId: DEMO_USER_IDS.student,
    studentName: "Aarav Patel",
    title: "Class 12 Physics — board exam prep",
    subject: "Physics",
    description: "Need help with electromagnetism and modern physics. 3 sessions per week until exams in March.",
    classLevel: "High school",
    budget: 35,
    preferredMode: "online",
    location: "Mumbai, India",
    language: "English, Hindi",
    status: "approved",
    adminComment: "Clear requirement — approved for tutor matching.",
    createdAt: daysAgo(5),
    approvedAt: daysAgo(4),
  },
  {
    id: "req-demo-pending",
    studentId: DEMO_USER_IDS.student,
    studentName: "Aarav Patel",
    title: "Spoken English for interviews",
    subject: "English",
    description: "Professional English coaching for campus placements. Prefer evening slots.",
    classLevel: "College / University",
    budget: 28,
    preferredMode: "both",
    location: "Delhi, India",
    language: "English",
    status: "pending",
    createdAt: daysAgo(1),
  },
  {
    id: "req-demo-rejected",
    studentId: DEMO_USER_IDS.student,
    studentName: "Aarav Patel",
    title: "Homework help — all subjects",
    subject: "Mathematics",
    description: "Need someone to do homework daily.",
    classLevel: "Middle school",
    budget: 5,
    preferredMode: "online",
    location: "Remote",
    language: "English",
    status: "rejected",
    adminComment: "Please specify one subject and learning goals. Generic homework-only posts are not accepted.",
    createdAt: daysAgo(10),
    rejectedAt: daysAgo(9),
  },
];

const SEED_PROPOSALS: TeacherProposal[] = [
  {
    id: "prop-demo-1",
    requirementId: "req-demo-approved",
    teacherId: "t1",
    teacherName: "Emma Smith",
    subject: "Physics",
    experience: 6,
    rating: 4.9,
    city: "New York",
    verified: true,
    shortBio: "Helping students unlock the beauty of math and physics through intuition-first teaching.",
    message:
      "Hi Aarav! I specialize in board exam physics and have helped 200+ students improve their scores. I can cover electromagnetism with weekly problem sets.",
    proposedFee: 35,
    availability: "Mon, Wed, Fri — 6–9 PM IST",
    teachingMode: "online",
    estimatedDuration: "8 weeks",
    status: "sent",
    createdAt: daysAgo(3),
  },
  {
    id: "prop-demo-2",
    requirementId: "req-demo-approved",
    teacherId: "t3",
    teacherName: "Mark Wilson",
    subject: "Physics",
    experience: 8,
    rating: 4.7,
    city: "Chicago",
    verified: true,
    shortBio: "Physics PhD turning hard concepts into 'aha!' moments daily.",
    message:
      "I can structure a crash course for modern physics with past-paper practice. Flexible weekend slots available.",
    proposedFee: 40,
    availability: "Weekends · flexible weekdays",
    teachingMode: "online",
    estimatedDuration: "6 weeks",
    status: "sent",
    createdAt: daysAgo(2),
  },
];

export function createInitialRequirementStore(): RequirementStoreState {
  return {
    requirements: SEED_REQUIREMENTS.map((r) => ({ ...r })),
    proposals: SEED_PROPOSALS.map((p) => ({ ...p })),
    payments: [],
    contactUnlocks: [],
    teacherPrivateContacts: TEACHER_PRIVATE_CONTACTS.map((c) => ({ ...c })),
    teacherNotifications: [],
  };
}
