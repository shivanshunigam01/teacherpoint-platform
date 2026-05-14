import { Link } from "@tanstack/react-router";
import { Star, Clock, Users, BookOpen, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/data/mock";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link to="/courses/$id" params={{ id: course.id }} className="group block">
      <article className="bg-card border rounded-2xl overflow-hidden h-full hover:shadow-card transition-all hover:-translate-y-1">
        <div className="aspect-video relative overflow-hidden" style={{ background: course.gradient }}>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
          <div className="absolute top-3 left-3 flex gap-2">
            {course.bestseller && <Badge className="bg-amber-400 text-amber-950 hover:bg-amber-400">Bestseller</Badge>}
            {course.certificate && <Badge variant="secondary" className="bg-white/90 text-slate-900"><Award className="h-3 w-3 mr-1" />Cert</Badge>}
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="text-xs opacity-90 uppercase tracking-wide">{course.category}</div>
            <div className="font-display font-bold text-lg leading-tight line-clamp-2">{course.title}</div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs text-muted-foreground">By {course.instructor}</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-amber-500 font-semibold text-sm">{course.rating}</span>
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span className="text-xs text-muted-foreground">({course.reviews.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
            <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{course.lessons}</span>
            <span className="flex items-center gap-1"><Users className="h-3 w-3" />{(course.students / 1000).toFixed(1)}k</span>
          </div>
          <div className="flex items-end gap-2 mt-3">
            <span className="font-display font-bold text-lg">${course.price}</span>
            <span className="text-xs text-muted-foreground line-through">${course.oldPrice}</span>
            <span className="text-xs text-emerald-600 font-semibold ml-auto">{course.level}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
