import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const facultyData = [
    // ⭐ PRINCIPAL FIRST
    {
        name: "Nisha Padmanaban",
        role: "Principal",
        qualification: "M.A, B.Ed, PGDBA",
        experience: "25 years",
        photo: "/faculty/nisha_padmanaban.jpg",
    },

    // ⭐ TEACHERS
    {
        name: "Nisha Nagare",
        role: "Teacher",
        qualification: "B.A, TTC ECCE, B.Ed pursuing",
        experience: "7 years",
        photo: "/faculty_member/nisha.JPG",
    },
    {
        name: "Neelima Surendra Kamavaram",
        role: "Teacher",
        qualification: "BE (E&TC)",
        experience: "3 years",
        photo: "/faculty_member/neelima.JPG",
    },
    {
        name: "Rajshri Sandeep Pawar",
        role: "Teacher",
        qualification: "B.A, D.T.Ed, B.Ed",
        experience: "10 years",
        photo: "/faculty_member/rajsharee.JPG",
    },
    {
        name: "Varsha Chetan Patil",
        role: "Teacher",
        qualification: "M.A, B.Ed, CTET",
        experience: "6 years",
        photo: "/faculty_member/varsha.JPG",
    },
    // {
    //     name: "Priyanka Jalgi",
    //     role: "Teacher",
    //     qualification: "B.Com",
    //     experience: "3 years",
    //     photo: "/faculty_member/",
    // },
    {
        name: "Kirti Golatkar Gorakh",
        role: "Teacher",
        qualification:
            "B.Sc (Mumbai), PG Management (Mumbai), NLP Coach, Yoga Teacher",
        experience: "Training, Coaching & Teaching",
        photo: "/faculty_member/kirti.JPG",
    },
    // {
    //     name: "Sanket Ajay Zambare",
    //     role: "Teacher",
    //     qualification: "BPES",
    //     experience: "5 years",
    //     photo: "/faculty_member/",
    // },
    {
        name: "Kavita Shashikant Pawar",
        role: "Teacher",
        qualification: "M.A Vocal, Tabla Visharad, B.A English",
        experience: "8 years",
        photo: "/faculty_member/kavita.JPG",
    },

    // ⭐ ASSISTANT TEACHERS
    // {
    //     name: "Arwind Bapurao Gaikwad",
    //     role: "Asst. Teacher",
    //     qualification: "MA NET",
    //     experience: "6 years",
    //     photo: "/faculty_member/nisha.JPG",
    // },
    {
        name: "Rupali Kiran Shete",
        role: "Asst. Teacher",
        qualification: "B.Com, T.T.C",
        experience: "10 years",
        photo: "/faculty_member/rupali.jpg",
    },
    {
        name: "Amruta Kiran Kadam",
        role: "Asst. Teacher",
        qualification: "HSC, Montessori Course",
        experience: "4 years",
        photo: "/faculty_member/amruta.jpg",
    },
    {
        name: "Piyali Sen",
        role: "Asst. Teacher",
        qualification: "B.A and TTC",
        experience: "4 years",
        photo: "/faculty_member/piyali.jpg",
    },
    {
        name: "Sarmistha Prusty",
        role: "Asst. Teacher",
        qualification: "MA B.Ed",
        experience: "1 year",
        photo: "/faculty_member/sarmitsta.JPG",
    },
    {
        name: "Aparna Nimbalkar",
        role: "Asst. Teacher",
        qualification: "MSc (Computer Science)",
        experience: "2 years in IT",
        photo: "/faculty_member/arpana.jpg",
    },
    {
        name: "Nikita Pravin Dhumal",
        role: "Asst. Teacher",
        qualification: "MSc in Statistics",
        experience: "3 years",
        photo: "/faculty_member/nikita.JPG",
    },
    {
        name: "Sharmila Pal",
        role: "Asst. Teacher",
        qualification: "Graduated and D.Ed",
        experience: "4 years",
        photo: "/faculty_member/sharmila.JPG",
    },
];

export default function FacultyPage() {
    return (
        <>
            {/* SEO HEADERS */}
            <Helmet>
                <title>Faculty | Sankruti Techno School</title>
                <meta
                    name="description"
                    content="Meet the qualified and experienced faculty members of Sankruti Techno School. Our teachers are dedicated to shaping the future with quality education."
                />
                <meta name="keywords" content="School Faculty, Teachers, Staff, Education, Sankruti Techno School" />
                <meta name="robots" content="index, follow" />
            </Helmet>

            {/* ⭐ PAGE CONTAINER (Fixes Navbar Overlap) */}
            <div className="pt-20">
                {/* Adjust this value if your navbar height is bigger/smaller */}

                {/* ⭐ HERO SECTION */}
                <section className="bg-gradient-to-br from-primary via-blue-600 to-blue-800 text-white py-20">
                    <div className="container-custom text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl font-bold mb-4"
                        >
                            Meet Our Dedicated Faculty
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl max-w-3xl mx-auto opacity-90"
                        >
                            Our experienced teachers bring passion, expertise, and commitment to nurture every child’s growth.
                        </motion.p>
                    </div>
                </section>

                {/* ⭐ FACULTY GRID */}
                <section className="container mx-auto py-12 px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {facultyData.map((teacher, index) => (
                            <article
                                key={index}
                                className="bg-white hover:shadow-2xl transition rounded-2xl p-6 text-center border border-gray-100"
                                itemScope
                                itemType="https://schema.org/Person"
                            >
                                <img
                                    src={teacher.photo || "https://via.placeholder.com/150?text=No+Photo"}
                                    alt={teacher.name}
                                    loading="lazy"
                                    className="w-32 h-32 object-cover object-top rounded-full mx-auto shadow mb-4"
                                    itemProp="image"
                                />

                                <h2 className="text-xl font-semibold" itemProp="name">
                                    {teacher.name}
                                </h2>

                                <p className="text-blue-600 font-medium" itemProp="jobTitle">
                                    {teacher.role}
                                </p>

                                <p className="mt-2 text-sm text-gray-700" itemProp="description">
                                    {teacher.qualification}
                                </p>

                                <p className="text-sm font-medium mt-1 text-gray-900">
                                    Experience:{" "}
                                    <span itemProp="experience">{teacher.experience}</span>
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

            </div>
        </>
    );
}