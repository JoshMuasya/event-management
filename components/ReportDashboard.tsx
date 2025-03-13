"use client";

import { EventData } from "@/types";
import React from "react";

interface ReportDashboardProps {
  data: EventData;
  onExport: (format: "pdf" | "excel") => void;
}

const ReportDashboard: React.FC<ReportDashboardProps> = ({ data, onExport }) => {
  return (
    <div className="bg-glassy p-6 rounded-lg border border-[#FFD700]/30">
      <h2 className="text-2xl font-playfair text-white mb-4" style={{ textShadow: "2px 2px 4px #FAA722" }}>
        Event Report
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-glassy p-4 rounded-lg text-center">
          <p className="text-2xl text-[#FAA722] font-bold font-lora">{data.totalRSVPs}</p>
          <p className="text-white font-lora">Total RSVPs</p>
        </div>
        <div className="bg-glassy p-4 rounded-lg text-center">
          <p className="text-2xl text-[#FAA722] font-bold font-lora">{data.totalAttendees}</p>
          <p className="text-white font-lora">Total Attendees</p>
        </div>
        <div className="bg-glassy p-4 rounded-lg text-center">
          <p className="text-2xl text-[#FAA722] font-bold font-lora">{data.peakAttendanceTime}</p>
          <p className="text-white font-lora">Peak Time</p>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <button onClick={() => onExport("pdf")} className="button-gold">Export PDF</button>
        <button onClick={() => onExport("excel")} className="button-gold">Export Excel</button>
      </div>
    </div>
  );
};

export default ReportDashboard;