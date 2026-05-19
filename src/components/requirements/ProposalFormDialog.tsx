import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PreferredMode, RequirementPost } from "@/types/requirements";

export function ProposalFormDialog({
  open,
  onOpenChange,
  requirement,
  defaultFee,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requirement: RequirementPost;
  defaultFee: number;
  onSubmit: (data: {
    message: string;
    proposedFee: number;
    availability: string;
    teachingMode: PreferredMode;
    estimatedDuration: string;
  }) => void;
}) {
  const [message, setMessage] = useState("");
  const [proposedFee, setProposedFee] = useState(defaultFee);
  const [availability, setAvailability] = useState("");
  const [teachingMode, setTeachingMode] = useState<PreferredMode>(requirement.preferredMode);
  const [estimatedDuration, setEstimatedDuration] = useState("4 weeks");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ message, proposedFee, availability, teachingMode, estimatedDuration });
    onOpenChange(false);
    setMessage("");
    setAvailability("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">Send proposal</DialogTitle>
          <p className="text-sm text-muted-foreground">{requirement.title}</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="prop-message">Message to student *</Label>
            <Textarea
              id="prop-message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Introduce yourself and how you'll help…"
              className="mt-1.5 min-h-[100px]"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="prop-fee">Proposed fee ($/hr) *</Label>
              <Input
                id="prop-fee"
                type="number"
                min={5}
                required
                value={proposedFee}
                onChange={(e) => setProposedFee(Number(e.target.value))}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Teaching mode</Label>
              <Select value={teachingMode} onValueChange={(v) => setTeachingMode(v as PreferredMode)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">In-person</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="prop-avail">Availability *</Label>
            <Input
              id="prop-avail"
              required
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              placeholder="e.g. Mon–Fri 6–9 PM IST"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="prop-duration">Estimated duration *</Label>
            <Input
              id="prop-duration"
              required
              value={estimatedDuration}
              onChange={(e) => setEstimatedDuration(e.target.value)}
              placeholder="e.g. 8 weeks"
              className="mt-1.5"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary">
              Send proposal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
