"use client";

import React, { useState, useCallback } from "react";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";

// Define the GuestList type
interface GuestList {
    id: number;
    name: string;
    email: string;
    phone: string;
    rsvpStatus: "Pending" | "Confirmed" | "Declined";
    menuPreference: string;
    allergens: string;
    relationship: string;
    group: string;
}

const GuestListManagement: React.FC = () => {
    const [guestList, setGuestList] = useState<GuestList[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [collaborators, setCollaborators] = useState<string[]>([]);
    const [sendMethod, setSendMethod] = useState<"email" | "whatsapp" | "both">("both"); // Default to both

    // Handle Excel file upload
    const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet);

                const parsedGuests: GuestList[] = jsonData.map((guest, index) => ({
                    id: index,
                    name: guest.Name || guest.name || "Unnamed Guest",
                    email: guest.Email || guest.email || "No Email",
                    phone: guest.Phone || guest.phone || "No Phone",
                    rsvpStatus: "Pending" as const,
                    menuPreference: "",
                    allergens: "",
                    relationship: "",
                    group: "Ungrouped",
                }));

                setGuestList(parsedGuests);
            } catch (error) {
                console.error("Error parsing Excel file:", error);
                alert("Invalid file format. Please upload a valid Excel file.");
            }
        };
        reader.readAsArrayBuffer(file);
    }, []);

    // Send personalized invitations via email and/or WhatsApp
    const sendInvitations = useCallback(() => {
        if (guestList.length === 0) {
            alert("No guests available to send invitations.");
            return;
        }

        guestList.forEach((guest) => {
            const rsvpLink = `https://example.com/rsvp/${guest.id}`;
            const message = `Dear ${guest.name}, you are cordially invited to our event. Please RSVP at ${rsvpLink}`;

            if (sendMethod === "email" || sendMethod === "both") {
                if (guest.email && guest.email !== "No Email") {
                    console.log(`Email to ${guest.email}: ${message}`);
                    // Replace with real email API call (e.g., SendGrid or Nodemailer via backend)
                    // fetch('/api/send-email', {
                    //     method: 'POST',
                    //     body: JSON.stringify({ to: guest.email, subject: 'Event Invitation', text: message }),
                    //     headers: { 'Content-Type': 'application/json' },
                    // }).then(res => console.log('Email sent:', res));
                } else {
                    console.warn(`No valid email for ${guest.name}`);
                }
            }

            if (sendMethod === "whatsapp" || sendMethod === "both") {
                if (guest.phone && guest.phone !== "No Phone") {
                    console.log(`WhatsApp to ${guest.phone}: ${message}`);
                    // Replace with real WhatsApp API call (e.g., Twilio or WhatsApp Business API via backend)
                    // fetch('/api/send-whatsapp', {
                    //     method: 'POST',
                    //     body: JSON.stringify({ to: guest.phone, body: message }),
                    //     headers: { 'Content-Type': 'application/json' },
                    // }).then(res => console.log('WhatsApp sent:', res));
                } else {
                    console.warn(`No valid phone for ${guest.name}`);
                }
            }
        });

        alert(`Invitations sent successfully via ${sendMethod}!`);
    }, [guestList, sendMethod]);

    // Simulate RSVP response
    const simulateRSVP = useCallback((id: number) => {
        const guestIndex = guestList.findIndex((guest) => guest.id === id);
        if (guestIndex === -1) return;

        const attendance = prompt("Will you attend? (yes/no)")?.toLowerCase();
        if (!attendance || !["yes", "no"].includes(attendance)) return;

        const menu = prompt("Menu preference?") || "";
        const allergens = prompt("Any allergens?") || "";
        const relationship = prompt("Relationship to host?") || "";

        const updatedGuest: GuestList = {
            ...guestList[guestIndex],
            rsvpStatus: attendance === "yes" ? "Confirmed" : "Declined",
            menuPreference: menu,
            allergens: allergens,
            relationship: relationship,
            group: relationship || "Ungrouped",
        };

        const newGuestList = [...guestList];
        newGuestList[guestIndex] = updatedGuest;
        setGuestList(newGuestList);
    }, [guestList]);

    // Edit guest name
    const editGuest = useCallback((id: number) => {
        const newName = prompt("Edit name", guestList.find((g) => g.id === id)?.name || "");
        if (!newName) return;

        setGuestList((prev) =>
            prev.map((g) => (g.id === id ? { ...g, name: newName } : g))
        );
    }, [guestList]);

    // Delete guest
    const deleteGuest = useCallback((id: number) => {
        if (confirm("Are you sure you want to delete this guest?")) {
            setGuestList((prev) => prev.filter((g) => g.id !== id));
        }
    }, []);

    // Add a collaborator
    const addCollaborator = useCallback(() => {
        const name = prompt("Enter collaborator name");
        if (name) setCollaborators((prev) => [...prev, name]);
    }, []);

    // Filter guests
    const filteredGuests = guestList.filter(
        (guest) =>
            guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guest.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.section
            className="relative min-h-screen w-full flex flex-col items-center py-12 bg-gradient-to-b from-black to-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Header */}
            <div className="text-center text-white mb-8">
                <h1
                    className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
                    style={{
                        color: "#FFFFFF",
                        textShadow: "2px 2px 4px #FAA722, 0 0 25px #FAA722, 0 0 5px #FAA722",
                        fontFamily: "'Playfair Display', serif",
                    }}
                >
                    Guest List Management
                </h1>
                <p
                    className="text-md md:text-lg lg:text-xl italic max-w-2xl mx-auto"
                    style={{ color: "#FAA722", fontFamily: "'Lora', serif'" }}
                >
                    Upload your Excel guest list and send invitations via email or WhatsApp.
                </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#FAA722] file:text-black hover:file:bg-[#FFD700]"
                />
                <select
                    value={sendMethod}
                    onChange={(e) => setSendMethod(e.target.value as "email" | "whatsapp" | "both")}
                    className="px-4 py-2 bg-[#FAA722] text-black rounded-md font-bold"
                >
                    <option value="email">Email Only</option>
                    <option value="whatsapp">WhatsApp Only</option>
                    <option value="both">Both</option>
                </select>
                <motion.button
                    onClick={sendInvitations}
                    className="px-4 py-2 bg-[#FAA722] text-black rounded-md font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Send Invitations
                </motion.button>
                <motion.button
                    onClick={addCollaborator}
                    className="px-4 py-2 bg-[#FAA722] text-black rounded-md font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Add Collaborator
                </motion.button>
            </div>

            {/* Collaborators */}
            {collaborators.length > 0 && (
                <p
                    className="text-white mt-4 mb-4"
                    style={{ fontFamily: "'Lora', serif'" }}
                >
                    Collaborators: {collaborators.join(", ")}
                </p>
            )}

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search guests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-4xl p-3 mb-8 rounded-md bg-white bg-opacity-10 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FAA722]"
                style={{ fontFamily: "'Lora', serif'" }}
            />

            {/* Guest List Table */}
            <div className="w-full max-w-6xl px-6">
                <div
                    className="p-6 rounded-lg"
                    style={{
                        background: "linear-gradient(135deg, rgba(250, 167, 34, 0.2), rgba(255, 215, 0, 0.2))",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 215, 0, 0.3)",
                        boxShadow: "0 4px 15px rgba(250, 167, 34, 0.2)",
                    }}
                >
                    <h3
                        className="text-2xl font-bold text-white mb-4"
                        style={{ fontFamily: "'Playfair Display', serif'" }}
                    >
                        Guest List
                    </h3>
                    {filteredGuests.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-white" style={{ fontFamily: "'Lora', serif'" }}>
                                <thead>
                                    <tr className="border-b border-[#FFD700]">
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Email</th>
                                        <th className="p-3">Phone</th>
                                        <th className="p-3">RSVP</th>
                                        <th className="p-3">Menu</th>
                                        <th className="p-3">Allergens</th>
                                        <th className="p-3">Relationship</th>
                                        <th className="p-3">Group</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredGuests.map((guest) => (
                                        <motion.tr
                                            key={guest.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="border-b border-gray-700 hover:bg-[#FAA722] hover:bg-opacity-20"
                                        >
                                            <td className="p-3">{guest.name}</td>
                                            <td className="p-3">{guest.email}</td>
                                            <td className="p-3">{guest.phone}</td>
                                            <td className="p-3">{guest.rsvpStatus}</td>
                                            <td className="p-3">{guest.menuPreference}</td>
                                            <td className="p-3">{guest.allergens}</td>
                                            <td className="p-3">{guest.relationship}</td>
                                            <td className="p-3">
                                                <select
                                                    value={guest.group}
                                                    onChange={(e) =>
                                                        setGuestList((prev) =>
                                                            prev.map((g) =>
                                                                g.id === guest.id ? { ...g, group: e.target.value } : g
                                                            )
                                                        )
                                                    }
                                                    className="bg-transparent text-white"
                                                >
                                                    <option>Ungrouped</option>
                                                    <option>Family</option>
                                                    <option>Friends</option>
                                                    <option>Colleagues</option>
                                                </select>
                                            </td>
                                            <td className="p-3 flex gap-2">
                                                <button onClick={() => editGuest(guest.id)} className="text-[#FFD700]">
                                                    Edit
                                                </button>
                                                <button onClick={() => deleteGuest(guest.id)} className="text-[#FFD700]">
                                                    Delete
                                                </button>
                                                <button onClick={() => simulateRSVP(guest.id)} className="text-[#FFD700]">
                                                    Simulate RSVP
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-white text-center" style={{ fontFamily: "'Lora', serif'" }}>
                            No guests uploaded yet. Please upload an Excel file.
                        </p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
                <p
                    className="text-sm italic"
                    style={{ color: "#FAA722", fontFamily: "'Lora', serif'" }}
                >
                    Crafted with Luxe Precision for Unforgettable Moments
                </p>
            </div>
        </motion.section>
    );
};

export default GuestListManagement;