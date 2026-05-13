import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, Link } from 'react-router-dom'

const About = () => {
  const location = useLocation()
  const [openSections, setOpenSections] = useState({
    foundersMessage: false,
    missionCredo: false,
    management: false,
    chairperson: false,
    awards: false,
    achievements: false,
    testimonials: false,
    nabet: false,
    schoolTour: false,
    cbse: false,
    aboutTechnoSchool: false,
    schoolManagement: false,
    aboutSanskrutiTechnoSchool: false,
  })
  const [openVideoModal, setOpenVideoModal] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Convert kebab-case to camelCase
  const kebabToCamel = (str) => {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  }

  // Scroll to section when hash changes
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1)
      const camelCaseId = kebabToCamel(sectionId)

      // Auto-expand the section first
      setOpenSections((prev) => ({
        ...prev,
        [camelCaseId]: true,
      }))

      // Then scroll to the section
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          const offset = isMobile ? 80 : 100 // Smaller offset for mobile
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, isMobile ? 200 : 300) // Shorter delay for mobile
    }
  }, [location.hash, isMobile])

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const AccordionSection = ({ id, title, children, isOpen, onToggle }) => {
    return (
      <div id={id} className="mb-4 md:mb-6 border border-gray-200 rounded-lg overflow-hidden shadow-sm md:shadow-md">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
          aria-expanded={isOpen}
        >
          <h3 className="text-lg md:text-xl font-bold text-primary pr-2">{title}</h3>
          <div className="flex-shrink-0 ml-2">
            {isOpen ? (
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          </div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 md:px-6 py-4 md:py-6 bg-white">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-blue-800 text-white py-12 md:py-20">
        <div className="container-custom text-center px-4 md:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4"
          >
            Founder's Message
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-xl max-w-4xl mx-auto opacity-90 mb-8 md:mb-16 px-2"
          >
            Leadership that inspires excellence, values, and a vision for future generations.
          </motion.p>

          {/* Flex Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 mt-8 md:mt-12"
          >
            {/* PRESIDENT – DR. SUDHAKARRAO JADHAVAR */}
            <div className="bg-white text-black p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary shadow-lg mb-4">
                  <img
                    src="/images/owner.jpeg"
                    alt="Dr. Sudhakarrao Jadhavar"
                    className="w-full h-full object-cover"
                    onError={(e) => { 
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI5MCIgZmlsbD0iI0VFRUVFRSIvPjxwYXRoIGQ9Ik0xMDAgMTEwQzExNC4zNTkgMTEwIDEyNiA5OC4zNTkgMTI2IDg0QzEyNiA2OS42NDEgMTE0LjM1OSA1OCAxMDAgNThDODUuNjQxIDU4IDc0IDY5LjY0MSA3NCA4NEM3NCA5OC4zNTkgODUuNjQxIDExMCAxMDAgMTEwWk0xMDAgMTM0Qzc4LjQ4OCAxMzQgNjAgMTQ3LjA0IDYwIDE2NEgxNDBDMTQwIDE0Ny4wNCAxMjEuNTEyIDEzNCAxMDAgMTM0WiIgZmlsbD0iIzk5OTk5OSIvPjwvc3ZnPg==';
                    }}
                    loading="lazy"
                  />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-center">Prin. Dr. Sudhakarrao Jadhavar</h3>
                <p className="text-primary font-semibold text-center">President</p>

                <p className="text-xs md:text-sm text-gray-600 mt-2 leading-relaxed text-center">
                  M.Com, M.A., L.L.M., M.P.M., D.T.L., D.L.L.&L.W., G.D.C.&A., Ph.D.
                </p>

                <div className="mt-4 md:mt-6 text-left text-gray-700 space-y-2 md:space-y-3 text-sm md:text-base">
                  <p className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Member – Management Council, Savitribai Phule Pune University</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Former Dean – Commerce Department, SPPU</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>General Secretary – Principals Forum, SPPU</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Member – Maharashtra Nursing Council</span>
                  </p>
                </div>

                <p className="mt-4 md:mt-6 text-gray-700 leading-relaxed text-justify text-sm md:text-base">
                  "Education for strength, wisdom and intellect" — with this vision,
                  Jadhavar International School (CBSE) has emerged as a knowledge hub
                  providing value-based education that nurtures disciplined, confident
                  and capable young minds. Situated in a rural region, the school
                  empowers students to become nation builders through strong academics,
                  character development and opportunities for holistic growth.
                </p>

                {/* PDF Links */}
                <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-2 md:gap-4">
                  <a
                    href="/pdf/Krantiveer Marathi.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow hover:bg-primaryDark transition text-sm md:text-base whitespace-nowrap"
                  >
                    Autobiography (मराठी)
                  </a>
                  <a
                    href="/pdf/Krantiveer Hindi.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow hover:bg-primaryDark transition text-sm md:text-base whitespace-nowrap"
                  >
                    Autobiography (हिंदी)
                  </a>
                  <a
                    href="/pdf/Krantiveer English.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow hover:bg-primaryDark transition text-sm md:text-base whitespace-nowrap"
                  >
                    Autobiography (English)
                  </a>
                </div>

                <div className="mt-3 text-center">
                  <a
                    href="/pdf/Yashache Shilpka Book.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-primary font-semibold cursor-pointer text-sm md:text-base"
                  >
                    Books: यशाचे शिल्पकार : संघर्षातून शिखराकडे
                  </a>
                </div>
              </div>
            </div>

            {/* SECRETARY – ADV. SHARDUL S. JADHAVAR */}
            <div className="bg-white text-black p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary shadow-lg mb-4">
                  <img
                    src="/images/Shardul_jadhavar.jpeg"
                    alt="Adv. Shardul Sudhakarrao Jadhavar"
                    className="w-full h-full object-cover"
                    onError={(e) => { 
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI5MCIgZmlsbD0iI0VFRUVFRSIvPjxwYXRoIGQ9Ik0xMDAgMTEwQzExNC4zNTkgMTEwIDEyNiA5OC4zNTkgMTI2IDg0QzEyNiA2OS42NDEgMTE0LjM1OSA1OCAxMDAgNThDODUuNjQxIDU4IDc0IDY5LjY0MSA3NCA4NEM3NCA5OC4zNTkgODUuNjQxIDExMCAxMDAgMTEwWk0xMDAgMTM0Qzc4LjQ4OCAxMzQgNjAgMTQ3LjA0IDYwIDE2NEgxNDBDMTQwIDE0Ny4wNCAxMjEuNTEyIDEzNCAxMDAgMTM0WiIgZmlsbD0iIzk5OTk5OSIvPjwvc3ZnPg==';
                    }}
                    loading="lazy"
                  />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-center">Adv. Shardul Sudhakarrao Jadhavar</h3>
                <p className="text-primary font-semibold text-center">Secretary</p>

                <p className="text-xs md:text-sm text-gray-600 mt-2 leading-relaxed text-center">
                  M.B.A., P.G.D.H.R.M., B.Com., D.H.R.&L., D.C.L., D.CP.L., APCL, DIPL,
                  CMED, D.LL&L.W., L.L.M.
                </p>

                <p className="mt-4 md:mt-6 text-gray-700 leading-relaxed text-justify text-sm md:text-base">
                  Education today is rapidly transforming, making it challenging for
                  students to choose the right path. Our aim is to develop not just
                  knowledgeable individuals, but responsible, confident and
                  compassionate citizens.
                  <br /><br />
                  At Jadhavar Institutes, we follow a student-centric approach with
                  dedicated faculty guiding, mentoring and shaping students into capable
                  professionals.
                  We support students through fee concessions, counseling, workshops,
                  mental health awareness, NSS activities, placements, and career guidance.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Accordion Sections */}
      <section className="section-padding bg-gray-50 py-8 md:py-12">
        <div className="container-custom max-w-4xl px-4 md:px-6">
          {/* About Sanskruti Techno School */}
          <AccordionSection
            id="about-techno-school"
            title="About Sanskruti Techno School"
            isOpen={openSections.aboutTechnoSchool}
            onToggle={() => toggleSection('aboutTechnoSchool')}
          >
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-xl md:text-2xl font-bold text-primary mb-3">
                Welcome to Sanskruti Techno School
              </h4>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                Sanskruti Techno School is a modern educational institution dedicated to innovation,
                technology-enabled learning and holistic student development. Our mission is to shape
                young minds into confident learners, creative thinkers, and responsible global citizens.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm">
                  <h5 className="text-lg md:text-xl font-semibold text-primary mb-2">Our Mission</h5>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    To empower students through advanced technology-driven education, fostering knowledge,
                    creativity, discipline and character development.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm">
                  <h5 className="text-lg md:text-xl font-semibold text-primary mb-2">Our Vision</h5>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    To build a future-ready learning ecosystem where students excel academically, emotionally,
                    socially and technologically, preparing them for global opportunities.
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-6">
                <h5 className="text-lg md:text-xl font-semibold text-primary mb-3">Core Principles</h5>
                <ul className="space-y-2 md:space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm md:text-base">Technology-based learning with digital classrooms & smart labs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm md:text-base">Holistic development through sports, arts & leadership programs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm md:text-base">Safe, supportive & disciplined learning environment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm md:text-base">Nurturing curiosity, innovation & scientific thinking</span>
                  </li>
                </ul>
              </div>

              <p className="mt-4 md:mt-6 text-gray-700 italic text-sm md:text-base">
                "Education is not about learning facts, but training the mind to think."
              </p>
            </div>
          </AccordionSection>

          {/* Management Section */}
          <AccordionSection
            id="school-management"
            title="School Management & Leadership"
            isOpen={openSections.schoolManagement}
            onToggle={() => toggleSection('schoolManagement')}
          >
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-xl md:text-2xl font-bold text-primary mb-3">Guiding Future With Excellence</h4>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                Sanskruti Techno School is led by a dedicated management team focused on academic excellence,
                strong values, and advanced learning methodologies. Our leadership ensures a disciplined,
                progressive, and student-centered environment.
              </p>

              <h5 className="text-lg md:text-xl font-semibold text-primary mt-3 md:mt-4">Key Focus Areas</h5>
              <ul className="space-y-2 md:space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-sm md:text-base">Implementation of modern educational technology</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-sm md:text-base">Recruitment of skilled & inspiring faculty</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-sm md:text-base">Continuous student growth monitoring and mentoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-sm md:text-base">Transparent communication with parents & community engagement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-sm md:text-base">Building future-ready infrastructure & digital resources</span>
                </li>
              </ul>

              <p className="text-gray-700 leading-relaxed mt-4 md:mt-6 text-sm md:text-base">
                We believe every child is unique and deserves a platform to explore, innovate, and succeed.
                Our goal is to nurture excellence in education and values.
              </p>
            </div>
          </AccordionSection>

          {/* Awards */}
          <AccordionSection
            id="awards"
            title="Awards & Recognitions"
            isOpen={openSections.awards}
            onToggle={() => toggleSection('awards')}
          >
            <div className="space-y-4 md:space-y-6">
              <div>
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                  Sanskruti Techno School has established itself as one of the leading educational institutions, recognized for academic excellence, advanced technology-enabled learning, and holistic student development. Our achievements reflect our strong commitment to nurturing future leaders and innovators.
                </p>
              </div>

              {/* National & Regional Awards */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-primary mb-3 md:mb-4">National & Regional Awards</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="p-4 md:p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <h5 className="font-semibold text-primary mb-1 md:mb-2 text-base md:text-lg">Excellence in Education Award</h5>
                    <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">Awarded for outstanding academic results and innovative teaching strategies powered by technology.</p>
                    <p className="text-xs text-gray-500 italic">Recognized for exceptional performance in annual board results and project-based learning outcomes.</p>
                  </div>

                  <div className="p-4 md:p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <h5 className="font-semibold text-primary mb-1 md:mb-2 text-base md:text-lg">Best Technology-Integrated School</h5>
                    <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">Honored for implementing smart digital classrooms, robotics, AI learning, and STEM programs.</p>
                    <p className="text-xs text-gray-500 italic">Awarded for advanced digital infrastructure and future-ready curriculum.</p>
                  </div>

                  <div className="p-4 md:p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <h5 className="font-semibold text-primary mb-1 md:mb-2 text-base md:text-lg">Student Talent Development Award</h5>
                    <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">Recognized for exceptional achievements in academics, sports, and creative arts.</p>
                    <p className="text-xs text-gray-500 italic">Awarded for holistic education and student mentorship excellence.</p>
                  </div>

                  <div className="p-4 md:p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <h5 className="font-semibold text-primary mb-1 md:mb-2 text-base md:text-lg">Innovation in Teaching Award</h5>
                    <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">Awarded for adopting modern methodologies including experiential learning, digital labs, and real-world application projects.</p>
                  </div>
                </div>
              </div>

              {/* Special Recognition */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-primary mb-3 md:mb-4">Special Recognitions</h4>
                <div className="space-y-2 md:space-y-3">
                  <div className="p-3 md:p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <h5 className="font-semibold text-primary mb-1 text-sm md:text-base">Green Campus Award</h5>
                    <p className="text-xs md:text-sm text-gray-700">Recognized for eco-friendly initiatives, waste management systems, and clean, pollution-free campus environment.</p>
                  </div>

                  <div className="p-3 md:p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <h5 className="font-semibold text-primary mb-1 text-sm md:text-base">Sports Excellence Award</h5>
                    <p className="text-xs md:text-sm text-gray-700">Awarded for outstanding achievements in district and state-level championships across multiple sports disciplines.</p>
                  </div>

                  <div className="p-3 md:p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <h5 className="font-semibold text-primary mb-1 text-sm md:text-base">Cultural Brilliance Award</h5>
                    <p className="text-xs md:text-sm text-gray-700">Honored for exceptional performances in cultural festivals, arts, music, dance, and intellectually creative competitions.</p>
                  </div>

                  <div className="p-3 md:p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <h5 className="font-semibold text-primary mb-1 text-sm md:text-base">Community Impact Award</h5>
                    <p className="text-xs md:text-sm text-gray-700">Awarded for remarkable involvement in community welfare, social awareness, and youth leadership programs.</p>
                  </div>
                </div>
              </div>

              {/* Faculty Recognition */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-primary mb-3 md:mb-4">Faculty & Staff Honors</h4>
                <p className="text-gray-700 leading-relaxed mb-2 md:mb-3 text-sm md:text-base">
                  Our educators are our biggest strength, continuously recognized for their commitment and contributions:
                </p>

                <ul className="space-y-1 md:space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm md:text-base">State & National Level Best Teacher Awards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm md:text-base">Excellence in Classroom Innovation Recognition</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm md:text-base">Awards for Student Mentorship & Career Guidance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm md:text-base">Research, Publication & Educational Leadership Awards</span>
                  </li>
                </ul>
              </div>
            </div>
          </AccordionSection>

          {/* Achievements */}
          <AccordionSection
            id="achievements"
            title="Achievements"
            isOpen={openSections.achievements}
            onToggle={() => toggleSection("achievements")}
          >
            <div className="space-y-4 md:space-y-6">
              <div>
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                  At Sanskruti Techno School, we believe every child is capable of achieving excellence.
                  Our achievements reflect the hard work of our students, the dedication of our teachers,
                  and the continuous support of parents. We celebrate success across academics, sports,
                  arts, innovation, and community initiatives.
                </p>
              </div>

              {/* Academic Achievements */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-primary mb-3 md:mb-4">Academic Achievements</h4>
                <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                  <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">Academic Excellence Awards</h5>
                    <p className="text-xs md:text-sm text-gray-700 mb-1 md:mb-2">
                      Students from Sanskruti Techno School consistently excel in academics,
                      earning top ranks and recognition for outstanding performance.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-gray-600 ml-3 md:ml-4">
                      <li>Subject toppers across Mathematics, Science, and English</li>
                      <li>Winners of district-level scholarship & talent examinations</li>
                      <li>Achievement awards for project-based and experiential learning</li>
                      <li>Multiple recognitions in National and State Olympiads</li>
                    </ul>
                  </div>

                  <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">Innovation & Technology</h5>
                    <p className="text-xs md:text-sm text-gray-700 mb-1 md:mb-2">Students excel in technology-led competitions including:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-gray-600 ml-3 md:ml-4">
                      <li>STEM model making and science project exhibitions</li>
                      <li>Robotics workshops & coding challenges</li>
                      <li>National ICT competitions and digital-learning events</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sports Achievements */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-primary mb-3 md:mb-4">Sports Achievements</h4>
                <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                  <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">Sporting Excellence</h5>
                    <p className="text-xs md:text-sm text-gray-700 mb-1 md:mb-2">Strong participation and achievements in multiple sports:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-gray-600 ml-3 md:ml-4">
                      <li>Winners & finalists in inter-school cricket, football & kabaddi tournaments</li>
                      <li>District-level medals in athletics</li>
                      <li>Badminton, Chess & Carrom competition achievements</li>
                    </ul>
                  </div>

                  <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">Individual Achievements</h5>
                    <p className="text-xs md:text-sm text-gray-700">
                      Students have represented the school at district and state levels,
                      making us proud with their dedication and sportsmanship.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cultural Achievements */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-primary mb-3 md:mb-4">Cultural & Creative Achievements</h4>
                <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                  <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">Arts & Cultural Events</h5>
                    <p className="text-xs md:text-sm text-gray-700 mb-1 md:mb-2">Outstanding talent showcased in:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-gray-600 ml-3 md:ml-4">
                      <li>Inter-school dance and music competitions</li>
                      <li>Drama, storytelling & poetry competitions</li>
                      <li>Drawing, painting & craft exhibitions</li>
                      <li>Debate, elocution & quiz competitions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Community Service */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-primary mb-3 md:mb-4">Community & Leadership Achievements</h4>
                <div className="space-y-2 md:space-y-3">
                  <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">Social Responsibility Initiatives</h5>
                    <p className="text-xs md:text-sm text-gray-700 mb-1 md:mb-2">Students actively participate in:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-gray-600 ml-3 md:ml-4">
                      <li>Cleanliness & environmental awareness campaigns</li>
                      <li>Tree plantation & Go-Green drives</li>
                      <li>Community support activities and donations</li>
                      <li>Road safety & health awareness programs</li>
                    </ul>
                  </div>

                  <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">Student Council</h5>
                    <p className="text-xs md:text-sm text-gray-700">
                      Our student leaders demonstrate discipline, teamwork, and leadership skills
                      in organizing school events and representing student voices.
                    </p>
                  </div>
                </div>
              </div>

              {/* Institutional Growth */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-primary mb-3 md:mb-4">Institutional Growth</h4>
                <div className="p-3 md:p-4 bg-primary/10 rounded-lg">
                  <ul className="space-y-1 md:space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-sm md:text-base"><strong>Rapid Expansion:</strong> Consistently growing admission strength and academic success rates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-sm md:text-base"><strong>Digital Campus:</strong> Integration of smart classroom technologies & e-learning tools</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-sm md:text-base"><strong>Strong Parent-School Engagement:</strong> Transparent communication & active parent participation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </AccordionSection>

          {/* About Sanskruti Techno School */}
          <AccordionSection
            id="about-sanskruti-techno-school"
            title="About Sanskruti Techno School"
            isOpen={openSections.aboutSanskrutiTechnoSchool}
            onToggle={() => toggleSection("aboutSanskrutiTechnoSchool")}
          >
            <div className="space-y-4 md:space-y-6">
              <div>
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                  Sanskruti Techno School is a modern educational institution dedicated to shaping the leaders
                  of tomorrow through innovation, technology-driven learning, and character-based education.
                  We focus on nurturing curiosity, creativity, and problem-solving skills while preserving
                  strong cultural and moral values. Our mission is to provide world-class education that
                  prepares students to excel in academics, life skills, and global opportunities.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-primary mb-2 md:mb-3">Our Educational Approach</h4>
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                  Our school integrates advanced digital learning tools, interactive classrooms, and activity-based
                  teaching methodologies to create a joyful and meaningful learning experience for every student.
                  We believe in holistic development through academics, sports, arts, life-skills, and leadership programs.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-primary mb-2 md:mb-3">Key Features of Sanskruti Techno School</h4>
                <ul className="space-y-1 md:space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm md:text-base">Well-equipped digital classrooms with smart learning resources</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm md:text-base">Highly qualified and trained teaching faculty</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm md:text-base">Focus on discipline, values, creativity, and independent thinking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm md:text-base">Modern campus facilities, sports programs & co-curricular activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm md:text-base">Personal attention and supportive learning environment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm md:text-base">Safe, secure & student-friendly infrastructure</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-primary mb-2 md:mb-3">Our Vision</h4>
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                  To be a leading institution recognized for academic excellence, innovative learning,
                  and character development that empowers students to become confident and responsible global citizens.
                </p>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-semibold text-primary mb-2 md:mb-3">Our Mission</h4>
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                  To inspire students to learn, grow and excel by providing a supportive and challenging
                  learning environment enriched with values, technology, and creativity.
                </p>
              </div>

              <div className="p-3 md:p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h5 className="font-semibold text-primary mb-1 md:mb-2 text-sm md:text-base">Commitment to Growth</h5>
                <p className="text-gray-700 text-xs md:text-sm">
                  At Sanskruti Techno School, we continuously enhance our educational standards, upgrade
                  learning facilities, and adopt innovative teaching strategies to ensure student success in
                  a rapidly changing world.
                </p>
              </div>
            </div>
          </AccordionSection>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="section-padding bg-gray-50 py-8 md:py-12">
        <div className="container-custom px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 md:mb-4">Photo Gallery</h2>
            <p className="text-base md:text-xl text-gray-600">Moments from our school life</p>
          </motion.div>
          <div className="text-center">
            <Link
              to="/gallery"
              className="inline-block px-6 py-3 md:px-8 md:py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm md:text-base"
              aria-label="View full photo gallery"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About