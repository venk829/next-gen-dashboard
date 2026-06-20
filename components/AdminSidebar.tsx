"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  User,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white border-r border-slate-800 p-6">
      <h1 className="text-2xl font-bold mb-10">
        Admin Panel
      </h1>

      <nav className="flex flex-col gap-3">
        <Link
          href="/admin"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/enrollments"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
        >
          <Users size={20} />
          Enrollments
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
        >
          <User size={20} />
          Profile
        </Link>
      </nav>

      <div className="mt-auto pt-10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-xl bg-red-500 hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}