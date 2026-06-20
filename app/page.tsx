import { supabase } from "../lib/supabase";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import CourseCard from "../components/CourseCard";

export default async function Home() {
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*");

  if (error) {
    return (
      <div className="p-10 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  const totalCourses = courses?.length || 0;
  const completedCourses =
    courses?.filter((course) => course.progress >= 80).length || 0;
  const inProgressCourses =
    courses?.filter((course) => course.progress < 80).length || 0;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-8">
        <h1 className="text-5xl font-bold text-white mb-8">
          Student Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
            <h3 className="text-slate-300">Total Courses</h3>
            <p className="text-4xl font-bold text-white mt-2">
              {totalCourses}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
            <h3 className="text-slate-300">Completed</h3>
            <p className="text-4xl font-bold text-green-400 mt-2">
              {completedCourses}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
            <h3 className="text-slate-300">In Progress</h3>
            <p className="text-4xl font-bold text-cyan-400 mt-2">
              {inProgressCourses}
            </p>
          </div>
        </div>

        {/* Course Cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {courses?.map((course) => (
          <Link
            key={course.id}
            href={`/course/${course.id}`}
          >
            <CourseCard course={course} />
          </Link>
        ))}
      </div>
    </main>
  </div>
);
}