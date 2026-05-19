import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import type { PaymentProvider, TeacherProposal } from "@/types/requirements";
import type { RequirementPost } from "@/types/requirements";

const PROVIDERS: { id: PaymentProvider; label: string }[] = [
  { id: "razorpay", label: "Razorpay" },
  { id: "stripe", label: "Stripe" },
  { id: "paypal", label: "PayPal" },
  { id: "mock", label: "Mock Payment (demo)" },
];

export function PaymentDialog({
  open,
  onOpenChange,
  requirement,
  proposal,
  onPay,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requirement: RequirementPost;
  proposal: TeacherProposal;
  onPay: (provider: PaymentProvider, simulateFailure: boolean) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [provider, setProvider] = useState<PaymentProvider>("mock");
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    setLoading(true);
    setError(null);
    const result = await onPay(provider, simulateFailure);
    setLoading(false);
    if (result.ok) {
      onOpenChange(false);
    } else {
      setError(result.error ?? "Payment failed. Contact remains locked.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Complete payment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-xl border bg-muted/30 p-4 text-sm">
            <p>
              <span className="text-muted-foreground">Requirement: </span>
              <span className="font-semibold">{requirement.title}</span>
            </p>
            <p className="mt-1">
              <span className="text-muted-foreground">Teacher: </span>
              <span className="font-semibold">{proposal.teacherName}</span>
            </p>
            <p className="mt-3 font-display text-2xl font-bold text-primary">
              ${proposal.proposedFee}{" "}
              <span className="text-sm font-normal text-muted-foreground">USD</span>
            </p>
          </div>

          <div>
            <Label className="mb-2 block">Payment provider</Label>
            <RadioGroup value={provider} onValueChange={(v) => setProvider(v as PaymentProvider)}>
              {PROVIDERS.map((p) => (
                <div key={p.id} className="flex items-center space-x-2 rounded-lg border p-3">
                  <RadioGroupItem value={p.id} id={p.id} />
                  <Label htmlFor={p.id} className="flex-1 cursor-pointer font-normal">
                    {p.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-dashed p-3">
            <Checkbox
              id="simulate-fail"
              checked={simulateFailure}
              onCheckedChange={(v) => setSimulateFailure(v === true)}
            />
            <Label htmlFor="simulate-fail" className="cursor-pointer text-sm font-normal">
              Simulate payment failure (for testing)
            </Label>
          </div>

          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button className="bg-gradient-primary" onClick={handlePay} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay ${proposal.proposedFee}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
