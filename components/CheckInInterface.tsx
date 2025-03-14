"use client";

import { useGuests } from "@/lib/GuestContext";
import React, { useState } from "react";

const CheckInInterface: React.FC = () => {
  const { guests, checkInGuest } = useGuests();
  const [search, setSearch] = useState("");

  const filteredGuests = guests.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#6A0DAD]/30 p-6 rounded-lg border border-[#FFD700]/40 backdrop-blur-md shadow-lg max-w-3xl mx-auto w-full">
      {/* Search Input */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search guest by name"
        className="w-full p-3 bg-[#4A0080] text-[#EDEDED] border border-[#FFD700]/50 rounded-lg focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/50 font-lora mb-4 text-sm md:text-base"
      />

      {/* Guest List */}
      <ul className="space-y-3">
        {filteredGuests.map((guest) => (
          <li
            key={guest.id}
            className="flex flex-col md:flex-row md:justify-between items-center p-4 border-b border-[#FFD700]/30 bg-[#2A2A2A]/50 rounded-lg hover:bg-[#FFD700]/10 transition"
          >
            <div className="text-center md:text-left">
              <span className="text-[#EDEDED] font-lora text-lg">{guest.name}</span>
              {guest.checkInStatus === "checked-in" && guest.checkInTime && (
                <span className="text-[#B8B8B8] text-sm block">
                  Checked in: {new Date(guest.checkInTime).toLocaleString()}
                </span>
              )}
            </div>

            {/* Check-in Button */}
            <button
              onClick={() => guest.id && checkInGuest(guest.id)}
              className={`w-full md:w-auto mt-2 md:mt-0 px-4 py-2 rounded-lg font-lora transition ${
                guest.checkInStatus === "checked-in"
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-[#FFD700] text-[#2A2A2A] hover:bg-[#E6C200]"
              }`}
              disabled={guest.checkInStatus === "checked-in"}
            >
              {guest.checkInStatus === "checked-in" ? "Checked In" : "Check In"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckInInterface;
