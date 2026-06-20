import { supabase } from "../../../lib/supabase";
import Link from "next/link";
import EnrollButton from "../../../components/EnrollButton";

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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <h1 className="text-3xl font-bold">
          Course Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <Link
        href="/"
        className="inline-block mb-6 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg"
      >
        ← Back to Dashboard
      </Link>

      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10">

        {course.image_url && (
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-80 object-cover rounded-2xl mb-8"
          />
        )}

        <h1 className="text-5xl font-bold mb-4">
          {course.title}
        </h1>

        <p className="text-xl text-slate-300 mb-4">
          Course Progress
        </p>

        <div className="w-full bg-slate-700 rounded-full h-5 mb-4">
          <div
            className="bg-cyan-500 h-5 rounded-full"
            style={{
              width: `${course.progress}%`,
            }}
          />
        </div>

        <p className="text-cyan-400 text-lg font-bold mb-8">
          {course.progress}% Completed
        </p>

        {/* Enroll Button */}
        <div className="mb-8">
          <EnrollButton
            courseId={course.id}
          />
        </div>

        {/* Course Details */}
        <div className="bg-white/5 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Description
          </h2>

          <p className="text-slate-300 leading-8">
            This course helps students learn
            modern web development using
            React, Next.js, TypeScript,
            Tailwind CSS, Supabase and
            real-world project development.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            What You Will Learn
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li>React Fundamentals</li>
            <li>Next.js App Router</li>
            <li>TypeScript Basics</li>
            <li>Tailwind CSS</li>
            <li>Supabase Database</li>
            <li>Authentication</li>
            <li>Deployment to Vercel</li>
          </ul>
        </div>
      </div>
    </div>
  );
}