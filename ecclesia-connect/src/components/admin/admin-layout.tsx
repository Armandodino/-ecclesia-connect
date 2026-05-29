"use client"

import React from "react"
import { AdminSidebar } from "./admin-sidebar"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Admin Sidebar - always visible on admin pages */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  )
}
