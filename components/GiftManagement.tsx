"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Simulated user role (replace with real auth context or hook)
const user = { role: "admin" }; // Toggle to "guest" for testing

const GiftManagementDashboard: React.FC = () => {

    return (
        <motion.section
            className="relative min-h-screen w-full flex flex-col items-center py-12 bg-gradient-to-b from-black to-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Header */}
            <div className="text-center text-white mb-12">
                <h1
                    className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 font-playfair"
                    style={{
                        color: "#FFFFFF",
                        textShadow: "2px 2px 4px #FAA722, 0 0 25px #FAA722, 0 0 5px #FAA722",
                    }}
                >
                    Welcome to Gift Management
                </h1>
                <p className="text-md md:text-lg lg:text-xl italic max-w-2xl mx-auto font-lora text-[#FAA722]">
                    Organize your gifts with elegance and ease.
                </p>
            </div>

            {/* Explanation Section */}
            <div className="w-full max-w-4xl px-6 mb-12">
                <div className="p-6 rounded-lg bg-gradient-to-br from-[#FAA722]/20 to-[#FFD700]/20 backdrop-blur-md border border-[#FFD700]/30">
                    <h2 className="text-2xl font-bold text-white mb-4 font-playfair">What We Offer</h2>
                    <p className="text-white font-lora mb-4">
                        Our Gift Management System helps you keep track of every gift you receive or give. Whether you’re a guest adding a thoughtful present or an admin managing the celebration, we’ve got you covered.
                    </p>
                    <ul className="list-disc list-inside text-white font-lora space-y-2">
                        <li>Log gifts with details like sender, occasion, and date.</li>
                        <li>Track thank-you note statuses to stay gracious.</li>
                        <li>Enjoy a luxurious, user-friendly experience.</li>
                        {user.role === "admin" && (
                            <li>Manage all registered gifts and send thank-you notes effortlessly.</li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-6 mb-12">
                <Link href="/gift-tracking/guest-gift-form">
                    <motion.button
                        className="px-6 py-3 bg-[#FAA722] text-black rounded-md font-bold font-lora"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Add a Gift as a Guest
                    </motion.button>
                </Link>
                {user.role === "admin" && (
                    <Link href="/gift-tracking/admin-gift-tracking">
                        <motion.button
                            className="px-6 py-3 bg-[#FFD700] text-black rounded-md font-bold font-lora"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Admin: Track Gifts & Send Thank-Yous
                        </motion.button>
                    </Link>
                )}
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-sm italic text-[#FAA722] font-lora">
                    Crafted with Luxe Precision for Unforgettable Moments
                </p>
            </div>
        </motion.section>
    );
};

export default GiftManagementDashboard;