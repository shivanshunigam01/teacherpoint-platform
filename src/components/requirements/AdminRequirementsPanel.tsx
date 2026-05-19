import { useState } from "react";
import { Check, Eye, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRequirementStore } from "@/hooks/use-requirement-store";
import { RequirementStatusBadge } from "@/components/requirements/RequirementStatusBadge";
import type { RequirementPost } from "@/types/requirements";
import { toast } from "sonner";

export function AdminRequirementsPanel() {
  return (
    <Tabs defaultValue="approvals" className="mt-6 w-full">
      <TabsList className="mb-4 flex h-auto flex-wrap gap-1">
        <TabsTrigger value="approvals">Requirement Approvals</TabsTrigger>
        <TabsTrigger value="proposals">Proposal Tracking</TabsTrigger>
        <TabsTrigger value="payments">Payment Tracking</TabsTrigger>
        <TabsTrigger value="unlocks">Contact Unlock Logs</TabsTrigger>
      </TabsList>
      <TabsContent value="approvals">
        <ApprovalsTable />
      </TabsContent>
      <TabsContent value="proposals">
        <ProposalsTable />
      </TabsContent>
      <TabsContent value="payments">
        <PaymentsTable />
      </TabsContent>
      <TabsContent value="unlocks">
        <UnlocksTable />
      </TabsContent>
    </Tabs>
  );
}

function ApprovalsTable() {
  const store = useRequirementStore();
  const requirements = store.getAllRequirementsForAdmin();
  const [viewing, setViewing] = useState<RequirementPost | null>(null);
  const [comment, setComment] = useState("");

  const handleApprove = () => {
    if (!viewing) return;
    store.approveRequirement(viewing.id, comment || undefined);
    toast.success("Requirement approved — now visible to teachers");
    setViewing(null);
    setComment("");
  };

  const handleReject = () => {
    if (!viewing || !comment.trim()) {
      toast.error("Please add an admin comment for rejection");
      return;
    }
    store.rejectRequirement(viewing.id, comment);
    toast.success("Requirement rejected");
    setViewing(null);
    setComment("");
  };

  return (
    <div className="rounded-2xl border bg-card p-5">
      <h2 className="mb-4 font-display font-bold">All student requirements ({requirements.length})</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requirements.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="text-sm">{r.studentName}</TableCell>
                <TableCell>{r.subject}</TableCell>
                <TableCell className="max-w-[180px] truncate font-medium">{r.title}</TableCell>
                <TableCell>${r.budget}</TableCell>
                <TableCell className="capitalize">{r.preferredMode}</TableCell>
                <TableCell className="max-w-[120px] truncate">{r.location}</TableCell>
                <TableCell>
                  <RequirementStatusBadge status={r.status} />
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(r.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" onClick={() => { setViewing(r); setComment(r.adminComment ?? ""); }} aria-label="View">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewing?.title}</DialogTitle>
            {viewing && <RequirementStatusBadge status={viewing.status} />}
          </DialogHeader>
          {viewing && (
            <div className="space-y-3 text-sm">
              <p><span className="text-muted-foreground">Student: </span>{viewing.studentName}</p>
              <p><span className="text-muted-foreground">Subject: </span>{viewing.subject}</p>
              <p><span className="text-muted-foreground">Level: </span>{viewing.classLevel}</p>
              <p><span className="text-muted-foreground">Description: </span>{viewing.description}</p>
              <p><span className="text-muted-foreground">Budget: </span>${viewing.budget}/hr · {viewing.preferredMode} · {viewing.location}</p>
              <div>
                <Label htmlFor="admin-comment">Admin comment</Label>
                <Textarea
                  id="admin-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Optional for approval; required for rejection"
                  className="mt-1.5"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="destructive" onClick={handleReject} disabled={viewing?.status === "rejected"}>
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button className="bg-gradient-primary" onClick={handleApprove} disabled={viewing?.status === "approved"}>
              <Check className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProposalsTable() {
  const store = useRequirementStore();
  const proposals = store.getAllProposals();

  return (
    <div className="rounded-2xl border bg-card p-5">
      <h2 className="mb-4 font-display font-bold">Teacher proposals ({proposals.length})</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher</TableHead>
              <TableHead>Requirement</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((p) => {
              const req = store.requirements.find((r) => r.id === p.requirementId);
              return (
                <TableRow key={p.id}>
                  <TableCell>{p.teacherName}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{req?.title ?? p.requirementId}</TableCell>
                  <TableCell>${p.proposedFee}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">{p.status}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function PaymentsTable() {
  const store = useRequirementStore();
  const payments = store.getAllPayments();

  return (
    <div className="rounded-2xl border bg-card p-5">
      <h2 className="mb-4 font-display font-bold">Payments ({payments.length})</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No payments recorded yet
                </TableCell>
              </TableRow>
            ) : (
              payments.map((p) => {
                const proposal = store.proposals.find((pr) => pr.id === p.proposalId);
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-semibold">${p.amount}</TableCell>
                    <TableCell className="capitalize">{p.provider}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          p.status === "success"
                            ? "bg-emerald-100 text-emerald-800"
                            : p.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : ""
                        }
                      >
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{p.studentId}</TableCell>
                    <TableCell className="text-sm">{proposal?.teacherName ?? p.teacherId}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {p.paidAt ? new Date(p.paidAt).toLocaleString() : new Date(p.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function UnlocksTable() {
  const store = useRequirementStore();
  const unlocks = store.getAllContactUnlocks();

  return (
    <div className="rounded-2xl border bg-card p-5">
      <h2 className="mb-4 font-display font-bold">Contact unlock logs ({unlocks.length})</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Requirement</TableHead>
              <TableHead>Unlocked</TableHead>
              <TableHead>At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unlocks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No contacts unlocked yet
                </TableCell>
              </TableRow>
            ) : (
              unlocks.map((u) => {
                const req = store.requirements.find((r) => r.id === u.requirementId);
                const prop = store.proposals.find((p) => p.id === u.proposalId);
                return (
                  <TableRow key={u.id}>
                    <TableCell className="text-sm">{u.studentId}</TableCell>
                    <TableCell className="text-sm">{prop?.teacherName ?? u.teacherId}</TableCell>
                    <TableCell className="max-w-[180px] truncate">{req?.title ?? u.requirementId}</TableCell>
                    <TableCell>
                      {u.isUnlocked ? (
                        <Badge className="bg-emerald-100 text-emerald-800">Yes</Badge>
                      ) : (
                        <Badge variant="secondary">No</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {u.unlockedAt ? new Date(u.unlockedAt).toLocaleString() : "—"}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
