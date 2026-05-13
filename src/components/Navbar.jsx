import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ================= NEWS TICKER ================= */
const NewsTicker = () => {
  const news = [
    "Admissions Open for 2026–27",
    "Join Our School Community – Admissions Open",
  ];

  return (
    <div className="bg-blue-600 text-white py-2 overflow-hidden">
      <div className="whitespace-nowrap animate-scroll text-[11px] sm:text-sm font-semibold">
        {news.map((item, index) => (
          <span key={index} className="mx-6">
            • {item}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ================= NAVBAR ================= */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showUdan, setShowUdan] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll shadow effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setShowMore(false);
    setShowUdan(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  // Main navigation links
  const mainLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Why Sanskruti Techno", path: "/why-jadhavar" },
    { label: "Curriculum", path: "/curriculum" },
    { label: "Admissions", path: "/admissions" },
    { label: "Facilities", path: "/facilities" },
    { label: "Life At School", path: "/life-at-jadhavar" },
    { label: "Info Center", path: "/info-center" },
    { label: "Contact", path: "/contact" },
  ];

  // Additional dropdown links
  const moreLinks = [
    { label: "Gallery", path: "/gallery" },
    { label: "Blog", path: "/blogs" },
    { label: "Announcements", path: "/announcements" },
    { label: "Careers", path: "/career" }
  ];

  // Udan dropdown links
  const udanLinks = [
    { path: "/books/Udan1.pdf", label: "Udan 1" },
    { path: "/books/Udan2.pdf", label: "Udan 2" },
    { path: "/books/Udan3.pdf", label: "Udan 3" },
    { path: "/books/Udan4.pdf", label: "Udan 4" },
    { path: "/books/Udan5.pdf", label: "Udan 5" },
    { path: "/books/Udan6.pdf", label: "Udan 6" },
    { path: "/books/Udan7.pdf", label: "Udan 7" },
    { path: "/books/Udan8.pdf", label: "Udan 8" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur"
      }`}
    >
      <NewsTicker />

      {/* TOP BAR */}
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* LOGO */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/images/logo1.png"
              alt="Sanskruti Techno School"
              className="w-12 sm:w-16 md:w-20"
            />
          </Link>

          {/* TITLE */}
          <div className="flex-1 text-center px-2">
            <h2
              className="font-bold text-primary leading-tight
              text-sm sm:text-lg md:text-2xl lg:text-3xl"
            >
              Sanskruti Techno School
            </h2>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex justify-center flex-wrap gap-1 xl:gap-2 mt-4">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-md transition ${
                location.pathname === link.path
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* UDAN DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setShowUdan(true)}
            onMouseLeave={() => setShowUdan(false)}
          >
            <button
              className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
              aria-haspopup="true"
              aria-expanded={showUdan}
            >
              Udan ▾
            </button>

            <AnimatePresence>
              {showUdan && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 mt-2 w-44 bg-white rounded-md shadow-lg border"
                >
                  {udanLinks.map((link) => (
                    <div key={link.path} className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded">
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600"
                      >
                        {link.label}
                      </a>
                      <a
                        href={link.path}
                        download
                        className="text-xs text-blue-600 hover:underline ml-2"
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MORE DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setShowMore(true)}
            onMouseLeave={() => setShowMore(false)}
          >
            <button
              className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
              aria-haspopup="true"
              aria-expanded={showMore}
            >
              More ▾
            </button>

            <AnimatePresence>
              {showMore && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg border"
                >
                  {moreLinks.map((link) => {
                    // Handle PDF files
                    if (link.path.endsWith(".pdf")) {
                      return (
                        <div key={link.path} className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded">
                          <a
                            href={link.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600"
                          >
                            {link.label}
                          </a>
                          <a
                            href={link.path}
                            download
                            className="text-xs text-blue-600 hover:underline ml-2"
                          >
                            Download
                          </a>
                        </div>
                      );
                    }
                    // Handle image files
                    if (link.path.endsWith(".jpg") || link.path.endsWith(".png")) {
                      return (
                        <a
                          key={link.path}
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {link.label}
                        </a>
                      );
                    }
                    // Handle regular links
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="lg:hidden fixed top-[110px] right-0 w-full h-[calc(100vh-110px)] bg-white overflow-y-auto shadow-lg"
          >
            <div className="px-4 py-4 space-y-1 pb-20">
              {mainLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              ))}

              {/* MOBILE UDAN TOGGLE */}
              <button
                onClick={() => setShowUdan(!showUdan)}
                className="w-full text-left px-4 py-3 font-medium rounded-lg hover:bg-gray-100"
                aria-expanded={showUdan}
              >
                Udan ▾
              </button>

              <AnimatePresence>
                {showUdan && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="ml-4"
                  >
                    {udanLinks.map((link) => (
                      <a
                        key={link.path}
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* MOBILE MORE TOGGLE */}
              <button
                onClick={() => setShowMore(!showMore)}
                className="w-full text-left px-4 py-3 font-medium rounded-lg hover:bg-gray-100"
                aria-expanded={showMore}
              >
                More ▾
              </button>

              <AnimatePresence>
                {showMore && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="ml-4"
                  >
                    {moreLinks.map((link) => {
                      // Handle PDF files in mobile
                      if (link.path.endsWith(".pdf")) {
                        return (
                          <a
                            key={link.path}
                            href={link.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                          >
                            {link.label}
                          </a>
                        );
                      }
                      // Handle image files in mobile
                      if (link.path.endsWith(".jpg") || link.path.endsWith(".png")) {
                        return (
                          <a
                            key={link.path}
                            href={link.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                          >
                            {link.label}
                          </a>
                        );
                      }
                      // Handle regular links in mobile
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;