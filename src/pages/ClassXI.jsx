import { motion } from "framer-motion";

const ClassXI = () => {
  const syllabus = {
    science: {
      title: "Science Stream Syllabus",
      items: [
        "Physics: Measurements, Motion, Gravitation, Heat, Electricity, Modern Physics",
        "Chemistry: Atomic Structure, Chemical Bonding, Organic Chemistry, Periodic Table",
        "Mathematics: Algebra, Trigonometry, Calculus, Coordinate Geometry, Statistics",
        "Biology: Cell Biology, Genetics, Plant Physiology, Human Physiology",
        "Computer Science: Programming, Python, Data Handling, Algorithms",
      ],
    },
    commerce: {
      title: "Commerce Stream Syllabus",
      items: [
        "Economics: Micro & Macro Economics, Indian Economy",
        "Accountancy: Accounting Principles, Journal, Ledger, Trial Balance",
        "Business Studies: Business Environment, Management Principles",
        "Mathematics: Statistics, Probability, Commercial Math",
      ],
    },
    arts: {
      title: "Arts Stream Syllabus",
      items: [
        "History: Ancient to Modern History",
        "Political Science: Constitution, Government Systems",
        "Geography: Physical Geography, India Geography",
        "Psychology: Human Behaviour, Personality, Learning",
      ],
    },
  };

  const facilities = [
    {
      title: "Smart Classrooms",
      text: "Modern classrooms equipped with digital boards for smart and interactive learning.",
      image: "/images/facilities/classroom.jpg",
    },
    {
      title: "Science Laboratories",
      text: "Advanced Physics, Chemistry, and Biology labs for hands-on experiments.",
      image: "/images/facilities/lab.jpg",
    },
    {
      title: "Computer Lab",
      text: "High-speed computers with updated software for practical learning.",
      image: "/images/facilities/computer.jpg",
    },
    {
      title: "Library",
      text: "Well-organized library with reference books, study materials, and digital resources.",
      image: "/images/facilities/library.jpg",
    },
    {
      title: "Sports & Playground",
      text: "Large playground for physical activities, sports, fitness, and training.",
      image: "/images/facilities/playground.jpg",
    },
    {
      title: "Transportation",
      text: "Safe, reliable school transport for students across all major routes.",
      image: "/images/facilities/bus.jpg",
    },
  ];

  return (
    <div className="pt-20">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-blue-800 text-white py-20">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-4"
          >
            Class XI - Academics & Syllabus
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto opacity-90"
          >
            Complete academic overview including syllabus, subjects, facilities, and student activities.
          </motion.p>
        </div>
      </section>

      {/* SYLLABUS SECTION */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-primary mb-10 text-center"
          >
            Class XI Syllabus
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.keys(syllabus).map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-50 p-6 rounded-xl shadow-md"
              >
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  {syllabus[key].title}
                </h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  {syllabus[key].items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMIC HIGHLIGHTS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-primary mb-10 text-center"
          >
            Academic Highlights
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Faculty",
                text: "Highly qualified teachers for all subjects with years of experience.",
              },
              {
                title: "Regular Assessments",
                text: "Unit tests, mid-terms, finals and practice exams.",
              },
              {
                title: "Digital Learning",
                text: "Smart classrooms, e-learning modules, and recorded lectures.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ FACILITIES SECTION */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-primary mb-10 text-center"
          >
            School Facilities
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {facility.title}
                </h3>
                <p className="text-gray-700">{facility.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ClassXI;
