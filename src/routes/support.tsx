import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SUPPORT_TICKETS } from "@/data/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/support")({ component: Support, head: () => ({ meta: [{ title: "Support · TeachersPoints" }] }) });

function Support() {
  return (
    <section className="container mx-auto px-4 py-10 max-w-5xl">
      <h1 className="font-display font-extrabold text-3xl">Support center</h1>
      <p className="text-muted-foreground mt-2">We typically respond in under 4 hours.</p>

      <div className="grid md:grid-cols-[1fr_360px] gap-6 mt-8">
        <div className="bg-card border rounded-2xl p-5">
          <h2 className="font-display font-bold mb-4">Your tickets</h2>
          <Table>
            <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Subject</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
            <TableBody>
              {SUPPORT_TICKETS.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell>{t.subject}</TableCell>
                  <TableCell><Badge variant="outline">{t.priority}</Badge></TableCell>
                  <TableCell><Badge className={t.status === "Open" ? "bg-amber-100 text-amber-700" : t.status === "Resolved" ? "bg-emerald-100 text-emerald-700" : "bg-sky-100 text-sky-700"}>{t.status}</Badge></TableCell>
                  <TableCell>{t.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <form className="bg-card border rounded-2xl p-5 h-fit" onSubmit={(e) => { e.preventDefault(); toast.success("Ticket submitted! Our team will respond shortly."); }}>
          <h2 className="font-display font-bold mb-4 flex items-center gap-2"><Plus className="h-4 w-4" />New ticket</h2>
          <div className="space-y-3">
            <div><Label>Subject</Label><Input required className="mt-1" /></div>
            <div><Label>Priority</Label>
              <select className="w-full border rounded-md px-3 py-2 text-sm mt-1 bg-background"><option>Low</option><option>Medium</option><option>High</option></select>
            </div>
            <div><Label>Description</Label><textarea required className="w-full border rounded-lg p-3 text-sm min-h-[120px] mt-1" /></div>
            <Button type="submit" className="w-full bg-gradient-primary">Submit</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
