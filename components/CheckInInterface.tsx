"use client";

import { Guest } from "@/types";
import React, { useState } from "react";

interface CheckInInterfaceProps {
  guests: Guest[];
  onCheckIn: (id: string) => void;
}

const CheckInInterface: React.FC<CheckInInterfaceProps> = ({ guests, onCheckIn }) => {
  const [search, setSearch] = useState("");

  const filteredGuests = guests.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-glassy p-6 rounded-lg border border-[#FFD700]/30">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search guest by name"
        className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:border-[#FAA722] focus:ring-2 focus:ring-[#FAA722]/50 font-lora mb-4"
      />
      <ul className="space-y-2">
        {filteredGuests.map((guest) => (
          <li key={guest.id} className="flex justify-between items-center p-3 border-b border-[#FFD700]/30 hover:bg-[#FAA722]/10 transition">
            <span className="text-white font-lora">{guest.name}</span>
            <button
              onClick={() => onCheckIn(guest.id)}
              className="button-gold"
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