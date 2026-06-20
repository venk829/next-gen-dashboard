import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default async function EnrollmentsPage() {
  const { data: enrollments, error } = await supabase
    .from("enrollments")
    .select(`
      *,
      courses (
        title
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-500">
        <h1 className="text-2xl">
          Error: {error.message}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl font-bold">
            Student Enrollments
          </h1>

          <Link
            href="/admin"
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl font-semibold transition"
          >
            ← Back to Admin
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
            <h3 className="text-slate-300">
              Total Enrollments
            </h3>

            <p className="text-4xl font-bold text-cyan-400 mt-2">
              {enrollments?.length || 0}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
            <h3 className="text-slate-300">
              Active Students
            </h3>

            <p className="text-4xl font-bold text-green-400 mt-2">
              {enrollments?.length || 0}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
            <h3 className="text-slate-300">
              Courses Enrolled
            </h3>

            <p className="text-4xl font-bold text-purple-400 mt-2">
              {enrollments?.length || 0}
            </p>
          </div>
        </div>

        {/* Enrollment Cards */}
        {enrollments && enrollments.length > 0 ? (
          <div className="grid gap-5">
            {enrollments.map((item: any) => (
              <div
                key={item.id}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white">
                  {item.student_name}
                </h2>

                <p className="text-cyan-400 mt-3">
                  Course:
                  {" "}
                  {item.courses?.title ||
                    "Unknown Course"}
                </p>

                <p className="text-slate-400 mt-3">
                  Enrolled On:
                  {" "}
                  {new Date(
                    item.created_at
                  ).toLocaleDateString()}
                </p>

                <p className="text-slate-500 text-sm mt-2">
                  {new Date(
                    item.created_at
                  ).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/10 rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-bold">
              No Enrollments Found
            </h2>

            <p className="text-slate-400 mt-3">
              Students will appear here after
              enrolling in courses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}