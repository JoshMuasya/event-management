"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7E6] via-[#F5E1FF] to-white">
      {/* Header with Glassy Effect */}
      <header className="backdrop-blur-lg bg-white/50 border-b border-[#FFD700]/40 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          {/* Logo & Branding */}
          <div className="flex items-center">
            <Image src="/logo.png" alt="Company Logo" width={50} height={50} />
            <h1
              className="text-2xl font-playfair text-[#6A0DAD] ml-4"
              style={{ textShadow: "2px 2px 6px #FFD700, 0 0 15px #FFD700" }}
            >
              Twilight Luxe Creations
            </h1>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex space-x-6">
              {[
                { name: "Home", path: "/rsvp-management" },
                { name: "Invitations", path: "/rsvp-management/invitations" },
                { name: "Guest List", path: "/rsvp-management/guest-list" },
                { name: "Check-In", path: "/rsvp-management/check-in" },
                { name: "Reports", path: "/rsvp-management/reports" },
                { name: "Thank You Notes", path: "/rsvp-management/thank-you" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.path}
                    className={`transition-all duration-300 ${
                      isActive(item.path)
                        ? "text-[#FFD700] font-bold"
                        : "text-[#6A0DAD] hover:text-[#FFD700] hover:scale-105"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">{children}</main>
    </div>
  );
}
