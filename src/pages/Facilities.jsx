import React from "react";
import { motion } from "framer-motion";

const FacilitiesPage = () => {
    const facilities = [
        {
            title: "Science Laboratory",
            description:
                "Well-equipped laboratories designed for practical experiments, observation, and scientific learning.",
            image: "/images/Facilities/lab.jpeg",
            alt: "Well-equipped school science laboratory",
        },
        {
            title: "Physics Laboratory",
            description:
                "Dedicated practical space with instruments and seating arranged for hands-on physics activities.",
            image: "/images/Facilities/WhatsApp Image 2026-05-26 at 2.04.13 PM.jpeg",
            alt: "School physics laboratory with practical equipment",
        },
        {
            title: "Chemistry Laboratory",
            description:
                "Organized lab benches, apparatus, and safety resources support guided chemistry experiments.",
            image: "/images/Facilities/WhatsApp Image 2026-05-26 at 2.04.13 PM (1).jpeg",
            alt: "School chemistry laboratory with experiment tables",
        },
        {
            title: "Activity Room",
            description:
                "A creative activity space where students explore art, language, teamwork, and classroom projects.",
            image: "/images/Facilities/WhatsApp Image 2026-05-26 at 2.04.12 PM (1).jpeg",
            alt: "School activity room with learning materials",
        },
        {
            title: "Creative Display Area",
            description:
                "Student work and theme-based displays encourage creativity, expression, and active participation.",
            image: "/images/Facilities/events.jpeg",
            alt: "Student creative display board at school",
        },
        {
            title: "Art and Language Corner",
            description:
                "Colorful learning displays help students build vocabulary, confidence, and creative expression.",
            image: "/images/Facilities/WhatsApp Image 2026-05-26 at 2.04.14 PM (1).jpeg",
            alt: "Colorful art and language display board",
        },
        {
            title: "Music Room",
            description:
                "A dedicated music room with instruments for rhythm, vocal practice, and cultural activities.",
            image: "/images/Facilities/sport.jpeg",
            alt: "School music room with instruments",
        },
        {
            title: "Seminar Hall",
            description:
                "A spacious hall for presentations, workshops, guest sessions, and academic activities.",
            image: "/images/Facilities/seminar hall.jpeg",
            alt: "School seminar hall with seating",
        },
        {
            title: "Welcoming Learning Spaces",
            description:
                "Bright and welcoming spaces create a warm environment for young learners throughout the campus.",
            image: "/images/Facilities/WhatsApp Image 2026-05-26 at 2.04.13 PM (2).jpeg",
            alt: "Welcoming school learning space",
        },
    ];

    return (
        <div className="pt-20">

            {/* HERO SECTION */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-900 text-white py-20">
                <div className="container-custom text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl font-bold mb-4"
                    >
                        Our School Facilities
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-lg max-w-2xl mx-auto opacity-90"
                    >
                        Providing safe, modern and high-quality learning environments for holistic student development.
                    </motion.p>
                </div>
            </section>

            {/* FACILITIES GRID */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">

                    <h2 className="text-4xl font-bold text-center text-primary mb-12">
                        Facilities That Support Excellence
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {facilities.map((facility, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-100"
                            >
                                {/* Image */}
                                <div className="overflow-hidden rounded-xl mb-4">
                                    <img
                                        src={facility.image}
                                        alt={facility.alt}
                                        loading="lazy"
                                        className="w-full h-48 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-primary mb-2">
                                    {facility.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-700 leading-relaxed">
                                    {facility.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default FacilitiesPage;
