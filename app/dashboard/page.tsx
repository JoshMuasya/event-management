"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from "framer-motion"
import { FaUsers, FaGift, FaEnvelope, FaClock } from 'react-icons/fa' // Icons for features

const MainDashboard = () => {
    // Sample data for dashboard summaries (replace with real data from state or API)
    const dashboardData = {
        guestList: { total: 45, confirmed: 30, pending: 15 },
        gifts: { totalReceived: 20, thankYouSent: 12 },
        rsvps: { total: 45, responded: 35, pending: 10 },
        timeline: { tasks: 8, completed: 5 },
    }

    return (
        <motion.section
            id="main-dashboard"
            className="relative min-h-screen w-full flex flex-col items-center py-12 bg-gradient-to-b from-black to-gray-900 overflow-hidden"
        >
            {/* Header */}
            <div className="relative z-10 text-center text-white p-6 mb-12">
                <h1
                    className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
                    style={{
                        color: "#FFFFFF",
                        textShadow: "2px 2px 4px #FAA722, 0 0 25px #FAA722, 0 0 5px #FAA722",
                        fontFamily: "'Playfair Display', serif",
                    }}
                >
                    Twilight Luxe Events Dashboard
                </h1>
                <p
                    className="text-md md:text-lg lg:text-xl italic max-w-2xl mx-auto"
                    style={{ color: "#FAA722", fontFamily: "'Lora', serif'" }}
                >
                    Your elegant command center for unforgettable moments.
                </p>
            </div>

            {/* Dashboard Cards */}
            <div className="relative z-10 w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Guest List Management */}
                <motion.div
                    className="p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
                    style={{
                        background: "linear-gradient(135deg, rgba(250, 167, 34, 0.2), rgba(255, 215, 0, 0.2))",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 215, 0, 0.3)",
                        boxShadow: "0 4px 15px rgba(250, 167, 34, 0.2), inset 0 0 10px rgba(255, 215, 0, 0.1)",
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(250, 167, 34, 0.3)" }}
                >
                    <FaUsers className="text-4xl md:text-5xl mb-4" style={{ color: "#FAA722" }} />
                    <h2
                        className="text-xl md:text-2xl font-bold mb-2"
                        style={{ color: "#FFFFFF", fontFamily: "'Playfair Display', serif'" }}
                    >
                        Guest List
                    </h2>
                    <p className="text-sm md:text-md mb-4" style={{ color: "#FFFFFF", fontFamily: "'Lora', serif'" }}>
                        Total: {dashboardData.guestList.total} | Confirmed: {dashboardData.guestList.confirmed}
                    </p>
                    <Link href="/guestlist">
                        <motion.button
                            className="px-4 py-2 bg-[#FAA722] text-black rounded-md font-bold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Manage Guests
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Gift Tracking */}
                <motion.div
                    className="p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
                    style={{
                        background: "linear-gradient(135deg, rgba(250, 167, 34, 0.2), rgba(255, 215, 0, 0.2))",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 215, 0, 0.3)",
                        boxShadow: "0 4px 15px rgba(250, 167, 34, 0.2), inset 0 0 10px rgba(255, 215, 0, 0.1)",
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(250, 167, 34, 0.3)" }}
                >
                    <FaGift className="text-4xl md:text-5xl mb-4" style={{ color: "#FAA722" }} />
                    <h2
                        className="text-xl md:text-2xl font-bold mb-2"
                        style={{ color: "#FFFFFF", fontFamily: "'Playfair Display', serif'" }}
                    >
                        Gift Tracking
                    </h2>
                    <p className="text-sm md:text-md mb-4" style={{ color: "#FFFFFF", fontFamily: "'Lora', serif'" }}>
                        Received: {dashboardData.gifts.totalReceived} | Thanked: {dashboardData.gifts.thankYouSent}
                    </p>
                    <Link href="/gift-tracking">
                        <motion.button
                            className="px-4 py-2 bg-[#FAA722] text-black rounded-md font-bold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Track Gifts
                        </motion.button>
                    </Link>
                </motion.div>

                {/* RSVP Management */}
                <motion.div
                    className="p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
                    style={{
                        background: "linear-gradient(135deg, rgba(250, 167, 34, 0.2), rgba(255, 215, 0, 0.2))",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 215, 0, 0.3)",
                        boxShadow: "0 4px 15px rgba(250, 167, 34, 0.2), inset 0 0 10px rgba(255, 215, 0, 0.1)",
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(250, 167, 34, 0.3)" }}
                >
                    <FaEnvelope className="text-4xl md:text-5xl mb-4" style={{ color: "#FAA722" }} />
                    <h2
                        className="text-xl md:text-2xl font-bold mb-2"
                        style={{ color: "#FFFFFF", fontFamily: "'Playfair Display', serif'" }}
                    >
                        RSVP Management
                    </h2>
                    <p className="text-sm md:text-md mb-4" style={{ color: "#FFFFFF", fontFamily: "'Lora', serif'" }}>
                        Responded: {dashboardData.rsvps.responded} | Pending: {dashboardData.rsvps.pending}
                    </p>
                    <Link href="/rsvp-management">
                        <motion.button
                            className="px-4 py-2 bg-[#FAA722] text-black rounded-md font-bold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Manage RSVPs
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Event Timeline */}
                <motion.div
                    className="p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
                    style={{
                        background: "linear-gradient(135deg, rgba(250, 167, 34, 0.2), rgba(255, 215, 0, 0.2))",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 215, 0, 0.3)",
                        boxShadow: "0 4px 15px rgba(250, 167, 34, 0.2), inset 0 0 10px rgba(255, 215, 0, 0.1)",
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(250, 167, 34, 0.3)" }}
                >
                    <FaClock className="text-4xl md:text-5xl mb-4" style={{ color: "#FAA722" }} />
                    <h2
                        className="text-xl md:text-2xl font-bold mb-2"
                        style={{ color: "#FFFFFF", fontFamily: "'Playfair Display', serif'" }}
                    >
                        Event Timeline
                    </h2>
                    <p className="text-sm md:text-md mb-4" style={{ color: "#FFFFFF", fontFamily: "'Lora', serif'" }}>
                        Tasks: {dashboardData.timeline.tasks} | Done: {dashboardData.timeline.completed}
                    </p>
                    <Link href="/dashboard/event-timeline">
                        <motion.button
                            className="px-4 py-2 bg-[#FAA722] text-black rounded-md font-bold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Timeline
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="relative z-10 w-full max-w-4xl px-6 mt-12">
                <h3
                    className="text-2xl font-bold text-white mb-4 text-center"
                    style={{ fontFamily: "'Playfair Display', serif'" }}
                >
                    Quick Actions
                </h3>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Link href="/dashboard/guest-list">
                        <motion.button
                            className="px-6 py-3 bg-[#FFD700] text-black rounded-md font-bold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Add Guest
                        </motion.button>
                    </Link>
                    <Link href="/dashboard/gift-tracking">
                        <motion.button
                            className="px-6 py-3 bg-[#FFD700] text-black rounded-md font-bold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Log Gift
                        </motion.button>
                    </Link>
                    <Link href="/dashboard/rsvp-management">
                        <motion.button
                            className="px-6 py-3 bg-[#FFD700] text-black rounded-md font-bold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Send Reminder
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 z-10 text-center">
                <p
                    className="text-sm italic"
                    style={{ color: "#FAA722", fontFamily: "'Lora', serif'" }}
                >
                    Crafted with Luxe Precision for Your Special Moments
                </p>
            </div>
        </motion.section>
    )
}

export default MainDashboard