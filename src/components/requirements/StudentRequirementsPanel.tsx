import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ClipboardList, CreditCard, Inbox, Lock, Plus, Unlock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/hooks/use-app";
import { useRequirementStore } from "@/hooks/use-requirement-store";
import { RequirementStatusBadge } from "@/components/requirements/RequirementStatusBadge";
import { ProposalCard } from "@/components/requirements/ProposalCard";
import { PaymentDialog } from "@/components/requirements/PaymentDialog";
import { EmptyState } from "@/components/requirements/EmptyState";
import type { RequirementPost, TeacherProposal } from "@/types/requirements";
import { toast } from "sonner";

export function StudentRequirementsPanel() {
  const { user } = useApp();
  const store = useRequirementStore();
  const studentId = user?.id ?? "demo-student";

  const requirements = store.getStudentRequirements(studentId);
  const unlocked = store.getUnlockedContacts(studentId);
  const payments = store.getAllPayments().filter((p) => p.studentId === studentId);

  const [payTarget, setPayTarget] = useState<{
    requirement: RequirementPost;
    proposal: TeacherProposal;
  } | null>(null);

  const approvedWithProposals = useMemo(
    () =>
      requirements.filter((r) => r.status === "approved").map((r) => ({
        requirement: r,
        proposals: store.getProposalsForRequirement(r.id),
      })),
    [requirements, store],
  );

  const handlePay = async (provider: Parameters<typeof store.processPayment>[0]["provider"], simulateFailure: boolean) => {
    if (!payTarget || !user) return { ok: false, error: "Not signed in" };
    const result = store.processPayment(
      {
        studentId,
        teacherId: payTarget.proposal.teacherId,
        requirementId: payTarget.requirement.id,
        proposalId: payTarget.proposal.id,
        amount: payTarget.proposal.proposedFee,
        provider,
      },
      user.name,
      simulateFailure,
    );
    if (result.ok) {
      toast.success("Payment successful! Teacher contact is now unlocked.");
      setPayTarget(null);
      return { ok: true };
    }
    return { ok: false, error: result.error };
  };

  return (
    <div className="mt-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold">Tutor requests</h2>
        <Button asChild size="sm" className="bg-gradient-primary">
          <Link to="/post-requirement">
            <Plus className="mr-2 h-4 w-4" />
            Post requirement
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="requirements" className="w-full">
        <TabsList className="mb-4 flex h-auto flex-wrap gap-1">
          <TabsTrigger value="requirements">My Requirements</TabsTrigger>
          <TabsTrigger value="replies">Teacher Replies</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="unlocked">Unlocked Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="requirements">
          {requirements.length === 0 ? (
            <EmptyState
              icon={ClipboardList}
              title="No requirements yet"
              description="Post your first learning requirement. It will be reviewed by admin before tutors can see it."
              action={
                <Button asChild className="bg-gradient-primary">
                  <Link to="/post-requirement">Post requirement</Link>
                </Button>
              }
            />
          ) : (
            <div className="space-y-4">
              {requirements.map((req) => (
                <RequirementRow key={req.id} requirement={req} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="replies">
          {approvedWithProposals.every((x) => x.proposals.length === 0) ? (
            <EmptyState
              icon={Inbox}
              title="No teacher replies yet"
              description="Once admin approves your post, verified teachers can send proposals. Replies appear here."
            />
          ) : (
            <div className="space-y-8">
              {approvedWithProposals.map(({ requirement, proposals }) =>
                proposals.length === 0 ? null : (
                  <section key={requirement.id}>
                    <h3 className="mb-3 font-display font-bold">{requirement.title}</h3>
                    <div className="grid gap-4 lg:grid-cols-2">
                      {proposals.map((p) => {
                        const isUnlocked = store.isContactUnlocked(studentId, p.id);
                        const hasPaid = !!store.getSuccessfulPaymentForRequirement(studentId, requirement.id);
                        return (
                          <ProposalCard
                            key={p.id}
                            proposal={p}
                            unlocked={isUnlocked}
                            privateContact={
                              isUnlocked ? store.getTeacherPrivateContact(p.teacherId) : null
                            }
                            onSelectPay={
                              !hasPaid && p.status !== "rejected"
                                ? () => setPayTarget({ requirement, proposal: p })
                                : undefined
                            }
                            disabled={hasPaid && !isUnlocked}
                          />
                        );
                      })}
                    </div>
                  </section>
                ),
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="payments">
          {payments.length === 0 ? (
            <EmptyState
              icon={CreditCard}
              title="No payments yet"
              description="Select a teacher proposal and pay to unlock their contact details."
            />
          ) : (
            <div className="space-y-3">
              {payments.map((p) => (
                <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-card p-4">
                  <div>
                    <p className="font-semibold">${p.amount} · {p.provider}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(p.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Badge
                    className={
                      p.status === "success"
                        ? "bg-emerald-100 text-emerald-800"
                        : p.status === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                    }
                  >
                    {p.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="unlocked">
          {unlocked.length === 0 ? (
            <EmptyState
              icon={Lock}
              title="No unlocked contacts"
              description="Complete payment for a teacher proposal to view their phone, WhatsApp, and email."
            />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {unlocked.map((u) => {
                const proposal = store.proposals.find((p) => p.id === u.proposalId);
                if (!proposal) return null;
                return (
                  <ProposalCard
                    key={u.id}
                    proposal={proposal}
                    unlocked
                    privateContact={store.getTeacherPrivateContact(u.teacherId)}
                  />
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {payTarget && (
        <PaymentDialog
          open={!!payTarget}
          onOpenChange={(o) => !o && setPayTarget(null)}
          requirement={payTarget.requirement}
          proposal={payTarget.proposal}
          onPay={handlePay}
        />
      )}
    </div>
  );
}

function RequirementRow({ requirement }: { requirement: RequirementPost }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display font-bold">{requirement.title}</h3>
            <RequirementStatusBadge status={requirement.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {requirement.subject} · ${requirement.budget}/hr · {requirement.preferredMode}
          </p>
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(requirement.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{requirement.description}</p>
      {requirement.status === "pending" && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
          Waiting for admin approval. Tutors cannot see this post yet.
        </p>
      )}
      {requirement.status === "rejected" && requirement.adminComment && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-900 dark:bg-red-950/30 dark:text-red-200">
          <span className="font-semibold">Rejection reason: </span>
          {requirement.adminComment}
        </p>
      )}
      {requirement.status === "approved" && (
        <p className="mt-3 flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400">
          <Unlock className="h-4 w-4" />
          Visible to teachers — check Teacher Replies for proposals.
        </p>
      )}
    </div>
  );
}
