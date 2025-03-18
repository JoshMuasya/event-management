"use client";

import { useGuests } from "@/lib/GuestContext";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import LoadingPage from "./Loading";

// Define the expected shape of raw Excel data
interface RawGuestData {
  Name?: string | number;
  Phone?: string | number;
  [key: string]: unknown;
}

const GuestTable: React.FC = () => {
  const { guests, uploadGuests, addGuest } = useGuests(); // Added addGuest
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 2000)
  
      return () => clearTimeout(timer)
    })

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    try {
      const data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsBinaryString(file);
      });

      const workbook = XLSX.read(data, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json<RawGuestData>(worksheet);

      const formattedGuests = jsonData
        .filter((item) => item.Name && typeof item.Name === "string")
        .map((item) => ({
          name: String(item.Name).trim(),
          number: item.Phone !== undefined ? String(item.Phone).trim() : undefined,
        }));

      if (formattedGuests.length === 0) {
        console.warn("No valid guest data found in the Excel file");
        setIsProcessing(false);
        return;
      }

      await uploadGuests(formattedGuests); // Still replaces all guests for bulk upload
    } catch (error) {
      console.error("Error processing or uploading guests:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddGuest = async () => {
    const trimmedName = name.trim();
    if (trimmedName === "") {
      alert("Name is required");
      return;
    }

    setIsProcessing(true);

    try {
      const newGuest = {
        name: trimmedName,
        number: phone.trim() || undefined,
      };
      await addGuest(newGuest); // Use addGuest instead of uploadGuests
      setName("");
      setPhone("");
    } catch (error) {
      console.error("Error adding guest:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
      return <LoadingPage />
    }

  return (
    <div className="p-6 bg-white border border-[#FFD700]/50 rounded-lg shadow-md">
      {/* Manual Guest Entry Section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-[#2A2A2A]">Add Guest Manually</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="px-4 py-2 border border-[#FFD700]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="px-4 py-2 border border-[#FFD700]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
          />
          <button
            onClick={handleAddGuest}
            disabled={isProcessing || name.trim() === ""}
            className="px-4 py-2 bg-[#6A0DAD] text-white rounded-lg hover:bg-[#5a0b9d] transition disabled:opacity-50"
          >
            {isProcessing ? "Adding..." : "Add Guest"}
          </button>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="mb-4">
        <label className="px-4 py-2 bg-[#6A0DAD] text-white rounded-lg cursor-pointer hover:bg-[#5a0b9d] transition">
          {isProcessing ? "Processing..." : "Upload Contact List (Excel)"}
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            disabled={isProcessing}
            className="hidden"
          />
        </label>
      </div>

      {/* Guest Table */}
      {guests.length === 0 ? (
        <p className="text-[#2A2A2A] text-lg">
          No guests to display. Upload an Excel file or add guests manually to populate the table.
        </p>
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
                  key={guest.id || index} // Use guest.id if available
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