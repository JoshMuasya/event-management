"use client";

import { useGuests } from "@/lib/GuestContext";
import React, { useState } from "react";
import * as XLSX from "xlsx";

// Define the expected shape of raw Excel data
interface RawGuestData {
  Name?: string | number;
  Phone?: string | number;
  [key: string]: unknown;
}

const GuestTable: React.FC = () => {
  const { guests, uploadGuests } = useGuests(); // Updated context usage
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      // Read the file as a promise
      const data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsBinaryString(file);
      });

      const workbook = XLSX.read(data, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json<RawGuestData>(worksheet);

      console.log("Raw JSON data from Excel:", jsonData);

      const formattedGuests = jsonData
        .filter((item) => item.Name && typeof item.Name === "string")
        .map((item) => ({
          name: String(item.Name).trim(),
          number: item.Phone !== undefined ? String(item.Phone).trim() : undefined,
        }));

      console.log("Formatted guests:", formattedGuests);

      if (formattedGuests.length === 0) {
        console.warn("No valid guest data found in the Excel file");
        setUploading(false);
        return;
      }

      // Upload to Firestore instead of setting local state
      await uploadGuests(formattedGuests);
    } catch (error) {
      console.error("Error processing or uploading guests:", error);
      // Optionally, display an error message to the user
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white border border-[#FFD700]/50 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="px-4 py-2 bg-[#6A0DAD] text-white rounded-lg cursor-pointer hover:bg-[#5a0b9d] transition">
          {uploading ? "Uploading..." : "Upload Contact List (Excel)"}
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {guests.length === 0 ? (
        <p className="text-[#2A2A2A] text-lg">No guests to display. Upload an Excel file to populate the table.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-lora text-[#2A2A2A]">
            <thead>
              <tr className="bg-[#6A0DAD] text-white border-b border-[#FFD700]/50">
                <th className="p-3">Name</th>
                <th className="p-3">Number</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, index) => (
                <tr
                  key={index}
                  className="border-b border-[#FFD700]/50 hover:bg-[#FFD700]/10 transition"
                >
                  <td className="p-3">{guest.name}</td>
                  <td className="p-3">{guest.number || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GuestTable;
