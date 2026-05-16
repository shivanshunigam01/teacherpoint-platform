import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/post-requirement")({ component: Post, head: () => ({ meta: [{ title: "Post a Requirement · TeachersPoints" }] }) });

function Post() {
  return (
    <section className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="font-display font-extrabold text-3xl">Post a tutoring requirement</h1>
      <p className="text-muted-foreground mt-2">Tell us what you need — verified tutors will respond within hours.</p>
      <form className="mt-8 space-y-4 bg-card border rounded-2xl p-6" onSubmit={(e) => { e.preventDefault(); toast.success("Requirement posted! Tutors will reach out shortly."); }}>
        <div><Label>Title</Label><Input placeholder="e.g. Need a Class 10 Math tutor" required className="mt-1" /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Subject</Label>
            <Select defaultValue="Math"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>{["Math", "Physics", "English", "Coding"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label>Mode</Label>
            <Select defaultValue="online"><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="online">Online</SelectItem><SelectItem value="offline">In-person</SelectItem></SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Budget per hour ($)</Label><Input type="number" defaultValue={30} className="mt-1" /></div>
          <div><Label>Sessions per week</Label><Input type="number" defaultValue={3} className="mt-1" /></div>
        </div>
        <div><Label>Details</Label>
          <textarea required placeholder="Describe your goals, schedule, level…" className="w-full border rounded-lg p-3 text-sm min-h-[140px] mt-1" />
        </div>
        <Button type="submit" className="w-full bg-gradient-primary">Post requirement</Button>
      </form>
    </section>
  );
}
