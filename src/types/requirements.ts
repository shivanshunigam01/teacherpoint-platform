export type RequirementStatus = "pending" | "approved" | "rejected";
export type PreferredMode = "online" | "offline" | "both";
export type ProposalStatus = "sent" | "selected" | "rejected";
export type PaymentStatus = "pending" | "success" | "failed" | "refunded";
export type PaymentProvider = "razorpay" | "stripe" | "paypal" | "mock";

export interface RequirementPost {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  subject: string;
  description: string;
  classLevel: string;
  budget: number;
  preferredMode: PreferredMode;
  location: string;
  language: string;
  status: RequirementStatus;
  adminComment?: string;
  createdAt: string;
  approvedAt?: string;
  rejectedAt?: string;
}

export interface TeacherProposal {
  id: string;
  requirementId: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar?: string;
  subject: string;
  experience: number;
  rating: number;
  city: string;
  verified: boolean;
  shortBio: string;
  message: string;
  proposedFee: number;
  availability: string;
  teachingMode: PreferredMode;
  estimatedDuration: string;
  status: ProposalStatus;
  createdAt: string;
}

export interface Payment {
  id: string;
  studentId: string;
  teacherId: string;
  requirementId: string;
  proposalId: string;
  amount: number;
  currency: string;
  provider: PaymentProvider;
  status: PaymentStatus;
  paidAt?: string;
  createdAt: string;
}

export interface ContactUnlock {
  id: string;
  studentId: string;
  teacherId: string;
  requirementId: string;
  proposalId: string;
  paymentId: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface TeacherPrivateContact {
  teacherId: string;
  phone: string;
  whatsapp: string;
  email: string;
  preferredContactTime: string;
  joiningInstructions: string;
}

export interface TeacherPaymentNotification {
  id: string;
  teacherId: string;
  studentId: string;
  studentName: string;
  requirementId: string;
  proposalId: string;
  paymentId: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface RequirementStoreState {
  requirements: RequirementPost[];
  proposals: TeacherProposal[];
  payments: Payment[];
  contactUnlocks: ContactUnlock[];
  teacherPrivateContacts: TeacherPrivateContact[];
  teacherNotifications: TeacherPaymentNotification[];
}

export interface CreateRequirementInput {
  studentId: string;
  studentName: string;
  title: string;
  subject: string;
  description: string;
  classLevel: string;
  budget: number;
  preferredMode: PreferredMode;
  location: string;
  language: string;
}

export interface CreateProposalInput {
  requirementId: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar?: string;
  subject: string;
  experience: number;
  rating: number;
  city: string;
  verified: boolean;
  shortBio: string;
  message: string;
  proposedFee: number;
  availability: string;
  teachingMode: PreferredMode;
  estimatedDuration: string;
}

export interface CreatePaymentInput {
  studentId: string;
  teacherId: string;
  requirementId: string;
  proposalId: string;
  amount: number;
  currency?: string;
  provider: PaymentProvider;
}
