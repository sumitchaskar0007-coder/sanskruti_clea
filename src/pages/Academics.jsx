import { useState } from "react";
import { motion } from "framer-motion";

const Academics = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleBox = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const classes = [
        {
            title: "Nursery",
            description: "Foundational learning through play, creativity and sensory development.",
            syllabus: [
                "English",
                "Hindi",
                "Maths",
                "EVS",
            ],
            more: [
                "Focus on curiosity-based learning",
                "Hand-eye coordination enhancement",
                "Social and emotional skill building",
            ],
        },
        {
            title: "LKG (Jr. KG)",
            description: "Early academic framework with language, numbers and creative activities.",
            syllabus: [
                "English",
                "Hindi",
                "Maths",
                "EVS",
            ],
            more: [
                "Development of listening skills",
                "Building confidence in communication",
                "Group learning and teamwork",
            ],
        },
        {
            title: "UKG (Sr. KG)",
            description: "Preparatory curriculum for primary schooling with structured learning.",
            syllabus: [
                "English",
                "Hindi",
                "Maths",
                "EVS",
            ],
            more: [
                "School readiness building",
                "Creative thinking encouragement",
                "Concept-based learning approach",
            ],
        },
        {
            title: "Class 1",
            description: "Introduction to structured academics with foundational subjects.",
            syllabus: [
                "English",
                "Hindi / German",
                "Marathi",
                "Maths",
                "EVS",
                "Computer",
            ],
            more: [
                "Focus on reading fluency",
                "Developing basic numeracy skills",
                "Activity-based learning",
            ],
        },
        {
            title: "Class 2",
            description: "Strengthening core concepts in all subjects.",
            syllabus: [
                "English",
                "Hindi / German",
                "Marathi",
                "Maths",
                "EVS",
                "Computer",
            ],
            more: [
                "Logical thinking improvement",
                "Communication skill enhancement",
                "Confidence-building activities",
            ],
        },
        {
            title: "Class 3",
            description: "Conceptual learning with applied activities.",
            syllabus: [
                "English",
                "Hindi / German",
                "Marathi",
                "Maths",
                "Science",
                "Social Studies (SST)",
                "Computer",
            ],
            more: [
                "Critical thinking development",
                "More structured assignments",
                "Stronger academic foundation",
            ],
        },
        {
            title: "Class 4",
            description: "Enhanced curriculum focusing on reasoning and knowledge expansion.",
            syllabus: [
                "English",
                "Hindi / German",
                "Marathi",
                "Maths",
                "Science",
                "Social Studies (SST)",
                "Computer",
            ],
            more: [
                "Improved problem-solving",
                "Interactive classroom learning",
                "Focus on discipline & routine",
            ],
        },
        {
            title: "Class 5",
            description: "Transition stage preparing for middle school.",
            syllabus: [
                "English",
                "Hindi / German",
                "Marathi",
                "Maths",
                "Science",
                "Social Studies (SST)",
                "Computer",
            ],
            more: [
                "Stronger reading & writing skills",
                "Awareness-building activities",
                "Team projects",
            ],
        },
        {
            title: "Class 6",
            description: "NCERT-aligned curriculum with deeper subject understanding.",
            syllabus: [
                "English",
                "Hindi / German",
                "Marathi",
                "Maths",
                "Science",
                "Social Studies (SST)",
                "Computer",
            ],
            more: [
                "Developing analytical skills",
                "Introduction to scientific thinking",
                "Balanced academic growth",
            ],
        },
        {
            title: "Class 7",
            description: "Strengthening reasoning, logic and subject knowledge.",
            syllabus: [
                "English",
                "Hindi / German",
                "Marathi",
                "Maths",
                "Science",
                "Social Studies (SST)",
                "Computer",
            ],
            more: [
                "Strong analytical foundation",
                "Enhanced writing skills",
                "Experimental learning",
            ],
        },
        {
            title: "Class 8",
            description: "Preparation for high school subjects with foundation building.",
            syllabus: [
                "English",
                "Hindi / German",
                "Marathi",
                "Maths",
                "Science",
                "Social Studies (SST)",
                "Computer",
            ],
            more: [
                "Board readiness foundation",
                "Confidence in independent study",
                "Project-based assignments",
            ],
        },
        {
            title: "Class 9",
            description: "Introduction to board-level structure with conceptual depth.",
            syllabus: [
                "English",
                "Hindi / German",
                "Marathi",
                "Maths",
                "Science",
                "Social Studies (SST)",
                "IT",
            ],
            more: [
                "Strong board foundation",
                "Structured exam preparation",
                "Advanced conceptual learning",
            ],
        },
        {
            title: "Class 10",
            description: "Board exam-focused curriculum with complete academic support.",
            syllabus: [
                "English",
                "Hindi / German",
                "Marathi",
                "Maths",
                "Science",
                "Social Studies (SST)",
                "IT",
            ],
            more: [
                "Mock tests & practice papers",
                "Special doubt-solving sessions",
                "Focus on scoring strategy",
            ],
        },
    ];
    const activities = [
        {
            title: "Laboratory Workshops",
            description: "Hands-on lab activities in Physics, Chemistry, Biology, and Computer Science.",
        },
        {
            title: "Educational Field Trips",
            description: "Visits to science centers, industries, and environmental sites.",
        },
        {
            title: "Sports & Fitness",
            description: "Regular sports, yoga sessions, competitions and fitness assessments.",
        },
        {
            title: "Cultural Activities",
            description: "Annual events, debates, singing, dancing, and drama competitions.",
        },
        {
            title: "Career Guidance Sessions",
            description: "Workshops for competitive exam planning, goal setting and higher education.",
        },
    ]

    return (
        <div className="pt-24">

            {/* HERO SECTION */}
            <section className="bg-blue-700 text-white py-20 text-center">
                <h1 className="text-5xl font-bold mb-4">Academics & Syllabus</h1>
                <p className="text-xl max-w-3xl mx-auto opacity-90">
                    Complete academic overview including syllabus, subjects, facilities, and student activities.
                </p>
            </section>

            {/* TWO COLUMN SECTION */}
            <section className="py-16 bg-white">
                <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* LEFT SIDE – CLASS LIST */}
                    <div className="md:col-span-2 space-y-6">
                        {classes.map((item, index) => (
                            <motion.div
                                key={index}
                                className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-all"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-semibold text-primary">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-700 mt-1">{item.description}</p>
                                    </div>

                                    <button
                                        onClick={() => toggleBox(index)}
                                        className="text-primary font-semibold text-lg hover:underline"
                                    >
                                        {openIndex === index ? "–" : "+"}
                                    </button>
                                </div>

                                {openIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-4 bg-white p-5 rounded-lg border"
                                    >
                                        <h4 className="text-lg font-bold text-primary mb-2">
                                            📘 Syllabus:
                                        </h4>
                                        <ul className="list-disc ml-6 text-gray-700 mb-4">
                                            {item.syllabus.map((s, i) => (
                                                <li key={i}>{s}</li>
                                            ))}
                                        </ul>

                                        <h4 className="text-lg font-bold text-primary mb-2">
                                            ⭐ Additional Highlights:
                                        </h4>
                                        <ul className="list-disc ml-6 text-gray-700">
                                            {item.more.map((m, i) => (
                                                <li key={i}>{m}</li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* RIGHT SIDE – EXTRA ACADEMIC INFORMATION */}
                    <div className="space-y-8">

                        {/* Overview */}
                        <div className="p-6 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                            <h3 className="text-2xl font-bold text-blue-700 mb-3">Academic Overview</h3>
                            <p className="text-gray-700">
                                Our academic program is carefully designed to provide a balanced combination
                                of knowledge, skill development, discipline, and creativity. Each class
                                follows a structured curriculum aligned with NEP and NCERT standards.
                            </p>
                        </div>

                        {/* Teaching Methods */}
                        <div className="p-6 bg-green-50 rounded-xl border-l-4 border-green-600">
                            <h3 className="text-2xl font-bold text-green-700 mb-3">Teaching Methods</h3>
                            <ul className="list-disc ml-6 text-gray-700">
                                <li>Activity-Based Learning</li>
                                <li>Concept-driven approach</li>
                                <li>Smart Classroom Integration</li>
                                <li>Hands-on Experiments & Projects</li>
                                <li>Continuous Assessment System</li>
                            </ul>
                        </div>

                        {/* Facilities */}
                        <div className="p-6 bg-yellow-50 rounded-xl border-l-4 border-yellow-600">
                            <h3 className="text-2xl font-bold text-yellow-700 mb-3">School Facilities</h3>
                            <ul className="list-disc ml-6 text-gray-700">
                                <li>Well-equipped digital classrooms</li>
                                <li>Science & Computer Lab</li>
                                <li>Library with curriculum books</li>
                                <li>Playground & sports area</li>
                                <li>Clean & safe campus environment</li>
                            </ul>
                        </div>

                        {/* Mission */}
                        <div className="p-6 bg-purple-50 rounded-xl border-l-4 border-purple-600">
                            <h3 className="text-2xl font-bold text-purple-700 mb-3">Our Mission</h3>
                            <p className="text-gray-700">
                                To develop confident, disciplined, and responsible individuals capable of
                                contributing positively to society while excelling academically.
                            </p>
                        </div>

                        {/* Achievements */}
                        <div className="p-6 bg-red-50 rounded-xl border-l-4 border-red-600">
                            <h3 className="text-2xl font-bold text-red-700 mb-3">Achievements</h3>
                            <ul className="list-disc ml-6 text-gray-700">
                                <li>Excellent board results every year</li>
                                <li>High participation in competitions & Olympiads</li>
                                <li>Strong academic performance across classes</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold text-primary mb-10 text-center"
                    >
                        Student Activities
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activities.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-md"
                            >
                                <h3 className="text-xl font-semibold text-primary mb-3">{activity.title}</h3>
                                <p className="text-gray-700">{activity.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Academics;
