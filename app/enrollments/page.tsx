export const dynamic = "force-dynamic";

import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default async function EnrollmentsPage() {
  const { data: enrollments, error } = await supabase
    .from("courses")
    .select("*");

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-10">
        <h1 className="text-3xl font-bold mb-4">
          Error Loading Enrollments
        </h1>

        <p className="text-red-400">
          {error.message}
        </p>

        <Link
          href="/"
          className="inline-block mt-6 bg-cyan-500 px-6 py-3 rounded-xl"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="text-cyan-400 hover:text-cyan-300"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-5xl font-bold text-white mt-6 mb-10">
          My Enrollments
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments?.map((course) => (
            <div
              key={course.id}
              className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-3">
                {course.title}
              </h2>

              <p className="text-slate-300 mb-4">
                {course.description}
              </p>

              <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
                <div
                  className="bg-cyan-500 h-3 rounded-full"
                  style={{
                    width: `${course.progress || 0}%`,
                  }}
                />
              </div>

              <p className="text-cyan-400 font-bold">
                {course.progress || 0}% Completed
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}