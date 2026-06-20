"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, User, BookOpen, Settings, LogOut } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Sidebar() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">
        Dashboard
      </h1>

      <nav className="space-y-3">
        <Link
          href="/"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"
        >
          <Home size={20} />
          Home
        </Link>

        <Link
          href="/login"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"
        >
          <User size={20} />
          Login
        </Link>

        <Link
          href="/signup"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"
        >
          <BookOpen size={20} />
          Signup
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"
        >
          <Settings size={20} />
          Profile
        </Link>

        <button
          onClick={logout}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-600 w-full text-left"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
}