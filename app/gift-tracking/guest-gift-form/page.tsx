"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface GuestGift {
    description: string;
    sender: string;
    occasion: string;
    date: string;
}

const GuestGiftForm: React.FC = () => {
    const [guestGift, setGuestGift] = useState<GuestGift>({
        description: "",
        sender: "",
        occasion: "",
        date: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!guestGift.description || !guestGift.sender || !guestGift.occasion || !guestGift.date) {
            alert("Please fill in all fields.");
            return;
        }
        console.log("Gift submitted:", guestGift); // Simulate submission; replace with API call
        alert("Gift submitted successfully!");
        setGuestGift({ description: "", sender: "", occasion: "", date: "" });
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
                    Add a Gift
                </h1>
                <p className="text-md md:text-lg lg:text-xl italic max-w-2xl mx-auto font-lora text-[#FAA722]">
                    Share your gift with the host.
                </p>
            </div>

            {/* Form */}
            <motion.div
                className="w-full max-w-lg p-6 rounded-lg bg-gradient-to-br from-[#FAA722]/20 to-[#FFD700]/20 backdrop-blur-md border border-[#FFD700]/30"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Gift Description"
                        value={guestGift.description}
                        onChange={(e) =>
                            setGuestGift((prev) => ({ ...prev, description: e.target.value }))
                        }
                        className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 font-lora"
                    />
                    <input
                        type="text"
                        placeholder="Your Name (Sender)"
                        value={guestGift.sender}
                        onChange={(e) =>
                            setGuestGift((prev) => ({ ...prev, sender: e.target.value }))
                        }
                        className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 font-lora"
                    />
                    <input
                        type="text"
                        placeholder="Occasion (e.g., Wedding)"
                        value={guestGift.occasion}
                        onChange={(e) =>
                            setGuestGift((prev) => ({ ...prev, occasion: e.target.value }))
                        }
                        className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 font-lora"
                    />
                    <input
                        type="date"
                        value={guestGift.date}
                        onChange={(e) =>
                            setGuestGift((prev) => ({ ...prev, date: e.target.value }))
                        }
                        className="w-full p-2 rounded bg-gray-800 text-white font-lora"
                    />
                    <motion.button
                        type="submit"
                        className="w-full px-4 py-2 bg-[#FAA722] text-black rounded-md font-bold font-lora"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Submit Gift
                    </motion.button>
                </form>
            </motion.div>

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

export default GuestGiftForm;