"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Gift {
    id: number;
    description: string;
    sender: string;
    occasion: string;
    date: string;
    thankYouSent: boolean;
}

const AdminGiftTracking: React.FC = () => {
    // Simulated gift data (replace with API fetch in production)
    const [gifts, setGifts] = useState<Gift[]>([
        { id: 1, description: "Crystal Vase", sender: "Jane Doe", occasion: "Wedding", date: "2025-03-10", thankYouSent: false },
        { id: 2, description: "Gift Card", sender: "John Smith", occasion: "Birthday", date: "2025-03-15", thankYouSent: true },
    ]);

    const sendThankYou = (id: number) => {
        const gift = gifts.find((g) => g.id === id);
        if (!gift) return;
        console.log(`Sending thank-you note to ${gift.sender} for ${gift.description}`); // Simulate email/WhatsApp
        setGifts((prev) =>
            prev.map((g) => (g.id === id ? { ...g, thankYouSent: true } : g))
        );
        alert(`Thank-you note sent to ${gift.sender}!`);
    };

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
                    className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 font-playfair"
                    style={{
                        color: "#FFFFFF",
                        textShadow: "2px 2px 4px #FAA722, 0 0 25px #FAA722, 0 0 5px #FAA722",
                    }}
                >
                    Admin Gift Tracking
                </h1>
                <p className="text-md md:text-lg lg:text-xl italic max-w-2xl mx-auto font-lora text-[#FAA722]">
                    Manage registered gifts and send thank-you notes.
                </p>
            </div>

            {/* Gift Table */}
            <div className="w-full max-w-6xl px-6">
                <div className="p-6 rounded-lg bg-gradient-to-br from-[#FAA722]/20 to-[#FFD700]/20 backdrop-blur-md border border-[#FFD700]/30">
                    <h3 className="text-2xl font-bold text-white mb-4 font-playfair">Registered Gifts</h3>
                    {gifts.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-white font-lora">
                                <thead>
                                    <tr className="border-b border-[#FFD700]">
                                        <th className="p-3">Description</th>
                                        <th className="p-3">Sender</th>
                                        <th className="p-3">Occasion</th>
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Thank You Sent</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gifts.map((gift) => (
                                        <motion.tr
                                            key={gift.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="border-b border-gray-700 hover:bg-[#FAA722]/20"
                                        >
                                            <td className="p-3">{gift.description}</td>
                                            <td className="p-3">{gift.sender}</td>
                                            <td className="p-3">{gift.occasion}</td>
                                            <td className="p-3">{gift.date}</td>
                                            <td className="p-3">
                                                {gift.thankYouSent ? "Yes" : "No"}
                                            </td>
                                            <td className="p-3">
                                                {!gift.thankYouSent && (
                                                    <button
                                                        onClick={() => sendThankYou(gift.id)}
                                                        className="text-[#FFD700] hover:text-white"
                                                    >
                                                        Send Thank You
                                                    </button>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-white text-center font-lora">No gifts registered yet.</p>
                    )}
                </div>
            </div>

            {/* Back to Dashboard */}
            <Link href="/gift-tracking" className="mt-6 text-[#FFD700] font-lora hover:underline">
                Back to Dashboard
            </Link>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-sm italic text-[#FAA722] font-lora">
                    Crafted with Luxe Precision for Unforgettable Moments
                </p>
            </div>
        </motion.section>
    );
};

export default AdminGiftTracking;