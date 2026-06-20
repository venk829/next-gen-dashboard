export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">
        User Profile
      </h1>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 max-w-lg">
        <p className="mb-4">
          <strong>Name:</strong> Student
        </p>

        <p className="mb-4">
          <strong>Email:</strong> student@test.com
        </p>

        <p>
          <strong>Role:</strong> Learner
        </p>
      </div>
    </div>
  );
}