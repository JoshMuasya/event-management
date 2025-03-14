"use client";

import { useGuests } from "@/lib/GuestContext";
import React, { useRef, useState } from "react";

interface ReportDashboardProps {
  onExport: (format: "pdf" | "excel") => void;
}

const ReportDashboard: React.FC<ReportDashboardProps> = ({ onExport }) => {
  const { guests } = useGuests();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExportingPDF] = useState(false);

  // Count attended and non-attended guests
  const attendedGuests = guests.filter((g) => g.checkInStatus === "checked-in").length;
  const nonAttendedGuests = guests.filter((g) => g.checkInStatus !== "checked-in").length;

  // Sort checked-in guests by check-in time
  const sortedCheckIns = guests
    .filter((g) => g.checkInStatus === "checked-in" && g.checkInTime)
    .sort((a, b) => new Date(a.checkInTime!).getTime() - new Date(b.checkInTime!).getTime());

  // Get first and last 5 check-ins
  const firstFive = sortedCheckIns.slice(0, 5);
  const lastFive = sortedCheckIns.slice(-5);

  // Calculate peak time with a 15-minute window
  const getPeakTimes = () => {
    if (sortedCheckIns.length === 0) return "N/A (0 check-ins)";

    const timeBuckets: { [key: string]: number } = {};
    sortedCheckIns.forEach((guest) => {
      const date = new Date(guest.checkInTime!); // ISO string from Firestore
      const minutes = Math.floor(date.getMinutes() / 15) * 15; // Round down to 15-min bucket
      date.setMinutes(minutes, 0, 0);
      const timeKey = date.toISOString(); // Use ISO string as key for consistency
      timeBuckets[timeKey] = (timeBuckets[timeKey] || 0) + 1;
    });

    let peakTimeISO = "";
    let maxCount = 0;
    Object.entries(timeBuckets).forEach(([time, count]) => {
      if (count > maxCount) {
        maxCount = count;
        peakTimeISO = time; // ISO string of peak bucket
      }
    });

    if (!peakTimeISO) return "N/A (0 check-ins)";

    const peakStart = new Date(peakTimeISO);
    const peakEnd = new Date(peakStart);
    peakEnd.setMinutes(peakStart.getMinutes() + 15);

    return `${peakStart.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${peakEnd.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} (${maxCount} check-ins)`;
  };

  const peakTime = getPeakTimes();

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
          <p className="font-lora text-white">Peak Time Window</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-[#6A0DAD]/80 shadow-md border border-[#FFD700]/30">
          <h3 className="text-lg font-lora mb-2 text-[#FFD700]">First 5 Check-ins</h3>
          <ul className="font-lora text-sm text-white">
            {firstFive.length > 0 ? (
              firstFive.map((guest) => (
                <li key={guest.id}>
                  {guest.name} - {new Date(guest.checkInTime!).toLocaleString()}
                </li>
              ))
            ) : (
              <li>No check-ins recorded</li>
            )}
          </ul>
        </div>
        <div className="p-4 rounded-lg bg-[#6A0DAD]/80 shadow-md border border-[#FFD700]/30">
          <h3 className="text-lg font-lora mb-2 text-[#FFD700]">Last 5 Check-ins</h3>
          <ul className="font-lora text-sm text-white">
            {lastFive.length > 0 ? (
              lastFive.map((guest) => (
                <li key={guest.id}>
                  {guest.name} - {new Date(guest.checkInTime!).toLocaleString()}
                </li>
              ))
            ) : (
              <li>No check-ins recorded</li>
            )}
          </ul>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => onExport("pdf")}
          className="button-gold transition hover:scale-105"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default ReportDashboard;