import { Badge } from "@/components/ui/badge";
import type { RequirementStatus } from "@/types/requirements";

const CONFIG: Record<RequirementStatus, { label: string; className: string }> = {
  pending: {
    label: "Pending Approval",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  },
  approved: {
    label: "Approved",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  },
};

export function RequirementStatusBadge({ status }: { status: RequirementStatus }) {
  const c = CONFIG[status];
  return <Badge className={c.className}>{c.label}</Badge>;
}
