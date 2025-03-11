"use client"

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion"

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#DD335C"]

const WelcomePage = () => {
    const welcomeRef = useRef(null);
    const color = useMotionValue(COLORS_TOP[0]);

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        })
    }, [color])

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`

    return (
        <motion.section
            id="welcome"
            ref={welcomeRef}
            className="relative min-h-screen w-full flex items-center justify-center flex-col overflow-hidden"
            style={{
                backgroundImage,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30 from-black/75 via-black/50 to-black/0 bg-gradient-to-b"></div>

            {/* Main Content */}
            <div className="relative z-10 text-center text-white p-6 flex flex-col items-center justify-center">
                {/* Logo / Title */}
                <h1
                    className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-10"
                    style={{
                        color: "#FFFFFF",
                        textShadow: "2px 2px 4px #FAA722, 0 0 25px #FAA722, 0 0 5px #FAA722",
                        fontFamily: "'Playfair Display', serif",
                    }}
                >
                    Welcome to Twilight Luxe Events
                </h1>

                {/* Tagline */}
                <h3
                    className="text-lg md:text-2xl lg:text-4xl mb-4 md:mb-6 max-w-2xl"
                    style={{
                        color: "#FFFFFF",
                        fontFamily: "'Lora', serif",
                    }}
                >
                    Orchestrate Your Perfect Day with Elegance and Ease.
                </h3>

                {/* Description */}
                <p
                    className="text-md md:text-lg lg:text-xl italic mb-8 md:mb-12 max-w-3xl"
                    style={{
                        color: "#FAA722",
                        fontFamily: "'Lora', serif",
                    }}
                >
                    Effortlessly manage your guests and gifts with our luxurious, all-in-one software—crafted to make every moment unforgettable.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-primary text-accent text-lg md:text-xl rounded-md font-bold shadow-lg"
                        style={{
                            backgroundColor: "#FAA722",
                            color: "#000000",
                        }}
                    >
                        <Link href="/dashboard">Get Started</Link>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-accent text-primary text-lg md:text-xl rounded-md font-bold shadow-lg"
                        style={{
                            backgroundColor: "#FFFFFF",
                            color: "#FAA722",
                        }}
                    >
                        <Link href="/features">Explore Features</Link>
                    </motion.button>
                </div>
            </div>

            {/* Decorative Element - Subtle Animation */}
            <motion.div
                className="absolute bottom-10 left-0 right-0 z-10 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <p
                    className="text-sm md:text-md italic"
                    style={{
                        color: "#FAA722",
                        fontFamily: "'Lora', serif",
                    }}
                >
                    Designed with Luxe Precision for Your Special Moments
                </p>
            </motion.div>

            {/* Partners or Features Teaser (Optional) */}
            <div className="absolute bottom-0 left-0 w-full h-[15%] bg-opacity-80 bg-black z-10 flex flex-row justify-around items-center">
                <div className="text-accent font-black text-md md:text-lg" style={{ color: "#FAA722" }}>
                    Guest Lists
                </div>
                <div className="text-accent font-black text-md md:text-lg" style={{ color: "#FAA722" }}>
                    Gift Tracking
                </div>
                <div className="text-accent font-black text-md md:text-lg" style={{ color: "#FAA722" }}>
                    RSVP Management
                </div>
            </div>
        </motion.section>
    )
}

export default WelcomePage