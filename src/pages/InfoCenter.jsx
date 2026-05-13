import { useState } from "react";
import { motion } from "framer-motion";

const InfoCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the admission process at Sanskruti Techno School?",
      answer:
        "Our admission process includes Inquiry and school visit, Application submission, Interaction and assessment session, and Confirmation of enrollment upon document verification and fee submission. Our admissions team provides complete support at every step.",
    },
    {
      question: "What extracurricular opportunities are available?",
      answer:
        "We offer a wide range of extracurricular programs including sports, performing arts, music, dance, yoga, robotics, STEM learning, cultural activities, public speaking, and personality development programs.",
    },
    {
      question: "What is the student–teacher ratio?",
      answer:
        "We maintain an ideal student–teacher ratio of 25–30 students per class to ensure individual attention and personalized learning support.",
    },
    {
      question: "Which curriculum does the school follow?",
      answer:
        "Sanskruti Techno School follows a progressive and technology-enabled curriculum aligned with National Education Policies and international standards, focusing on conceptual learning, practical exposure, skill building, sports, and value-based education.",
    },
    {
      question: "Does the school provide transportation?",
      answer:
        "Yes, we provide safe and reliable bus transportation facilities covering multiple routes. Each bus is GPS-enabled and supervised by trained staff for student safety.",
    },
    {
      question: "What facilities are available inside the campus?",
      answer:
        "Our campus includes smart classrooms, modern laboratories, computer & robotics labs, a digital library, sports complex, playgrounds, CCTV-enabled safety environment, and medical assistance facilities.",
    },
    {
      question: "Are scholarships available?",
      answer:
        "Yes. We provide merit-based scholarships for deserving students based on academic performance and talent achievements. Please contact our admissions office for details.",
    },
    {
      question: "How does the school support competitive learning?",
      answer:
        "We provide extra academic training, Olympiad preparation, skill development workshops, and special coaching for scholarship and competitive exam readiness.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-20">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-900 to-black text-white py-20">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold mb-5"
          >
            Info Center
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto opacity-95 leading-relaxed"
          >
            Explore essential information, frequently asked questions, and key
            details about <strong>Sanskruti Techno School</strong>. We are committed
            to transparency and providing parents and students the guidance they need.
          </motion.p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-extrabold text-blue-700 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get to know more about Sanskruti Techno School and our academic environment.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-lg text-gray-800 pr-4">
                    {faq.question}
                  </span>
                  <motion.svg
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 text-blue-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-gray-50 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoCenter;
