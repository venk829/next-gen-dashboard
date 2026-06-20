"use client";

import { supabase } from "../lib/supabase";

export default function EnrollButton({
  courseId,
}: {
  courseId: string;
}) {
  const enroll = async () => {
    const studentName = prompt("Enter Student Name");

    if (!studentName) return;

    const { error } = await supabase
      .from("enrollments")
      .insert([
        {
          student_name: studentName,
          course_id: courseId,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Enrollment Successful");
  };

  return (
    <button
      onClick={enroll}
      className="bg-green-500 px-6 py-3 rounded-xl font-bold"
    >
      Enroll Now
    </button>
  );
}