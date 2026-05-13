import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ImageSlider from '../components/ImageSlider'
import Reviews from '../components/Reviews'

const Home = () => {
  const [showAdmissionPopup, setShowAdmissionPopup] = useState(false)
  const [showNoticePopup, setShowNoticePopup] = useState(false)

  useEffect(() => {
    setShowAdmissionPopup(true)
  }, [])

  const openAdmissionPopup = () => setShowAdmissionPopup(true)
  const closeAdmissionPopup = () => setShowAdmissionPopup(false)

  // ===============================
  // ADMISSION SECTION COMPONENT
  // ===============================
  const AdmissionSection = () => {
    const imageSrc = "/images/admissions.jpeg";

    const steps = [
      {
        id: 1,
        title: "Counsellor Interaction",
        description:
          "Book a one-on-one online counselling session with our experts to understand the admission process and curriculum.",
      },
      {
        id: 2,
        title: "Collect Prospectus & Brochure",
        description:
          "Receive our detailed prospectus and brochure to explore the facilities, programs, and values of Sanskruti Techno School.",
      },
      {
        id: 3,
        title: "Document Submission",
        description:
          "Submit the completed admission form along with the required documents for a smooth enrollment process.",
      },
      {
        id: 4,
        title: "Child Assessment Session",
        description:
          "Schedule a child assessment session to help us understand your child's abilities and tailor their learning journey.",
      },
    ];

    return (
      <section className="w-full bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src={imageSrc}
              alt="Admission Process"
              className="w-full h-auto rounded-r-3xl object-cover shadow-lg"
            />
          </motion.div>

          {/* RIGHT CONTENT */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h3 className="text-4xl font-extrabold text-gray-900 mb-4">
                Admission <span className="text-blue-500">Open</span>
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Sanskruti Techno School simplifies the admission process for parents. Follow the steps below to enroll your child in a futuristic learning environment.
              </p>

              <Link
                to="/admissions"
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-full shadow hover:bg-blue-600"
              >
                Enroll Now
              </Link>
            </motion.div>

            {/* STEPS */}
            <div className="mt-4">
              <div className="flex gap-4 overflow-x-auto pb-4 md:overflow-visible md:flex-wrap">
                {steps.map((s) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="min-w-[260px] md:w-60 bg-blue-600 text-white rounded-2xl p-5 shadow-md border-t-4 border-blue-700"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold">{s.title}</h4>
                      <div className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold">
                        {String(s.id).padStart(2, "0")}
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-white/90">
                      {s.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="mt-10 border-t border-gray-100" />
      </section>
    )
  }
  // ===============================
  // END ADMISSION SECTION
  // ===============================

  return (
    <div>

      {/* HERO SECTION – KEEP VIDEO */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">

        {/* BACKGROUND VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/video/school.mp4" type="video/mp4" />
        </video>

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 backdrop-blur-sm"></div>

        {/* CONTENT */}
        <div className="relative z-10 px-6 md:px-12 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl md:text-3xl font-light tracking-wide text-gray-200">
              Welcome to
            </h2>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-xl mt-2">
              Sanskruti Techno School
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mt-6 leading-relaxed font-medium">
              Empowering Minds Through Innovation, Technology & Holistic Education
            </p>

            {/* Animated Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admissions"
                className="px-8 py-3 text-lg font-semibold bg-white text-black rounded-full shadow-xl hover:scale-105 transition-all"
              >
                Start Admission
              </Link>

              <Link
                to="/about-us"
                className="px-8 py-3 text-lg font-semibold border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all"
              >
                About School
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
        >
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center items-start p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </motion.div>

      </section>

      {/* ADMISSION SECTION */}
      <AdmissionSection />

      {/* IMAGE SLIDER */}
      <ImageSlider />

      {/* POPUPS */}
      {showAdmissionPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeAdmissionPopup}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-[90%] p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeAdmissionPopup}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Join Sanskruti Techno School
              </h2>

              <div>
                <h1 className="text-4xl font-extrabold text-green-700">
                  ADMISSION OPEN
                </h1>
                <h2 className="text-2xl font-bold text-gray-800 mt-2">
                  For 2026 – 27
                </h2>
              </div>

              <p className="text-gray-600 text-base mb-6">
                Give your child the opportunity to excel in a world-class technological learning environment.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/admissions"
                  onClick={closeAdmissionPopup}
                  className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg"
                >
                  Apply for Admission
                </Link>

                <button
                  onClick={closeAdmissionPopup}
                  className="px-6 py-2 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {showNoticePopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowNoticePopup(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-[90%] p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowNoticePopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">Latest Notice</h2>

              <img
                src="/images/notice.jpeg"
                alt="Notice"
                className="w-full rounded-xl mb-6 object-cover max-h-70"
              />

              <p className="text-gray-600 text-base mb-4">
                Important update for all parents and students of Sanskruti Techno School.
              </p>

              <button
                onClick={() => setShowNoticePopup(false)}
                className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* REVIEWS SECTION */}


      {/* CTA SECTION */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Invest in Your Child's Future
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Experience the Excellence of Sanskruti Techno School
            </p>
            <Link to="/admissions" className="btn-secondary text-lg">
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default Home
