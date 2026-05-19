import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { createInitialRequirementStore } from "@/data/requirements-seed";
import * as api from "@/lib/requirements-api";
import type {
  CreatePaymentInput,
  CreateProposalInput,
  CreateRequirementInput,
  PaymentProvider,
  RequirementStoreState,
} from "@/types/requirements";

const STORAGE_KEY = "tp_requirements_store_v1";

type RequirementStore = RequirementStoreState & {
  createRequirementPost: (input: CreateRequirementInput) => ReturnType<typeof api.createRequirementPost>["post"];
  getStudentRequirements: (studentId: string) => ReturnType<typeof api.getStudentRequirements>;
  getPendingRequirementsForAdmin: () => ReturnType<typeof api.getPendingRequirementsForAdmin>;
  getAllRequirementsForAdmin: () => ReturnType<typeof api.getAllRequirementsForAdmin>;
  approveRequirement: (id: string, adminComment?: string) => void;
  rejectRequirement: (id: string, adminComment: string) => void;
  getApprovedRequirementsForTeacher: () => ReturnType<typeof api.getApprovedRequirementsForTeacher>;
  createTeacherProposal: (input: CreateProposalInput) => { ok: true } | { ok: false; error: string };
  getProposalsForRequirement: (requirementId: string) => ReturnType<typeof api.getProposalsForRequirement>;
  getProposalsByTeacher: (teacherId: string) => ReturnType<typeof api.getProposalsByTeacher>;
  getAllProposals: () => ReturnType<typeof api.getAllProposals>;
  processPayment: (
    input: CreatePaymentInput,
    studentName: string,
    simulateFailure?: boolean,
  ) => { ok: true; paymentId: string } | { ok: false; error: string };
  isContactUnlocked: (studentId: string, proposalId: string) => boolean;
  getUnlockedContacts: (studentId: string) => ReturnType<typeof api.getUnlockedContacts>;
  getAllContactUnlocks: () => ReturnType<typeof api.getAllContactUnlocks>;
  getAllPayments: () => ReturnType<typeof api.getAllPayments>;
  getTeacherPrivateContact: (teacherId: string) => ReturnType<typeof api.getTeacherPrivateContact>;
  getTeacherNotifications: (teacherId: string) => ReturnType<typeof api.getTeacherNotifications>;
  markTeacherNotificationRead: (id: string) => void;
  hasTeacherProposedOnRequirement: (requirementId: string, teacherId: string) => boolean;
  getSuccessfulPaymentForRequirement: (studentId: string, requirementId: string) => ReturnType<typeof api.getSuccessfulPaymentForRequirement>;
  resetRequirements: () => void;
};

const Ctx = createContext<RequirementStore | null>(null);

function loadState(): RequirementStoreState {
  if (typeof window === "undefined") return createInitialRequirementStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as RequirementStoreState;
  } catch {
    /* ignore */
  }
  return createInitialRequirementStore();
}

export function RequirementStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RequirementStoreState>(createInitialRequirementStore);

  useEffect(() => {
    setState(loadState());
  }, []);

  const persist = useCallback((next: RequirementStoreState) => {
    setState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  }, []);

  const value: RequirementStore = {
    ...state,
    createRequirementPost: (input) => {
      const result = api.createRequirementPost(state, input);
      persist(result.state);
      return result.post;
    },
    getStudentRequirements: (studentId) => api.getStudentRequirements(state, studentId),
    getPendingRequirementsForAdmin: () => api.getPendingRequirementsForAdmin(state),
    getAllRequirementsForAdmin: () => api.getAllRequirementsForAdmin(state),
    approveRequirement: (id, adminComment) => persist(api.approveRequirement(state, id, adminComment)),
    rejectRequirement: (id, adminComment) => persist(api.rejectRequirement(state, id, adminComment)),
    getApprovedRequirementsForTeacher: () => api.getApprovedRequirementsForTeacher(state),
    createTeacherProposal: (input) => {
      const result = api.createTeacherProposal(state, input);
      if ("error" in result) return { ok: false as const, error: result.error };
      persist(result.state);
      return { ok: true as const };
    },
    getProposalsForRequirement: (requirementId) => api.getProposalsForRequirement(state, requirementId),
    getProposalsByTeacher: (teacherId) => api.getProposalsByTeacher(state, teacherId),
    getAllProposals: () => api.getAllProposals(),
    processPayment: (input, studentName, simulateFailure = false) => {
      const created = api.createPayment(state, input);
      if ("error" in created) return { ok: false as const, error: created.error };

      const verified = api.verifyPayment(created.state, created.payment.id, !simulateFailure, studentName);
      if ("error" in verified) return { ok: false as const, error: verified.error };

      persist(verified.state);
      return { ok: true as const, paymentId: created.payment.id };
    },
    isContactUnlocked: (studentId, proposalId) => api.isContactUnlocked(state, studentId, proposalId),
    getUnlockedContacts: (studentId) => api.getUnlockedContacts(state, studentId),
    getAllContactUnlocks: () => api.getAllContactUnlocks(),
    getAllPayments: () => api.getAllPayments(),
    getTeacherPrivateContact: (teacherId) => api.getTeacherPrivateContact(state, teacherId),
    getTeacherNotifications: (teacherId) => api.getTeacherNotifications(state, teacherId),
    markTeacherNotificationRead: (id) => persist(api.markTeacherNotificationRead(state, id)),
    hasTeacherProposedOnRequirement: (requirementId, teacherId) =>
      api.hasTeacherProposedOnRequirement(state, requirementId, teacherId),
    getSuccessfulPaymentForRequirement: (studentId, requirementId) =>
      api.getSuccessfulPaymentForRequirement(state, studentId, requirementId),
    resetRequirements: () => persist(createInitialRequirementStore()),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useRequirementStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useRequirementStore must be used inside RequirementStoreProvider");
  return v;
}

export type { PaymentProvider };
