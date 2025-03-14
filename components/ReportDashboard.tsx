"use client";

import { useGuests } from "@/lib/GuestContext";
import React, { useRef, useState } from "react";

interface ReportDashboardProps {
  onExport: (format: "pdf" | "excel") => void;
}

const ReportDashboard: React.FC<ReportDashboardProps> = () => {
  const { guests } = useGuests();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExportingPDF] = useState(false);

  const attendedGuests = guests.filter((g) => g.checkInStatus === "checked-in").length;
  const nonAttendedGuests = guests.filter((g) => g.checkInStatus !== "checked-in").length;

  const sortedCheckIns = guests
    .filter((g) => g.checkInStatus === "checked-in" && g.checkInTime)
    .sort((a, b) => new Date(a.checkInTime!).getTime() - new Date(b.checkInTime!).getTime());

  const firstFive = sortedCheckIns.slice(0, 5);
  const lastFive = sortedCheckIns.slice(-5);

  const getPeakTimes = () => {
    const timeBuckets: { [key: string]: number } = {};
    guests.forEach((guest) => {
      if (guest.checkInStatus === "checked-in" && guest.checkInTime) {
        const date = new Date(guest.checkInTime);
        const minutes = Math.floor(date.getMinutes() / 15) * 15;
        date.setMinutes(minutes, 0, 0);
        const timeKey = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        timeBuckets[timeKey] = (timeBuckets[timeKey] || 0) + 1;
      }
    });

    let peakTime = "";
    let maxCount = 0;
    Object.entries(timeBuckets).forEach(([time, count]) => {
      if (count > maxCount) {
        maxCount = count;
        peakTime = time;
      }
    });
    return `${peakTime} (${maxCount} check-ins)`;
  };

  const peakTime = getPeakTimes() || "N/A (0 check-ins)";

  return (
    <div
      ref={reportRef}
      className={`p-6 rounded-lg border border-[#FFD700]/50 shadow-lg ${
        isExportingPDF ? "bg-white text-black" : "bg-[#6A0DAD]/90 text-white backdrop-blur-lg"
      }`}
    >
      <h2
        className={`text-2xl font-playfair mb-4 ${
          isExportingPDF ? "text-black" : "text-[#FFD700]"
        }`}
        style={{ textShadow: isExportingPDF ? "none" : "2px 2px 6px rgba(255, 215, 0, 0.5)" }}
      >
        Event Report
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg text-center bg-[#6A0DAD]/80 shadow-md border border-[#FFD700]/30">
          <p className="text-3xl font-bold text-[#FFD700]">{attendedGuests}</p>
          <p className="font-lora text-white">Attended</p>
        </div>
        <div className="p-4 rounded-lg text-center bg-[#6A0DAD]/80 shadow-md border border-[#FFD700]/30">
          <p className="text-3xl font-bold text-[#FFD700]">{nonAttendedGuests}</p>
          <p className="font-lora text-white">Did Not Attend</p>
        </div>
        <div className="p-4 rounded-lg text-center bg-[#6A0DAD]/80 shadow-md border border-[#FFD700]/30">
          <p className="text-3xl font-bold text-[#FFD700]">{peakTime}</p>
          <p className="font-lora text-white">Peak Time</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-[#6A0DAD]/80 shadow-md border border-[#FFD700]/30">
          <h3 className="text-lg font-lora mb-2 text-[#FFD700]">First 5 Check-ins</h3>
          <ul className="font-lora text-sm text-white">
            {firstFive.map((guest) => (
              <li key={guest.id}>
                {guest.name} - {guest.checkInTime?.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 rounded-lg bg-[#6A0DAD]/80 shadow-md border border-[#FFD700]/30">
          <h3 className="text-lg font-lora mb-2 text-[#FFD700]">Last 5 Check-ins</h3>
          <ul className="font-lora text-sm text-white">
            {lastFive.map((guest) => (
              <li key={guest.id}>
                {guest.name} - {guest.checkInTime?.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="button-gold transition hover:scale-105">Export PDF</button>
      </div>
    </div>
  );
};

export default ReportDashboard;
