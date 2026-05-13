import React from "react";
import { motion } from "framer-motion";

const FacilitiesPage = () => {
    const facilities = [
        {
            title: "Smart Classrooms",
            description:
                "Digitally equipped classrooms with smart boards, projectors, and interactive learning tools for better understanding.",
            image: "/facilities/Classroom_1.jpg",
            alt: "Smart digital classroom with projector and students",
        },
        {
            title: "Science Laboratories",
            description:
                "Well-maintained Physics, Chemistry, and Biology labs designed for practical experiments and scientific learning.",
            image: "/facilities/laboratory_lab.jpg",
            alt: "Students performing experiments in modern science laboratory",
        },
        {
            title: "Computer Lab",
            description:
                "Advanced computer lab with high-speed internet and updated software to enhance digital skills.",
            image: "/facilities/computer_lab.jpg",
            alt: "Computer lab with multiple desktops and students working",
        },
        {
            title: "Library",
            description:
                "A peaceful library with academic books, reference materials, and digital study resources for all classes.",
            image: "/facilities/Library.jpg",
            alt: "School library with bookshelves and reading space",
        },
        {
            title: "Sports & Playground",
            description:
                "Large playground for football, cricket, athletics, yoga, and other physical activities promoting overall growth.",
            image: "/facilities/sport1.jpg",
            alt: "Students playing sports on large school playground",
        },
        {
            title: "Transportation",
            description:
                "Safe and reliable bus service with GPS tracking system and trained staff ensuring comfortable travel.",
            image: "/facilities/bus1.jpg",
            alt: "School bus transportation facility",
        },
        {
            title: "CCTV Surveillance",
            description:
                "24/7 CCTV monitoring ensuring complete safety and security for every student on the school campus.",
            image: "/facilities/cctv.png",
            alt: "CCTV cameras installed for school security",
        },
        {
            title: "Clean Drinking Water",
            description:
                "RO + UV purified drinking water facility available throughout the school for safe hydration.",
            image: "/facilities/drinking_water.jpeg",
            alt: "Clean RO water facility in school",
        },
        {
            title: "Medical Room",
            description:
                "Dedicated medical room with first-aid support supervised by trained staff for emergencies.",
            image: "/facilities/wellness.jpg",
            alt: "School medical room with first aid kits",
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
