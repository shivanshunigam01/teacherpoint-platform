import {
  BadgeCheck,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Unlock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TeacherPrivateContact, TeacherProposal } from "@/types/requirements";

export function ProposalCard({
  proposal,
  unlocked,
  privateContact,
  onSelectPay,
  disabled,
}: {
  proposal: TeacherProposal;
  unlocked: boolean;
  privateContact: TeacherPrivateContact | null;
  onSelectPay?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-sm font-bold text-white">
            {proposal.teacherName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display font-bold">{proposal.teacherName}</h3>
              {proposal.verified && (
                <Badge className="gap-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <BadgeCheck className="h-3 w-3" />
                  Verified
                </Badge>
              )}
              {proposal.status === "selected" && (
                <Badge className="bg-primary/10 text-primary">Selected</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{proposal.subject}</p>
            <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-amber-500" />
                {proposal.rating}
              </span>
              <span>{proposal.experience} yrs exp.</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {proposal.city}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-xl font-bold text-primary">${proposal.proposedFee}</div>
          <div className="text-xs text-muted-foreground">proposed fee</div>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{proposal.shortBio}</p>
      <div className="mt-3 rounded-xl bg-muted/40 p-3 text-sm">
        <span className="font-semibold">Message: </span>
        {proposal.message}
      </div>
      <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <Badge variant="secondary">{proposal.teachingMode}</Badge>
        <Badge variant="outline">{proposal.availability}</Badge>
        <Badge variant="outline">{proposal.estimatedDuration}</Badge>
      </div>

      {!unlocked ? (
        <div className="mt-4 rounded-xl border border-dashed border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
          <div className="flex items-start gap-3">
            <Lock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">Contact locked</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Complete payment to unlock teacher phone, WhatsApp, and email.
              </p>
            </div>
          </div>
          {onSelectPay && (
            <Button
              className="mt-3 w-full bg-gradient-primary sm:w-auto"
              disabled={disabled || proposal.status === "rejected"}
              onClick={onSelectPay}
            >
              Select & Pay
            </Button>
          )}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
            <Unlock className="h-4 w-4" />
            Contact unlocked
          </div>
          {privateContact ? (
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:${privateContact.phone}`} className="hover:underline">
                  {privateContact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span>WhatsApp: {privateContact.whatsapp}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${privateContact.email}`} className="hover:underline">
                  {privateContact.email}
                </a>
              </li>
              <li className="text-xs text-muted-foreground">
                Preferred contact: {privateContact.preferredContactTime}
              </li>
              <li className="rounded-lg bg-background/80 p-2 text-xs">{privateContact.joiningInstructions}</li>
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Contact details unavailable.</p>
          )}
        </div>
      )}
    </div>
  );
}
