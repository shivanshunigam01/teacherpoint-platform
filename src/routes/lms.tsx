import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Plus, PlayCircle, Award, FileText, LayoutDashboard, BookOpen, Users, DollarSign, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DashboardShell } from "@/components/dashboard/Shell";
import { useApp } from "@/hooks/use-app";

const TEACHER_NAV = [
  { to: "/teacher", label: "Overview", icon: LayoutDashboard },
  { to: "/lms", label: "My Courses", icon: BookOpen },
  { to: "/messages", label: "Student Requests", icon: Users },
  { to: "/payments", label: "Earnings", icon: DollarSign },
  { to: "/reviews", label: "Reviews", icon: Star },
  { to: "/messages", label: "Messages", icon: MessageCircle },
];

export const Route = createFileRoute("/lms")({
  component: LMS,
  head: () => ({ meta: [{ title: "Course builder · TeachersPoints" }, { name: "robots", content: "noindex" }] }),
});

function LMS() {
  const { role } = useApp();

  if (role !== "teacher") {
    return <Navigate to="/role-select" />;
  }

  return (
    <DashboardShell items={TEACHER_NAV} title="Teacher">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display font-extrabold text-2xl">Course builder</h1>
          <p className="text-muted-foreground text-sm mt-1">Build courses, design quizzes, and award certificates.</p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          New course
        </Button>
      </div>

      <Tabs defaultValue="builder">
        <TabsList>
          <TabsTrigger value="builder">Course Builder</TabsTrigger>
          <TabsTrigger value="quiz">Quizzes</TabsTrigger>
          <TabsTrigger value="assign">Assignments</TabsTrigger>
          <TabsTrigger value="cert">Certificate</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="mt-6">
          <div className="grid lg:grid-cols-[1fr_360px] gap-6">
            <div className="bg-card border rounded-2xl p-6 space-y-4">
              <Input defaultValue="AI Coding Agents Masterclass" className="text-xl font-display font-bold h-12" />
              <Input placeholder="Short description…" defaultValue="Build production AI agents with LLMs and RAG." />
              <div className="space-y-3">
                {["Getting Started", "Core Concepts", "Advanced Topics", "Capstone"].map((s, i) => (
                  <div key={s} className="border rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">Module {i + 1}: {s}</div>
                      <Button size="sm" variant="ghost">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {[1, 2, 3].map((l) => (
                        <li key={l} className="flex items-center gap-2">
                          <PlayCircle className="h-4 w-4" />
                          Lesson {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add module
                </Button>
              </div>
            </div>
            <aside className="bg-card border rounded-2xl p-5 h-fit space-y-3">
              <h3 className="font-display font-bold">Course settings</h3>
              <div className="text-sm">
                <span className="text-muted-foreground">Category</span>
                <div className="font-semibold">AI & ML</div>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Level</span>
                <div className="font-semibold">Intermediate</div>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Price</span>
                <div className="font-semibold">$19</div>
              </div>
              <Button className="w-full bg-gradient-primary">Publish</Button>
            </aside>
          </div>
        </TabsContent>

        <TabsContent value="quiz" className="mt-6 bg-card border rounded-2xl p-6">
          <h3 className="font-display font-bold mb-4">Build a quiz</h3>
          {[1, 2].map((q) => (
            <div key={q} className="border rounded-xl p-4 mb-3">
              <Input defaultValue={`Question ${q}: What does LLM stand for?`} className="font-semibold mb-3" />
              {["Large Language Model", "Linear Logic Machine", "Layered Learning Module", "None of the above"].map((opt, i) => (
                <label key={opt} className="flex items-center gap-2 text-sm py-1">
                  <input type="radio" name={`q${q}`} defaultChecked={i === 0} />
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add question
          </Button>
        </TabsContent>

        <TabsContent value="assign" className="mt-6 bg-card border rounded-2xl p-6">
          <h3 className="font-display font-bold mb-4">Assignment</h3>
          <Input defaultValue="Build a chatbot with tool-calling" className="text-lg font-semibold mb-3" />
          <textarea
            className="w-full border rounded-lg p-3 text-sm min-h-[160px]"
            defaultValue="Create a chatbot that can search the web and summarize results. Submit your GitHub repo."
          />
          <div className="flex gap-3 mt-3">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Attach brief
            </Button>
            <Button className="bg-gradient-primary">Save assignment</Button>
          </div>
        </TabsContent>

        <TabsContent value="cert" className="mt-6 bg-card border rounded-2xl p-8">
          <div className="border-2 border-dashed rounded-2xl p-10 text-center max-w-2xl mx-auto">
            <Award className="h-16 w-16 mx-auto text-amber-500" />
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-4">Certificate of Completion</div>
            <h3 className="font-display font-bold text-3xl mt-2">Aarav Patel</h3>
            <p className="text-sm text-muted-foreground mt-1">has successfully completed</p>
            <p className="font-display font-bold text-xl mt-2">AI Coding Agents Masterclass</p>
            <div className="mt-6 flex justify-between text-xs text-muted-foreground">
              <span>Issued · May 2026</span>
              <span>ID · TP-94821</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}


