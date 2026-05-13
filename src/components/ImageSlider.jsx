import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 🌟 NEW UI — PERFECT BACKGROUND + CONTENT MATCH
// Clean, balanced layout, text aligned with image focal point
// Lighter UI, smooth animations, mobile-optimized

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      src: "/images/slider/modern_tech.jpg",
      title: "Sanskruti Techno School",
      subtitle: "A Future-Ready Learning Ecosystem",
      description:
        "Empowering students with modern technology, digital classrooms, smart labs, and innovation spaces.",
      alt: "Sanskruti Techno School Campus",
    },
    {
      src: "/images/slider/robotics.jpg",
      title: "Robotics & AI Lab",
      subtitle: "Learn With Innovation",
      description:
        "Hands-on learning experiences with robotics, coding, IoT and AI tools shaping young creators.",
      alt: "Robotics and AI Lab",
    },
    {
      src: "/images/slider/3.jpg",
      title: "Digital Smart Campus",
      subtitle: "Technology Driven Learning",
      description:
        "Smart classrooms equipped with digital boards, online learning platforms and virtual labs.",
      alt: "Digital Smart Campus",
    },
    {
      src: "/images/slider/sport.jpg",
      title: "Sports & Physical Education",
      subtitle: "Strong Mind, Strong Body",
      description:
        "Professional coaching in multiple sports with advanced sporting facilities.",
      alt: "Sports Activities",
    },
    {
      src: "/images/slider/2.jpg",
      title: "Cultural & Creative Activities",
      subtitle: "Discover Your Talent",
      description:
        "Fostering creativity, confidence, leadership and real-life skills through events and activities.",
      alt: "Cultural Activities",
    },
    {
      src: "/images/slider/1.jpg",
      title: "Modern Teaching Excellence",
      subtitle: "Experienced & Student-Centered Faculty",
      description:
        "Our educators follow NEP-based learning modules that promote critical thinking, curiosity and problem solving.",
      alt: "Modern Teaching Techniques",
    },
    {
      src: "/images/slider/helth1.jpg",
      title: "Safe & Secure Campus",
      subtitle: "A Healthy Environment to Grow",
      description:
        "24×7 CCTV surveillance, verified staff, hygienic classrooms, transport safety and student wellness programs.",
      alt: "Safe School Campus",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const pauseAuto = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    pauseAuto();
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    pauseAuto();
  };

  return (
    <section
      className="relative w-full h-[300px] sm:h-[360px] md:h-[440px] lg:h-[520px] overflow-hidden bg-black"
      aria-label="School promotional slider"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* 🔹 Background */}
          <div
            className="absolute inset-0 bg-cover bg-center brightness-95"
            style={{ backgroundImage: `url(${slides[currentIndex].src})` }}
            role="img"
            aria-label={slides[currentIndex].alt}
          />

          {/* 🔹 Gradient for smooth blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>

          {/* 🔹 Content Box */}
          <article className="relative z-10 flex items-center h-full pl-5 sm:pl-10">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl bg-black/30 backdrop-blur-md p-4 sm:p-6 md:p-7 rounded-xl border border-white/10 shadow-xl"
            >
              <h2 className="text-white text-lg sm:text-2xl md:text-3xl font-semibold drop-shadow">
                {slides[currentIndex].title}
              </h2>

              <p className="text-blue-200 text-xs sm:text-sm md:text-base mt-2 font-medium drop-shadow">
                {slides[currentIndex].subtitle}
              </p>

              <p className="text-gray-100 text-xs sm:text-sm md:text-base mt-3 leading-relaxed drop-shadow">
                {slides[currentIndex].description}
              </p>
            </motion.div>
          </article>
        </motion.div>
      </AnimatePresence>

      {/* 🔹 Navigation Buttons */}
      <button
        onClick={goToPrevious}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full z-20 backdrop-blur-sm"
      >
        ‹
      </button>

      <button
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full z-20 backdrop-blur-sm"
      >
        ›
      </button>

      {/* 🔹 Indicators */}
      <nav
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20"
        aria-label="Slide indicators"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              pauseAuto();
            }}
            className={`h-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-7" : "bg-white/50 w-2"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </nav>
    </section>
  );
};

// SEO Keywords Added
// Keywords: school, techno school, robotics lab, AI learning, digital campus, NEP education, smart classrooms, sports coaching, cultural events, safe campus, CBSE school, modern teaching, best school, innovation learning

export default ImageSlider;
