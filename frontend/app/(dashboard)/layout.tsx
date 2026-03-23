"use client";

import { useState } from "react";
import Header from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const categories = [
    "Heilkunde",
    "Natur",
    "Kräuter",
    "Kopfschmerzen",
    "Gesellschaft",
    "Beruf",
    "Berufswahl",
    "Informatik",
  ];

  // Map pathname to activeView
  const getActiveView = () => {
    if (pathname === "/") return "home";
    return pathname.replace("/", "");
  };

  const handleViewChange = (view: string) => {
    if (view === "home") router.push("/");
    else router.push(`/${view}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onSearch={(q) => {
          // How to handle search across pages?
          // Maybe use a search param or a global state/context
          const params = new URLSearchParams(window.location.search);
          if (q) params.set("q", q);
          else params.delete("q");
          router.push(`${pathname}?${params.toString()}`);
        }}
        onAppModeChange={() => {}}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        appMode="mylightshub"
      />

      <div className="flex flex-1">
        <Sidebar
          activeView={getActiveView()}
          onViewChange={handleViewChange}
          categories={categories}
          activeCategory={
            new URLSearchParams(
              typeof window !== "undefined" ? window.location.search : "",
            ).get("cat") || ""
          }
          onCategoryChange={(cat) => {
            const params = new URLSearchParams(window.location.search);
            if (cat) params.set("cat", cat);
            else params.delete("cat");
            router.push(`${pathname}?${params.toString()}`);
          }}
          isCollapsed={isSidebarCollapsed}
        />

        <main
          id="main"
          className={`${isSidebarCollapsed ? "wide" : ""} flex-1`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
