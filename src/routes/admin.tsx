import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutDashboard, Users, BookOpen, Package, DollarSign, Plus, Pencil, Trash2, Settings, BarChart3, Megaphone } from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard/Shell";
import { useAdminStore } from "@/hooks/use-admin-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REVENUE_DATA } from "@/data/mock";
import { courseImage, tutorImage } from "@/data/images";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { toast } from "sonner";
import type { Course, Tutor } from "@/data/mock";
import type { Combo, RegionalAd, RegionalAdTarget } from "@/hooks/use-admin-store";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin")({
  component: Admin,
  head: () => ({ meta: [{ title: "Admin Dashboard · TeachersPoints" }, { name: "robots", content: "noindex" }] }),
});

const ITEMS = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin", label: "Courses", icon: BookOpen },
  { to: "/admin", label: "Teachers", icon: Users },
  { to: "/admin", label: "Packages", icon: Package },
  { to: "/admin", label: "Revenue", icon: DollarSign },
  { to: "/admin", label: "Reports", icon: BarChart3 },
  { to: "/admin", label: "Settings", icon: Settings },
];

function Admin() {
  const store = useAdminStore();
  return (
    <DashboardShell items={ITEMS} title="Admin">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h1 className="font-display font-extrabold text-2xl">Manage your platform</h1>
        <Button variant="outline" size="sm" onClick={() => { store.reset(); toast.success("Data reset to defaults"); }}>
          Reset to defaults
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        <StatCard label="Courses" value={String(store.courses.length)} icon={BookOpen} />
        <StatCard label="Teachers" value={String(store.tutors.length)} icon={Users} color="from-purple-400 to-fuchsia-600" />
        <StatCard label="Packages" value={String(store.combos.length)} icon={Package} color="from-emerald-400 to-teal-600" />
        <StatCard label="Regional ads" value={String(store.regionalAds.filter((a) => a.active).length)} icon={Megaphone} color="from-rose-400 to-pink-600" />
        <StatCard label="Revenue (MTD)" value="$184K" change="+18%" icon={DollarSign} color="from-amber-400 to-orange-500" />
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="ads">Regional ads</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="courses"><CoursesPanel /></TabsContent>
        <TabsContent value="teachers"><TeachersPanel /></TabsContent>
        <TabsContent value="packages"><PackagesPanel /></TabsContent>
        <TabsContent value="ads"><RegionalAdsPanel /></TabsContent>
        <TabsContent value="revenue"><RevenuePanel /></TabsContent>
      </Tabs>
    </DashboardShell>
  );
}

/* ---------------- Courses ---------------- */

function CoursesPanel() {
  const { courses, addCourse, updateCourse, deleteCourse } = useAdminStore();
  const [editing, setEditing] = useState<Course | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h2 className="font-display font-bold">All courses ({courses.length})</h2>
        <Button size="sm" onClick={() => { addCourse({}); toast.success("Course added — edit it below"); }}>
          <Plus className="h-4 w-4" /> Add course
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Students</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <div className="flex items-center gap-3 min-w-[220px]">
                    <img src={(c as any).image || courseImage(c.id)} alt="" className="h-10 w-14 rounded object-cover" />
                    <div>
                      <div className="font-semibold text-sm line-clamp-1">{c.title}</div>
                      <div className="text-xs text-muted-foreground">{c.instructor}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell><Badge variant="secondary">{c.category}</Badge></TableCell>
                <TableCell className="text-sm">{c.level}</TableCell>
                <TableCell className="font-semibold">${c.price}<span className="text-xs text-muted-foreground line-through ml-1">${c.oldPrice}</span></TableCell>
                <TableCell className="text-sm">{c.students.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" onClick={() => { setEditing(c); setOpen(true); }} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => { deleteCourse(c.id); toast.success("Course deleted"); }} aria-label="Delete"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CourseEditDialog
        open={open && !!editing}
        course={editing}
        onClose={() => { setOpen(false); setEditing(null); }}
        onSave={(patch) => { if (editing) { updateCourse(editing.id, patch); toast.success("Course updated"); } setOpen(false); setEditing(null); }}
      />
    </div>
  );
}

function CourseEditDialog({ open, course, onClose, onSave }: { open: boolean; course: Course | null; onClose: () => void; onSave: (p: Partial<Course>) => void }) {
  const [form, setForm] = useState<Partial<Course>>({});
  const update = (k: keyof Course, v: any) => setForm((f) => ({ ...f, [k]: v }));
  // Re-seed form when course changes
  if (course && form.id !== course.id) setForm({ ...course });

  if (!course) return null;
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Edit course</DialogTitle></DialogHeader>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><Label>Title</Label><Input value={form.title || ""} onChange={(e) => update("title", e.target.value)} /></div>
          <div className="sm:col-span-2"><Label>Description</Label><Textarea rows={3} value={form.description || ""} onChange={(e) => update("description", e.target.value)} /></div>
          <div><Label>Instructor</Label><Input value={form.instructor || ""} onChange={(e) => update("instructor", e.target.value)} /></div>
          <div><Label>Category</Label><Input value={form.category || ""} onChange={(e) => update("category", e.target.value)} /></div>
          <div><Label>Level</Label>
            <Select value={form.level} onValueChange={(v) => update("level", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>Language</Label><Input value={form.language || ""} onChange={(e) => update("language", e.target.value)} /></div>
          <div><Label>Price ($)</Label><Input type="number" value={form.price ?? 0} onChange={(e) => update("price", Number(e.target.value))} /></div>
          <div><Label>Old price ($)</Label><Input type="number" value={form.oldPrice ?? 0} onChange={(e) => update("oldPrice", Number(e.target.value))} /></div>
          <div><Label>Duration</Label><Input value={form.duration || ""} onChange={(e) => update("duration", e.target.value)} /></div>
          <div><Label>Lessons</Label><Input type="number" value={form.lessons ?? 0} onChange={(e) => update("lessons", Number(e.target.value))} /></div>
          <div><Label>Students</Label><Input type="number" value={form.students ?? 0} onChange={(e) => update("students", Number(e.target.value))} /></div>
          <div><Label>Rating</Label><Input type="number" step="0.1" value={form.rating ?? 0} onChange={(e) => update("rating", Number(e.target.value))} /></div>
          <div className="sm:col-span-2"><Label>Image URL (optional)</Label><Input value={(form as any).image || ""} onChange={(e) => update("image" as any, e.target.value)} placeholder="https://..." /></div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(form)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Teachers ---------------- */

function TeachersPanel() {
  const { tutors, addTutor, updateTutor, deleteTutor } = useAdminStore();
  const [editing, setEditing] = useState<Tutor | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h2 className="font-display font-bold">All teachers ({tutors.length})</h2>
        <Button size="sm" onClick={() => { addTutor({}); toast.success("Teacher added — edit details"); }}>
          <Plus className="h-4 w-4" /> Add teacher
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Rate/hr</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tutors.map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <img src={(t as any).image || tutorImage(t.id)} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.location}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{t.subject}</TableCell>
                <TableCell className="font-semibold">${t.price}</TableCell>
                <TableCell className="text-sm">⭐ {t.rating}</TableCell>
                <TableCell>
                  {t.verified
                    ? <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">Yes</Badge>
                    : <Badge variant="secondary">No</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" onClick={() => { setEditing(t); setOpen(true); }} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => { deleteTutor(t.id); toast.success("Teacher removed"); }} aria-label="Delete"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TeacherEditDialog
        open={open && !!editing}
        tutor={editing}
        onClose={() => { setOpen(false); setEditing(null); }}
        onSave={(patch) => { if (editing) { updateTutor(editing.id, patch); toast.success("Teacher updated"); } setOpen(false); setEditing(null); }}
      />
    </div>
  );
}

function TeacherEditDialog({ open, tutor, onClose, onSave }: { open: boolean; tutor: Tutor | null; onClose: () => void; onSave: (p: Partial<Tutor>) => void }) {
  const [form, setForm] = useState<Partial<Tutor>>({});
  const update = (k: keyof Tutor, v: any) => setForm((f) => ({ ...f, [k]: v }));
  if (tutor && form.id !== tutor.id) setForm({ ...tutor });

  if (!tutor) return null;
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Edit teacher</DialogTitle></DialogHeader>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Name</Label><Input value={form.name || ""} onChange={(e) => update("name", e.target.value)} /></div>
          <div><Label>Subject</Label><Input value={form.subject || ""} onChange={(e) => update("subject", e.target.value)} /></div>
          <div><Label>Location</Label><Input value={form.location || ""} onChange={(e) => update("location", e.target.value)} /></div>
          <div><Label>Experience (years)</Label><Input type="number" value={form.experience ?? 0} onChange={(e) => update("experience", Number(e.target.value))} /></div>
          <div><Label>Rate $/hr</Label><Input type="number" value={form.price ?? 0} onChange={(e) => update("price", Number(e.target.value))} /></div>
          <div><Label>Rating</Label><Input type="number" step="0.1" value={form.rating ?? 0} onChange={(e) => update("rating", Number(e.target.value))} /></div>
          <div><Label>Reviews</Label><Input type="number" value={form.reviews ?? 0} onChange={(e) => update("reviews", Number(e.target.value))} /></div>
          <div><Label>Availability</Label><Input value={form.availability || ""} onChange={(e) => update("availability", e.target.value)} /></div>
          <div><Label>Verified</Label>
            <Select value={String(!!form.verified)} onValueChange={(v) => update("verified", v === "true")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>Online</Label>
            <Select value={String(!!form.online)} onValueChange={(v) => update("online", v === "true")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2"><Label>Bio (about teacher)</Label><Textarea rows={3} value={form.bio || ""} onChange={(e) => update("bio", e.target.value)} /></div>
          <div className="sm:col-span-2"><Label>Photo URL (optional)</Label><Input value={(form as any).image || ""} onChange={(e) => update("image" as any, e.target.value)} placeholder="https://..." /></div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(form)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Packages ---------------- */

function PackagesPanel() {
  const { combos, addCombo, updateCombo, deleteCombo } = useAdminStore();
  const [editing, setEditing] = useState<Combo | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h2 className="font-display font-bold">Course packages ({combos.length})</h2>
        <Button size="sm" onClick={() => { addCombo({}); toast.success("Package added"); }}>
          <Plus className="h-4 w-4" /> Add package
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {combos.map((k) => (
          <div key={k.id} className="border rounded-2xl overflow-hidden bg-card">
            <div className="h-2" style={{ background: k.gradient }} />
            <div className="p-4">
              <div className="font-semibold">{k.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{k.courses} courses · {k.hours}h</div>
              <div className="mt-2 flex items-end gap-2">
                <span className="font-bold text-lg">${k.price}</span>
                <span className="text-xs line-through text-muted-foreground">${k.oldPrice}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2 line-clamp-2">{k.includes.join(" · ")}</div>
              <div className="mt-3 flex gap-2 justify-end">
                <Button size="icon" variant="ghost" onClick={() => { setEditing(k); setOpen(true); }} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => { deleteCombo(k.id); toast.success("Package removed"); }} aria-label="Delete"><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ComboEditDialog
        open={open && !!editing}
        combo={editing}
        onClose={() => { setOpen(false); setEditing(null); }}
        onSave={(patch) => { if (editing) { updateCombo(editing.id, patch); toast.success("Package updated"); } setOpen(false); setEditing(null); }}
      />
    </div>
  );
}

function ComboEditDialog({ open, combo, onClose, onSave }: { open: boolean; combo: Combo | null; onClose: () => void; onSave: (p: Partial<Combo>) => void }) {
  const [form, setForm] = useState<Partial<Combo>>({});
  const update = (k: keyof Combo, v: any) => setForm((f) => ({ ...f, [k]: v }));
  if (combo && form.id !== combo.id) setForm({ ...combo, includes: [...combo.includes] });

  if (!combo) return null;
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Edit package</DialogTitle></DialogHeader>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><Label>Title</Label><Input value={form.title || ""} onChange={(e) => update("title", e.target.value)} /></div>
          <div><Label>Courses</Label><Input type="number" value={form.courses ?? 0} onChange={(e) => update("courses", Number(e.target.value))} /></div>
          <div><Label>Hours</Label><Input type="number" value={form.hours ?? 0} onChange={(e) => update("hours", Number(e.target.value))} /></div>
          <div><Label>Price ($)</Label><Input type="number" value={form.price ?? 0} onChange={(e) => update("price", Number(e.target.value))} /></div>
          <div><Label>Old price ($)</Label><Input type="number" value={form.oldPrice ?? 0} onChange={(e) => update("oldPrice", Number(e.target.value))} /></div>
          <div className="sm:col-span-2"><Label>Includes (comma separated)</Label>
            <Input
              value={(form.includes || []).join(", ")}
              onChange={(e) => update("includes", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(form)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Regional ads ---------------- */

function RegionalAdsPanel() {
  const { regionalAds, addRegionalAd, updateRegionalAd, deleteRegionalAd } = useAdminStore();
  const [editing, setEditing] = useState<RegionalAd | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card border rounded-2xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="font-display font-bold">Location-based ads ({regionalAds.length})</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Popup offers shown to visitors by country or city (Geoapify). Use &quot;India&quot;, &quot;IN&quot;, or a city name.
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            addRegionalAd({});
            toast.success("Ad created — edit targeting below");
          }}
        >
          <Plus className="h-4 w-4" /> New ad
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {regionalAds.map((ad) => (
            <TableRow key={ad.id}>
              <TableCell>
                <div className="font-medium">{ad.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{ad.description}</div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {ad.targetType === "global" ? "Worldwide" : ad.targetValue}
                </Badge>
              </TableCell>
              <TableCell>
                <Switch
                  checked={ad.active}
                  onCheckedChange={(v) => updateRegionalAd(ad.id, { active: v })}
                />
              </TableCell>
              <TableCell className="text-right">
                <Button size="icon" variant="ghost" onClick={() => { setEditing(ad); setOpen(true); }} aria-label="Edit">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => { deleteRegionalAd(ad.id); toast.success("Ad removed"); }}
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AdEditDialog
        open={open && !!editing}
        ad={editing}
        onClose={() => { setOpen(false); setEditing(null); }}
        onSave={(patch) => {
          if (editing) {
            updateRegionalAd(editing.id, patch);
            toast.success("Ad updated");
          }
          setOpen(false);
          setEditing(null);
        }}
      />
    </div>
  );
}

function AdEditDialog({
  open,
  ad,
  onClose,
  onSave,
}: {
  open: boolean;
  ad: RegionalAd | null;
  onClose: () => void;
  onSave: (p: Partial<RegionalAd>) => void;
}) {
  const [form, setForm] = useState<Partial<RegionalAd>>({});
  const update = <K extends keyof RegionalAd>(k: K, v: RegionalAd[K]) => setForm((f) => ({ ...f, [k]: v }));

  if (ad && form.id !== ad.id) setForm({ ...ad });

  if (!ad) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit regional ad</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <Label>Title</Label>
            <Input value={form.title || ""} onChange={(e) => update("title", e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea rows={3} value={form.description || ""} onChange={(e) => update("description", e.target.value)} className="mt-1" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>CTA button text</Label>
              <Input value={form.ctaText || ""} onChange={(e) => update("ctaText", e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>CTA link (path)</Label>
              <Input value={form.ctaLink || ""} onChange={(e) => update("ctaLink", e.target.value)} placeholder="/courses" className="mt-1" />
            </div>
          </div>
          <div>
            <Label>Image URL (optional)</Label>
            <Input value={form.imageUrl || ""} onChange={(e) => update("imageUrl", e.target.value)} placeholder="https://..." className="mt-1" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Show to</Label>
              <Select value={form.targetType} onValueChange={(v) => update("targetType", v as RegionalAdTarget)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Everyone (worldwide)</SelectItem>
                  <SelectItem value="country">Country</SelectItem>
                  <SelectItem value="city">City</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{form.targetType === "global" ? "Note" : "Country or city name"}</Label>
              <Input
                value={form.targetValue || ""}
                onChange={(e) => update("targetValue", e.target.value)}
                disabled={form.targetType === "global"}
                placeholder={form.targetType === "city" ? "Mumbai" : "India or IN"}
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <Label htmlFor="ad-active">Active (visible in popup)</Label>
            <Switch id="ad-active" checked={form.active ?? true} onCheckedChange={(v) => update("active", v)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(form)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Revenue ---------------- */

function RevenuePanel() {
  return (
    <div className="bg-card border rounded-2xl p-5">
      <h2 className="font-display font-bold mb-4">Revenue & payouts</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={REVENUE_DATA}>
            <defs>
              <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" fontSize={12} stroke="currentColor" className="text-muted-foreground" />
            <YAxis fontSize={12} stroke="currentColor" className="text-muted-foreground" />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
            <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#rg)" />
            <Area type="monotone" dataKey="payouts" stroke="#10b981" fill="url(#pg)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

