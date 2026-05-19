import type {
  ContactUnlock,
  CreatePaymentInput,
  CreateProposalInput,
  CreateRequirementInput,
  Payment,
  RequirementPost,
  RequirementStoreState,
  TeacherProposal,
} from "@/types/requirements";

const rid = (prefix: string) => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

export function createRequirementPost(
  state: RequirementStoreState,
  input: CreateRequirementInput,
): { state: RequirementStoreState; post: RequirementPost } {
  const post: RequirementPost = {
    id: rid("req"),
    ...input,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  return {
    state: { ...state, requirements: [post, ...state.requirements] },
    post,
  };
}

export function getStudentRequirements(state: RequirementStoreState, studentId: string): RequirementPost[] {
  return state.requirements
    .filter((r) => r.studentId === studentId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getPendingRequirementsForAdmin(state: RequirementStoreState): RequirementPost[] {
  return state.requirements
    .filter((r) => r.status === "pending")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getAllRequirementsForAdmin(state: RequirementStoreState): RequirementPost[] {
  return [...state.requirements].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function approveRequirement(
  state: RequirementStoreState,
  requirementId: string,
  adminComment?: string,
): RequirementStoreState {
  const approvedAt = new Date().toISOString();
  return {
    ...state,
    requirements: state.requirements.map((r) =>
      r.id === requirementId
        ? {
            ...r,
            status: "approved" as const,
            adminComment: adminComment ?? r.adminComment,
            approvedAt,
            rejectedAt: undefined,
          }
        : r,
    ),
  };
}

export function rejectRequirement(
  state: RequirementStoreState,
  requirementId: string,
  adminComment: string,
): RequirementStoreState {
  const rejectedAt = new Date().toISOString();
  return {
    ...state,
    requirements: state.requirements.map((r) =>
      r.id === requirementId
        ? {
            ...r,
            status: "rejected" as const,
            adminComment,
            rejectedAt,
            approvedAt: undefined,
          }
        : r,
    ),
  };
}

export function getApprovedRequirementsForTeacher(state: RequirementStoreState): RequirementPost[] {
  return state.requirements
    .filter((r) => r.status === "approved")
    .sort((a, b) => new Date(b.approvedAt ?? b.createdAt).getTime() - new Date(a.approvedAt ?? a.createdAt).getTime());
}

export function createTeacherProposal(
  state: RequirementStoreState,
  input: CreateProposalInput,
): { state: RequirementStoreState; proposal: TeacherProposal } | { error: string } {
  const requirement = state.requirements.find((r) => r.id === input.requirementId);
  if (!requirement) return { error: "Requirement not found." };
  if (requirement.status !== "approved") {
    return { error: "You can only reply to admin-approved requirements." };
  }

  const existing = state.proposals.find(
    (p) => p.requirementId === input.requirementId && p.teacherId === input.teacherId,
  );
  if (existing) return { error: "You have already sent a proposal for this requirement." };

  const proposal: TeacherProposal = {
    id: rid("prop"),
    ...input,
    status: "sent",
    createdAt: new Date().toISOString(),
  };

  return {
    state: { ...state, proposals: [proposal, ...state.proposals] },
    proposal,
  };
}

export function getProposalsForRequirement(state: RequirementStoreState, requirementId: string): TeacherProposal[] {
  return state.proposals
    .filter((p) => p.requirementId === requirementId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getProposalsByTeacher(state: RequirementStoreState, teacherId: string): TeacherProposal[] {
  return state.proposals.filter((p) => p.teacherId === teacherId);
}

export function getAllProposals(state: RequirementStoreState): TeacherProposal[] {
  return [...state.proposals].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function createPayment(
  state: RequirementStoreState,
  input: CreatePaymentInput,
): { state: RequirementStoreState; payment: Payment } | { error: string } {
  const requirement = state.requirements.find((r) => r.id === input.requirementId);
  if (!requirement || requirement.status !== "approved") {
    return { error: "Payment is only allowed for approved requirements." };
  }

  const proposal = state.proposals.find((p) => p.id === input.proposalId);
  if (!proposal || proposal.requirementId !== input.requirementId) {
    return { error: "Invalid proposal." };
  }
  if (proposal.status === "rejected") {
    return { error: "This proposal is no longer available." };
  }

  const existingUnlock = state.contactUnlocks.find(
    (u) => u.requirementId === input.requirementId && u.studentId === input.studentId && u.isUnlocked,
  );
  if (existingUnlock) {
    return { error: "Contact is already unlocked for this requirement." };
  }

  const payment: Payment = {
    id: rid("pay"),
    ...input,
    currency: input.currency ?? "USD",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  return {
    state: { ...state, payments: [payment, ...state.payments] },
    payment,
  };
}

export function verifyPayment(
  state: RequirementStoreState,
  paymentId: string,
  success: boolean,
  studentName: string,
): { state: RequirementStoreState; payment?: Payment; unlock?: ContactUnlock } | { error: string } {
  const payment = state.payments.find((p) => p.id === paymentId);
  if (!payment) return { error: "Payment not found." };

  if (!success) {
    return {
      state: {
        ...state,
        payments: state.payments.map((p) =>
          p.id === paymentId ? { ...p, status: "failed" as const } : p,
        ),
      },
    };
  }

  const requirement = state.requirements.find((r) => r.id === payment.requirementId);
  if (!requirement || requirement.status !== "approved") {
    return { error: "Cannot complete payment for this requirement." };
  }

  const paidAt = new Date().toISOString();
  const updatedPayment: Payment = { ...payment, status: "success", paidAt };

  const unlock: ContactUnlock = {
    id: rid("unlock"),
    studentId: payment.studentId,
    teacherId: payment.teacherId,
    requirementId: payment.requirementId,
    proposalId: payment.proposalId,
    paymentId: payment.id,
    isUnlocked: true,
    unlockedAt: paidAt,
  };

  const updatedProposals = state.proposals.map((p) => {
    if (p.requirementId !== payment.requirementId) return p;
    if (p.id === payment.proposalId) return { ...p, status: "selected" as const };
    if (p.status === "sent") return { ...p, status: "rejected" as const };
    return p;
  });

  const notification = {
    id: rid("tn"),
    teacherId: payment.teacherId,
    studentId: payment.studentId,
    studentName,
    requirementId: payment.requirementId,
    proposalId: payment.proposalId,
    paymentId: payment.id,
    message: `${studentName} completed payment. Contact details are now unlocked — reach out to schedule your first session.`,
    createdAt: paidAt,
    read: false,
  };

  return {
    state: {
      ...state,
      payments: state.payments.map((p) => (p.id === paymentId ? updatedPayment : p)),
      contactUnlocks: [unlock, ...state.contactUnlocks],
      proposals: updatedProposals,
      teacherNotifications: [notification, ...state.teacherNotifications],
    },
    payment: updatedPayment,
    unlock,
  };
}

export function unlockTeacherContact(
  state: RequirementStoreState,
  studentId: string,
  proposalId: string,
): ContactUnlock | null {
  return (
    state.contactUnlocks.find(
      (u) => u.studentId === studentId && u.proposalId === proposalId && u.isUnlocked,
    ) ?? null
  );
}

export function isContactUnlocked(
  state: RequirementStoreState,
  studentId: string,
  proposalId: string,
): boolean {
  return !!unlockTeacherContact(state, studentId, proposalId);
}

export function getUnlockedContacts(state: RequirementStoreState, studentId: string): ContactUnlock[] {
  return state.contactUnlocks.filter((u) => u.studentId === studentId && u.isUnlocked);
}

export function getAllContactUnlocks(state: RequirementStoreState): ContactUnlock[] {
  return [...state.contactUnlocks].sort(
    (a, b) => new Date(b.unlockedAt ?? 0).getTime() - new Date(a.unlockedAt ?? 0).getTime(),
  );
}

export function getAllPayments(state: RequirementStoreState): Payment[] {
  return [...state.payments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getTeacherPrivateContact(state: RequirementStoreState, teacherId: string) {
  return state.teacherPrivateContacts.find((c) => c.teacherId === teacherId) ?? null;
}

export function getTeacherNotifications(state: RequirementStoreState, teacherId: string) {
  return state.teacherNotifications
    .filter((n) => n.teacherId === teacherId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function markTeacherNotificationRead(
  state: RequirementStoreState,
  notificationId: string,
): RequirementStoreState {
  return {
    ...state,
    teacherNotifications: state.teacherNotifications.map((n) =>
      n.id === notificationId ? { ...n, read: true } : n,
    ),
  };
}

export function hasTeacherProposedOnRequirement(
  state: RequirementStoreState,
  requirementId: string,
  teacherId: string,
): boolean {
  return state.proposals.some((p) => p.requirementId === requirementId && p.teacherId === teacherId);
}

export function getSuccessfulPaymentForRequirement(
  state: RequirementStoreState,
  studentId: string,
  requirementId: string,
): Payment | undefined {
  return state.payments.find(
    (p) =>
      p.studentId === studentId &&
      p.requirementId === requirementId &&
      p.status === "success",
  );
}
