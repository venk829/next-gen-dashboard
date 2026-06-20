"use client";

import AdminSidebar from "../../components/AdminSidebar";

const users = [
  {
    id: 1,
    name: "Venky",
    email: "venky@gmail.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "John",
    email: "john@gmail.com",
    role: "Student",
  },
  {
    id: 3,
    name: "David",
    email: "david@gmail.com",
    role: "Student",
  },
];

export default function UsersPage() {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 min-h-screen bg-slate-950 text-white p-8">
        <h1 className="text-5xl font-bold mb-8">
          User Management
        </h1>

        <div className="bg-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-700"
                >
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}