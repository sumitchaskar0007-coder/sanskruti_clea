import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

/* ---------------- COUNTER COMPONENT ---------------- */
const Counter = ({ value, startCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCount) return;
    let start = 0;
    const numeric = parseInt(String(value).replace(/[^0-9]/g, "")) || 0;
    const durationSec = 2; // total duration in seconds
    const frames = durationSec * 60; // approx 60fps
    const increment = numeric / frames;
    const timer = setInterval(() => {
      start += increment;
      if (start >= numeric) {
        clearInterval(timer);
        setCount(numeric);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [startCount, value]);

  // show suffixes + or %
  const suffix = String(value).replace(/[0-9]/g, "");
  return (
    <span aria-hidden="false" className="font-extrabold">
      {count}
      {suffix}
    </span>
  );
};

/* ---------------- MAIN PAGE ---------------- */
const WhySanskruti = () => {
  const features = [
    {
      icon: "🌐",
      title: "Global-minded Curriculum",
      description:
        "A thoughtfully designed curriculum that blends international best practices with Indian values, preparing students for global opportunities.",
      details: ["Project-based learning", "Interdisciplinary approach", "Skill-first pedagogy"],
    },
    {
      icon: "🤖",
      title: "Innovation & STEM Labs",
      description:
        "Hands-on labs in Robotics, Coding, and IoT that inspire problem solving and real-world creativity.",
      details: ["Robotics & AI", "Makerspace & 3D printing", "Computer & coding labs"],
    },
    {
      icon: "🏫",
      title: "Modern Campus Facilities",
      description:
        "Safe, clean and green campus with well-equipped classrooms, library, labs and sports arenas.",
      details: ["Smart classrooms", "Well-stocked library", "Sports complex & swimming pool"],
    },
    {
      icon: "👩‍🏫",
      title: "Experienced Faculty",
      description:
        "A committed team of educators who use modern pedagogy and personalised mentoring for every child.",
      details: ["Continuous teacher development", "Mentor system", "Low student-teacher ratio"],
    },
    {
      icon: "🎭",
      title: "Holistic Development",
      description:
        "Co-curricular programs in arts, music, theatre and leadership to build confident and balanced individuals.",
      details: ["Music & arts labs", "Public speaking", "Student leadership clubs"],
    },
    {
      icon: "🛡️",
      title: "Safe & Supported Environment",
      description:
        "Student safety and wellbeing are core priorities — secure transport, health care and counselling services.",
      details: ["CCTV & security", "Health & wellness programs", "Child protection policies"],
    },
  ];

  /* Stats */
  const stats = [
    // { number: "0", label: "Students" },
    { number: "15+", label: "Faculty Members" },
    //{ number: "98%", label: "Pass Rate" },
    //{ number: "12+", label: "Years of Excellence" },
  ];

  /* Testimonials */
  const testimonials = [
    // {
    //   quote:
    //     "Sanskruti Techno School transformed my child’s curiosity into capability. Teachers provide individual attention and real mentorship.",
    //   name: "Mrs. Meera Joshi",
    //   author: "Parent of Grade 10",
    // },
    // {
    //   quote:
    //     "The STEM labs and project work here are outstanding. My son loves robotics classes and has grown more confident in problem solving.",
    //   name: "Mr. Rohit Kulkarni",
    //   author: "Parent of Grade 8",
    // },
    // {
    //   quote:
    //     "A perfect balance of academics, sports and arts. The school’s focus on values and leadership is what we value the most.",
    //   name: "Mrs. Anjali Deshpande",
    //   author: "Parent of Grade 6",
    // },
  ];

  /* --- COUNTER TRIGGER --- */
  const statRef = useRef(null);
  const statInView = useInView(statRef, { once: true, margin: "-80px" });

  return (
    <main>
      {/* HERO / INTRO */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16 md:py-24">
        <div className="container-custom px-6 md:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
              Why Choose Sanskruti Techno School
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              A future-ready school in Ambegaon focused on technology, creativity, character and academic excellence.
              We nurture young minds to be innovators, thinkers and responsible citizens.
            </p>
          </motion.header>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="section-padding bg-white">
        <div className="container-custom px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
                aria-labelledby={`feature-title-${i}`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{f.icon}</div>
                  <div>
                    <h3 id={`feature-title-${i}`} className="text-2xl font-semibold text-primary">
                      {f.title}
                    </h3>
                    <p className="text-gray-700 mt-2">{f.description}</p>

                    <ul className="mt-4 space-y-2">
                      {f.details.map((d, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="inline-block w-5 h-5 text-primary">✓</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statRef} className="section-padding bg-gray-50">
        <div className="container-custom px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Our Achievements</h2>
            <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
              Trusted by parents and recognized for academic and co-curricular excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="text-4xl text-primary mb-2">
                  <Counter value={s.number} startCount={statInView} />
                </div>
                <div className="text-gray-600 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-white">
        <div className="container-custom px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary">What Parents Say</h2>
            <p className="text-gray-600 mt-2">Real feedback from our school community.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm"
              >
                <div className="text-4xl text-primary mb-3">“</div>
                <p className="text-gray-700 italic mb-4">{t.quote}</p>
                <footer className="text-left border-t pt-3">
                  <div className="font-semibold text-primary">{t.name}</div>
                  <div className="text-sm text-gray-600">{t.author}</div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default WhySanskruti;
