import { useState } from "react";
import { Bell, ClipboardList, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/hooks/use-app";
import { useRequirementStore } from "@/hooks/use-requirement-store";
import { useAdminStore } from "@/hooks/use-admin-store";
import { ProposalFormDialog } from "@/components/requirements/ProposalFormDialog";
import { EmptyState } from "@/components/requirements/EmptyState";
import { DEMO_USER_IDS } from "@/data/requirements-seed";
import type { RequirementPost } from "@/types/requirements";
import { toast } from "sonner";

export function TeacherRequirementsPanel() {
  const { user } = useApp();
  const store = useRequirementStore();
  const { tutors } = useAdminStore();
  const teacherId = user?.id ?? DEMO_USER_IDS.teacher;

  const requirements = store.getApprovedRequirementsForTeacher();
  const myProposals = store.getProposalsByTeacher(teacherId);
  const notifications = store.getTeacherNotifications(teacherId);

  const tutorProfile = tutors.find((t) => t.id === teacherId) ?? tutors[0];

  const [proposalTarget, setProposalTarget] = useState<RequirementPost | null>(null);

  const submitProposal = (data: {
    message: string;
    proposedFee: number;
    availability: string;
    teachingMode: RequirementPost["preferredMode"];
    estimatedDuration: string;
  }) => {
    if (!proposalTarget || !tutorProfile) return;
    const city = tutorProfile.location.split(",")[0]?.trim() ?? tutorProfile.location;
    const result = store.createTeacherProposal({
      requirementId: proposalTarget.id,
      teacherId,
      teacherName: tutorProfile.name,
      subject: tutorProfile.subject,
      experience: tutorProfile.experience,
      rating: tutorProfile.rating,
      city,
      verified: tutorProfile.verified,
      shortBio: tutorProfile.bio,
      ...data,
    });
    if (result.ok) {
      toast.success("Proposal sent to student!");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="mt-8 space-y-8">
      {notifications.length > 0 && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
          <h3 className="mb-3 flex items-center gap-2 font-display font-bold">
            <Bell className="h-5 w-5 text-emerald-600" />
            Payment notifications
          </h3>
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`rounded-lg border bg-card p-3 text-sm ${n.read ? "opacity-70" : ""}`}
              >
                <p>{n.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
                {!n.read && (
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-1 h-auto p-0"
                    onClick={() => store.markTeacherNotificationRead(n.id)}
                  >
                    Mark read
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2 className="mb-1 font-display text-xl font-bold">Approved student requirements</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Only admin-approved posts appear here. Pending and rejected requirements are hidden.
        </p>

        {requirements.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="No approved requirements"
            description="When students post requirements and admin approves them, you can reply here."
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {requirements.map((req) => {
              const alreadySent = store.hasTeacherProposedOnRequirement(req.id, teacherId);
              const myProposal = myProposals.find((p) => p.requirementId === req.id);
              const paid = store.getAllPayments().find(
                (p) => p.requirementId === req.id && p.teacherId === teacherId && p.status === "success",
              );

              return (
                <div key={req.id} className="rounded-2xl border bg-card p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-display font-bold">{req.title}</h3>
                    <Badge variant="secondary">{req.subject}</Badge>
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{req.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline">${req.budget}/hr budget</Badge>
                    <Badge variant="outline">{req.preferredMode}</Badge>
                    <Badge variant="outline">{req.location}</Badge>
                  </div>
                  {alreadySent && (
                    <p className="mt-3 text-sm text-primary">
                      ✓ Proposal sent
                      {myProposal?.status === "selected" && " · Selected by student"}
                      {paid && " · Student paid — contact unlocked for them"}
                    </p>
                  )}
                  <Button
                    className="mt-4 w-full sm:w-auto"
                    disabled={alreadySent}
                    onClick={() => setProposalTarget(req)}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {alreadySent ? "Proposal sent" : "Reply / Send proposal"}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {proposalTarget && tutorProfile && (
        <ProposalFormDialog
          open={!!proposalTarget}
          onOpenChange={(o) => !o && setProposalTarget(null)}
          requirement={proposalTarget}
          defaultFee={proposalTarget.budget}
          onSubmit={submitProposal}
        />
      )}
    </div>
  );
}
