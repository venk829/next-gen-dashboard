"use client";

export default function EnrollButton({
  courseId,
}: {
  courseId: string;
}) {
  return (
    <button
      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
      onClick={() => alert(`Course ID: ${courseId}`)}
    >
      Enroll Now
    </button>
  );
}