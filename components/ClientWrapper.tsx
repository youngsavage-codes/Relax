"use client"; // Mark as Client Component

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Client-side hook to get the current path

  // Define which routes should hide the sidebar (adjust as needed)
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/(auth)");

  return (
    <div className="flex">
      {/* Conditionally render the Sidebar */}
      {!isAuthRoute && <Sidebar />}
      <div className="flex-1 font-[family-name:var(--font-geist-sans)]">{children}</div>
    </div>
  );
}
