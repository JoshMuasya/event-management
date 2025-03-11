"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion"

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#DD335C"]

const FeaturesPage = () => {
    const color = useMotionValue(COLORS_TOP[0])

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        })
    }, [color])

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`

    // Feature Data
    const features = [
        {
            title: "Guest List Management",
            description: "Effortlessly organize your guest list with real-time updates, RSVP tracking, and personalized invitations—all in one elegant interface.",
            icon: "👥", // Replace with SVG/image
        },
        {
            title: "Gift Tracking",
            description: "Keep tabs on every gift with style. Log sender details, categorize items, and send thank-you notes directly from the platform.",
            icon: "🎁",
        },
        {
            title: "RSVP Management",
            description: "Streamline responses with automated reminders and a sleek dashboard to monitor attendance at a glance.",
            icon: "✉️",
        },
        {
            title: "Event Timeline",
            description: "Plan every moment with a customizable timeline, ensuring your event unfolds with flawless precision.",
            icon: "⏳",
        },
    ]

    return (
        <motion.section
            id="features"
            className="relative min-h-screen w-full flex flex-col items-center justify-start py-16 overflow-hidden"
            style={{
                backgroundImage,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30 from-black/75 via-black/50 to-black/0 bg-gradient-to-b"></div>

            {/* Header */}
            <div className="relative z-10 text-center text-white p-6 mb-12">
                <h1
                    className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4"
                    style={{
                        color: "#FFFFFF",
                        textShadow: "2px 2px 4px #FAA722, 0 0 25px #FAA722, 0 0 5px #FAA722",
                        fontFamily: "'Playfair Display', serif",
                    }}
                >
                    Features of Twilight Luxe Events
                </h1>
                <p
                    className="text-md md:text-lg lg:text-xl italic max-w-2xl mx-auto"
                    style={{
                        color: "#FAA722",
                        fontFamily: "'Lora', serif",
                    }}
                >
                    Discover the tools that transform your event into a masterpiece of elegance and efficiency.
                </p>
            </div>

            {/* Features Grid */}
            <div className="relative z-10 w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
                        style={{
                            background: "linear-gradient(135deg, rgba(250, 167, 34, 0.2), rgba(255, 215, 0, 0.2))", // Gold to Champagne Gold gradient
                            backdropFilter: "blur(10px)", // Glassy blur effect
                            border: "1px solid rgba(255, 215, 0, 0.3)", // Subtle Champagne Gold border
                            boxShadow: "0 4px 15px rgba(250, 167, 34, 0.2), inset 0 0 10px rgba(255, 215, 0, 0.1)", // Outer glow and inner highlight
                        }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ 
                            scale: 1.03,
                            boxShadow: "0 6px 20px rgba(250, 167, 34, 0.3), inset 0 0 15px rgba(255, 215, 0, 0.2)", // Enhanced glow on hover
                        }}
                    >
                        {/* Icon */}
                        <div
                            className="text-4xl md:text-5xl mb-4"
                            style={{ color: "#FAA722" }}
                        >
                            {feature.icon}
                        </div>

                        {/* Title */}
                        <h2
                            className="text-xl md:text-2xl font-bold mb-2"
                            style={{
                                color: "#FFFFFF",
                                fontFamily: "'Playfair Display', serif",
                            }}
                        >
                            {feature.title}
                        </h2>

                        {/* Description */}
                        <p
                            className="text-sm md:text-md lg:text-lg"
                            style={{
                                color: "#FFFFFF",
                                fontFamily: "'Lora', serif",
                            }}
                        >
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Call to Action */}
            <motion.div
                className="relative z-10 mt-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-primary text-accent text-lg md:text-xl rounded-md font-bold shadow-lg"
                    style={{
                        backgroundColor: "#FAA722",
                        color: "#000000",
                    }}
                >
                    <Link href="/dashboard">Start Planning Now</Link>
                </motion.button>
            </motion.div>

            {/* Footer Note */}
            <div className="absolute bottom-4 left-0 right-0 z-10 text-center">
                <p
                    className="text-sm italic"
                    style={{
                        color: "#FAA722",
                        fontFamily: "'Lora', serif",
                    }}
                >
                    Crafted with Luxe Precision for Unforgettable Moments
                </p>
            </div>
        </motion.section>
    )
}

export default FeaturesPage