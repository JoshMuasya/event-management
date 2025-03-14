"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { name: "Home", path: "/rsvp-management" },
    { name: "Invitations", path: "/rsvp-management/invitations" },
    { name: "Guest List", path: "/rsvp-management/guest-list" },
    { name: "Check-In", path: "/rsvp-management/check-in" },
    { name: "Reports", path: "/rsvp-management/reports" },
    { name: "Thank You Notes", path: "/rsvp-management/thank-you" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7E6] via-[#F5E1FF] to-white">
      {/* Header with Glassy Effect */}
      <header className="backdrop-blur-lg bg-white/50 border-b border-[#FFD700]/40 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between flex-wrap">
          {/* Logo & Branding */}
          <div className="flex items-center">
            <Image src="/logo.png" alt="Company Logo" width={50} height={50} />
            <h1
              className="text-xl md:text-2xl font-playfair text-[#6A0DAD] ml-2 md:ml-4"
              style={{ textShadow: "2px 2px 6px #FFD700, 0 0 15px #FFD700" }}
            >
              Twilight Luxe Creations
            </h1>
          </div>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            className="md:hidden text-[#6A0DAD] focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>

          {/* Navigation (Desktop: Inline, Mobile: Dropdown) */}
          <nav
            className={`w-full md:w-auto ${
              isMenuOpen ? "block" : "hidden"
            } md:block mt-4 md:mt-0`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 bg-[#6A0DAD]/10 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.path}
                    className={`block transition-all duration-300 text-center ${
                      isActive(item.path)
                        ? "text-[#FFD700] font-bold"
                        : "text-[#6A0DAD] hover:text-[#FFD700] hover:scale-105"
                    }`}
                    onClick={() => setIsMenuOpen(false)} // Close menu on link click (mobile)
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
      <main className="container mx-auto px-4 py-6 md:py-12">{children}</main>
    </div>
  );
}