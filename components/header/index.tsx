"use client";

import { LogOut, User } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full mb-6 flex items-center justify-between py-6 border-b border-gray-100 bg-gray-50 px-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-8">
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <User className="w-5 h-5" />
          Profile
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </header>
  );
}
