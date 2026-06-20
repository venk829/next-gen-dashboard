export const dynamic = "force-dynamic";

import { supabase } from "../../../lib/supabase";
import Link from "next/link";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !course) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Course Not Found
          </h1>

          <Link
            href="/"
            className="bg-cyan-500 px-6 py-3 rounded-xl"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-8">
      <Link
        href="/"
        className="text-cyan-400 hover:text-cyan-300"
      >
        ← Back to Dashboard
      </Link>

      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
          <h1 className="text-5xl font-bold text-white mb-6">
            {course.title}
          </h1>

          <p className="text-slate-300 text-lg mb-6">
            {course.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="text-white text-xl font-bold mb-2">
                Instructor
              </h3>

              <p className="text-slate-300">
                {course.instructor || "Admin"}
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="text-white text-xl font-bold mb-2">
                Progress
              </h3>

              <p className="text-cyan-400 text-2xl font-bold">
                {course.progress || 0}%
              </p>
            </div>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-4 mb-8">
            <div
              className="bg-cyan-500 h-4 rounded-full"
              style={{
                width: `${course.progress || 0}%`,
              }}
            />
          </div>

          <button
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg"
            onClick={() => {}}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}