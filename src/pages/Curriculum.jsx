import { motion } from "framer-motion";
import React from "react";
import { BookOpen, Users, GraduationCap, Lightbulb } from "lucide-react";

const Curriculum = () => {
  const programs = [
    {
      name: "Early Years Programme (EYP)",
      grade: "Nursery – KG",
      description:
        "A nurturing foundation that builds curiosity, imagination, and early learning readiness through play-based and joyful exploration.",
      focus: [
        "Play-based learning",
        "Social & emotional growth",
        "Early literacy & numeracy",
        "Creative expression"
      ],
      Icon: Users
    },
    {
      name: "Primary Years Programme (PYP)",
      grade: "Class I – V",
      description:
        "Developing core academic strength with inquiry-based learning and real-world application, helping students become confident learners.",
      focus: [
        "Inquiry-based learning",
        "Foundational academic skills",
        "Communication & teamwork",
        "Critical thinking"
      ],
      Icon: BookOpen
    },
    {
      name: "Middle Years Programme (MYP)",
      grade: "Class VI – X",
      description:
        "Preparing students for board examinations with advanced concepts, research capability, and independent learning methodology.",
      focus: [
        "Board exam preparation",
        "Research & analytical skills",
        "Practical applications",
        "Subject specialization"
      ],
      Icon: GraduationCap
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-tr from-primary to-blue-700 text-white py-24 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container-custom text-center relative z-10"
        >
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            A Future-Ready Curriculum for Excellence
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            From foundational learning to advanced academics, our programs are
            designed to prepare students for success in school, life, and beyond.
          </p>
        </motion.div>
      </section>

      {/* Programs Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom space-y-14">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-10 items-center`}
            >
              {/* Text Content */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-primary mb-2">
                  {program.name}
                </h2>
                <p className="text-xl text-gray-600 mb-4 font-medium">
                  {program.grade}
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  {program.description}
                </p>

                <h3 className="font-semibold text-primary mb-3 text-lg">
                  Key Focus Areas
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                  {program.focus.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-primary mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Icon Illustrations instead of image */}
              <div className="flex-1 flex justify-center">
                <div className="bg-white p-10 rounded-2xl shadow-xl max-w-sm w-full text-center border border-gray-200 hover:shadow-2xl transition">
                  <program.Icon className="w-24 h-24 mx-auto mb-4 text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-4xl font-extrabold text-primary mb-12"
          >
            Why Our Curriculum Stands Out
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Holistic Development", description: "Balanced focus on academics, sports & emotional growth" },
              { title: "Technology-Enabled Learning", description: "Smart classrooms & interactive digital tools" },
              { title: "Continuous Evaluation", description: "Comprehensive and progressive assessment system" },
              { title: "Extracurricular Excellence", description: "Arts, sports & cultural enrichment programs" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white to-gray-100 shadow-lg hover:shadow-2xl text-center transition"
              >
                <h3 className="text-xl font-bold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Curriculum;
