"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PenTool, Scissors, FileText, Ruler, Paperclip, ChevronRight } from "lucide-react";

const CATEGORIES = [
  { name: "Writing Essentials", icon: PenTool, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", desc: "Pens, pencils, and markers" },
  { name: "Correction & Marking", icon: Scissors, color: "text-pink-600 dark:text-pink-400", bg: "bg-pink-50 dark:bg-pink-900/20", desc: "Highlighters, erasers, and tapes" },
  { name: "Paper Products", icon: FileText, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", desc: "Notebooks, sticky notes, and planners" },
  { name: "Measuring Tools", icon: Ruler, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20", desc: "Rulers, protractors, and compasses" },
  { name: "Office Utility", icon: Paperclip, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20", desc: "Clips, staplers, and organizers" }
];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          Welcome back to Techfusion
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Explore our premium collection of stationery tailored for your creativity and productivity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <Link 
              key={cat.name} 
              href={`/category/${encodeURIComponent(cat.name)}`}
              className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.03)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-gray-50 dark:to-zinc-800 rounded-bl-full -z-10 opacity-50 group-hover:scale-110 transition-transform duration-500" />
              
              <div className={`w-14 h-14 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={28} />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cat.name}
              </h2>
              
              <p className="text-gray-500 dark:text-gray-400 mb-6 h-10">
                {cat.desc}
              </p>
              
              <div className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                Browse Collection <ChevronRight size={16} className="ml-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
